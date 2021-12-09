// import React, { useState, useEffect } from "react";
// import { CardElement, useStripe, useElements ,CardNumberElement } from "@stripe/react-stripe-js";
// export default function StripPaymentCheckoutForm() {
//   const [succeeded, setSucceeded] = useState(false);
//   const [error, setError] = useState(null);
//   const [processing, setProcessing] = useState("");
//   const [disabled, setDisabled] = useState(true);
//   const [clientSecret, setClientSecret] = useState("");
//   const stripe = useStripe();
//   const elements = useElements();
  
//   useEffect(() => {
//     let url ='http://localhost:4242/create-payment-intent'
//     fetch(url, {
//          method: "POST",
//          body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
//        })
//      .then((res) => { 
//        return res.json();
//      }).then((data) => {
//        setClientSecret(data.clientSecret);
//      });
//        window.scrollTo(0, 0)
//   }, []);
//   const handleChange = async (event) => {
//     setDisabled(event.empty);
//     setError(event.error ? event.error.message : "");
//   };
//   const handleSubmit = async (ev) => {
//     ev.preventDefault();
//     setProcessing(true);
//         const payload = await stripe.confirmCardPayment(clientSecret, {
//             payment_method: {
//             card: elements.getElement(CardNumberElement),
//             billing_details: {
//                 // include other billing details like customer name
//                 address: {
//                 postal_code: "1222", // pass customer postal code
//                 },
//             },
//             },
//         });
//     if (payload.error) {
//       setError(`Payment failed ${payload.error.message}`);
//       setProcessing(false);
//     } else {
//       setError(null);
//       setProcessing(false);
//       setSucceeded(true);
//     }
//   };
//   const PaymentConfirm= async (e) => {
//     const stripe = require("stripe")("sk_test_51J9sJcLWHAHcBPawdWqNatTfZAyxUBBLMRgKzIktK0e38w8Y1mFWiGRV2Bqb3ALp16vdYyZGcpux8y5bHBwZPCC700f2NxHZ4Z");
//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: 1200, // Specify amount here
//         currency: "usd" // Specify currency here
//       });
//       // Return client secret
//       res.send({
//         clientSecret: paymentIntent.client_secret
//       });
//   }
// return (
//     <form id="payment-form" onSubmit={handleSubmit}>
//       <CardElement 
//         id="card-element"
//         options={{}} 
//         onChange={handleChange}
//       />
//       <button disabled={processing || disabled || succeeded} id="submit">
//         <span id="button-text">
//           {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
//         </span>
//       </button>
//       {/* Show any error that happens when processing the payment */}
//       {error && (
//         <div className="card-error" role="alert">{error}</div>
//       )}
//       {/* Show a success message upon completion */}
//       <p className={succeeded ? "result-message" : "result-message hidden"}>Payment succeeded!</p>
//     </form>
//   );
// }