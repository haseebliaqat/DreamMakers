import React, { useState } from 'react';
import './Signup.less';
import '../../home/index.less';
import Eye from '../../_assets/images/eye.svg';
import PhoneInput from 'react-phone-input-2'
import Slider from "react-slick";
import sliderImg from '../../_assets/images/sliderImg.png';
import sliderImg2 from '../../_assets/images/sliderImg2.png';
import sliderImg3 from '../../_assets/images/sliderImg3.png';
import sliderImg4 from '../../_assets/images/sliderImg4.png';
import sliderImg5 from '../../_assets/images/sliderImg5.png';
import logo from '@/_assets/images/dream-maker-logo.svg';
import backIcon from '@/_assets/images/back-btn.svg';
import keyIcon from '@/_assets/images/key-icon.svg';
import verifyIcon from '@/_assets/images/verify-icon.svg';
import { Link } from 'react-router-dom';
import { SignUpForm } from './signupForm';
import { LoginForm } from './loginForm';
import { GoogleLoginButton } from '../../_shared/google-login-button/google-login-button';
import { FacebookLoginButton } from '../../_shared/facebook-login-button/facebook-login-button';
import PinInput from 'react-pin-input';
import { history } from '@/_helpers';
// import 'react-phone-input-2/lib/style.css'

function Signup({ history, match }) {
    console.log("signup", history, match);

    const [isWelcomeScreen, setIsWelcomeScreen] = useState(true);
    const [isSignUpForm, setIsSignUpForm] = useState(false);
    const [isLoginForm, setIsLoginForm] = useState(false);
    const [isVerifyLogin, setIsVerifyLogin] = useState(false);
    const [isVerifyNumber, setIsVerifyNumber] = useState(false);
    const [OTPCode, setOTPCode] = useState('');

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
        console.log("toggle screen", type);
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
        else{
            setIsWelcomeScreen(true);
            setIsLoginForm(false)
            setIsSignUpForm(false);
            setIsVerifyNumber(false);
            setIsVerifyLogin(false);
        }
    }

    return (
        <>
            <div className="container-fluid p-0 m-none">
                <div className="header-bar">
                    <Link to='/home'>
                        <img src={logo} alt="Dream Makers" className="" />
                    </Link>
                </div>
                <div className="container">
                    <div className="row">
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
                                            {/*   */}
                                        </div>
                                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                            <LoginForm callback={(data) => { }} />

                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>



            <div className="mbl-wrapper-container m-block" style={!isWelcomeScreen ? { padding: '0' } : {}}>

                {isWelcomeScreen ?

                    <>

                        <div className="top-header">
                            <img src={backIcon} alt="" onClick={() => history.push('/home')}  />

                            <div className="logo-box">
                                <img src={logo} alt="" />
                            </div>
                        </div>

                        <div className="title-box">
                            <h3>Sign Up</h3>
                            <p>It's easier to Sign Up Now</p>
                        </div>

                        <div className="login-options">
                            <GoogleLoginButton mblStyle='mbl-btn' />
                            <FacebookLoginButton mblStyle='mbl-btn' />
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
                                    <LoginForm callback={(data) => { toggleScreen(data) }} />

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
export { Signup };
