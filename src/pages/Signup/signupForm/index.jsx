import React, { useEffect, useState } from 'react';
import './index.less';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Eye from '@/_assets/images/eye.svg';
import eyeSlash from '@/_assets/images/eye-slash-solid.svg';
import countries from '@/_assets/js/countries.json';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { CountryCodeField } from '@/_shared/CountryCodeField/CountryCodeField';
import { accountService, alertService } from '@/_services';
import { useHistory } from "react-router-dom";
import cities from '@/_assets/js/cities.json';
import { Typeahead } from 'react-bootstrap-typeahead'; 

function SignUpForm({ callback, location }) {
    const history = useHistory();
    const nationalites=countries;
    const citiess=cities;
    const [showPassword, setShowPassword] = useState(false);
    const [countryCode, setCountrycode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [city, setcity] = useState("");
    const [city_residence, setcityResidence] = useState("");
    const Country=(event)=> {
        setCountrycode(event.target.value)
    }
    // useEffect(() => {

    //     let nationalities = [];
    //     countries.map((c) => {
    //         nationalities.push({nationality: c.nationality})
    //         console.log("nationalites", JSON.stringify(nationalities));
    //     })

    // }, [])

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string().required('Password is required'),


    });

    function onSubmit(fields, { setSubmitting }) {
        alertService.clear();
        fields.title = "dear"
        console.log("fields", fields);
        console.log("setSubmitting", setSubmitting);
        accountService.create(fields).then((resp) => {
            console.log("resp"+resp);
            var email=fields.email;
            var password=fields.password;
            console.log(email);
            console.log(password);
            console.log("user")
            const { from } = { from: { pathname: "/" } };
            history.push(from);
            // onLogin(email,password);
        })
        .catch(error => {
            setSubmitting(false);
            alertService.error(error);
        });
    }

    const onLogin=( email,password )=> {
        console.log(email);
        console.log(password);
        alertService.clear();
        accountService.login(email, password).then((resp) => {
            console.log("login rsp", resp);
            if (resp.role == 'User') {
                console.log("user")
                const { from } = { from: { pathname: "/" } };
                history.push(from);
            }

        })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    return (

        <>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ errors, touched, isSubmitting }) => (
                    <Form class="signupform">
                        <div className="formCont" style={{marginTop:"-20px"}}>
                            <div className="subscription-form">
                                <Field name="title" type="text" className='form-control' value="dear"  style={{display:"none"}} />
                                <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                <span>First Name</span>
                                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="subscription-form">
                                <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                <span>Last Name</span>
                                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="subscription-form">
                                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                <span>Email</span>
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                            <div className="forminput">
                                <div className="subscription-form" >
                                    
                                    {/* <Field name="nationality" component="select" className={'form-control' + (errors.nationality && touched.nationality ? ' is-invalid' : '')} >
                                        <option>Select Nationality</option>
                                        {countries.length > 0 ?
                                            countries.map((c) => {
                                                return (
                                                    <option value={c.nationality} key={c.alpha_2_code}>{c.nationality}</option>
                                                )
                                            })

                                            :
                                            <option>Select Nationality1</option>
                                        }
                                    </Field> */}
                                     <Typeahead label="Country of Residence" 
                                    labelKey="nationality"
                                    placeHolders="Country of Residence"
                                    onChange={(selected) => {
                                       setcityResidence(selected);
                                    }}
                                    options={nationalites}
                                    selected={city_residence}
                                    placeholder="Country of Residence"
                                    inputProps={{
                                       className: 'my-custom-classname',
                                       style: {
                                          'height': "calc(1.5em + 1.75rem + 2px)",
                                       }
                                     }}
                                 />
                                    <span>Nationality</span>
                                    <ErrorMessage name="nationality" component="div" className="invalid-feedback" />
                                </div>
                                <div className="subscription-form">
                                    {/* <Field name="country" component="select" className={'form-control' + (errors.country && touched.country ? ' is-invalid' : '')} >
                                        
                                              
                                    </Field> */}
                                      <Typeahead label="City" 
                                                labelKey="city"
                                                placeHolders="City"
                                                
                                                onChange={(selected) => {
                                                setcity(selected);
                                                }}
                                                options={citiess}
                                                selected={city}
                                                placeholder="City"
                                                inputProps={{
                                                className: 'my-custom-classname',
                                                style: {
                                                    'height': "calc(1.5em + 1.75rem + 2px)",
                                                }
                                                }}
                                    />
                                    <span>Country of Residence</span>
                                    <ErrorMessage name="country" component="div" className="invalid-feedback" />
                                </div>
                            </div>
                            <div className="formSelect">
                                {/* <div> */}
                                    <Field component="div" name="gender" style={{width:"100%",border:"white"}} className={'form-control' + (errors.gender && touched.gender ? ' is-invalid' : '')}>
                                        <input
                                            type="radio"
                                            id="radioMale"
                                            // defaultChecked={values.gender === "male"}
                                            checked
                                            name="gender"
                                            value="male"
                                            style={{WebkitAppearance:"radio"}}
                                        />
                                        <span style={{marginTop:'-3px',marginRight:"20px"}}>Male</span>

                                        <input
                                            type="radio"
                                            id="radioFemale"
                                            // defaultChecked={values.gender === "female"}
                                            name="gender"
                                            value="female"
                                            style={{WebkitAppearance:"radio"}}
                                        />
                                        <span style={{marginTop:'-3px'}}>Female</span>
                                    </Field>
                                    <ErrorMessage name="gender" component="div" className="invalid-feedback" />
                                    {/* <div>
                                        <Field name="gender" type="radio" className={'form-control' + (errors.gender && touched.gender ? ' is-invalid' : '')} />
                                        <span>Male</span>
                                        <ErrorMessage name="gender" component="div" className="invalid-feedback" />
                                    </div>
                                    <div>
                                        <Field name="gender" type="radio" className={'form-control' + (errors.gender && touched.gender ? ' is-invalid' : '')} />
                                        <span>Female</span>
                                        <ErrorMessage name="gender" component="div" className="invalid-feedback" />
                                    </div> */}
                                {/* </div> */}
                            </div>
                            <div className="subscription-form">
                                <Field name="password" type={showPassword ? "text" : "password"} className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <span>Password</span>
                                <img className="eyeImg" src={showPassword ? eyeSlash : Eye} alt="Eye" onClick={() => setShowPassword(!showPassword)} />
                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="subscription-form">
                                <Field name="confirmPassword" type={showPassword ? "text" : "password"} className={'form-control' + (errors.confirmPass && touched.confirmPass ? ' is-invalid' : '')} />
                                <span>Confirm Password</span>
                                <img className="eyeImg" src={showPassword ? eyeSlash : Eye} alt="Eye" onClick={() => setShowPassword(!showPassword)} />
                                <ErrorMessage name="confirmPass" component="div" className="invalid-feedback" />
                            </div>
                            <div className="subscription-form" style={{border:"1px solid #dbdada",borderRadius:"10px",fontSize:"12px"}}>
                            <PhoneInput
                                placeholder="Enter phone number"
                                defaultCountry="US"
                                value={countryCode}
                                onChange={setCountrycode}
                                />
                                {/* <CountryCodeField label="Country Code" callback={(data, type) => {
                                    if (type == "code") {
                                        setCountrycode(data);
                                    }
                                    else {
                                        setPhoneNumber(data);
                                    }
                                    console.log("country code", data, type);
                                }} /> */}
                            </div>
                            <div className="subscription-form">
                                <Field name="invitationCode" type="text" className={'form-control' + (errors.invitationCode && touched.invitationCode ? ' is-invalid' : '')} />
                                <span>Invitation Code</span>
                                <ErrorMessage name="invitationCode" component="div" className="invalid-feedback" />
                            </div>
                            <div className="terms">
                                {/* <div> */}
                                <Field type="radio" id="acceptTerms" name="acceptTerms" value="true"    style={{WebkitAppearance:"radio"}} />
                               
                                <label className="m-0" style={{fontSize:"14px"}}>I accept the Terms & Conditions. <a href="/">Read</a></label>
                                {/* </div> */}
                            </div>
                            <button type="submit" disabled={isSubmitting} className="btn btn-default signupBtn" >
                                {isSubmitting ? <span className="spinner-border spinner-border-sm mr-1"></span> : 'Sign Up'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export { SignUpForm };