// const express = require("express");
// const app = express();
// // This is a sample test API key.
// const stripe = require("stripe")('sk_test_51J9sJcLWHAHcBPawdWqNatTfZAyxUBBLMRgKzIktK0e38w8Y1mFWiGRV2Bqb3ALp16vdYyZGcpux8y5bHBwZPCC700f2NxHZ4Z');

// app.use(express.static("public"));
// app.use(express.json());

// const calculateOrderAmount = (items) => {
//   console.log("items")
//   console.log(items)
//   return 720;
// };

// app.post("/create-payment-intent", async (req, res) => {
//   const { items } = req.body;

//   // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: calculateOrderAmount(items),
//     currency: "aed",
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });

//   res.send({
//     clientSecret: paymentIntent.client_secret,
//   });
// });

// app.listen(4000, () => console.log("Node server listening on port 4000!"));