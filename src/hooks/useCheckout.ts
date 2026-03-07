import { useState } from "react";

type Offer = "b2c_49" | "b2c_99" | "b2b_990";

interface CheckoutOptions {
  offer: Offer;
  customerEmail?: string;
  metadata?: Record<string, string>;
}

export function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout({ offer, customerEmail, metadata }: CheckoutOptions) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offer, customerEmail, metadata }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Erreur lors de la création du paiement");
      }

      // Redirection vers Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur inconnue";
      setError(message);
      setLoading(false);
    }
  }

  return { startCheckout, loading, error };
}
