"use server";

import type Stripe from "stripe";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { PRODUCTS } from "@/lib/products";
import { formatAmountForStripe } from "@/utils/stripe-helpers";

const CURRENCY = "usd";

export async function createCheckoutSession(productId: string) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) {
    throw new Error(`Product with id "${productId}" not found`);
  }

  const headerList = await headers();
  const origin = headerList.get("origin") as string;

  // Create Checkout Sessions from body params.
  const session: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      mode: "payment",
      ui_mode: "embedded",
      return_url: `${origin}/purchase/result?session_id={CHECKOUT_SESSION_ID}`,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: formatAmountForStripe(product.priceInCents, CURRENCY),
          },
          quantity: 1,
        },
      ],
    });

  return {
    client_secret: session.client_secret,
    url: session.url,
  };
}

export async function createPaymentIntent(
  data: FormData,
): Promise<{ client_secret: string }> {
  const paymentIntent: Stripe.PaymentIntent =
    await stripe.paymentIntents.create({
      amount: formatAmountForStripe(
        Number(data.get("customDonation") as string),
        CURRENCY,
      ),
      automatic_payment_methods: { enabled: true },
      currency: CURRENCY,
    });

  return { client_secret: paymentIntent.client_secret as string };
}
