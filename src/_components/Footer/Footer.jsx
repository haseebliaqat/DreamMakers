import React from 'react'
import fb from '../../_assets/images/facebook-blue.png';
import insta from '../../_assets/images/insta-blue.png';
import linked from '../../_assets/images/linkedin-blue.png';
import twitter from '../../_assets/images/twitter-blue.png';
import dubaiEco from '../../_assets/images/dubai_eco.png';
import footerLogo from '../../_assets/images/footer-logo.svg';
import paymentOpt from '../../_assets/images/payment-opts.png';
import appstore from '../../_assets/images/appstore-icons.png';
import twitterIcon from '../../_assets/images/twitter-icon.svg';
import playstore from '../../_assets/images/playstore-icons.png';
import facebookIcon from '../../_assets/images/facebook-icon.svg';
import instaIcon from '../../_assets/images/instagram-icon.svg';
import LnkInWhite from '../../_assets/images/linkedin-white.png';

import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div>
            {/* Footer */}
            <section className="footer">

                <div className="container-fluid">

                    <div className="flex">

                        <div className="quick-links" >

                            <div className="image2">

                                <img src={footerLogo} alt="" />

                            </div>

                            <div className="mobile-icons">

                                <a href="https://www.linkedin.com/" target="_blank">
                                    <img src={LnkInWhite} alt="Linkedin" />

                                    </a>

                                <a href="https://twitter.com/dream_makin?t=vegWonLwl-Du3NqcfBxHNw&s=09" target="_blank">
                                    <img src={twitterIcon} alt="Twitter" />
                                </a>

                                <a href="https://www.facebook.com/dreammakersdubai" target="_blank">
                                    <img src={facebookIcon} alt="Facebook" />
                                </a>

                                <a href="https://www.instagram.com/dreammakersdubai/" target="_blank">
                                    <img src={instaIcon} alt="Instagram" />
                                </a>

                            </div>

                            <h5 className="footerStyle" >Quick links</h5>

                            <ul className="links" >

                                <li>
                                    <Link to={{ pathname: `/about-us` }}>
                                        About Dream Makers
                                    </Link>
                                </li>

                                <li>
                                    <Link to={{ pathname: `/profile` }}>
                                        My Account
                                    </Link>
                                </li>

                                <li>
                                    <Link to={{ pathname: `/` }}>
                                        Active Tickets
                                    </Link>
                                </li>

                            </ul>

                        </div>

                        <div className="customer-service" >

                            <h5 className="footerStyle">Customer Service</h5>

                            <ul className="links">

                                <li>
                                    <Link to={{ pathname: `/get-in-touch` }}>
                                        Contact Us
                                    </Link>
                                </li>

                                <li>
                                    <Link to={{ pathname: `/faqs` }}>
                                        FAQ
                                    </Link>
                                </li>

                                <li>
                                    <Link to={{ pathname: `/how-it-works` }}>
                                        How it Works
                                    </Link>
                                </li>

                                <li>
                                    <Link to={{ pathname: `/` }}>
                                        Charities
                                    </Link>
                                </li>

                                <li>
                                    <Link to={{ pathname: `/` }}>
                                        Campaign Draw Terms & Conditions
                                    </Link>
                                </li>

                            </ul>

                            <div className="mb"></div>

                            <h5 className="footerStyle m-none">
                                <Link to={{ pathname: `/` }}>
                                    User Agreement
                                </Link>
                            </h5>

                            <h5 className="footerStyle m-none">
                                <Link to={{ pathname: `/` }}>
                                    Privacy Policy
                                </Link>
                            </h5>

                        </div>

                        <div className="footer-logo">

                            {/* <h5>Regulated By</h5> */}
                            <img src={dubaiEco} alt="" />

                        </div>

                        <div className="footer-icons">

                            <div className="m-none footer-socials">

                                <a href="https://www.linkedin.com/" target="_blank" style={{paddingRight:"35px"}}>
                                    <img src={linked} alt="Linkedin" />

                                </a>

                                <a href="https://twitter.com/dream_makin?t=vegWonLwl-Du3NqcfBxHNw&s=09" target="_blank"style={{paddingRight:"35px"}}>
                                    <img src={twitter} alt="Twitter" />

                                </a>

                                <a href="https://www.facebook.com/dreammakersdubai" target="_blank" style={{paddingRight:"35px"}}>
                                    <img src={fb} alt="Facebook" />

                                </a>

                                <a href="https://www.instagram.com/dreammakersdubai/" target="_blank">
                                    <img src={insta} alt="Instagram" />

                                </a>

                            </div>

                            <div className="mb"></div>

                            <p style={{fontSize:"15px"}}>Download Dream Makers app for the ultimate <br />  shopping experience & seamless connectivity!</p>

                            <div className="image3">

                                <img src={appstore} alt="" style={{width:"150px",marginRight:"6px"}} />
                                <span></span>
                                <img src={playstore} alt="" style={{width:"150px"}} />

                            </div>

                            <div className=" m-block mt" style={{ textAlign: 'left' }}>

                                <h5 className="footerStyle m-block">
                                    <Link to={{ pathname: `/` }}>
                                        User Agreement
                                    </Link>
                                </h5>

                                <h5 className="footerStyle m-block">
                                    <Link to={{ pathname: `/` }}>
                                        Privacy Policy
                                    </Link>
                                </h5>

                            </div>

                            <div className="cards-text">

                                <span>We accept</span>

                                <img src={paymentOpt} alt="" />

                            </div>

                        </div>

                    </div>

                    <p className="text-center" style={{fontSize:"13px",fontWeight:"400"}}>Dream Makers Dubai © 2021. All rights reserved.</p>

                </div>

            </section>
        </div>
    )
}

export { Footer };
