import { createClient } from "@supabase/supabase-js";

export type Product = {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  price_cents: number;
  stock: number;
  category: string;
};

// Server-only read client. Uses the anon key; RLS allows read only.
export function supabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL and SUPABASE_ANON_KEY must be set");
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function listProducts(): Promise<Product[]> {
  const { data, error } = await supabase()
    .from("products")
    .select("id, slug, name, tagline, price_cents, stock, category")
    .order("category")
    .order("price_cents");
  if (error) throw new Error(`Could not load products: ${error.message}`);
  return data ?? [];
}

export function formatPrice(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}
