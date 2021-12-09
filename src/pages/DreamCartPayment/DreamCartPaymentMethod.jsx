import React, { useState, useEffect } from 'react';
import './DreamCartPaymentMethod.css';
import Card from '@/_shared/dreamCart/Card';
import { TextField } from '@/_shared/TextField/TextField';
import { SelectField } from '@/_shared/SelectField/SelectField';
import CheckoutBtns from '@/_shared/dreamCart/CheckoutBtns';
import DreamCartSteper from '@/_shared/dreamCart/DreamCartSteper';
import { NewsLetter } from '@/_shared/newsletter/newsletter';
import { CountryCodeField } from '@/_shared/CountryCodeField/CountryCodeField';
import OrderSummery from '@/_shared/dreamCart/OrderSummery';
import GoogleIcon from '@/_assets/icons/google-sm.png';
import FacebookIcon from '@/_assets/icons/facebook-sm.png';
import AppleIcon from '@/_assets/icons/apple-sm.png';
import { Link } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import Stripe from '@/_assets/dreamCart/stripe-payment-logo.png';
import Logo from '@/_assets/icons/apple-sm.png';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import AppleStore from '@/_assets/dreamCart/AppleStore.png';
import GooglePlay from '@/_assets/dreamCart/GooglePlay.png';
import CreditCard from '@/_assets/dreamCart/CreditCard.png';
import CheckoutBilling from '@/_assets/dreamCart/CheckoutBilling.svg';
import { useHistory } from "react-router-dom";
import { accountService, alertService } from '@/_services';
import CheckoutForm from "./DreamCartCheckoutPaymentForm";
import DatePicker from "react-datepicker";
import InputMask from "react-input-mask";
import GooglePayButton from '@google-pay/button-react';
 import { loadStripe } from "@stripe/stripe-js";
 import { Elements } from "@stripe/react-stripe-js";

 const stripePromise = loadStripe("pk_test_51J9sJcLWHAHcBPawYJoIvw6bio18W18BpYMKJTupgMkfb5UvZwHdD3YIdoR6moN5QVIX8xW3vRxItrFYpilVorqz00dObeqilS");
import config from 'config';
const baseUrl = `${config.apiUrl}`;
import { fetchWrapper, history } from '@/_helpers';
const DreamCartPaymentMethod = () => {
    const history = useHistory();
   const [imageShow, setImageShow] = useState(false);
   const [TermAndCondition, setTermsandcondition] = useState(!!localStorage.getItem("user_id")?true:false);
   const [AlreadyLogin, setAlreadyLogin] = useState(!!localStorage.getItem("user_id")?true:false);
   const [firstname, setfirstname] = useState(localStorage.getItem("f_name"));
   const [last_name, setlast_name] = useState(localStorage.getItem("l_name"));
   const [email, setemail] = useState(localStorage.getItem("user_email"));
   const [nationality, setnationality] = useState("");
   const [city, setcity] = useState("");
   const [phone_no, setphone_no] = useState("");
   const [invite_code, setsetinvite_code] = useState("");
   const [gender_value_male, setGenderValueMale] = useState(false);
   const [gender_value_female, setGenderValueFemale] = useState(false);
   const [campain_id, setCampainID] = useState(localStorage.getItem("selected_campaign_id"));
   const [campain_count, setCampainCount] = useState(localStorage.getItem("item_count_value"));
   const [campain_actual_price, setCampainActualPrice] = useState(localStorage.getItem("selected_campaign_actual_price"));
   const [campain_cash_paid, setCampainCashPaid] = useState(localStorage.getItem("selected_campaign_cash_paid"));
   const [campain_discount, setCampainDiscount] = useState(localStorage.getItem("discount_code"));
   const [discount_amount, setDiscountAmount] = useState(localStorage.getItem("selected_campaign_discount_amount"));
   const [user, setUser] = useState(null);
   const [card_number, setCardNumber] = useState([null]);
   const [expiry_date, setExpriyDate] = useState([null]);
   const [cvc_number, setCVCNumber] = useState([null]);
   const now = new Date;
  const until = new Date(now.getFullYear() + 10, now.getMonth());
  const [clientSecret, setClientSecret] = useState("");
   useEffect(() => {
    const timer = setTimeout(() => {
      console.log('This will run after 1 second!')
      setCampainID(localStorage.getItem("selected_campaign_id"));
      setCampainCount(localStorage.getItem("item_count_value"));
      setCampainActualPrice(localStorage.getItem("selected_campaign_actual_price"));
      setCampainCashPaid(localStorage.getItem("selected_campaign_cash_paid"));
      setCampainDiscount(localStorage.getItem("discount_code"));
      setDiscountAmount(localStorage.getItem("selected_campaign_discount_amount"));

      console.log("aqib")
      console.log(localStorage.getItem("selected_campaign_id"))
      console.log(localStorage.selected_campaign_id.toString())
      console.log(localStorage.userDetails)
      console.log("haseeb")
    }, 1000);
          if (!!localStorage.userDetails) {            
            setUser(JSON.parse(localStorage.userDetails));
            //console.log(user);
        }
       const PaymentIntentURL=`${baseUrl}/coupons/create-payment-intent`;
        fetchWrapper.post(PaymentIntentURL, { "campaignId": parseInt(campain_id),numberOfCouponsToPurchase:parseInt(campain_count),enabled:false }).then((resp) => {
            console.log("payment-intent", resp);
            setClientSecret(resp.client_secret);

        })
            .catch(error => {
                alertService.error(error);
            });
          window.scrollTo(0, 0)
      if (window.innerWidth < 576) setImageShow(true);
      window.addEventListener('resize', () => {
         if (window.innerWidth < 576) setImageShow(true);
         else setImageShow(false);
      });
      return window.removeEventListener('resize', () => {});
   }, []);

   function GetClientScreat(email, password) {
    return fetchWrapper.post(`${baseUrl}/coupons/create-payment-intent`, { email, password })
        .then(user => {
            userSubject.next(user);
            startRefreshTokenTimer();
            return user;
        });
}
const ContinuesForCheckout = () => {
      
      
  !!user?setstepNo(3):setstepNo(2);
  const { from } = { from: { pathname: !!user?"/dream-cart-payment":"/dream-cart-information" } };
  history.push(from)
};



async function processPayment(paymentData) {
  console.log("Aqon")
  console.log(paymentData)
  const PaymentIntentURL=`${baseUrl}/coupons/create-payment-intent`;
    fetchWrapper.post(PaymentIntentURL, { campaignId: parseInt(campain_id),numberOfCouponsToPurchase:parseInt(campain_count),enabled:false }).then((resp) => {
     
        const PaymentConfirmURL=`${baseUrl}/coupons/confirm-payment-intent`;
        fetchWrapper.post(PaymentConfirmURL, { "paymentIntentId":resp.id,
        "paymentMethod":"pm_card_visa" }).then((resp1) => {
          console.log("confirm-payment-intent", resp1);
          onStripToken(resp1.id)
        })
        .catch(error => {
            console.error(error);
        });

    })
        .catch(error => {
            console.error(error);
        });
 
}
const onStripToken = (token) => {
 const userDetails = { campain_discount:parseFloat(campain_discount), campaignId:parseInt(campain_id),actualPrice:parseFloat(campain_actual_price), discountAmount:parseFloat(discount_amount),
 dreamCoinsUsed:parseFloat("0"), cashPaid:parseFloat(campain_cash_paid),totalPurchasedCoupons:parseInt(campain_count), payment_token_id:token,
 type_of_payment:"stripe", payment_instrument:"card",payment_instrument_type:"VISA",user_token:!!user?user.jwtToken:""
}
 console.log(userDetails);
 alertService.clear();
 accountService.PurchaseCoupons(0,
  userDetails.campaignId,
  userDetails.actualPrice,
  userDetails.discountAmount,
  userDetails.dreamCoinsUsed,
  userDetails.cashPaid,
  userDetails.totalPurchasedCoupons,
  userDetails.payment_token_id,
  userDetails.type_of_payment,
  userDetails.payment_instrument,
  userDetails.payment_instrument_type,
  userDetails.user_token
  ).then((resp) => {
    console.log(resp)
    localStorage.setItem("purchase_detail",JSON.stringify(resp));
    const { from } = { from: { pathname: "/confirmation" } };
    history.push(from);

 }).catch(error => {
     alertService.error("Internal Server Error");
 });
};

const appearance = {
  theme: 'stripe',
};
const options = {
  clientSecret,
  appearance,
};

const [stepNo, setstepNo] = useState(3);
return (
   <>
      <DreamCartSteper value={stepNo} />
         <div className="container-fluid">
            <div className="row">
               <div className="col-12 p-0">
                  {/* <OrderSummery /> */}
               </div>
               <div className="col-md-12 col-lg-5 py-md-5 py-3 px-md-3 px-1">
                  <div className="container px-md-5 px-4">
                  <div className="row s-box">
                           <div className="col-md-12 order-md-1">
                           {clientSecret && (
                                <Elements options={options} stripe={stripePromise}>
                                  <CheckoutForm />
                                </Elements>
                            )}
                           </div>
                      </div>
                     <div className="row" style={{marginTop:"17PX"}}>
                        <div className="col-md-12">
                        <GooglePayButton
                         buttonSizeMode="fill"
                         className={`btn1 buttonRound`} 
                         environment="TEST"
                         paymentRequest={{
                           apiVersion: 2,
                           apiVersionMinor: 0,
                             allowedPaymentMethods: [
                               {
                                 type: 'CARD',
                                 parameters: {
                                   allowedCardNetworks: ["VISA", "MASTERCARD"],
                                   allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                                 },
                                 tokenizationSpecification: {
                                   type: 'PAYMENT_GATEWAY',
                                   parameters: {
                                     "gateway": "stripe",
                                     "stripe:version": "2018-10-31",
                                      "stripe:publishableKey": "pk_test_51J9sJcLWHAHcBPawYJoIvw6bio18W18BpYMKJTupgMkfb5UvZwHdD3YIdoR6moN5QVIX8xW3vRxItrFYpilVorqz00dObeqilS"
                                   },
                                   // parameters: {
                                   //   gateway: "stripe",
                                   //   "stripe:version": "v3",
                                   //   "stripe:publishableKey": "pk_test_51J9sJcLWHAHcBPawYJoIvw6bio18W18BpYMKJTupgMkfb5UvZwHdD3YIdoR6moN5QVIX8xW3vRxItrFYpilVorqz00dObeqilS"
                                   // }
                                 },
                               },
                             ],
                             merchantInfo: {
                               merchantId: 'BCR2DN6TQ7AOBHRW',
                               merchantName: 'Dream Makers',
                             },
                             transactionInfo: {
                               totalPriceStatus: 'FINAL',
                               totalPriceLabel: 'Total',
                               totalPrice: "5",
                               currencyCode: 'AED',
                               countryCode: 'AE',
                             },
                           }}
                           onLoadPaymentData={paymentRequest => {
                             console.log('load payment data', paymentRequest);
                            processPayment();
                           }}
             />
                            <button className={`btn form-control my-1 buttonRound`} style={{border:"1px solid",width:"465px"}}>
                                <img
                                        src={AppleStore}
                                        alt=""
                                        height={24}
                                        className="absoluteClass U-paddingLeftText"
                                        style={{paddingLeft:"35px"}}
                                    />
                                <span className="FloarRight-Responsive">Apple pay</span>
                            </button>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-md-12 col-lg-7 cardNoShowLess768">
                  <Card />
               </div>
               <div className="col-12">
                  <NewsLetter />
               </div>
            </div>
         </div>
      </>
   );
};

export default DreamCartPaymentMethod;
