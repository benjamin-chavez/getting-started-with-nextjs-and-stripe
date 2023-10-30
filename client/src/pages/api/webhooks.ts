// src/pages/api/webhooks.ts

import Stripe from 'stripe';
import { buffer } from 'micro';

export const config = {
  api: {
    bodyParser: false,
  },
};

// @ts-ignore
export default async function webhookHandler(req, res) {
  // @ts-ignore
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  if (req.method === 'POST') {
    console.log(req.body);

    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET;

    let event;

    try {
      if (!sig || !webhookSecret) return;

      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (error) {
      // @ts-ignore
      console.log(`Webhook error: ${error.message}`);

      // @ts-ignore
      return res.status(400).send(`Webhook error: ${error.message}`);
    }

    console.log('event: ', event);

    res.status(200).send();
  }
}
