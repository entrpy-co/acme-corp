-- Acme Corp catalog. Read by the public site with the anon key (RLS: read only).
create table public.products (
  id bigint generated always as identity primary key,
  slug text not null unique,
  name text not null,
  tagline text not null,
  price_cents integer not null check (price_cents >= 0),
  stock integer not null default 0 check (stock >= 0),
  category text not null,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

create policy "products are public to read"
  on public.products for select
  to anon, authenticated
  using (true);

insert into public.products (slug, name, tagline, price_cents, stock, category) values
  ('anvil-classic', 'Classic Anvil', 'Drops true every time. 100 lb of cast iron.', 24900, 42, 'Hardware'),
  ('anvil-mini', 'Mini Anvil', 'For smaller problems. 10 lb.', 4900, 120, 'Hardware'),
  ('rocket-skates', 'Rocket Skates', 'Top speed undisclosed. Helmet sold separately.', 89900, 7, 'Mobility'),
  ('giant-magnet', 'Giant Magnet', 'Attracts nearly everything. Read the label.', 15900, 18, 'Hardware'),
  ('portable-hole', 'Portable Hole', 'Fold it, carry it, use it anywhere.', 29900, 3, 'Novelty'),
  ('jet-bike', 'Jet-Propelled Unicycle', 'One wheel. One jet. Infinite confidence.', 129900, 2, 'Mobility'),
  ('bird-seed', 'Premium Bird Seed', 'Irresistible to fast birds. 20 lb bag.', 1900, 300, 'Supplies'),
  ('dehydrated-boulders', 'Dehydrated Boulders', 'Just add water.', 3900, 64, 'Novelty');
