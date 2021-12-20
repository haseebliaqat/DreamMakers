import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { alertService } from '@/_services';
import moment from 'moment';
import { winnersService } from '@/_services/winners.service';
import config from 'config';
import { useState } from 'react';
import S3 from 'react-aws-s3';
import { v4 as randomString } from 'uuid';

function AddEdit({ history, match }) {
    const { id } = match.params;
   const [winnersObj,setWinnersObj]= useState([]);
    const [bulkPictures, setBulkPictures] = useState([]);
    
    const isAddMode = !id;

    
    // function createBulkPictures(fields) {
    //     setBulkPictures(bulkPictures);
    //     picturesService.createBulk(bulkPictures)
    //         .then(() => {
    //             alertService.success('Pictures added successfully', { keepAfterRouteChange: true });
    //             history.push('.');
    //         })
    //         .catch(error => {
    //             setSubmitting(false);
    //             alertService.error(error);
    //         });
    // }

    const initialValues = {
        name: '',
        title: '',
        company: '',
        manufacturer: '',
        country: '',
        expiry: false,
        price: 0,
        pictureId: '',
        inStock: 0,
        createdDate: moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedDate: null
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        title: Yup.string()
            .required('Title is required'),
        company: Yup.string()
            .required('Company is required'),
        manufacturer: Yup.string()
            .required('Manufacturer is required'),
        country: Yup.string()
            .required('Country is required'),
        expiry: Yup.boolean()
            .required('Expiry is required'),
        price: Yup.number()
            .required('Price is required'),
        pictureId: Yup.string()
            .required('Picture is required'),
        inStock: Yup.number()
            .required('Stock is required')

    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        console.log("BACCAAS");
        setStatus();
        if (isAddMode) {
            console.log("BACCAAS",fields);
            createWinner(fields, setSubmitting);
        } else {
            updateWinner(id, fields, setSubmitting);
        }
    }

    function createWinner(fields, setSubmitting) {
        winnersService.create(fields)
            .then(() => {
                alertService.success('Winner added successfully', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    function updateWinner(id, fields, setSubmitting) {
        winnersService.update(id, fields)
            .then(() => {
                alertService.success('Update successful', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }


    // For Images
    const configObjS3 = {
        bucketName: config.bucketName,
        dirName: config.dirName,
        region: config.region,
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey
    }


    let uploadPicture = (e,name, category, type, platform) => {
        console.log(bulkPictures);
        type = type ? type: 'full-size';
        category = category ? category : 'winners-image';
        platform = platform ? platform : 'desktop';
        let status = 'active';
        let alt = 'DreamMakers';
        e.persist();
       console.log(e.target.files[0]);
        const reactS3Client = new S3(configObjS3);
        reactS3Client.uploadFile(e.target.files[0], randomString()).then((data) => {
            let fileFormat =  data.location.split('.').pop().toUpperCase();
            let imgObj = {
                name: name,
                alt: alt,
                url: data.location,
                type: type,
                status: status,
                category: category,
                platform: platform,
                format: fileFormat,
                description: `${name}-${type}-${category}-${platform}-${status}-${fileFormat}`,
                //campaignId: campaignObj.id,
                createdDate: moment().format("YYYY-MM-DD HH:mm:ss"),
                updatedDate: moment().format("YYYY-MM-DD HH:mm:ss")
            }
            let _arr = bulkPictures;
            _arr.push(imgObj);
            setBulkPictures(_arr);
            winnersObj[name] = data.location;
            setWinnersObj(winnersObj);
            // forceUpdate();
        }).catch(error => {
            // setIsSubmit(false);
            console.log("------------err-------------");

            console.error(error);
        });
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting, setFieldValue }) => {
                useEffect(() => {
                    if (!isAddMode) {
                        // get user and set form fields
                        winnersService.getById(id).then(winner => {
                            const fields = ['name', 'title', 'company', 'manufacturer', 'country', 'expiry', 'price', 'pictureId', 'inStock', 'createdDate', 'updatedDate'];
                            fields.forEach(field => setFieldValue(field, winner[field], false));
                        });
                    }
                }, []);

                return (
                    <Form>
                        <h1>{isAddMode ? 'Add Winner' : 'Edit Winner'}</h1>
                        <div className="form-row">
                            <div className="form-group col-5">
                                <label>Name</label>
                                <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                <ErrorMessage name="name" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-5">
                                <label>Title</label>
                                <Field name="title" type="text" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} />
                                <ErrorMessage name="title" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-12">
                                <label>Company</label>
                                <Field name="company" type="text" className={'form-control' + (errors.company && touched.company ? ' is-invalid' : '')} />
                                <ErrorMessage name="company" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-12">
                                <label>Manufacturer</label>
                                <Field name="manufacturer" type="text" className={'form-control' + (errors.manufacturer && touched.manufacturer ? ' is-invalid' : '')} />
                                <ErrorMessage name="manufacturer" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-4">
                                <label>Country</label>
                                <Field name="country" type="text" className={'form-control' + (errors.country && touched.country ? ' is-invalid' : '')} />
                                <ErrorMessage name="country" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-4">
                                <label>Expiry</label>
                                <Field name="expiry" type="text" component="select" className={'form-control' + (errors.expiry && touched.expiry ? ' is-invalid' : '')} >
                                    <option value="1">Yes</option>
                                    <option value='0'>No</option>
                                </Field>
                                <ErrorMessage name="expiry" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-4">
                                <label>In Stock</label>
                                <Field name="inStock" type="text" className={'form-control' + (errors.inStock && touched.inStock ? ' is-invalid' : '')} />
                                <ErrorMessage name="inStock" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-3">
                                <label>Price</label>
                                <Field name="price" type="text" className={'form-control' + (errors.price && touched.price ? ' is-invalid' : '')} />
                                <ErrorMessage name="price" component="div" className="invalid-feedback" />
                            </div>
                            {/* <div className="form-group col-9">
                                <label>Picture</label>
                                <Field name="pictureId" type="file" accept=".jpeg,.png,.mp4,.flv" onChange={(e) => uploadPicture(e, 'pictureId')} className={'form-control'} />
                                <ErrorMessage name="pictureId" component="div" className="invalid-feedback" />
                                <img src="" alt="icon" style={{height:"200px",marginTop:"10px", width:"100%"}}/>
                            </div> */}
                        </div>
                        <div className="form-group">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                Save
                            </button>
                            <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}

export { AddEdit };