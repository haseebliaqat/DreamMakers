import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, BrowserRouter, useLocation } from 'react-router-dom';

import { Role } from '@/_helpers';
import { accountService } from '@/_services';
import { Nav, PrivateRoute, Alert } from '@/_components';
import { Home } from '@/home';
// import { Profile } from '@/profile';
import { Admin } from '@/admin';
import { Account } from '@/account';
import { Price } from '../pages/price/price';
import { Signup } from '../pages/Signup/Signup';
import { Profile } from '../pages/profile/profile';
import { Header } from '../_shared/header';
// import { getCookie } from '../_services/cookies.service';
import { Footer } from '../_components/Footer/Footer';
import { Earncoins } from '../pages/EarnCoins/EarnCoins';
import { ChangePassword } from '../pages/ChangePassword/ChangePassword';
import { ActiveCoupons } from '../pages/ActiveCoupons/ActiveCoupons';
import Checkout from '../pages/checkout/checkout';
import { CreateProfile } from '../pages/CreateProfile/CreateProfile';
import DreamCart from '../pages/DreamCart/DreamCart';
import DreamCartInformation from '../pages/DreamCartInformation/DreamCartInformation';
import Confirmation from '../pages/Confirmation/Confirmation';
import { FrequentlyAskedQuestions } from '../pages/FrequentlyAskedQuestions/FrequentlyAskedQuestions';
import { WinnersList } from '../pages/winners/winners-list/winners-list';
import { GetInTouch } from '../pages/GetInTouch/GetInTouch';
import Winners from '../pages/winners/winners';
import Testimonials from '../pages/testimonials/testimonials';
import AboutUs from '../pages/about-us/about-us';
import HowItWorks from '../pages/how-it-works/how-it-works';
import { MobileProfile } from '../pages/MobileProfile/MobileProfile';
import { Login } from '../account/Login';
import DreamCartPaymentMethod from '../pages/DreamCartPayment/DreamCartPaymentMethod';
import {QrCodeScanner} from '../pages/qrcode/QrCodeScanner';
import { InvitationCodePage } from '../admin/ScanQRCodeList/InvitationCodePage';
import { SelectedCampaignListView } from '../admin/ScanQRCodeList/SelectedCampaignListView';
import { CouponCodePage } from '../admin/ScanQRCodeList/CouponCodePage';
import { CouponVerification } from '../admin/ScanQRCodeList/CouponVerification';
import { LiveVideo } from '../admin/ScanQRCodeList/LiveVideo';
import { WinnerCard } from '../admin/ScanQRCodeList/WinnerCard';
import { ForgotPassword } from '../account/ForgotPassword';
import { Donations } from '../pages/Donations/Donations';



function App() {
    const { pathname } = useLocation();
    const [user, setUser] = useState({});

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);

    function getQueryParam(param) {
        var result =  window.location.search.match(
            new RegExp("(\\?|&)" + param + "(\\[\\])?=([^&]*)")
        );
    
        return result ? result[3] : false;
    }
    function handleGoogleAuth(){
        var query = window.location.search;
        alert(getQueryParam("code"));
        //alert(getQueryParam("scope"));
    }

    return (
        <div className={'app-container' + (user && ' bg-light')}>

            <Switch>

                <Route exact path="/google/callback" render= {(props)=> { return handleGoogleAuth(props);} } />
                
                <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                <Route exact path="/" component={Home} >
                    <Header />
                    <Home />
                    <Footer />
                </Route>

                <Route exact path="/prize-details" component={Price}>
                    <Header />
                    <Price />
                    <Footer />
                </Route>

                {/* <Route exact path="/signup" component={Signup}>
                        <Signup />
                    </Route> */}

                <Route exact path="/home" component={Home}>
                    <Header />
                    <Home />
                    <Footer />
                </Route>

                <Route exact path="/profile" component={Profile}>
                    <Header />
                    <Profile />
                    <Footer />
                </Route>

                <Route exact path="/donations" component={Profile}>
                    <Header />
                    <Donations />
                    <Footer />
                </Route>

                <Route exact path="/earncoins" component={Earncoins}>
                    <Header />
                    <Earncoins />
                    <Footer />
                </Route>

                <Route exact path="/change-password" component={ChangePassword}>
                    <Header />
                    <ChangePassword />
                </Route>

                <Route exact path="/active-coupons" component={ActiveCoupons}>
                    <Header />
                    <ActiveCoupons />
                </Route>

                <Route exact path="/create-profile" component={CreateProfile}>
                    <Header />
                    <CreateProfile />
                </Route>

                <Route exact path="/dream-cart" component={DreamCart}>
                    <Header />
                    <DreamCart />
                    <Footer />
                </Route>

                <Route exact path="/forgetPassword" component={ForgotPassword}>
                    <Header />
                    <ForgotPassword />
                    <Footer />
                </Route>

                <Route exact path="/dream-cart-information" component={DreamCartInformation}>
                    <Header />
                    <DreamCartInformation />
                </Route>

                <Route exact path="/dream-cart-payment" component={DreamCartPaymentMethod}>
                    <Header />
                    <DreamCartPaymentMethod/>
                </Route>

                <Route exact path="/confirmation" component={Confirmation}>
                    <Header />
                    <Confirmation />
                </Route>

                <Route exact path="/faqs" component={FrequentlyAskedQuestions}>
                    <Header />
                    <FrequentlyAskedQuestions />
                </Route>

                <Route exact path="/winners" component={Winners}>
                    <Header />
                    <Winners />
                </Route>

                <Route exact path="/winners-list" component={WinnersList}>
                    <Header />
                    <WinnersList />
                </Route>

                <Route exact path="/get-in-touch" component={GetInTouch}>
                    <Header />
                    <GetInTouch />
                </Route>

                <Route exact path="/testimonials" component={Testimonials}>
                    <Header />
                    <Testimonials />
                </Route>

                <Route exact path="/about-us">
                    <Header />
                    <AboutUs />
                </Route>
                <Route exact path="/how-it-works">
                    <Header />
                    <HowItWorks />
                </Route>

                <Route exact path="/user-profile" component={MobileProfile}>
                    <Header />
                    <MobileProfile />
                </Route>
                <Route exact path="/scan-qr-code">
                    <Header />
                    <QrCodeScanner />
                </Route>
                <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} />
                <PrivateRoute path="/InvitationCode" roles={[Role.Admin]} component={InvitationCodePage} />
                <PrivateRoute path="/SeletedCampaignListView" roles={[Role.Admin]} component={SelectedCampaignListView} />
                <PrivateRoute path="/CouponCodeVerification" roles={[Role.Admin]} component={CouponCodePage} />
                <PrivateRoute path="/VerifyCoupon" roles={[Role.Admin]} component={CouponVerification} />
                <PrivateRoute path="/LiveVideo" roles={[Role.Admin]} component={LiveVideo} />
                <PrivateRoute path="/WinnerResult" roles={[Role.Admin]} component={WinnerCard} />
                {/* <Route path="/account" component={Account} /> */}

                <Route path="/account/login" component={Login} />

                <Redirect from="*" to="/" />
            </Switch>
        </div>
    );
}

export { App };