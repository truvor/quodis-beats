"use client";

import type Stripe from "stripe";
import { useState } from "react";
import { createCheckoutSession } from "./actions";
import getStripe from "@/utils/get-stripejs";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";

interface CheckoutFormProps {
  uiMode: Stripe.Checkout.SessionCreateParams.UiMode;
  beatId: string
}

export default function CheckoutForm({ uiMode, beatId }: Readonly<CheckoutFormProps>) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const formAction = async (data: FormData): Promise<void> => {
    const uiMode = data.get(
      "uiMode",
    ) as Stripe.Checkout.SessionCreateParams.UiMode;

    // Pass uiMode to define url parameters conditionally
    const { client_secret } = await createCheckoutSession(beatId.toString());

    if (uiMode === "embedded") return setClientSecret(client_secret);
  };

  return (
    <>
      <p>Beat ID: {beatId}</p>
      <form action={formAction}>
        <input type="hidden" name="uiMode" value={uiMode} />
        <button
          className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Purchase
        </button>
      </form>
      {clientSecret ? (
        <EmbeddedCheckoutProvider
          stripe={getStripe()}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      ) : null}
    </>
  );
}
