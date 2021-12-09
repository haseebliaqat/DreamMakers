import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { alertService } from '@/_services';
import moment from 'moment';
import { purchasesService } from '@/_services/purchases.service';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;

    const initialValues = {
        dreamCoinsUsed: 0,
        currencyUsed: 0,
        paidAmount: 0,
        createdDate: moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedDate: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    const validationSchema = Yup.object().shape({
        dreamCoinsUsed: Yup.number()
            .required('Dreams Coins Used is required'),
        currencyUsed: Yup.number()
            .required('Currency Used is required'),
        paidAmount: Yup.number()
            .required('Paid Amount is required')

    });

    function onSubmit(fields, { setStatus, setSubmitting }) {

        setStatus();
        if (isAddMode) {
            createPurchase(fields, setSubmitting);
        } else {
            updatePurchase(id, fields, setSubmitting);
        }
    }

    function createPurchase(fields, setSubmitting) {
        purchasesService.create(fields)
            .then(() => {
                alertService.success('Purchase added successfully', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    function updatePurchase(id, fields, setSubmitting) {
        purchasesService.update(id, fields)
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
                        purchasesService.getById(id).then(coupon => {
                            const fields = ['dreamCoinsUsed', 'currencyUsed', 'paidAmount', 'createdDate', 'updatedDate'];
                            fields.forEach(field => setFieldValue(field, coupon[field], false));
                        });
                    }
                }, []);

                return (
                    <Form>
                        <h1>{isAddMode ? 'Add Purchase' : 'Edit Purchase'}</h1>
                        <div className="form-row">
                            <div className="form-group col-5">
                                <label>Dream Coins Used</label>
                                <Field name="dreamCoinsUsed" type="text" className={'form-control' + (errors.dreamCoinsUsed && touched.dreamCoinsUsed ? ' is-invalid' : '')} />
                                <ErrorMessage name="dreamCoinsUsed" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group col-5">
                                <label>Currency Used</label>
                                <Field name="currencyUsed" type="text" className={'form-control' + (errors.currencyUsed && touched.currencyUsed ? ' is-invalid' : '')} />
                                <ErrorMessage name="currencyUsed" component="div" className="invalid-feedback" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-3">
                                <label>Paid Amount</label>
                                <Field name="paidAmount" type="text" className={'form-control' + (errors.paidAmount && touched.paidAmount ? ' is-invalid' : '')} />
                                <ErrorMessage name="paidAmount" component="div" className="invalid-feedback" />
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