import type { Stripe } from "stripe";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export default async function ResultPage({
  searchParams,
}: Readonly<{
  searchParams: { session_id: string };
}>) {
  if (!searchParams.session_id) redirect("/login");

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.retrieve(searchParams.session_id, {
      expand: ["line_items", "payment_intent"],
    });

  const paymentIntent = checkoutSession.payment_intent as Stripe.PaymentIntent;
  const formattedContent: string = JSON.stringify(checkoutSession, null, 2);

  return (
    <>
      <h2>Status: {paymentIntent.status}</h2>
      <h3>Checkout Session response:</h3>
      <pre>{formattedContent}</pre>;
    </>
  );
}
