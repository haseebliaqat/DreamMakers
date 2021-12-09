import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { alertService } from '@/_services';
import moment from 'moment';
import { cashAlternativesService } from '@/_services/cash-alternatives.service';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;

    const initialValues = {
        name: '',
        title: '',
        description: '',
        value: 0,
        createdDate: moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedDate: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        title: Yup.string()
            .required('Title is required'),
        description: Yup.string()
            .required('Description is required'),
        value: Yup.number()
            .required('Value is required'),

    });

    function onSubmit(fields, { setStatus, setSubmitting }) {

        setStatus();
        if (isAddMode) {
            createCashAlt(fields, setSubmitting);
        } else {
            updateCoupon(id, fields, setSubmitting);
        }
    }

    function createCashAlt(fields, setSubmitting) {
        console.log("fields", fields);
        console.log("setSubmitting", setSubmitting);
        cashAlternativesService.create(fields)
            .then(() => {
                alertService.success('Cash Alternative added successfully', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    function updateCoupon(id, fields, setSubmitting) {
        cashAlternativesService.update(id, fields)
            .then(() => {
                alertService.success('Cash Alternative Updated successfully', { keepAfterRouteChange: true });
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
                        cashAlternativesService.getById(id).then(coupon => {
                            const fields = ['name', 'title', 'description', 'value', 'createdDate', 'updatedDate'];
                            fields.forEach(field => setFieldValue(field, coupon[field], false));
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
                            <div className="form-group col-3">
                                <label>Value</label>
                                <Field name="value" type="text" className={'form-control' + (errors.value && touched.value ? ' is-invalid' : '')} />
                                <ErrorMessage name="value" component="div" className="invalid-feedback" />
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