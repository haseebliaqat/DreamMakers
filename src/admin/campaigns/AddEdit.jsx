import React, { useEffect, useState } from 'react';
import './campaigns.less';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { alertService } from '@/_services';
import { campaignsService } from '@/_services/campaigns.service';
import moment from 'moment';
import { charityPartnersService } from '@/_services/charity-partners.service';
import _ from 'lodash';
import { picturesService } from '@/_services/pictures.service';
import S3 from 'react-aws-s3';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    // const [imageURL, setImageURL] = useState('')
    const [charityPartners, setCharityPartners] = useState([]);
    const [campaignId, setCampaignId] = useState(0);
    const [bulkPictures, setBulkPictures] = useState([])

    useEffect(() => {
        let obj = {
            "limit": 5,
            "offset": 0,
            "order": [["id", "ASC"], ["name", "DESC"]],
            "where": { "id": { "$gt": 0 } }
        }
        charityPartnersService.getAll(obj).then((x) => {
            setCharityPartners(x.rows)
        });
    }, [])

    const initialValues = {
        name: '',
        title: '',
        description: '',
        shortTitleDescriptionDesktop: '',
        shortTitleDescriptionMobile: '',
        shortDescriptionDesktop: '',
        shortDescriptionMobile: '',
        prizeTitleDesktop: '',
        prizeTitleMobile: '',
        whereToShow: '',
        sort: '',
        active: '',
        charityPartnerId: '',
        highlights: '',
        code: '',
        type: '',
        status: '',
        totalCoupons: 0,
        soldCoupons: 0,
        perEntryCoupons: 0,
        couponPrice: 0,
        startDate: '',
        drawDate: '',
        createdDate: moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedDate: moment().format("YYYY-MM-DD HH:mm:ss")
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        title: Yup.string()
            .required('Title is required'),
        description: Yup.string()
            .required('Description is required'),
        shortTitleDescriptionDesktop: Yup.string()
            .required('This field is required'),
        shortTitleDescriptionMobile: Yup.string()
            .required('This field is required'),
        shortDescriptionDesktop: Yup.string()
            .required('This field is required'),
        shortDescriptionMobile: Yup.string()
            .required('This field is required'),
        prizeTitleDesktop: Yup.string()
            .required('This field is required'),
        prizeTitleMobile: Yup.string()
            .required('This field is required'),
        whereToShow: Yup.array()
            .required('This field is required'),
        sort: Yup.string()
            .required('This field is required'),
        charityPartnerId: Yup.string()
            .required('This field is required'),
        active: Yup.boolean()
            .required('This field is required'),
        highlights: Yup.string()
            .required('Highlights is required'),
        code: Yup.string()
            .required('Code is required'),
        type: Yup.string()
            .required('type is required'),
        status: Yup.string()
            .required('Status is required'),
        totalCoupons: Yup.number()
            .required('Total Coupons is required'),
        soldCoupons: Yup.number()
            .required('Sold Coupons is required'),
        perEntryCoupons: Yup.number()
            .required('Per Entry Coupons is required'),
        couponPrice: Yup.number()
            .required('Coupon Price is required'),
        startDate: Yup.string()
            .required('Start Date is required'),
        drawDate: Yup.string()
            .required('Draw Date is required'),

    });

    function onSubmit(fields, { setStatus, setSubmitting }) {

        setStatus();
        if (isAddMode) {
            createCampaign(fields, setSubmitting);

        } else {
            updateCampaign(id, fields, setSubmitting);
        }
    }

    function createCampaign(fields, setSubmitting) {
        console.log("fields", fields);
        console.log("setSubmitting", setSubmitting);
        fields.whereToShow = (fields.whereToShow).toString();

        campaignsService.create(fields).then((resp) => {
            console.log("adding campaign", resp);
            alertService.success('Campaign added successfully', { keepAfterRouteChange: true });
            setCampaignId(resp.id);
            fields.id = resp.id;
            createBulkPictures(fields);

            history.push('.');
        }).catch(error => {
            setSubmitting(false);
            alertService.error(error);
        });
    }

    function updateCampaign(id, fields, setSubmitting) {
        fields.whereToShow = (fields.whereToShow).toString();

        campaignsService.update(id, fields)
            .then(() => {
                alertService.success('Update successful', { keepAfterRouteChange: true });
                setCampaignId(id);
                fields.id = id;
                createBulkPictures(fields);

                history.push('..');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    // For Images

    const configObj = {
        bucketName: 'dreammakersbucket',
        dirName: 'pictures',
        region: process.env.REACT_APP_AWS_REGION,
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_BUCKET_KEY
    }

    function createBulkPictures(fields) {

        console.log("fields create pic", fields);
        console.log("bulkPictures before", bulkPictures);


        // let _updated = _.forEach(bulkPictures, (p) => {
        let _updated = bulkPictures;

        for (let i = 0; i <= _updated.length - 1; i++) {
            _updated[i].title = fields.title;
            _updated[i].name = fields.name;
            _updated[i].description = fields.description;
            _updated[i].campaignId = fields.id;
        }

        setBulkPictures(_updated);
        // });

        console.log("updated", _updated);
        console.log("updated bulkPictures", bulkPictures);

        picturesService.createBulk(_updated)
            .then(() => {
                alertService.success('Pictures added successfully', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    // function updatePicture(id, fields, setSubmitting) {
    //     if (imageURL) {
    //         fields.url = imageURL;
    //     }
    //     picturesService.update(id, fields)
    //         .then(() => {
    //             alertService.success('Update successful', { keepAfterRouteChange: true });
    //             history.push('..');
    //         })
    //         .catch(error => {
    //             setSubmitting(false);
    //             alertService.error(error);
    //         });
    // }

    let uploadPicture = (e, type) => {
        // setIsSubmit(true);
        const reactS3Client = new S3(configObj);
        console.log("event uplaod==>", e);
        reactS3Client.uploadFile(e.target.files[0], e.target.files[0].name).then((data) => {
            // setIsSubmit(false);
            // setImageURL(data.location);
            // let _pictures = [];
            let imgObj = {
                name: '',
                title: '',
                description: '',
                alt: '',
                url: data.location,
                type: type,
                status: 'active',
                campaignId: campaignId,
                createdDate: moment().format("YYYY-MM-DD HH:mm:ss"),
                updatedDate: moment().format("YYYY-MM-DD HH:mm:ss")
            }

            // _pictures.push(imgObj);

            let _arr = bulkPictures;
            _arr.push(imgObj);
            setBulkPictures(_arr);
            // console.log("_pictures", _pictures);
            console.log("bulk pictures push=>", bulkPictures);

        }).catch(error => {
            // setIsSubmit(false);
            console.log(error);
        });
    }

    return (
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
                        campaignsService.getById(obj).then(campaign => {
                            console.log("campaign", campaign);
                            const fields = ['name', 'title', 'description', 'shortTitleDescriptionDesktop', 'shortTitleDescriptionMobile', 'shortDescriptionDesktop', 'shortDescriptionMobile', 'prizeTitleDesktop', 'prizeTitleMobile', 'whereToShow', 'sort', 'active', 'charityPartnerId', 'highlights', 'code', 'type', 'status', 'totalCoupons', 'soldCoupons', 'perEntryCoupons', 'couponPrice', 'startDate', 'drawDate'];
                            fields.forEach(field => setFieldValue(field, campaign.rows[0][field], false));
                        });
                    }
                }, []);

                return (
                    <Form>
                        <h1>{isAddMode ? 'Add Campaign' : 'Edit Campaign'}</h1>
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
                            <div className="form-group col-12">
                                <label>Highlights</label>
                                <Field name="highlights" type="text" className={'form-control' + (errors.highlights && touched.highlights ? ' is-invalid' : '')} />
                                <ErrorMessage name="highlights" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-5 m-0">
                                <label>Short Title Description</label>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-5">
                                <label>Desktop</label>
                                <Field name="shortTitleDescriptionDesktop" type="text" className={'form-control' + (errors.shortTitleDescriptionDesktop && touched.shortTitleDescriptionDesktop ? ' is-invalid' : '')} />
                                <ErrorMessage name="shortTitleDescriptionDesktop" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-5">
                                <label>Mobile</label>
                                <Field name="shortTitleDescriptionMobile" type="text" className={'form-control' + (errors.shortTitleDescriptionMobile && touched.shortTitleDescriptionMobile ? ' is-invalid' : '')} />
                                <ErrorMessage name="shortTitleDescriptionMobile" component="div" className="invalid-feedback" />
                            </div>
                            
                        </div>
                        <div className="form-row">
                            <div className="form-group col-5 m-0">
                                <label>Short Description</label>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-5">
                                <label>Desktop</label>
                                <Field name="shortDescriptionDesktop" type="text" className={'form-control' + (errors.shortDescriptionDesktop && touched.shortDescriptionDesktop ? ' is-invalid' : '')} />
                                <ErrorMessage name="shortDescriptionDesktop" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-5">
                                <label>Mobile</label>
                                <Field name="shortDescriptionMobile" type="text" className={'form-control' + (errors.shortDescriptionMobile && touched.shortDescriptionMobile ? ' is-invalid' : '')} />
                                <ErrorMessage name="shortDescriptionMobile" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        {/* <div className="form-row">
                            <div className="form-group col-5 m-0">
                                <label>Editor</label>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-5">
                                <label>Desktop</label>
                                <Field name="editorDesktop" type="text" className={'form-control' + (errors.editorDesktop && touched.editorDesktop ? ' is-invalid' : '')} />
                                <ErrorMessage name="editorDesktop" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-5">
                                <label>Mobile</label>
                                <Field name="editorMobile" type="text" className={'form-control' + (errors.editorMobile && touched.editorMobile ? ' is-invalid' : '')} />
                                <ErrorMessage name="editorMobile" component="div" className="invalid-feedback" />
                            </div>
                        </div> */}
                        <div className="form-row">
                            <div className="form-group col-5 m-0">
                                <label>Prize Title</label>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-5">
                                <label>Desktop</label>
                                <Field name="prizeTitleDesktop" type="text" className={'form-control' + (errors.prizeTitleDesktop && touched.prizeTitleDesktop ? ' is-invalid' : '')} />
                                <ErrorMessage name="prizeTitleDesktop" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-5">
                                <label>Mobile</label>
                                <Field name="prizeTitleMobile" type="text" className={'form-control' + (errors.prizeTitleMobile && touched.prizeTitleMobile ? ' is-invalid' : '')} />
                                <ErrorMessage name="prizeTitleMobile" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-5 m-0">
                                <label>Partner Name</label>
                                <Field name="charityPartnerId" component="select" className={'form-control' + (errors.charityPartnerId && touched.charityPartnerId ? ' is-invalid' : '')} >
                                    <option>Select Charity Partner</option>
                                    {charityPartners.length > 0 ?
                                        charityPartners.map((c) => {
                                            return (
                                                <option value={c.id} key={c.id}>{c.name}</option>
                                            )
                                        })

                                        :
                                        null
                                    }
                                </Field>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-4">
                                <label>Code</label>
                                <Field name="code" type="text" className={'form-control' + (errors.code && touched.code ? ' is-invalid' : '')} />
                                <ErrorMessage name="code" component="div" className="invalid-feedback" />
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
                        <div className="form-row">
                            <div className="form-group col-4">
                                <label>Active?</label>
                                <Field name="active" as="select" className={'form-control' + (errors.active && touched.active ? ' is-invalid' : '')} >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </Field>
                                <ErrorMessage name="active" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-4">
                                <label>Sort</label>
                                <Field name="sort" component="select" className={'form-control' + (errors.sort && touched.sort ? ' is-invalid' : '')} >
                                    <option value="ASC">ASC</option>
                                    <option value="DESC">DESC</option>
                                </Field>
                                <ErrorMessage name="sort" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-6">
                                <label>Category</label>
                                <Field name="whereToShow" component="select" multiple={true} className={'form-control' + (errors.whereToShow && touched.whereToShow ? ' is-invalid' : '')} >
                                    <option value="featured">Featured</option>
                                    <option value="explore">Explore</option>
                                    <option value="lifestyle">Lifestyle</option>
                                    <option value="trip">Trip</option>
                                    <option value="other">Other</option>
                                </Field>
                                <ErrorMessage name="whereToShow" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-3">
                                <label>Total Coupons</label>
                                <Field name="totalCoupons" type="text" className={'form-control' + (errors.totalCoupons && touched.totalCoupons ? ' is-invalid' : '')} />
                                <ErrorMessage name="totalCoupons" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-3">
                                <label>Sold Coupons</label>
                                <Field name="soldCoupons" type="text" className={'form-control' + (errors.soldCoupons && touched.soldCoupons ? ' is-invalid' : '')} />
                                <ErrorMessage name="soldCoupons" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-3">
                                <label>Per Entry Coupons</label>
                                <Field name="perEntryCoupons" type="text" className={'form-control' + (errors.perEntryCoupons && touched.perEntryCoupons ? ' is-invalid' : '')} />
                                <ErrorMessage name="perEntryCoupons" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-3">
                                <label>Coupon Price</label>
                                <Field name="couponPrice" type="text" className={'form-control' + (errors.couponPrice && touched.couponPrice ? ' is-invalid' : '')} />
                                <ErrorMessage name="couponPrice" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-5 m-0">
                                <label>Prize Image</label>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-5">
                                <label>Desktop Image</label>
                                <Field name="prizeDesktopImage" type="file" accept=".jpeg,.png,.mp4,.flv" onChange={(e) => uploadPicture(e, 'prizeDesktop')} className={'form-control' + (errors.prizeDesktopImage && touched.prizeDesktopImage ? ' is-invalid' : '')} />
                                <ErrorMessage name="prizeDesktopImage" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-5">
                                <label>Mobile Image</label>
                                <Field name="prizeMobileImage" type="file" accept=".jpeg,.png,.mp4,.flv" onChange={(e) => uploadPicture(e, 'prizeMobile')} className={'form-control' + (errors.prizeMobileImage && touched.prizeMobileImage ? ' is-invalid' : '')} />
                                <ErrorMessage name="prizeMobileImage" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-5 m-0">
                                <label>Product Image</label>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-5">
                                <label>Desktop Image</label>
                                <Field name="productDesktopImage" type="file" accept=".jpeg,.png,.mp4,.flv" onChange={(e) => uploadPicture(e, 'productDesktop')} className={'form-control' + (errors.productDesktopImage && touched.productDesktopImage ? ' is-invalid' : '')} />
                                <ErrorMessage name="productDesktopImage" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-5">
                                <label>Mobile Image</label>
                                <Field name="productMobileImage" type="file" accept=".jpeg,.png,.mp4,.flv" onChange={(e) => uploadPicture(e, 'productMobile')} className={'form-control' + (errors.productMobileImage && touched.productMobileImage ? ' is-invalid' : '')} />
                                <ErrorMessage name="productMobileImage" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-5 m-0">
                                <label>USP Small Banner</label>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-5">
                                <label>Desktop Image</label>
                                <Field name="uspSmallBannerDesktop" type="file" accept=".jpeg,.png,.mp4,.flv" onChange={(e) => uploadPicture(e, 'uspSmallDesktop')} className={'form-control' + (errors.uspSmallBannerDesktop && touched.uspSmallBannerDesktop ? ' is-invalid' : '')} />
                                <ErrorMessage name="uspSmallBannerDesktop" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-5">
                                <label>Mobile Image</label>
                                <Field name="uspSmallBannerMobile" type="file" accept=".jpeg,.png,.mp4,.flv" onChange={(e) => uploadPicture(e, 'uspSmallMobile')} className={'form-control' + (errors.uspSmallBannerMobile && touched.uspSmallBannerMobile ? ' is-invalid' : '')} />
                                <ErrorMessage name="uspSmallBannerMobile" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-5 m-0">
                                <label>USP Banner</label>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-5">
                                <label>Desktop Image</label>
                                <Field name="uspBannerDesktop" type="file" accept=".jpeg,.png,.mp4,.flv" onChange={(e) => uploadPicture(e, 'uspDesktop')} className={'form-control' + (errors.uspBannerDesktop && touched.uspBannerDesktop ? ' is-invalid' : '')} />
                                <ErrorMessage name="uspBannerDesktop" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-5">
                                <label>Mobile Image</label>
                                <Field name="uspBannerMobile" type="file" accept=".jpeg,.png,.mp4,.flv" onChange={(e) => uploadPicture(e, 'uspMobile')} className={'form-control' + (errors.uspBannerMobile && touched.uspBannerMobile ? ' is-invalid' : '')} />
                                <ErrorMessage name="uspBannerMobile" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-5 m-0">
                                <label>Image Gallery</label>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-5">
                                <label>Desktop Image</label>
                                <Field name="imageGalleryDesktop" type="file" accept=".jpeg,.png,.mp4,.flv" onChange={(e) => uploadPicture(e, 'galleryDesktop')} className={'form-control' + (errors.imageGalleryDesktop && touched.imageGalleryDesktop ? ' is-invalid' : '')} />
                                <ErrorMessage name="imageGalleryDesktop" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-5">
                                <label>Mobile Image</label>
                                <Field name="imageGalleryMobile" type="file" accept=".jpeg,.png,.mp4,.flv" onChange={(e) => uploadPicture(e, 'galleryMobile')} className={'form-control' + (errors.imageGalleryMobile && touched.imageGalleryMobile ? ' is-invalid' : '')} />
                                <ErrorMessage name="imageGalleryMobile" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-5">
                                <label>Start Date</label>
                                <Field name="startDate" type="datetime-local" className={'form-control' + (errors.startDate && touched.startDate ? ' is-invalid' : '')} />
                                <ErrorMessage name="startDate" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-5">
                                <label>Draw Date</label>
                                <Field name="drawDate" type="datetime-local" className={'form-control' + (errors.drawDate && touched.drawDate ? ' is-invalid' : '')} />
                                <ErrorMessage name="drawDate" component="div" className="invalid-feedback" />
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
    );
}

export { AddEdit };