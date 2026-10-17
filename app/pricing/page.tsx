import { Suspense } from "react";
import { connection } from "next/server";
import { formatPrice, listProducts, type Product } from "@/lib/supabase";

export const metadata = { title: "Pricing · Acme Corp" };

export default function Pricing() {
  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">Pricing</h1>
        <p className="max-w-xl text-black/60">Every product we sell, grouped by category.</p>
      </section>

      <Suspense fallback={<p className="text-sm text-black/40">Loading prices…</p>}>
        <PriceList />
      </Suspense>
    </div>
  );
}

async function PriceList() {
  await connection(); // always read the live catalog
  const products = await listProducts();

  const byCategory = new Map<string, Product[]>();
  for (const p of products) {
    byCategory.set(p.category, [...(byCategory.get(p.category) ?? []), p]);
  }

  if (byCategory.size === 0) {
    return <p className="text-sm text-black/40">No products yet.</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      {[...byCategory].map(([category, items]) => (
        <section key={category}>
          <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-red-600">{category}</h2>
          <ul className="divide-y divide-black/10 border-y border-black/10">
            {items.map((p) => (
              <li key={p.id} className="flex items-baseline justify-between gap-4 py-3">
                <span className="flex flex-col">
                  <span className="font-medium">{p.name}</span>
                  <span className="text-sm text-black/60">{p.tagline}</span>
                </span>
                <span className="font-semibold tabular-nums">{formatPrice(p.price_cents)}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
