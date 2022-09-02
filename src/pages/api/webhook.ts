// import { Request, Response } from "express";
import { buffer } from "micro";
import * as admin from "firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-08-01",
});
import { getErrorMessage } from "~/utils/message/error";

// Secure a connection to FIREBASE from the backend
const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY as string);
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

async function Webhook(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const signature = req.headers["stripe-signature"];

    let event: any;
    // Verify that the event posted came from stripe
    try {
      event = stripe.webhooks.constructEvent(
        payload,
        signature as string,
        endpointSecret as string
      );
    } catch (err) {
      const message = getErrorMessage(err);

      console.log(`ERROR: ${message}`);
      return res.status(400).send(`Webhook error: ${message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Fullfill the order
      return fullfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => {
          const message = getErrorMessage(err);
          res.status(400).send(`Webhook Error: ${message}`);
        });
    }
  }
}

async function fullfillOrder(session: Stripe.Checkout.Session) {
  const USD_DOLLOR_CENTS = 100;

  return app
    .firestore()
    .collection("users")
    .doc(session.metadata?.email as string)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: (session.amount_total as number) / USD_DOLLOR_CENTS,
      amount_shipping:
        (session.total_details?.amount_shipping as number) / USD_DOLLOR_CENTS,
      images: JSON.parse(session.metadata?.images as string),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`SUCCESS: Order ${session.id} had been added to the DB`);
    });
}

export default Webhook;

// previoud code is typical Next.js endpoint -> we need not handle it in the Next.js way.
// Here we configure the endpoint with a config file
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
