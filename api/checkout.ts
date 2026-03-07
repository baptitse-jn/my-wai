import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover",
});

// Price IDs par offre (remplis avec les vrais IDs de Caroline en prod)
const PRICES: Record<string, string> = {
  b2c_49: process.env.STRIPE_PRICE_B2C_49 ?? "",
  b2c_99: process.env.STRIPE_PRICE_B2C_99 ?? "",
  b2b_990: process.env.STRIPE_PRICE_B2B_990 ?? "",
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { offer, customerEmail, metadata = {} } = req.body as {
    offer: string;
    customerEmail?: string;
    metadata?: Record<string, string>;
  };

  const priceId = PRICES[offer];
  if (!priceId) {
    return res.status(400).json({ error: `Offre inconnue : ${offer}` });
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VITE_SITE_URL ?? "https://my-w.ai";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: customerEmail,
      locale: "fr",
      payment_method_types: ["card"],
      metadata: {
        offer,
        ...metadata,
      },
      success_url: `${baseUrl}/paiement/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/paiement/annulation`,
      // Activer Apple Pay et Google Pay automatiquement
      payment_method_options: {
        card: {
          setup_future_usage: "off_session",
        },
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (err: unknown) {
    console.error("Stripe checkout error:", err);
    const message = err instanceof Error ? err.message : "Erreur Stripe";
    return res.status(500).json({ error: message });
  }
}
