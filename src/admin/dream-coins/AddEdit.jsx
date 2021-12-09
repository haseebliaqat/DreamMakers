import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { alertService } from '@/_services';
import moment from 'moment';
import { dreamCoinsService } from '@/_services/dream-coins.service';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;

    const initialValues = {
        balance: '',
        // currencyValue: 0,
        createdDate: moment().format("YYYY-MM-DD HH:mm:ss"),
        updatedDate: moment().format("YYYY-MM-DD HH:mm:ss"),
    };

    const validationSchema = Yup.object().shape({
        balance: Yup.string()
            .required('Balance is required'),
        // currencyValue: Yup.number()
        //     .required('Currency Value is required')

    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        if (isAddMode) {
            createDreamCoin(fields, setSubmitting);
        } else {
            updateDreamCoin(id, fields, setSubmitting);
        }
    }

    function createDreamCoin(fields, setSubmitting) {
        console.log("fields", fields);
        console.log("setSubmitting", setSubmitting);
        dreamCoinsService.create(fields)
            .then(() => {
                alertService.success('Dream Coin added successfully', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    function updateDreamCoin(id, fields, setSubmitting) {
        dreamCoinsService.update(id, fields)
            .then(() => {
                alertService.success('Dream Coin Updated successful', { keepAfterRouteChange: true });
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
                        dreamCoinsService.getById(id).then(coupon => {
                            const fields = ['balance', 'createdDate', 'updatedDate'];
                            fields.forEach(field => setFieldValue(field, coupon[field], false));
                        });
                    }
                }, []);

                return (
                    <Form>
                        <h1>{isAddMode ? 'Add Dream Coin' : 'Edit Dream Coin'}</h1>
                        <div className="form-row">
                            <div className="form-group col-5">
                                <label>Balance</label>
                                <Field name="balance" type="text" className={'form-control' + (errors.balance && touched.balance ? ' is-invalid' : '')} />
                                <ErrorMessage name="balance" component="div" className="invalid-feedback" />
                            </div>
                            {/* <div className="form-group col-5">
                                <label>Currency Value</label>
                                <Field name="currencyValue" type="text" className={'form-control' + (errors.currencyValue && touched.currencyValue ? ' is-invalid' : '')} />
                                <ErrorMessage name="currencyValue" component="div" className="invalid-feedback" />
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