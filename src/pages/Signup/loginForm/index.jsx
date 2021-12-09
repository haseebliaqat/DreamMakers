import React from 'react';
import './index.less';
import Eye from '@/_assets/images/eye.svg';
import { GoogleLoginButton } from '../../../_shared/google-login-button/google-login-button';
import { FacebookLoginButton } from '../../../_shared/facebook-login-button/facebook-login-button';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { accountService, alertService } from '@/_services';

function LoginForm({ callback, history, location }) {

    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    function onSubmit({ email, password }, { setSubmitting }) {
        alertService.clear();
        accountService.login(email, password).then((resp) => {
            console.log("login rsp", resp);

            if (resp.role == 'Admin') {
                console.log("admin", history, location)

                const { from } = location.state || { from: { pathname: "/admin" } };
                history.push(from);
            }
            else if (resp.role == 'User') {
                console.log("user")

                const { from } = location.state || { from: { pathname: "/" } };
                history.push(from);
            }

        })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => (
                <Form >
                    <div className="formCont LoginCont">
                        <div className="subscription-form">
                            <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                            {/* <input className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} type="email" name="email" /> */}
                            <span>Email / Phone Number</span>
                            <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </div>
                        <div className="subscription-form">
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            {/* <input className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} name="password" type="password" /> */}
                            <span>Password</span>
                            <img className="eyeImg" src={Eye} alt="Eye" />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="forgotBox">
                            <div className="remember-me">
                                <input type="radio" name="fav_language" value="CSS" />
                                <label>Remember Me</label>
                            </div>
                            <div>
                                <a href="/">Forgot Password</a>
                            </div>
                        </div>
                        <button type="submit" disabled={isSubmitting} className="btn btn-default signupBtn LoginBtn" >
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Log In
                        </button>
                    </div>

                    <div className="LoginWith">
                        <GoogleLoginButton mblStyle='' />
                        <FacebookLoginButton mblStyle='' />

                    </div>
                </Form>
            )}
        </Formik>
    );
}

export { LoginForm };