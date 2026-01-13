import type { Stripe } from "stripe";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function ResultPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ session_id?: string }>;
}>) {
  const { session_id: sessionId } = (await searchParams) ?? {};
  if (!sessionId) redirect("/login");

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "payment_intent"],
    });

  const paymentIntent = checkoutSession.payment_intent as Stripe.PaymentIntent;
  const formattedContent: string = JSON.stringify(checkoutSession, null, 2);

  const beatId = checkoutSession.metadata!.beat_id;
  const contractType = checkoutSession.metadata!.contract_type;

  if (paymentIntent.status === ("succeeded" as Stripe.PaymentIntent.Status)) {
    const supabase = await createClient();
    const { data: { session } = {} } = await supabase.auth.getSession();
    const token = session?.access_token;

    if (!token) {
      throw new Error("Unable to retrieve Supabase token from client");
    }

    const url = new URL("/purchase", process.env.CONTRACT_GENERATOR_URL);
    const urlStr = url.toString();
    const response = await fetch(urlStr, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ beat_id: beatId }),
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    const data = await response.json();
    const pdfUrl = data.pdf_url;
    redirect(pdfUrl);
  }

  return (
    <>
      <h2>Status: {paymentIntent.status}</h2>
      <h3>Checkout Session response:</h3>
      <pre>{formattedContent}</pre>;
    </>
  );
}
