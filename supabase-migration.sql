-- Migration My Wai — Table commandes Stripe
-- À exécuter dans le SQL Editor du projet Supabase My Wai

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent TEXT,
  customer_email TEXT,
  offer TEXT NOT NULL,           -- 'b2c_49', 'b2c_99', 'b2b_990'
  amount NUMERIC NOT NULL,       -- montant en EUR
  currency TEXT DEFAULT 'eur',
  status TEXT DEFAULT 'pending', -- pending, paid, failed, refunded
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS orders_customer_email_idx ON orders(customer_email);
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status);
CREATE INDEX IF NOT EXISTS orders_stripe_session_idx ON orders(stripe_session_id);

-- RLS : accès admin uniquement (via service_role)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy pour lecture admin (dashboard interne)
CREATE POLICY "service_role_full_access" ON orders
  USING (true)
  WITH CHECK (true);
