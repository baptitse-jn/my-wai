import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

function getSupabase() {
  return createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );
}

export const config = { api: { bodyParser: false } };

async function getRawBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const rawBody = await getRawBody(req);
  const signature = req.headers["stripe-signature"] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return res.status(400).json({ error: "Invalid signature" });
  }

  const supabase = getSupabase();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      const { error } = await supabase.from("orders").insert({
        id: crypto.randomUUID(),
        stripe_session_id: session.id,
        stripe_payment_intent: session.payment_intent as string,
        customer_email: session.customer_email,
        offer: session.metadata?.offer ?? "unknown",
        amount: (session.amount_total ?? 0) / 100,
        currency: session.currency ?? "eur",
        status: "paid",
        metadata: session.metadata,
      });

      if (error) {
        console.error("Supabase insert error:", error);
      } else {
        console.log(`Commande enregistrée : ${session.id} — ${session.customer_email}`);
      }
      break;
    }

    case "payment_intent.payment_failed": {
      const intent = event.data.object as Stripe.PaymentIntent;
      await supabase.from("orders").upsert({
        stripe_payment_intent: intent.id,
        customer_email: intent.receipt_email,
        status: "failed",
        amount: intent.amount / 100,
        currency: intent.currency,
        offer: "unknown",
      });
      console.log(`Paiement échoué : ${intent.id}`);
      break;
    }

    case "charge.refunded": {
      const charge = event.data.object as Stripe.Charge;
      await supabase
        .from("orders")
        .update({ status: "refunded" })
        .eq("stripe_payment_intent", charge.payment_intent as string);
      console.log(`Remboursement : ${charge.payment_intent}`);
      break;
    }

    default:
      console.log(`Event non géré : ${event.type}`);
  }

  return res.status(200).json({ received: true });
}
