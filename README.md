# VaultGG

Gaming account marketplace for Southeast Asia. Buyers and sellers trade safely through VaultGG escrow.

## IMPORTANT — Set up the database first

Before running the app, you need to create the database tables in Supabase.

1. Go to your Supabase project at https://supabase.com/dashboard
2. Click **SQL Editor** in the left sidebar
3. Click **New query**
4. Open the file `supabase-schema.sql` in this folder
5. Copy all the SQL and paste it into the editor
6. Click **Run**

You should see "Success" — your tables are ready.

## Installation

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Pages

- `/` — Homepage with featured listings
- `/browse` — All listings with filters by game and sort
- `/listing/[id]` — Single listing detail + buy flow
- `/sell` — Seller submission form
- `/admin` — Admin panel (password: vaultgg2024admin)

## How the admin panel works

1. Go to `/admin` and enter the password: `vaultgg2024admin`
2. Under **Pending Review** you'll see all new seller submissions
3. Click **Approve** to make a listing go live, or **Reject** to remove it
4. Under **Orders** you'll see all buyer orders — mark them complete once you've coordinated the trade

## How money works

- Buyer pays the listed price + 10% VaultGG fee
- You collect payment via GCash/Maya/bank transfer manually
- Once the buyer confirms the account works, you pay the seller their 90%
- Your profit = 10% of every trade

## Deployment

Same as Afterward — push to GitHub, deploy on Netlify.

```bash
git init
git add .
git commit -m "VaultGG launch"
git remote add origin https://github.com/YOUR_USERNAME/vaultgg.git
git push -u origin main
```

Then import on Netlify. Add the Netlify config:
- Build command: `npm run build`
- Publish directory: `.next`
- Plugin: `@netlify/plugin-nextjs`

## Change the admin password

Open `app/admin/page.tsx` and change the `ADMIN_PASSWORD` constant on line 10.
