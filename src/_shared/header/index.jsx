import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './index.less';
import logo from '@/_assets/images/dream-maker-logo.svg';
import aboutIcon from '@/_assets/images/about-dream-makers.svg';
import settingsIcon from '@/_assets/images/settings-icon.svg';
import testimonialIcon from '@/_assets/images/testimonial-icon.svg';
import winnerIcon from '@/_assets/images/winners-icon.svg';
import crossIcon from '@/_assets/images/cross-icon.svg';
import chevronBlue from '@/_assets/images/chevron-right-blue.svg';
import profilePic from '@/_assets/images/blocked-profile.jpg';
import bellIcon from '@/_assets/images/Bell.svg';
import closeIcon from '@/_assets/images/close.svg';
import appstoreIcon from '@/_assets/images/appstore-icons.png';
import playStoreIcon from '@/_assets/images/playstore-icons.png';
import dubaiEco from '@/_assets/images/dubai_eco.png';
import paymentOpt from '@/_assets/images/payment-opt.svg';
import { Link } from "react-router-dom";
import { history } from '@/_helpers/history';
// import { getCookie } from '../../_services/cookies.service';
function Header() {
    // const user = accountService.userValue;
    const [user, setUser] = useState(null);
    const [showNavModal, setShowNavModal] = useState(false);
    const [showCloseIcon, setShowCloseIcon] = useState(false);
    const [currentUrl, setCurrentUrl] = useState('');
    const { pathname } = useLocation();
    const closeMenu = () => {
        history.push(currentUrl);
        setShowCloseIcon(false);
    }
    const showMenu = () => {
        setCurrentUrl(pathname);
        setShowCloseIcon(true);
    }

    useEffect(() => {
        if (!!localStorage.userDetails) {
            setUser(JSON.parse(localStorage.userDetails));
        }
        if(pathname.includes('winners')){
            setShowCloseIcon(false);
        }
    }, [pathname]);
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light bg-gradient customNavbar">

                <Link className="navbar-brand" to={{ pathname: `/home` }} >
                    <img src={logo} alt="Dream Makers" className="d-inline-block align-text-top brand-logo" />
                </Link>

                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link" to={{ pathname: `/how-it-works` }} >
                            How it Works
                        </Link>
                        <Link className="nav-link" to={{ pathname: `/about-us` }} >
                            About Dream Makers
                        </Link>
                        <Link className="nav-link" to={{ pathname: `/winners-list` }} >
                            Winners
                        </Link>
                    </div>
                </div>

                <div className="login-btn navbar-nav">
                    {!!showCloseIcon ?
                        <>
                        <div style={{cursor:"pointer"}}><img src={closeIcon} className="notif-icon"  onClick={() => closeMenu()}/></div>
                        </> :
                        <>
                            {!!user ?
                                <>
                                    <p>Hi {user.firstName}</p>
                                    <Link className="login-link" to={{ pathname: `/profile` }} onClick={() => showMenu()}>

                                        <img src={!!user ? user.picUrl : profilePic} className="profile-pic" /> </Link>
                                    <div><img src={bellIcon} className="notif-icon" /></div>
                                </>
                                :
                                <>
                                    <div id="nav-icon4" className={showNavModal ? "navbar-toggler open" : "navbar-toggler"} onClick={() => setShowNavModal(!showNavModal)}>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                    {/* <button className="navbar-toggler" type="button" onClick={() => setShowNavModal(true)} data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button> */}
                                    <Link className="login-link" to={{ pathname: `/account/login` }}>
                                        <span className="nav-link active login-link" aria-current="page" href="#">Login/Sign-up</span>
                                    </Link>
                                </>
                            }
                        </>}





                </div>
            </nav>

            {/* {showNavModal && ( */}
            <div className={showNavModal ? "modal show m-block" : "modal"} id="navModal" style={showNavModal ? { background: '#0000006b' } : { display: 'none !important' }}>
                <div className="modal-dialog modal-md adjust-width" role="document">
                    <div className={showNavModal ? "modal-content transition" : "modal-content"}>
                        <div className="modal-body">

                            <div className="header-box">
                                <p>*New user or existing user<br />Get Started</p>
                                <button className="btn btn-primary btn-login">Login/Sign-up</button>
                            </div>

                            <div className="nav-btns">
                                <button className="btn btn-primary btn-page">
                                    <span>
                                        <img src={aboutIcon} />
                                        <p>About Dream Makers</p>
                                    </span>
                                    <img src={chevronBlue} />
                                </button>

                                <button className="btn btn-primary btn-page">
                                    <span>
                                        <img src={testimonialIcon} />
                                        <p>Testimonials</p>
                                    </span>
                                    <img src={chevronBlue} />
                                </button>

                                <button className="btn btn-primary btn-page">
                                    <span>
                                        <img src={winnerIcon} />
                                        <p>Winners</p>
                                    </span>
                                    <img src={chevronBlue} />
                                </button>

                                <button className="btn btn-primary btn-page">
                                    <span>
                                        <img src={settingsIcon} />
                                        <p>How it works</p>
                                    </span>
                                    <img src={chevronBlue} />
                                </button>
                            </div>

                            <div className="store-icons">
                                <a href="#" >
                                    <img src={appstoreIcon} />
                                </a>
                                <a href="#" >
                                    <img src={playStoreIcon} />
                                </a>
                            </div>

                            <div className="links-box">
                                <div className="links">

                                    <Link className="link-item" to={{ pathname: `/` }}>
                                        <small>User Agreement</small>
                                    </Link>

                                    <Link className="link-item" to={{ pathname: `/` }}>
                                        <small>Draw Terms & Conditions</small>
                                    </Link>

                                    <Link className="link-item" to={{ pathname: `/` }}>
                                        <small>Privacy Policy</small>
                                    </Link>

                                    <Link className="link-item" to={{ pathname: `/` }}>
                                        <small>Frequently Asked Questions</small>
                                    </Link>

                                </div>

                                <div className="logo-box">
                                    <img src={dubaiEco} />
                                </div>

                            </div>

                            <div className="cards-text">
                                <small>We accept</small>
                                <img src={paymentOpt} alt="" />
                            </div>

                            <p className="copyrights-text">Dream Makers Dubai © 2021. All rights reserved.</p>

                        </div>
                    </div>
                </div>
            </div>
            {/* )} */}

        </>
    );
}

export { Header };