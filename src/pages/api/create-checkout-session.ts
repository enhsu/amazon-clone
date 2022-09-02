const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { NextApiRequest, NextApiResponse } from "next";
// import { Request, Response } from "express";
import type { Item } from "~/store/slices/cartSlice";

// Stripe reference here: https://stripe.com/docs/api/checkout/sessions/create

type ReqBody = {
  items: Item[];
  email: string;
};

type CustomReqType = Omit<NextApiRequest, "body"> & {
  body: ReqBody;
};

async function CreateCehckoutSession(
  // req: Request<{}, {}, ReqBody>,
  // res: Response
  req: CustomReqType,
  res: NextApiResponse
) {
  const USD_DOLLOR_CENTS = 100;

  const { email, items } = req.body;
  const transformedItems = items.map((item) => ({
    description: item.description,
    quantity: item.quantity,
    price_data: {
      currency: "USD",
      unit_amount: item.price * USD_DOLLOR_CENTS,
      product_data: {
        name: item.title,
        images: [item.image],
      },
    },
  }));

  const sessionParameter = {
    success_url: `${process.env.HOST}/checkout/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "GB", "TW", "JP", "NL"],
    },
    shipping_options: [{ shipping_rate: "shr_1LbggdDEPGUNsFtrPfTKUWsb" }],
    payment_method_types: ["card"],
    mode: "payment",
    line_items: transformedItems,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  };

  const session = await stripe.checkout.sessions.create(sessionParameter);

  res.status(200).json({
    id: session.id,
  });
}

export default CreateCehckoutSession;
