import React, { useEffect, useState, useCallback } from 'react';
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
import config from 'config';
import { v4 as randomString } from 'uuid';
// Editor section start ///
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState, convertFromHTML,convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {stateToHTML} from 'draft-js-export-html'; 
//import { convertFromHTML  } from 'draft-convert';
import DOMPurify from 'dompurify';
import draftToHtml from "draftjs-to-html";
// Editor section end ///


function AddEdit({ history, match }) {

    // Editor section start ///       
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const onEditorStateChange = (editorState) => {
        setEditorState(editorState); 
        convertContentToHTML();
    }
    const convertContentToHTML = () => {
        let body = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        campaignObj.highlights = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        setCampaignObj(campaignObj);
    }
    const createMarkup = (html) => {
        return  {
          __html: DOMPurify.sanitize(html)
        }
    }
    const jsonToHtml = (json) => {
        //let tempHtml = stateToHTML(convertFromRaw(json));
        let body = draftToHtml(json)
        return  {
          __html: body
        }
    }

    const [editorStateDescription, setEditorStateDescription] = useState(EditorState.createEmpty());
    const onEditorDescriptionStateChange = (editorStateDescription) => {
        setEditorStateDescription(editorStateDescription); 
        convertDescriptionContentToHTML();
    }
    const convertDescriptionContentToHTML = () => {
        let body = draftToHtml(convertToRaw(editorStateDescription.getCurrentContent()))
        campaignObj.description = JSON.stringify(convertToRaw(editorStateDescription.getCurrentContent()));
        setCampaignObj(campaignObj);
    }

    // Editor section end ///

    const { id } = match.params;
    const isAddMode = !id;
    // const [imageURL, setImageURL] = useState('')
    const [charityPartners, setCharityPartners] = useState([]);
    const [Category, setCategory] = useState([
        {
            "name": "Featured",
            "value": "featured",
        },
        {
            "name": "Explore",
            "value": "explore",
        },
        {
            "name": "Lifestyle",
            "value": "lifestyle",
        },
        {
            "name": "Trip",
            "value": "trip",
        },
        {
            "name": "Other",
            "value": "other",
        }
    ]);
    const [campaignId, setCampaignId] = useState(0);
    const [campaignObj, setCampaignObj] = useState(null);
    const [previousPictures, setPreviousPictures] = useState([]);

    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

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
        perEntryCoupons: 1,
        couponPrice: 0,
        startDate: '',
        drawDate: '',
        winningPrizeTitle:'',
        embedHtmlYouTube:'',
        prizePartner:'',
        createdDate: moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedDate: moment().format("YYYY-MM-DD HH:mm:ss")
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        title: Yup.string()
            .required('Title is required'),
        // description: Yup.string()
        //     .required('Description is required'),
        shortTitleDescriptionDesktop: Yup.string()
            .required('This field is required'),
            winningPrizeTitle: Yup.string()
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
        whereToShow: Yup.string()
            .required('This field is required'),
        sort: Yup.string()
            .required('This field is required'),
        charityPartnerId: Yup.string()
            .required('This field is required'),
        active: Yup.boolean()
            .required('This field is required'),
        // highlights: Yup.string()
        //     .required('Highlights is required'),
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
        fields.highlights= campaignObj.highlights;
        fields.description= campaignObj.description;
        
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
        //fields.whereToShow = (fields.whereToShow).toString();
        campaignsService.create(fields).then((resp) => {
            console.log("adding campaign", resp);
            alertService.success('Campaign added successfully', { keepAfterRouteChange: true });
            setCampaignId(resp.id);
            fields.id = resp.id;
            updateOrCreateBulkPictures(fields);

            history.push('.');
        }).catch(error => {
            setSubmitting(false);
            alertService.error(error);
        });
    }

    function updateCampaign(id, fields, setSubmitting) {
        campaignsService.update(id, fields)
            .then(() => {
                alertService.success('Update successful', { keepAfterRouteChange: true });
                setCampaignId(id);
                fields.id = id;
                updateOrCreateBulkPictures(fields);

                history.push('.');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    

    function updateOrCreateBulkPictures(fields) {
        picturesService.createBulk(previousPictures)
            .then(() => {
                alertService.success('Pictures added successfully', { keepAfterRouteChange: true });
                history.push('.');
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
        type = type ? type: 'full-size';
        category = category ? category : 'campaign-image';
        platform = platform ? platform : 'desktop';
        let status = 'active';
        let alt = 'DreamMakers';
        e.persist();
        
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
                description: `${name}-${type}-${category}-${platform}-${status}-${fileFormat}-${campaignObj.id.toString().padStart(5, '0')}`,
                campaignId: campaignObj.id,
                createdDate: moment().format("YYYY-MM-DD HH:mm:ss")
            }

            
            if(!previousPictures.some(pic => pic.name === name)){
                previousPictures.push(imgObj);
            } else {
                let idx = previousPictures.findIndex(item => item.name === name);
                imgObj.id = previousPictures[idx].id;
                imgObj.updated = moment().format("YYYY-MM-DD HH:mm:ss");
                previousPictures[idx] = imgObj;
            }
            setPreviousPictures(previousPictures);
            campaignObj[name] = data.location;
            setCampaignObj(campaignObj);
            forceUpdate();
        }).catch(error => {
            // setIsSubmit(false);
            console.log("------------err-------------");

            console.error(error);
        });
    }

    return (
        
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {
               
            ({ errors, touched, isSubmitting, setFieldValue }) => {

                useEffect(() => {
                    if (!isAddMode) {
                        campaignsService.getById(id).then(campaign => {
                            if(campaign.pictures!=null)
                            for(let i=0; i<campaign.pictures.length; i++){
                                campaign[campaign.pictures[i].name] = campaign.pictures[i].url;
                            }
                            setCampaignObj(campaign);

                           
                            if(campaign?.highlights)
                            setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(campaign?.highlights))));

                            if(campaign?.description)
                            setEditorStateDescription(EditorState.createWithContent(convertFromRaw(JSON.parse(campaign?.description))));

                            setPreviousPictures(campaign.pictures);


                            const fields = ['name', 'title', 'shortTitleDescriptionDesktop', 'shortTitleDescriptionMobile', 
                            'shortDescriptionDesktop', 'shortDescriptionMobile', 'prizeTitleDesktop', 'prizeTitleMobile', 'whereToShow',
                             'sort', 'active', 'charityPartnerId', 'code', 'type', 'status', 'totalCoupons', 'soldCoupons',
                             'perEntryCoupons','couponPrice','startDate','drawDate', 'winningPrizeTitle', 'embedHtmlYouTube','prizePartner'];

                            fields.forEach(field =>{
                                if(field == 'drawDate' || field == 'startDate'){
                                    let tempValue = moment(campaign[field]).format("YYYY-MM-DD[T]HH:mm:ss");
                                    setFieldValue(field, tempValue, false)

                                    setCampaignObj(campaignObj);
                                }
                                else if(field == 'embedHtmlYouTube'){
                                    let tempValue = campaign[field] ? campaign[field] : ''; 
                                } 
                                else{
                                    setFieldValue(field, campaign[field], false)
                                    setCampaignObj(campaign);
                                }
                            });

                        });
                    }
                }, []);

                return (
                    <Form className='admin-form'>
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
                                <Field name="code" as="select" className={'form-control' + (errors.code && touched.code ? ' is-invalid' : '')} >
                                <option value="">Select</option>
                                    
                                    <option value="EL">Electronic (EL)</option>
                                    <option value="CH">Cash (CH)</option>
                                </Field>
                                <ErrorMessage name="code" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-4">
                                <label>Type</label>
                                <Field name="type"  component="select" className={'form-control' + (errors.type && touched.type ? ' is-invalid' : '')} >
                                    {/* {
                                            Category.map((c) => {
                                                return (
                                                    <option value={c.name} key={c.name} selected="selected">{c.name}</option>
                                                )
                                            })
                                        } */}
                                    <option value="">Select</option>
                                    <option value="featured">Featured</option>
                                    <option value="explore">Explore</option>
                                    <option value="lifestyle">Lifestyle</option>
                                    <option value="trip">Trip</option>
                                    <option value="other">Other</option>
                                </Field><ErrorMessage name="type" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-4">
                                <label>Status</label>
                                <Field name="status" as="select" className={'form-control' + (errors.status && touched.status ? ' is-invalid' : '')} >
                                    <option value="">Select</option>
                                    
                                    <option value="active">Active</option>
                                    <option value="sold-out">Sold Out</option>
                                    <option value="expired">Expired</option>
                                </Field>
                                <ErrorMessage name="status" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-4">
                                <label>Active?</label>
                                <Field name="active" as="select" className={'form-control' + (errors.active && touched.active ? ' is-invalid' : '')} >
                                <option value="">Select</option>
                                    
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </Field>
                                <ErrorMessage name="active" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-4">
                                <label>Sort</label>
                                <Field name="sort" component="select" className={'form-control' + (errors.sort && touched.sort ? ' is-invalid' : '')} >
                                <option value="">Select</option>
                                    
                                    <option value="ASC">ASC</option>
                                    <option value="DESC">DESC</option>
                                </Field>
                                <ErrorMessage name="sort" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-6">
                                <label>Category</label>
                                <Field name="whereToShow"  component="select" className={'form-control' + (errors.whereToShow && touched.whereToShow ? ' is-invalid' : '')} >
                                    {/* {
                                            Category.map((c) => {
                                                return (
                                                    <option value={c.name} key={c.name} selected="selected">{c.name}</option>
                                                )
                                            })
                                        } */}
                                    <option value="">Select</option>
                                    
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
                                <label>Coupon Price</label>
                                <Field name="couponPrice" type="text" className={'form-control' + (errors.couponPrice && touched.couponPrice ? ' is-invalid' : '')} />
                                <ErrorMessage name="couponPrice" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-3">
                                <label>Sold Coupons</label>
                                <Field disabled name="soldCoupons" type="text" className={'form-control' + (errors.soldCoupons && touched.soldCoupons ? ' is-invalid' : '')} />
                                <ErrorMessage name="soldCoupons" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-3">
                                <label>Per Entry Coupons</label>
                                <Field disabled name="perEntryCoupons" type="text" className={'form-control' + (errors.perEntryCoupons && touched.perEntryCoupons ? ' is-invalid' : '')} />
                                <ErrorMessage name="perEntryCoupons" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-12">
                                <label>Winning Prize Title</label>
                                <Field name="winningPrizeTitle" type="text" className={'form-control' + (errors.winningPrizeTitle && touched.winningPrizeTitle ? ' is-invalid' : '')} />
                                <ErrorMessage name="winningPrizeTitle" component="div" className="invalid-feedback" />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group col-12">
                                <label>Youtube Live Video Embed URL</label>
                                <Field name="embedHtmlYouTube" rows="4" cols="40"  as="textarea" className={'form-control' + (errors.embedHtmlYouTube && touched.embedHtmlYouTube ? ' is-invalid' : '')} />
                                <ErrorMessage name="embedHtmlYouTube" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-12">
                                <label>Prize Partner</label>
                                <Field name="prizePartner" rows="4" cols="40"  as="textarea" className={'form-control' + (errors.prizePartner && touched.prizePartner ? ' is-invalid' : '')} />
                                <ErrorMessage name="prizePartner" component="div" className="invalid-feedback" />
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
                                <Field name="drawDate" type="datetime-local" className={'form-control' + (errors.drawDate && touched.drawDate ? ' is-invalid' : '')}  />
                                <ErrorMessage name="drawDate" component="div" className="invalid-feedback" />
                            </div>
                        </div>


                        



                        
                        <div id='multiCollapisblesDiv'>
                        <div className='form-row'>
                        <div className="form-group col-2">

                            <button type="button" className="btn btn-info" data-toggle="collapse"  aria-expanded="false" data-target="#desktopImagesDiv" aria-controls="#desktopImagesDiv">Desktop Images</button>
                            </div>
                            <div className="form-group col-2">
                            <button type="button" className="btn btn-info" data-toggle="collapse"  aria-expanded="false" data-target="#mobileImagesDiv" aria-controls="#mobileImagesDiv">Mobile Images</button>
                            </div>
                            <div className="form-group col-2">
                            <button type="button" className="btn btn-info" data-toggle="collapse"  aria-expanded="false" data-target="#galleryImagesDiv" aria-controls="#galleryImagesDiv">Gallery Images</button>
                            </div>
                            <div className="form-group col-2">
                            <button type="button" className="btn btn-info"  data-toggle="collapse"  aria-expanded="false" data-target="#descriptionDiv" aria-controls="#descriptionDiv">Description</button>
                            </div>
                            <div className="form-group col-2">
                            <button type="button" className="btn btn-info" data-toggle="collapse"  aria-expanded="false" data-target="#highlightsDiv" aria-controls="#highlightsDiv">Highlights</button>

                            </div>
                        </div>
                        <div id='desktopImagesDiv' className='formSectionAdmin collapse multi-collapse' data-parent="#multiCollapisblesDiv" data-role="collapsible" data-theme="a" data-content-theme="a">
                            <div>
                                <label><strong>Desktop Images</strong></label>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-5">
                                    <label>Prize</label>
                                    <Field name="prizeDesktopImage" type="file" accept=".jpeg,.png,.mp4,.flv" onChange={(e) => uploadPicture(e, 'prizeDesktopImage')} className={'form-control' + (errors.prizeDesktopImage && touched.prizeDesktopImage ? ' is-invalid' : '')} />
                                    <ErrorMessage name="prizeDesktopImage" component="div" className="invalid-feedback" />
                                    <img src={campaignObj?.prizeDesktopImage} alt="icon" style={{height:"200px",marginTop:"10px", width:"100%"}}/>
                                </div>
                                <div className="form-group col-4">
                                    <label>Product</label>
                                    <Field name="productDesktopImage" type="file" accept=".jpeg,.png,.mp4,.flv" onChange={(e) => uploadPicture(e, 'productDesktopImage')} className={'form-control' + (errors.productDesktopImage && touched.productDesktopImage ? ' is-invalid' : '')} />
                                    <ErrorMessage name="productDesktopImage" component="div" className="invalid-feedback" />
                                    <img src={campaignObj?.productDesktopImage} alt="icon" style={{height:"200px",marginTop:"10px", width:"100%"}}/>
                                </div>
                                <div className="form-group col-3 m-0">
                                    <label>USP (small)</label>
                                    <Field name="uspBannerDesktopImage" type="file" accept=".jpeg,.png,.mp4,.flv" onChange={(e) => uploadPicture(e, 'uspBannerDesktopImage')} className={'form-control' + (errors.uspSmallBannerDesktop && touched.uspSmallBannerDesktop ? ' is-invalid' : '')} />
                                    <ErrorMessage name="uspBannerDesktopImage" component="div" className="invalid-feedback" />
    
                                    <img src={campaignObj?.uspBannerDesktopImage} alt="icon" style={{height:"200px",marginTop:"10px", width:"100%"}}/>
                                </div>
                            </div>
                        </div>
                        
                        <div id='mobileImagesDiv' className='formSectionAdmin collapse multi-collapse' data-parent="#multiCollapisblesDiv">
                            <div>
                                <label><strong>Mobile Images</strong></label>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-4">
                                    <label>Prize</label>
                                    <Field name="prizeMobileImage" type="file" accept=".jpeg,.png,.mp4,.flv" onChange={(e) => uploadPicture(e, 'prizeMobileImage')} className={'form-control' + (errors.prizeMobileImage && touched.prizeMobileImage ? ' is-invalid' : '')} />
                                    <ErrorMessage name="prizeMobileImage" component="div" className="invalid-feedback" />
                                    <img src={campaignObj?.prizeMobileImage} alt="icon" style={{height:"200px",marginTop:"10px", width:"100%"}}/>
                                </div>
                                <div className="form-group col-4">
                                    <label>Product</label>
                                    <Field name="productMobileImage" type="file" accept=".jpeg,.png,.mp4,.flv" onChange={(e) => uploadPicture(e, 'productMobileImage')} className={'form-control' + (errors.productMobileImage && touched.productMobileImage ? ' is-invalid' : '')} />
                                    <ErrorMessage name="productMobileImage" component="div" className="invalid-feedback" />
                                    <img src={campaignObj?.productMobileImage} alt="icon" style={{height:"200px",marginTop:"10px", width:"100%"}}/>
                                </div>
                                <div className="form-group col-4">
                                    <label>Popup</label>
                                    <Field name="productImageMobilePopup" type="file" accept=".jpeg,.png,.mp4,.flv" onChange={(e) => uploadPicture(e, 'productImageMobilePopup')} className={'form-control' + (errors.productImageMobilePopup && touched.productImageMobilePopup ? ' is-invalid' : '')} />
                                    <ErrorMessage name="productImageMobilePopup" component="div" className="invalid-feedback" />
                                    <img src={campaignObj?.productImageMobilePopup} alt="icon" style={{height:"200px",marginTop:"10px", width:"100%"}}/>
                                </div>
                            </div>
                        </div>


                        <div id='galleryImagesDiv' className='formSectionAdmin collapse multi-collapse' data-parent="#multiCollapisblesDiv">
                            <div>
                                <label><strong>Product Gallery</strong></label>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-4">
                                    <label>Frist</label>

                                    <Field name="imageGalleryFirst" type="file" accept=".jpeg,.png,.mp4,.flv" onChange={(e) => uploadPicture(e, 'imageGalleryFirst', 'campaign-image-gallery')} className={'form-control' + (errors.imageGalleryFirst && touched.imageGalleryFirst ? ' is-invalid' : '')} />

                                    <ErrorMessage name="imageGalleryFirst" component="div" className="invalid-feedback" />
                                    <img src={campaignObj?.imageGalleryFirst} alt="icon" style={{height:"200px",marginTop:"10px", width:"100%"}}/>
                                </div>
                                <div className="form-group col-4">
                                    <label>Second</label>

                                    <Field name="imageGallerySecond" type="file" accept=".jpeg,.png,.mp4,.flv" onChange={(e) => uploadPicture(e, 'imageGallerySecond', 'campaign-image-gallery')} className={'form-control' + (errors.imageGallerySecond && touched.imageGallerySecond ? ' is-invalid' : '')} />

                                    <ErrorMessage name="imageGallerySecond" component="div" className="invalid-feedback" />
                                    <img src={campaignObj?.imageGallerySecond} alt="icon" style={{height:"200px",marginTop:"10px", width:"100%"}}/>
                                </div>
                                <div className="form-group col-4">
                                    <label>Third</label>

                                    <Field name="imageGalleryThird" type="file" accept=".jpeg,.png,.mp4,.flv" onChange={(e) => uploadPicture(e, 'imageGalleryThird', 'campaign-image-gallery')} className={'form-control' + (errors.imageGalleryThird && touched.imageGalleryThird ? ' is-invalid' : '')} />

                                    <ErrorMessage name="imageGalleryThird" component="div" className="invalid-feedback" />
                                    <img src={campaignObj?.imageGalleryThird} alt="icon" style={{height:"200px",marginTop:"10px", width:"100%"}}/>
                                </div>
                                <div className="form-group col-4">
                                    <label>Fourth</label>

                                    <Field name="imageGalleryFourth" type="file" accept=".jpeg,.png,.mp4,.flv" onChange={(e) => uploadPicture(e, 'imageGalleryFourth', 'campaign-image-gallery')} className={'form-control' + (errors.imageGalleryFourth && touched.imageGalleryFourth ? ' is-invalid' : '')} />

                                    <ErrorMessage name="imageGalleryFourth" component="div" className="invalid-feedback" />
                                    <img src={campaignObj?.imageGalleryFourth} alt="icon" style={{height:"200px",marginTop:"10px", width:"100%"}}/>
                                </div>
                                <div className="form-group col-4">
                                    <label>Fifth</label>

                                    <Field name="imageGalleryFifth" type="file" accept=".jpeg,.png,.mp4,.flv" onChange={(e) => uploadPicture(e, 'imageGalleryFifth', 'campaign-image-gallery')} className={'form-control' + (errors.imageGalleryFifth && touched.imageGalleryFifth ? ' is-invalid' : '')} />

                                    <ErrorMessage name="imageGalleryFifth" component="div" className="invalid-feedback" />
                                    <img src={campaignObj?.imageGalleryFifth} alt="icon" style={{height:"200px",marginTop:"10px", width:"100%"}}/>
                                </div>     
                                <div className="form-group col-4">
                                    <label>Sixth</label>

                                    <Field name="imageGallerySixth" type="file" accept=".jpeg,.png,.mp4,.flv" onChange={(e) => uploadPicture(e, 'imageGallerySixth', 'campaign-image-gallery')} className={'form-control' + (errors.imageGallerySixth && touched.imageGallerySixth ? ' is-invalid' : '')} />

                                    <ErrorMessage name="imageGallerySixth" component="div" className="invalid-feedback" />
                                    <img src={campaignObj?.imageGallerySixth} alt="icon" style={{height:"200px",marginTop:"10px", width:"100%"}}/>
                                </div>
                                <div className="form-group col-4">
                                    <label>Seventh</label>

                                    <Field name="imageGallerySeventh" type="file" accept=".jpeg,.png,.mp4,.flv" onChange={(e) => uploadPicture(e, 'imageGallerySeventh', 'campaign-image-gallery')} className={'form-control' + (errors.imageGallerySeventh && touched.imageGallerySeventh ? ' is-invalid' : '')} />

                                    <ErrorMessage name="imageGallerySeventh" component="div" className="invalid-feedback" />
                                    <img src={campaignObj?.imageGallerySeventh} alt="icon" style={{height:"200px",marginTop:"10px", width:"100%"}}/>
                                </div>
                                <div className="form-group col-4">
                                    <label>Eighth</label>

                                    <Field name="imageGalleryEighth" type="file" accept=".jpeg,.png,.mp4,.flv" onChange={(e) => uploadPicture(e, 'imageGalleryEighth', 'campaign-image-gallery')} className={'form-control' + (errors.imageGalleryEighth && touched.imageGalleryEighth ? ' is-invalid' : '')} />

                                    <ErrorMessage name="imageGalleryEighth" component="div" className="invalid-feedback" />
                                    <img src={campaignObj?.imageGalleryEighth} alt="icon" style={{height:"200px",marginTop:"10px", width:"100%"}}/>
                                </div> 
                                <div className="form-group col-4">
                                    <label>Ninth</label>

                                    <Field name="imageGalleryNinth" type="file" accept=".jpeg,.png,.mp4,.flv" onChange={(e) => uploadPicture(e, 'imageGalleryNinth', 'campaign-image-gallery')} className={'form-control' + (errors.imageGalleryNinth && touched.imageGalleryNinth ? ' is-invalid' : '')} />

                                    <ErrorMessage name="imageGalleryNinth" component="div" className="invalid-feedback" />
                                    <img src={campaignObj?.imageGalleryNinth} alt="icon" style={{height:"200px",marginTop:"10px", width:"100%"}}/>
                                </div>
                            </div>
                        </div>
                        
                        <div id='highlightsDiv' className="form-row collapse multi-collapse" data-parent="#multiCollapisblesDiv">
                            <div className="form-group col-12">
                            <label>Highlights</label>
                                <Editor
                                            editorState={editorState}
                                            toolbarClassName="editorToolbar"
                                            wrapperClassName="editorWrapper"
                                            editorClassName="editor"
                                            onEditorStateChange= {onEditorStateChange}
                                            />
                                        {/* {
                                            campaignObj?.highlights ? <div className="preview" dangerouslySetInnerHTML={jsonToHtml(JSON.parse(campaignObj?.highlights))}></div> : null
                                        } */}
                            </div>
                        </div>

                        <div id='descriptionDiv' className="form-row collapse multi-collapse"  data-parent="#multiCollapisblesDiv">
                            <div className="form-group col-12">
                            <label>Description</label>
                                <Editor
                                            editorState={editorStateDescription}
                                            toolbarClassName="editorToolbar"
                                            wrapperClassName="editorWrapper"
                                            editorClassName="editor"
                                            onEditorStateChange= {onEditorDescriptionStateChange}
                                            />
                                        {/* {
                                            campaignObj?.highlights ? <div className="preview" dangerouslySetInnerHTML={jsonToHtml(JSON.parse(campaignObj?.highlights))}></div> : null
                                        } */}
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
                
                
                }
            }
        </Formik>
        
    );
}

export { AddEdit };