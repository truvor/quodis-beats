import Stripe from "stripe";

const stripe = new Stripe(String(process.env.STRIPE_SECRET_KEY));

const balance = await stripe.balance.retrieve();

export default async function Page() {
  return (
    <>
      <h1>Customers</h1>
      <span>{balance.available[0].amount}</span>
    </>
  );
}
