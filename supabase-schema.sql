-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor → New query)

-- Listings table
create table listings (
  id uuid default gen_random_uuid() primary key,
  game text not null,
  title text not null,
  description text,
  price numeric not null,
  rank text,
  level text,
  heroes_skins text,
  seller_name text not null,
  seller_contact text not null,
  proof_url text,
  status text default 'pending' check (status in ('pending', 'approved', 'sold')),
  created_at timestamptz default now()
);

-- Orders table
create table orders (
  id uuid default gen_random_uuid() primary key,
  listing_id uuid references listings(id),
  buyer_name text not null,
  buyer_contact text not null,
  payment_method text not null,
  status text default 'pending' check (status in ('pending', 'paid', 'completed', 'cancelled')),
  created_at timestamptz default now()
);

-- Allow anyone to read approved listings
create policy "Public can view approved listings"
  on listings for select
  using (status = 'approved');

-- Allow anyone to insert new listings (seller submissions)
create policy "Anyone can submit a listing"
  on listings for insert
  with check (true);

-- Allow anyone to insert orders
create policy "Anyone can place an order"
  on orders for insert
  with check (true);

-- Enable RLS
alter table listings enable row level security;
alter table orders enable row level security;

-- Admin can do everything (we'll use service role key for admin panel)
create policy "Admin full access listings"
  on listings for all
  using (true);

create policy "Admin full access orders"
  on orders for all
  using (true);
