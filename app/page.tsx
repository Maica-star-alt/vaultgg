"use client";

import { useEffect, useState } from "react";
import { Shield, Zap, Users, ArrowRight, Star } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ListingCard } from "@/components/ui/ListingCard";
import { supabase, type Listing } from "@/lib/supabase";
import { GAMES } from "@/lib/games";

const steps = [
  { icon: "📋", title: "Seller submits", body: "Seller fills the listing form with account details, rank, and proof screenshots." },
  { icon: "✅", title: "VaultGG verifies", body: "We review every listing manually. Fake accounts are rejected immediately." },
  { icon: "💳", title: "Buyer pays VaultGG", body: "Buyer sends payment via GCash, Maya, or bank transfer. Money is held safely." },
  { icon: "🔑", title: "Account handed over", body: "We coordinate the transfer. Once buyer confirms it works, seller gets paid." },
];

const trust = [
  { icon: Shield, label: "Escrow protection", detail: "We hold the money until both sides are happy" },
  { icon: Zap, label: "Fast trades", detail: "Most trades complete within 24 hours" },
  { icon: Users, label: "SEA community", detail: "Built for PH, MY, SG, ID players" },
  { icon: Star, label: "Verified listings", detail: "Every account manually reviewed before listing" },
];

export default function Home() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("listings")
      .select("*")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(6)
      .then(({ data }) => { setListings(data ?? []); setLoading(false); });
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgb(245_158_11_/_0.08),transparent)]" />
          <div className="mx-auto max-w-6xl px-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent">
              🔒 Every trade protected by escrow
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-ink sm:text-6xl">
              Buy & Sell Gaming Accounts<br />
              <span className="text-accent">Safely in Southeast Asia</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base text-ink-muted sm:text-lg">
              VaultGG is the trusted middleman for MLBB, PUBG Mobile, Roblox and more.
              We hold payment in escrow until you are happy with the account.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <ButtonLink href="/browse" size="lg">Browse Accounts <ArrowRight size={18} /></ButtonLink>
              <ButtonLink href="/sell" variant="secondary" size="lg">Sell My Account</ButtonLink>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-ink-muted">
              {["No scam risk", "GCash & Maya accepted", "Fast 24hr trades", "Verified accounts only"].map((t) => (
                <span key={t} className="flex items-center gap-1"><span className="text-positive">✓</span> {t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Game tabs */}
        <section className="py-8 border-y border-border">
          <div className="mx-auto max-w-6xl px-6 flex flex-wrap items-center justify-center gap-4">
            {GAMES.map((g) => (
              <a key={g.id} href={`/browse?game=${g.id}`}
                className="flex items-center gap-2 rounded-full border border-border bg-bg-card px-5 py-2.5 text-sm font-medium text-ink-muted hover:border-accent/50 hover:text-ink transition-all">
                <span>{g.emoji}</span> {g.name}
              </a>
            ))}
          </div>
        </section>

        {/* Featured listings */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl font-bold text-ink">Latest Accounts</h2>
                <p className="mt-1 text-sm text-ink-muted">All verified and ready to trade</p>
              </div>
              <ButtonLink href="/browse" variant="secondary" size="sm">View all <ArrowRight size={14} /></ButtonLink>
            </div>
            {loading ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => <div key={i} className="h-52 rounded-xl bg-bg-card animate-pulse border border-border" />)}
              </div>
            ) : listings.length === 0 ? (
              <div className="rounded-xl border border-border bg-bg-card py-20 text-center">
                <p className="text-2xl">🎮</p>
                <p className="mt-3 font-medium text-ink">No listings yet — be the first!</p>
                <ButtonLink href="/sell" className="mt-6 inline-flex">Sell an Account</ButtonLink>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {listings.map((l) => <ListingCard key={l.id} listing={l} />)}
              </div>
            )}
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="py-20 border-t border-border">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold text-ink">How VaultGG works</h2>
              <p className="mt-3 text-ink-muted">Simple, safe, and fast every time</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <Card key={s.title} className="p-6">
                  <div className="text-3xl">{s.icon}</div>
                  <div className="mt-1 font-mono text-xs text-ink-muted">Step {i + 1}</div>
                  <h3 className="mt-2 font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed">{s.body}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trust */}
        <section className="py-20 border-t border-border">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-ink">Why traders trust VaultGG</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {trust.map(({ icon: Icon, label, detail }) => (
                <div key={label} className="flex flex-col items-center text-center gap-3 p-6 rounded-xl border border-border bg-bg-card hover:border-accent/40 transition-colors">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <p className="font-semibold text-ink">{label}</p>
                  <p className="text-sm text-ink-muted">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-border">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-2xl border border-accent/30 bg-accent/5 p-10 text-center">
              <h2 className="text-3xl font-bold text-ink">Ready to trade safely?</h2>
              <p className="mt-3 text-ink-muted max-w-md mx-auto">Join SEA gamers who buy and sell accounts through VaultGG every week.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <ButtonLink href="/browse" size="lg">Browse Accounts</ButtonLink>
                <ButtonLink href="/sell" variant="secondary" size="lg">Sell My Account</ButtonLink>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
