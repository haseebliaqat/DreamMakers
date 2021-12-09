import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { alertService } from '@/_services';
import moment from 'moment';
import { tagsService } from '@/_services/tags.service';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;

    const initialValues = {
        name: '',
        priority: 0,
        type: '',
        status: '',
        startDate: "2020-06-24 22:57:36",
        endDate: "2020-06-24 22:57:36",
        createdDate: moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedDate: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        priority: Yup.number()
            .required('Priority is required'),
        type: Yup.string()
            .required('Type is required'),
        status: Yup.string()
            .required('Status is required'),
        startDate: Yup.date()
            .required('Start Date is required'),
        endDate: Yup.date()
            .required('End Date is required'),

    });

    function onSubmit(fields, { setStatus, setSubmitting }) {

        setStatus();
        if (isAddMode) {
            createTag(fields, setSubmitting);
        } else {
            updateTag(id, fields, setSubmitting);
        }
    }

    function createTag(fields, setSubmitting) {
        tagsService.create(fields)
            .then(() => {
                alertService.success('Tag added successfully', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    function updateTag(id, fields, setSubmitting) {
        tagsService.update(id, fields)
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
                        tagsService.getById(id).then(tag => {
                            const fields = ['name', 'priority', 'type', 'status', 'startDate', 'endDate', 'createdDate', 'updatedDate'];
                            fields.forEach(field => setFieldValue(field, tag[field], false));
                        });
                    }
                }, []);

                return (
                    <Form>
                        <h1>{isAddMode ? 'Add Tag' : 'Edit Tag'}</h1>
                        <div className="form-row">
                            <div className="form-group col-5">
                                <label>Name</label>
                                <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                <ErrorMessage name="name" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-5">
                                <label>Priority</label>
                                <Field name="priority" type="text" className={'form-control' + (errors.priority && touched.priority ? ' is-invalid' : '')} />
                                <ErrorMessage name="priority" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-3">
                                <label>Type</label>
                                <Field name="type" type="text" className={'form-control' + (errors.type && touched.type ? ' is-invalid' : '')} />
                                <ErrorMessage name="type" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-3">
                                <label>Status</label>
                                <Field name="status" type="text" className={'form-control' + (errors.status && touched.status ? ' is-invalid' : '')} />
                                <ErrorMessage name="status" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-5">
                                <label>Start Date</label>
                                <Field name="startDate" type="datetime-local" className={'form-control' + (errors.startDate && touched.startDate ? ' is-invalid' : '')} />
                                <ErrorMessage name="startDate" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-5">
                                <label>End Date</label>
                                <Field name="endDate" type="datetime-local" className={'form-control' + (errors.endDate && touched.endDate ? ' is-invalid' : '')} />
                                <ErrorMessage name="endDate" component="div" className="invalid-feedback" />
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