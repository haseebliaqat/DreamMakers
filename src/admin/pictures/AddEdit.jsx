import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { alertService } from '@/_services';
import { picturesService } from '@/_services/pictures.service';
import moment from 'moment';
import S3 from 'react-aws-s3';

function AddEdit({ history, match }) {

    const [isSubmit, setIsSubmit] = useState(false);
    const [imageURL, setImageURL] = useState('')
    const { id } = match.params;
    const isAddMode = !id;

    const configObj = {
        bucketName: 'dreammakersbucket',
        dirName: 'pictures',
        region: process.env.REACT_APP_AWS_REGION,
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_BUCKET_KEY
    }

    const initialValues = {
        name: '',
        title: '',
        description: '',
        url: '',
        alt: '',
        status: '',
        type: '',
        createdDate: moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedDate: null
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        title: Yup.string()
            .required('Title is required'),
        description: Yup.string()
            .required('Description is required'),
        alt: Yup.string()
            .required('ALT is required'),
        type: Yup.string()
            .required('type is required'),
        status: Yup.string()
            .required('Status is required')

    });

    function onSubmit(fields, { setStatus, setSubmitting }) {

        setStatus();
        if (isAddMode) {
            createPicture(fields, setSubmitting);
        } else {
            updatePicture(id, fields, setSubmitting);
        }
    }

    function createPicture(fields, setSubmitting) {
        console.log("fields", fields);
        console.log("setSubmitting", setSubmitting);
        fields.url = imageURL;
        picturesService.create(fields)
            .then(() => {
                alertService.success('Picture added successfully', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    function updatePicture(id, fields, setSubmitting) {
        if (imageURL) {
            fields.url = imageURL;
        }
        picturesService.update(id, fields)
            .then(() => {
                alertService.success('Update successful', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    let uploadPicture = (e) => {
        setIsSubmit(true);
        const reactS3Client = new S3(configObj);
        console.log("event uplaod==>", e);
        reactS3Client.uploadFile(e.target.files[0], e.target.files[0].name).then((data) => {
            setIsSubmit(false);
            setImageURL(data.location);
            console.log(data);

        }).catch(error => {
            setIsSubmit(false);
            console.log(error);
        });
    }

    return (
        <>

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ errors, touched, isSubmitting, setFieldValue }) => {
                    useEffect(() => {
                        if (!isAddMode) {
                            // get user and set form fields
                            let obj = {
                                "limit": 5,
                                "offset": 0,
                                "order": [["id", "ASC"], ["name", "DESC"]],
                                "where": { "id": id }
                            }
                            picturesService.getById(obj).then(campaign => {
                                console.log("campaign", campaign);
                                const fields = ['name', 'title', 'description', 'url', 'alt', 'type', 'status'];
                                fields.forEach(field => setFieldValue(field, campaign.rows[0][field], false));
                            });
                        }
                    }, []);

                    return (
                        <Form>
                            <h1>{isAddMode ? 'Add Picture' : 'Edit Picture'}</h1>
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
                                    <label>Description</label>
                                    <Field name="description" type="text" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
                                    <ErrorMessage name="description" component="div" className="invalid-feedback" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-4">
                                    <label>ALT</label>
                                    <Field name="alt" type="text" className={'form-control' + (errors.alt && touched.alt ? ' is-invalid' : '')} />
                                    <ErrorMessage name="alt" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group col-4">
                                    <label>Type</label>
                                    <Field name="type" type="text" className={'form-control' + (errors.type && touched.type ? ' is-invalid' : '')} />
                                    <ErrorMessage name="type" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group col-4">
                                    <label>Status</label>
                                    <Field name="status" type="text" className={'form-control' + (errors.status && touched.status ? ' is-invalid' : '')} />
                                    <ErrorMessage name="status" component="div" className="invalid-feedback" />
                                </div>
                            </div>
                            <div>
                                <div className="form-row">
                                    <div className="form-group col-4">
                                        <label>Upload Picture</label>
                                        <input name="upload" type="file" className="form-control" onChange={(e) => uploadPicture(e)} />
                                        {isSubmit && <span className="spinner-border spinner-border-sm mr-1"></span> }
                                    </div>

                                </div>
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

        </>
    );
}

export { AddEdit };