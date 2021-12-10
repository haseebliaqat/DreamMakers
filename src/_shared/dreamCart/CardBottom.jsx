import React, { useState, useEffect } from 'react';
import {
   Button,
 } from "@material-ui/core";
import CheckoutBtns from '@/_shared/dreamCart/CheckoutBtns';
import AppleStore from '@/_assets/dreamCart/AppleStore.png';
import GooglePlay from '@/_assets/dreamCart/GooglePlay.png';
import CreditCard from '@/_assets/dreamCart/CreditCard.png';
import CheckoutBilling from '@/_assets/dreamCart/CheckoutBilling.svg';
import Stripe from '@/_assets/dreamCart/stripe-payment-logo.png';
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import {PaymentElement} from '@stripe/react-stripe-js';
import StripeCheckout from 'react-stripe-checkout';
import { Link } from 'react-router-dom';
import GooglePayButton from '@google-pay/button-react';
import {
  useStripe, useElements,
  CardNumberElement, CardExpiryElement, CardCvcElement
} from '@stripe/react-stripe-js'
import { useHistory } from "react-router-dom";
import "./CardBottom.css";

import { accountService, alertService } from '@/_services';
 import config from 'config';
const baseUrl = `${config.apiUrl}`;
import { fetchWrapper, history } from '@/_helpers';
 
const CardBottom = ({ checkoutAsGuest,props,stepNo,setstepNo,count}) => {
   const [HideCheckout, setHideCheckout] = useState(true);
   const [imageShow, setImageShow] = useState(false);
   const [user, setUser] = useState(null);
   const [RegisterUser, setResisterUser] = useState(localStorage.getItem("user_id"));
   const [campain_id, setCampainID] = useState(localStorage.getItem("selected_campaign_id"));
   const [campain_count, setCampainCount] = useState(localStorage.getItem("item_count_value"));
   const [campain_actual_price, setCampainActualPrice] = useState(localStorage.getItem("selected_campaign_actual_price"));
   const [campain_cash_paid, setCampainCashPaid] = useState(localStorage.getItem("selected_campaign_cash_paid"));
   const [campain_discount, setCampainDiscount] = useState(localStorage.getItem("discount_code"));
   const [discount_amount, setDiscountAmount] = useState(localStorage.getItem("selected_campaign_discount_amount"));
   var item_count=0;
 


   useEffect(() => {
      // googlePayClient.isReadyToPay(googlePayBaseConfiguration);
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
        console.log("haseeb1")
      }, 1000);
      if (!!localStorage.userDetails) {            
        setUser(JSON.parse(localStorage.userDetails));
     }
      console.log(localStorage.getItem("user_id"))
      window.addEventListener('resize', () => {
         if (window.innerWidth < 576) setImageShow(true);
         else setImageShow(false);
      });
      return window.removeEventListener('resize', () => {});

   }, [
      item_count=localStorage.getItem("item_count_value"),
   ]);

   const showButtons = () => {
      setHideCheckout(!HideCheckout);
   };
   const handleClickOpen = () => {
      setOpen(true);
    };
    
    const handleClose = () => {
      setOpen(false);
    };

    const ContinuesForCheckout = () => {
      
      
      !!user?setstepNo(3):setstepNo(2);
      const { from } = { from: { pathname: !!user?"/dream-cart-payment":"/dream-cart-information" } };
      history.push(from)
    };

    
    
    async function processPayment(paymentData) {
      console.log("item_count")
      console.log(item_count)
      
      const PaymentIntentURL=`${baseUrl}/coupons/create-payment-intent`;
        fetchWrapper.post(PaymentIntentURL, { campaignId: parseInt(campain_id),numberOfCouponsToPurchase:parseInt(count),enabled:false }).then((resp) => {
         
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

   return (
      <div className="marginTop-Sm">
         {checkoutAsGuest ? (
            <div className="container-fluid px-0 ">
               <div className="row">
                  <div
                     className="col-6 col-sm-6 col-md-6"
                     // style={{ textAlign: 'center', padding: '0', margin: '0' }}
                  >
                    <Link  to="account/login">
                     <CheckoutBtns
                        text="Sign Up"
                        backgroundColor="#1663BE"
                        color="#FFFFFF"
                        border="1px solid #707070"
                     />
                    </Link>
                  </div>
                  <div className="col-6 col-sm-6 col-md-6">
                     <Link to="account/login">
                     <CheckoutBtns
                        text="Login"
                        backgroundColor="#1663BE"
                        color="#FFFFFF"
                        border="1px solid #707070"
                     />
                     </Link>
                  </div>
                  
                  
               </div>
            </div>
         ) : (
          <Link to={!!user?"/dream-cart-payment":"/dream-cart-information"}>
           <button className={`btn form-control my-1 buttonRound`} style={{border:"1px solid",backgroundColor:"#1663BE",color:"#FFFFFF"}} onClick={ContinuesForCheckout}>
          <img
                   src={imageShow ? CheckoutBilling : CreditCard}
                   alt=""
                   height={24}
                   className="absoluteClass U-paddingLeftText"
                />
                <span className="FloarRight-Responsive">Countinue with card</span>
             </button>
          </Link>
         
            // <CheckoutBtns
            //    img={imageShow ? CheckoutBilling : CreditCard}
            //    text="Countinue for Checkout"
            //    
            //    color="#FFFFFF"
            //    border="1px solid #707070"
            //    toggler={showButtons}
            // />
         )}
         {/* <button className={`btn form-control my-1 buttonRound`} style={{border:"1px solid",backgroundColor:"black"}} onClick={processPayment}>
         <img
                  src={GooglePlay}
                  alt=""
                  height={24}
                  className="absoluteClass U-paddingLeftText"
               />
                                    <span className="FloarRight-Responsive" style={{color:"white",fontWeight:"400"}}>Google Pay</span>
            </button> */}
            <div style={{width:"100px"}}>
              {!!RegisterUser?
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
             />:null
            }

            </div>
           {!!RegisterUser?
              <button className={`btn form-control my-1 buttonRound`} style={{border:"1px solid"}}>
              <img
                    src={AppleStore}
                    alt=""
                    height={24}
                    className="absoluteClass U-paddingLeftText"
                 />
                 <span className="FloarRight-Responsive">Apple pay</span>
              </button>
           :null}
            {/* <StripeCheckout
              label="Strip"
              amount={!!campain_price?campain_price:""}
              billingAddress
              description="Awesome Product"
              image="https://yourdomain.tld/images/logo.svg"
              locale="auto"
              name="https://dreammakers.ae/"
              stripeKey="pk_test_35p114pH8oNuHX72SmrvsFqh00Azv3ZaIA"
              token={onToken}
              className={`btn form-control my-1 buttonRound`} 
              style={{border:"1px solid",backgroundColor:"none"}}
              zipCode
              /> */}
            {/* <button className={`btn form-control my-1 buttonRound`} style={{border:"1px solid"}} onClick={handleClickOpen}>
               <img
                  src={Stripe}
                  alt=""
                  height={24}
                  className="absoluteClass U-paddingLeftText"
               />
               <span className="FloarRight-Responsive">Stripe</span>
            </button> */}
      </div>
   );
};

export default CardBottom;
