import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { alertService } from '@/_services';
import { popupService } from '@/_services/popups.service';
import moment from 'moment';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;

    const initialValues = {
        name: '',
        title: '',
        description: '',
        highlights: '',
        link: '',
        status: '',
        startDate: '2020-06-24 22:57:36',
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
        highlights: Yup.string()
            .required('Highlights is required'),
        link: Yup.string()
            .required('Link is required'),
        status: Yup.string()
            .required('Status is required'),
        startDate: Yup.string()
            .required('Start Date is required')

    });

    function onSubmit(fields, { setStatus, setSubmitting }) {

        setStatus();
        if (isAddMode) {
            createPopup(fields, setSubmitting);
        } else {
            updatePopup(id, fields, setSubmitting);
        }
    }

    function createPopup(fields, setSubmitting) {
        console.log("fields", fields);
        console.log("setSubmitting", setSubmitting);
        popupService.create(fields)
            .then(() => {
                alertService.success('Popup added successfully', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    function updatePopup(id, fields, setSubmitting) {
        popupService.update(id, fields)
            .then(() => {
                alertService.success('Update successful', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting, setFieldValue }) => {
                useEffect(() => {
                    if (!isAddMode) {
                        // get user and set form fields
                        popupService.getById(id).then(popup => {
                            const fields = ['name', 'title', 'description', 'highlights', 'link', 'status', 'startDate'];
                            fields.forEach(field => setFieldValue(field, popup[field], false));
                        });
                    }
                }, []);

                return (
                    <Form>
                        <h1>{isAddMode ? 'Add Popup' : 'Edit Popup'}</h1>
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
                            <div className="form-group col-4">
                                <label>Link</label>
                                <Field name="link" type="text" className={'form-control' + (errors.link && touched.link ? ' is-invalid' : '')} />
                                <ErrorMessage name="link" component="div" className="invalid-feedback" />
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
                            <div className="form-group col-5">
                                <label>Image</label>
                                <Field name="image" type="file" accept=".jpeg,.png,.mp4,.flv" className={'form-control' + (errors.image && touched.image ? ' is-invalid' : '')} />
                                <ErrorMessage name="image" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-5">
                                <label>Start Date</label>
                                <Field name="startDate" type="datetime-local" className={'form-control' + (errors.startDate && touched.startDate ? ' is-invalid' : '')} />
                                <ErrorMessage name="startDate" component="div" className="invalid-feedback" />
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