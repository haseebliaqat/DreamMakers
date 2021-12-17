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
  const [count, setCount] = useState(1);
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
        return_url: "https://test.dreammakers.ae/dream-cart-payment",
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

