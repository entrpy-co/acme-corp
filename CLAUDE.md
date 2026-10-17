@AGENTS.md

# Acme Corp

A small online shop. Next.js (App Router) on Vercel, catalog in Supabase (`products` table).
This is a **test business for Foreman**: it exists so we can run real change requests end to end.

## Rules for any agent working here

- Work on a branch and open a PR. Never push to `main`.
- `npm run lint` and `npm run build` must pass before you open the PR; CI runs the same.
- Keep the look: plain, black on white, red accent (`text-red-600`), Geist fonts, Tailwind classes.
- Data changes go in a NEW file in `supabase/migrations/` (next number). Never edit an applied migration.
- The site reads Supabase with the anon key and RLS read-only. Never use or add a service role key in app code.
- Do not edit `.github/` or `vercel.json`. Those belong to the gate.
- Prices are integer cents in the database; format with `formatPrice`.
- Next 16.4 prerenders by default: anything that reads live data (Supabase, `cookies()`, `connection()`) must sit inside a `<Suspense>` boundary, as `ProductGrid` does in `app/page.tsx`.
