// import React, { useState, useEffect } from 'react';
// import { loadStripe } from "@stripe/stripe-js";
// import { accountService, alertService } from '@/_services';
// import { useHistory } from "react-router-dom";
// import {
//   CardElement,
//   Elements,
//   useElements,
//   useStripe
// } from "@stripe/react-stripe-js";
// import './DreamCartPaymentMethod.css';

// const CARD_OPTIONS = {
//   iconStyle: "solid",
//   style: {
//     base: {
//       iconColor: "#c4f0ff",
//       color: "black",
//       fontWeight: 500,
//       fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
//       fontSize: "16px",
//       fontSmoothing: "antialiased",
//       ":-webkit-autofill": {
//         color: "#494949"
//       },
//       "::placeholder": {
//         color: "#494949"
//       }
//     },
//     invalid: {
//       iconColor: "#494949",
//       color: "#494949"
//     }
//   }
// };
// const ELEMENTS_OPTIONS = {
//   fonts: [
//     {
//       cssSrc: "https://fonts.googleapis.com/css?family=Roboto"
//     }
//   ]
// };
// const CardField = ({ onChange }) => (
//   <div className="FormRow">
//     <CardElement options={CARD_OPTIONS} onChange={onChange} />
//   </div>
// );

// const Field = ({
//   label,
//   id,
//   type,
//   placeholder,
//   required,
//   autoComplete,
//   value,
//   onChange
// }) => (
//   <div className="FormRow">
//     <label htmlFor={id} className="FormRowLabel">
//       {label}
//     </label>
//     <input
//       className="FormRowInput"
//       id={id}
//       type={type}
//       placeholder={placeholder}
//       required={required}
//       autoComplete={autoComplete}
//       value={value}
//       onChange={onChange}
//     />
//   </div>
// );

// const SubmitButton = ({ processing, error, children, disabled }) => (
//   <button
//     className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
//     type="submit"
//     disabled={processing || disabled}
//   >
//     {processing ? "Processing..." : children}
//   </button>
// );

// const ErrorMessage = ({ children }) => (
//   <div className="ErrorMessage" role="alert">
//     <svg width="16" height="16" viewBox="0 0 17 17">
//       <path
//         fill="#FFF"
//         d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
//       />
//       <path
//         fill="#6772e5"
//         d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
//       />
//     </svg>
//     {children}
//   </div>
// );

// const ResetButton = ({ onClick }) => (
//   <button type="button" className="ResetButton" onClick={onClick}>
//     <svg width="32px" height="32px" viewBox="0 0 32 32">
//       <path
//         fill="#FFF"
//         d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
//       />
//     </svg>
//   </button>
// );

// const  DreamCartCheckoutPaymentForm=()=> {
//   const history = useHistory();
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [cardComplete, setCardComplete] = useState(false);
//   const [processing, setProcessing] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState(null);
//   const [campain_id, setCampainID] = useState("");
//   const [campain_actual_price, setCampainActualPrice] = useState("");
//   const [campain_cash_paid, setCampainCashPaid] = useState("");
//   const [campain_discount, setCampainDiscount] = useState("");
//   const [campain_dreamcoin, setCampainDreamCoin] = useState("");
//   const [campain_count, setCampainCount] = useState("");
//   const [discount_amount, setDiscountAmount] = useState("");
//   const [billingDetails, setBillingDetails] = useState({
//     name: localStorage.getItem("f_name")+ " "+localStorage.getItem("l_name"),
//     email: localStorage.getItem("email"),
//     phone: 923240010087,
//   });
//   useEffect(() => {  
//     setCampainID(localStorage.getItem("selected_campaign_id"))
//     setCampainActualPrice(localStorage.getItem("selected_campaign_actual_price"))
//     setCampainCashPaid(localStorage.getItem("selected_campaign_cash_paid"))
//     setCampainDiscount(localStorage.getItem("discount_code"))
//     setCampainDreamCoin(localStorage.getItem("dream_coins"))
//     setCampainCount(localStorage.getItem("item_count_value"))
//     setDiscountAmount(localStorage.getItem("selected_campaign_discount_amount"))
  

// });
//   const handleSubmit =  (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not loaded yet. Make sure to disable
//       // form submission until Stripe.js has loaded.
//       return;
//     }

//     if (error) {
//       elements.getElement("card").focus();
//       return;
//     }

//     console.log(cardComplete)
//     if (cardComplete) {
//       setProcessing(true);
//     }

//     const payload =  stripe.createPaymentMethod({
//       type: "card",
//       card: elements.getElement(CardElement),
//       billing_details: billingDetails
//     });

//     setProcessing(false);
//     console.log(payload)
//     payload.then(function(result) {
//       console.log("Haseeb")
//        console.log(result) // "Some User token"
//        if (result.error) {
//         setError(result.error);
//       } else {
//         setPaymentMethod(result.paymentMethod)
//         // onStripToken(result.paymentMethod)
//         onStripPaymentConfirm(result.paymentMethod)
//       }
//     })
//     // const onStripPaymentConfirm = (token1) => {
//     //   const Stripe = require('stripe');
//     //   const stripe = Stripe('sk_test_51J9sJcLWHAHcBPawdWqNatTfZAyxUBBLMRgKzIktK0e38w8Y1mFWiGRV2Bqb3ALp16vdYyZGcpux8y5bHBwZPCC700f2NxHZ4Z');
//     //   stripe.charges.create({
//     //     amount: 2000,
//     //     currency: "usd",
//     //     source: "tok_mastercard", // obtained with Stripe.js
//     //     metadata: {'order_id': '6735'}
//     //   });
     
//     //   console.log(stripe),()=>{

//     //     console.log("Haseeb")
//     //      console.log(stripe)
//     //   }
//     // }
//   };




//   const reset = () => {
//     setError(null);
//     setProcessing(false);
//     setPaymentMethod(null);
//     setBillingDetails({
//       name: "",
//       email: "",
//       phone: "",
//     });
//   };
//   return (
// <form className="Form" onSubmit={handleSubmit}>
//       <fieldset className="FormGroup" style={{marginLeft:"0px",marginTop:"9px",border:"1px solid #ccc8c8",width:"107%",marginBottom:"17px"}}>
//         <CardField
//           onChange={(e) => {
//             setError(e.error);
//             setCardComplete(e.complete);
//           }}
//         />
//       </fieldset>
//       {error && <ErrorMessage>{error.message}</ErrorMessage>}
//       <SubmitButton processing={processing} error={error} disabled={!stripe}>
//         Pay
//       </SubmitButton>
//     </form>
//   );
// }
// export default DreamCartCheckoutPaymentForm;
import React, { useState, useEffect } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { accountService, alertService } from '@/_services';
import { useHistory } from "react-router-dom";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
    const history = useHistory();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [campain_id, setCampainID] = useState("");
  const [campain_actual_price, setCampainActualPrice] = useState("");
  const [campain_cash_paid, setCampainCashPaid] = useState("");
  const [campain_discount, setCampainDiscount] = useState("");
  const [campain_dreamcoin, setCampainDreamCoin] = useState("");
  const [campain_count, setCampainCount] = useState("");
  const [discount_amount, setDiscountAmount] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const [user, setUser] = useState(null);

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!!localStorage.userDetails) {            
      setUser(JSON.parse(localStorage.userDetails));
   }
    setCampainID(localStorage.getItem("selected_campaign_id"))
    setCampainActualPrice(localStorage.getItem("selected_campaign_actual_price"))
    setCampainCashPaid(localStorage.getItem("selected_campaign_cash_paid"))
    setCampainDiscount(localStorage.getItem("discount_code"))
    setCampainDreamCoin(localStorage.getItem("dream_coins"))
    setCampainCount(localStorage.getItem("item_count_value"))
    setDiscountAmount(localStorage.getItem("selected_campaign_discount_amount"))
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          console.log("paymentIntent status");
          console.log(paymentIntent);
          console.log(paymentIntent.status);
          onStripToken(paymentIntent)
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }


    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:8080/dream-cart-payment",
      },
    });
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }
    setIsLoading(false);
  };
  const onStripToken = (token) => {
    const userDetails = { discountCode:"",campain_discount:parseFloat(campain_discount), campaignId:campain_id,actualPrice:parseFloat(campain_actual_price), discountAmount:parseFloat(discount_amount),
    dreamCoinsUsed:parseFloat("0"), cashPaid:parseFloat(campain_cash_paid),totalPurchasedCoupons:parseInt(campain_count), payment_token_id:token.id,
    type_of_payment:"stripe", payment_instrument:"card",payment_instrument_type:"VISA",user_token:!!user?user.jwtToken:""
  }
    console.log(userDetails);
    alertService.clear();
    accountService.PurchaseCoupons(userDetails.discountCode,
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
 
    }).catch(message => {
      alert(message);
  });
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className='responsive'>
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit" class="Paynow">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay with card"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

