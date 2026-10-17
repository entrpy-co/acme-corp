import { Suspense } from "react";
import { connection } from "next/server";
import { formatPrice, listProducts } from "@/lib/supabase";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-3">
        <p className="font-mono text-xs uppercase tracking-widest text-red-600">Since 1949</p>
        <h1 className="text-4xl font-semibold tracking-tight">Quality goods for ambitious plans.</h1>
        <p className="max-w-xl text-black/60">
          Anvils, rocket skates and portable holes, shipped anywhere a road runs.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Products</h2>
        <Suspense fallback={<p className="text-sm text-black/40">Loading the catalog…</p>}>
          <ProductGrid />
        </Suspense>
      </section>
    </div>
  );
}

async function ProductGrid() {
  await connection(); // always read the live catalog
  const products = await listProducts();
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <li key={p.id} className="flex flex-col gap-2 rounded-lg border border-black/10 p-4">
          <span className="font-mono text-xs uppercase tracking-wider text-black/40">{p.category}</span>
          <span className="font-medium">{p.name}</span>
          <span className="text-sm text-black/60">{p.tagline}</span>
          <span className="mt-auto flex items-baseline justify-between pt-2">
            <span className="font-semibold tabular-nums">{formatPrice(p.price_cents)}</span>
            <span className={`text-xs ${p.stock < 5 ? "text-red-600" : "text-black/40"}`}>
              {p.stock < 5 ? `Only ${p.stock} left` : `${p.stock} in stock`}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
