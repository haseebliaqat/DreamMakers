import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { alertService } from '@/_services';
import moment from 'moment';
import { charityPartnersService } from '@/_services/charity-partners.service';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;

    const initialValues = {
        name: '',
        description: '',
        country: '',
        vision: '',
        fundRaised: 0,
        createdDate: moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedDate: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        country: Yup.string()
            .required('Title is required'),
        description: Yup.string()
            .required('Description is required'),
        vision: Yup.string()
            .required('Vision is required'),
        fundRaised: Yup.number()
            .required('Amount Raised is required'),

    });

    function onSubmit(fields, { setStatus, setSubmitting }) {

        setStatus();
        if (isAddMode) {
            createCharityPartner(fields, setSubmitting);
        } else {
            updateCoupon(id, fields, setSubmitting);
        }
    }

    function createCharityPartner(fields, setSubmitting) {
        console.log("fields", fields);
        console.log("setSubmitting", setSubmitting);
        charityPartnersService.create(fields)
            .then(() => {
                alertService.success('Charity Partner added successfully', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    function updateCoupon(id, fields, setSubmitting) {
        charityPartnersService.update(id, fields)
            .then(() => {
                alertService.success('Charity Partner Updated successfully', { keepAfterRouteChange: true });
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
                        charityPartnersService.getById(id).then(coupon => {
                            const fields = ['name', 'description', 'country', 'vision', 'fundRaised', 'createdDate', 'updatedDate'];
                            fields.forEach(field => setFieldValue(field, coupon[field], false));
                        });
                    }
                }, []);

                return (
                    <Form>
                        <h1>{isAddMode ? 'Add Charity Partner' : 'Edit Charity Partner'}</h1>
                        <div className="form-row">
                            <div className="form-group col-5">
                                <label>Name</label>
                                <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                <ErrorMessage name="name" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-5">
                                <label>Country</label>
                                <Field name="country" type="text" className={'form-control' + (errors.country && touched.country ? ' is-invalid' : '')} />
                                <ErrorMessage name="country" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-12">
                                <label>Description</label>
                                <Field name="description" type="text" className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')} />
                                <ErrorMessage name="description" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-12">
                                <label>Vision</label>
                                <Field name="vision" type="text" className={'form-control' + (errors.vision && touched.vision ? ' is-invalid' : '')} />
                                <ErrorMessage name="vision" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-3">
                                <label>Amount Raised</label>
                                <Field name="fundRaised" type="text" className={'form-control' + (errors.fundRaised && touched.fundRaised ? ' is-invalid' : '')} />
                                <ErrorMessage name="fundRaised" component="div" className="invalid-feedback" />
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
                                <Field name="sort" type="number" className={'form-control' + (errors.sort && touched.sort ? ' is-invalid' : '')} />
                                <ErrorMessage name="sort" component="div" className="invalid-feedback" />
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