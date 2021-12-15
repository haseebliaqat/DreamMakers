
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { accountService, alertService } from '@/_services';
import '@/pages/Signup/Signup.less';
import '@/home/index.less';
import Eye from '@/_assets/images/eye.svg';
import eyeSlash from '@/_assets/images/eye-slash-solid.svg';
import PhoneInput from 'react-phone-input-2'
import Slider from "react-slick";
import sliderImg from '@/_assets/images/sliderImg.png';
import sliderImg2 from '@/_assets/images/sliderImg2.png';
import sliderImg3 from '@/_assets/images/sliderImg3.png';
import sliderImg4 from '@/_assets/images/sliderImg4.png';
import sliderImg5 from '@/_assets/images/sliderImg5.png';
import logo from '@/_assets/images/dream-maker-logo.svg';
import backIcon from '@/_assets/images/back-btn.svg';
import keyIcon from '@/_assets/images/key-icon.svg';
import verifyIcon from '@/_assets/images/verify-icon.svg';
import { SignUpForm } from '@/pages/Signup/signupForm';
import { LoginForm } from '@/pages/Signup/loginForm';
import { GoogleLoginButton } from '@/_shared/google-login-button/google-login-button';
import { FacebookLoginButton } from '@/_shared/facebook-login-button/facebook-login-button';
import { AppleLoginButton } from '@/_shared/apple-login-button/apple-login-button';
import PinInput from 'react-pin-input';
import { Alert } from '@/_components';
import {LoginGoogle} from '@/account/LoginGoogle';
import {LoginFacebook} from '@/account/LoginFacebook';
import {LoginApple} from '@/account/LoginApple';
import { useHistory } from "react-router-dom";

function Login({ location}) {
    const history = useHistory();
    const [isWelcomeScreen, setIsWelcomeScreen] = useState(true);
    const [isSignUpForm, setIsSignUpForm] = useState(false);
    const [isLoginForm, setIsLoginForm] = useState(false);
    const [isVerifyLogin, setIsVerifyLogin] = useState(false);
    const [isVerifyNumber, setIsVerifyNumber] = useState(false);
    const [OTPCode, setOTPCode] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showsafaributton, setShowSafariButton] = useState(false);
 
    
  //const [viewValue, setViewValue] = useState(props.match.params.id || "");
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 500,
        autoplay: true,
    };

    let toggleScreen = (type) => {
        if (type == 'login') {
            setIsWelcomeScreen(false);
            setIsLoginForm(true)
            setIsSignUpForm(false);
            setIsVerifyNumber(false);
            setIsVerifyLogin(false);
        }
        else if (type == 'signup') {
            setIsWelcomeScreen(false);
            setIsLoginForm(false)
            setIsSignUpForm(true);
            setIsVerifyNumber(false);
            setIsVerifyLogin(false);
        }
        else if (type == 'verify-screen') {
            setIsWelcomeScreen(false);
            setIsLoginForm(false)
            setIsSignUpForm(false);
            setIsVerifyNumber(true);
            setIsVerifyLogin(false);
        }
        else if (type == 'verify-otp') {
            setIsWelcomeScreen(false);
            setIsLoginForm(false)
            setIsSignUpForm(false);
            setIsVerifyNumber(false);
            setIsVerifyLogin(true);
        }
        else {
            setIsWelcomeScreen(true);
            setIsLoginForm(false)
            setIsSignUpForm(false);
            setIsVerifyNumber(false);
            setIsVerifyLogin(false);
        }
    }

    const initialValues = {
        email: '',
        password: ''
    };

    useEffect(() => {
        console.log("history");
        var browser = (function() {
            var test = function(regexp) {return regexp.test(window.navigator.userAgent)}
            switch (true) {
                case test(/chrome|chromium|crios/i): return "Google Chrome";
                case test(/safari/i): return "Apple Safari";
                default: return "Other";
            }
        })();
        console.log(browser)
        if(browser=="Apple Safari"){
            setShowSafariButton(false);  
        }else{
            console.log("false "+ browser );
        }
        console.log(history);
        console.log(location);
        console.log(location.state);
        if(location.state!=undefined){
        if(location.state.id==6){
            localStorage.setItem("userDetails","");
            localStorage.setItem("SeletedCampaign","");
            localStorage.setItem("selected_campaign_value","");
            localStorage.setItem("dream_coins","");
            localStorage.setItem("user","");
            console.log("hello")
           localStorage.clear();
        }

    }
      // alert(viewValue);
    }, []);
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    function onSubmit({ email, password }, { setSubmitting }) {
        alertService.clear();
        accountService.login(email, password).then((resp) => {
            console.log("resp", resp);
            
            console.log("haseeb");
            console.log(location.state);
            if (resp.role == 'Admin') {
                const { from } = { from: { pathname: "/admin" } };
                history.push(from);
            }
            else if (resp.role == 'User') {
                localStorage.setItem("user",resp.role);
                localStorage.setItem("userDetails",JSON.stringify(resp));
               
               const { from } =  { from: { pathname: "/" } };
                history.push(from);
            }

        }).catch(error => {
            setSubmitting(false);
            alertService.error("Email or password is incorrect.");
        });
    }

    let togglePassword = () => {

    }
    const responseFacebook = (response) => {
        console.log(response);
      }
    return (
        <>
            <div className="container-fluid p-0 m-none">
                <div className="header-bar">
                    <Link to='/home'>
                        <img src={logo} alt="Dream Makers" className="appbar-logo"  style={{height:"42px"}} />
                    </Link>
                </div>
                <div className="container">
                    <div className="row">
                    <Alert />
                        <div className="col-md-7 m-none">
                            {/* Signup Slider */}
                            <div className="signUpSlider">
                                <h1>Our Previous Winners</h1>
                                <Slider {...settings}>
                                    <div>
                                        <img src={sliderImg} />
                                        <div className="slide__caption">
                                            <h3>Kate J.</h3>
                                            <p>Won Sky diving at Abu Dhabi</p>
                                        </div>
                                    </div>
                                    <div>
                                        <img src={sliderImg2} />
                                        <div className="slide__caption">
                                            <h3>Kate J.</h3>
                                            <p>Won Sky diving at Abu Dhabi</p>
                                        </div>
                                    </div>
                                    <div>
                                        <img src={sliderImg3} />
                                        <div className="slide__caption">
                                            <h3>Kate J.</h3>
                                            <p>Won Sky diving at Abu Dhabi</p>
                                        </div>
                                    </div>
                                    <div>
                                        <img src={sliderImg4} />
                                        <div className="slide__caption">
                                            <h3>Kate J.</h3>
                                            <p>Won Sky diving at Abu Dhabi</p>
                                        </div>
                                    </div>
                                    <div>
                                        <img src={sliderImg5} />
                                        <div className="slide__caption">
                                            <h3>Kate J.</h3>
                                            <p>Won Sky diving at Abu Dhabi</p>
                                        </div>
                                    </div>
                                </Slider>
                            </div>
                            {/* Signup Slider */}
                        </div>
                        <div className="col-md-5">
                            <div className="SignupForm">
                                <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Sign Up</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Log In</a>
                                    </li>
                                </ul>
                                <div className="SignUpBox">
                                    <div className="tab-content" id="pills-tabContent">
                                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                            <SignUpForm callback={(phoneNumber) => { }} />

                                        </div>
                                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">

                                            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                                                {({ errors, touched, isSubmitting }) => (
                                                    <Form className="loginform">
                                                        <div className="formCont LoginCont">
                                                            <div className="subscription-form">
                                                                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                                                <span>Email / Phone Number</span>
                                                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                                            </div>
                                                            <div className="subscription-form">
                                                                <Field name="password" type={showPassword ? "text" : "password"} className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                                                <span>Password</span>
                                                                <img className="eyeImg" src={showPassword ? eyeSlash : Eye} alt="Eye" onClick={() => setShowPassword(!showPassword)} />
                                                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                                            </div>
                                                            <div className="forgotBox">
                                                                <div className="remember-me">
                                                                    <Field type="radio" id="Rememberme" name="Rememberme" value="true"    style={{WebkitAppearance:"radio"}} />
                                                                <label className="m-0" style={{fontSize:"14px"}}>Remember Me</label>
                                                                </div>
                                                                <div>
                                                                    <a href="/forgetPassword" style={{fontSize:"14px"}}>Forgot Password</a>
                                                                </div>
                                                            </div>
                                                            <button type="submit" disabled={isSubmitting} className="btn btn-default signupBtn LoginBtn" style={{marginTop:"37px"}} >
                                                                {isSubmitting ? <span className="spinner-border spinner-border-sm mr-1"></span> : 'Log In'}
                                                                
                                                            </button>
                                                        </div>

                                                        <div className="LoginWith">
                                                        {showsafaributton?<LoginApple mblStyle='' history={history} location={location} />:<LoginGoogle mblStyle='' history={history} location={location} />}
                                                        <LoginFacebook mblStyle='' history={history} location={location} />
                                                        </div>
                                                    </Form>
                                                )}
                                            </Formik>
                                        </div>
                                        
                                    </div>
                                </div>
                                <br/>
          
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mbl-wrapper-container m-block" style={!isWelcomeScreen ? { padding: '0' } : {}}>

                {isWelcomeScreen ?

                    <>

                        <div className="top-header">
                            <img src={backIcon} alt="" onClick={() => history.push('/home')} />

                            <div className="logo-box">
                                <img src={logo} alt="" />
                            </div>
                        </div>

                        <div className="title-box">
                            <h3>Sign Up</h3>
                            <p>It's easier to Sign Up Now</p>
                        </div>

                        <div className="login-options">
                            {showsafaributton?<LoginApple mblStyle='mbl-btn' history={history} location={location} />:<LoginGoogle mblStyle='mbl-btn' history={history} location={location} />}
                            <FacebookLoginButton mblStyle='mbl-btn' history={history} location={location} />
                            <button className="btn custom-signup" onClick={() => toggleScreen('signup')}>I'll use email or phone</button>
                        </div>

                        <div className="login-text">
                            <p>Already have account?
                                <span onClick={() => toggleScreen('login')}>&nbsp;Login</span>
                            </p>
                        </div>
                    </>

                    :
                    isSignUpForm ?
                        <div className="SignupForm">
                            <div className="mockup">
                                <div className="top-box">
                                    <h3>Hello, <br /> <span>Sign Up</span></h3>
                                    <img src={backIcon} alt="" onClick={() => toggleScreen('')} />
                                </div>


                                <div className="logo-box">
                                    <img src={logo} alt="" />
                                </div>

                            </div>
                            <div className="SignUpBox">
                                <SignUpForm callback={(phoneNumber) => { }} />

                                <div className="login-text">
                                    <p>Already have account?
                                        <span onClick={() => toggleScreen('login')}>&nbsp;Login</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        :
                        isLoginForm ?
                            <div className="SignupForm login">
                                <div className="mockup">
                                    <div className="top-box">
                                        <h3>Welcome Back, <br /> <span>Log In!</span></h3>
                                        <img src={backIcon} alt="" onClick={() => toggleScreen('signup')} />
                                    </div>

                                    <div className="logo-box">
                                        <img src={logo} alt="" />
                                    </div>
                                </div>

                                <div className="SignUpBox">

                                    <img src={keyIcon} alt="" className="key-icon" />
                                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                                        {({ errors, touched, isSubmitting }) => (
                                            <Form>
                                                <div className="formCont LoginCont">
                                                    <div className="subscription-form">
                                                        <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                                        <span>Email / Phone Number</span>
                                                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                                    </div>
                                                    <div className="subscription-form">
                                                        <Field name="password" type={showPassword ? "text" : "password"} className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                                        <span>Password</span>
                                                        <img className="eyeImg" src={showPassword ? eyeSlash : Eye} alt="Eye" onClick={() => setShowPassword(!showPassword)} />
                                                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                                    </div>
                                                    <div className="forgotBox">
                                                        <div className="remember-me">
                                                            <input type="radio" name="fav_language" value="CSS" />
                                                            <label>Remember Me</label>
                                                        </div>
                                                        <div>
                                                            <a href="/forgetPassword">Forgot Password</a>
                                                        </div>
                                                    </div>
                                                    <button type="submit" disabled={isSubmitting} className="btn btn-default signupBtn LoginBtn" >
                                                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                                        Log In
                                                    </button>
                                                </div>

                                                <div className="LoginWith">
                                                    {showsafaributton?<AppleLoginButton mblStyle='' history={history} location={location} />:<GoogleLoginButton mblStyle='' history={history} location={location} />}
                                                    <FacebookLoginButton mblStyle='' history={history} location={location} />
                                                    
                                                {/* {showsafaributton?<LoginApple mblStyle='' history={history} location={location} />:<LoginGoogle mblStyle='mbl-btn' history={history} location={location} />}
                                                <LoginFacebook mblStyle='' history={history} location={location} /> */}
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                    {/* <LoginForm callback={(data) => { toggleScreen(data) }} /> */}

                                    <div className="login-text">
                                        <p>Not registered yet?
                                            <span onClick={() => toggleScreen('signup')}>&nbsp;Signup</span>
                                        </p>
                                    </div>

                                </div>
                            </div>
                            :
                            isVerifyNumber ?

                                <div className="SignupForm verifyNumber">
                                    <div className="mockup">
                                        <div className="top-box">
                                            <h3>Almost There, <br /> <span>Sign Up!</span></h3>
                                            <img src={backIcon} alt="" onClick={() => toggleScreen('login')} />
                                        </div>

                                        <div className="logo-box">
                                            <img src={logo} alt="" />
                                        </div>
                                    </div>

                                    <div className="SignUpBox">

                                        <img src={verifyIcon} alt="" className="verify-icon" />

                                        <p className="para-1">Enter your mobile number<br />
                                            to create account.</p>

                                        <p className="para-2">We will send you one time<br />
                                            password (OTP)</p>

                                        <div className="formCont LoginCont">

                                            <div className="subscription-form">
                                                <PhoneInput
                                                    country={'us'}
                                                    label={"false"}
                                                    value=""
                                                    onChange={phone => { }}
                                                />
                                                <span>Phone Number</span>
                                            </div>

                                            <button className="btn btn-default signupBtn LoginBtn" onClick={() => toggleScreen('verify-otp')}>Send</button>

                                        </div>

                                        <p className="para-3">*All Winners will be contacted<br />
                                            under registered mobile number.<br />
                                            Dream Makers hold no liability of
                                        </p>

                                    </div>
                                </div>

                                :

                                isVerifyLogin ?
                                    <div className="SignupForm verifyOTP">
                                        <div className="mockup">
                                            <div className="top-box">
                                                <h3>Almost There, <br /> <span>Sign Up!</span></h3>
                                                <img src={backIcon} alt="" onClick={() => toggleScreen('verify-screen')} />
                                            </div>

                                            <div className="logo-box">
                                                <img src={logo} alt="" />
                                            </div>
                                        </div>

                                        <div className="SignUpBox">

                                            <img src={verifyIcon} alt="" className="verify-icon" />

                                            <p className="para-1">We have send the OTP to XXXXXXXXX<br />
                                                will apply auto to the fields
                                            </p>

                                            <div className="formCont LoginCont">

                                                <div className="code-container">
                                                    <PinInput
                                                        length={4}
                                                        focus
                                                        // secret
                                                        type="numeric"
                                                        onChange={(value, index) => handleVerifyPin(value, index, 'pin')}
                                                    />

                                                </div>

                                                <p className="para-2">Didn't receive the code? <span> Resend</span></p>

                                                <button className="btn btn-default signupBtn LoginBtn" onClick={() => toggleScreen('verify-otp')}>Verify</button>

                                            </div>

                                            <p className="para-3">*All winners will be contacted using the<br />
                                                registered mobile number. Please ensure<br />
                                                your details are current and up to date.
                                            </p>

                                        </div>
                                    </div>
                                    :

                                    null
                }
            </div>



        </>
    )
}

export { Login };