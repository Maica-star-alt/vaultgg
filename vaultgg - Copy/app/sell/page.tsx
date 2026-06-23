"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Shield, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { GAMES } from "@/lib/games";

const emptyForm = {
  game: "mlbb", title: "", description: "", price: "",
  rank: "", level: "", heroes_skins: "", seller_name: "", seller_contact: "", proof_url: ""
};

export default function Sell() {
  const [form, setForm] = useState(emptyForm);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function set(k: string, v: string) { setForm((f) => ({ ...f, [k]: v })); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.price || !form.seller_name || !form.seller_contact) {
      setError("Please fill in all required fields."); return;
    }
    setError(""); setSubmitting(true);
    const { error: err } = await supabase.from("listings").insert({
      game: form.game, title: form.title, description: form.description,
      price: Number(form.price), rank: form.rank, level: form.level,
      heroes_skins: form.heroes_skins, seller_name: form.seller_name,
      seller_contact: form.seller_contact, proof_url: form.proof_url,
      status: "pending",
    });
    setSubmitting(false);
    if (err) { setError("Something went wrong. Please try again."); return; }
    setDone(true);
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-2xl px-6 pt-28 pb-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ink">Sell Your Account</h1>
          <p className="mt-2 text-ink-muted">Fill in the details below. VaultGG will review your listing within 24 hours before it goes live.</p>
        </div>

        {done ? (
          <div className="rounded-2xl border border-positive/30 bg-positive/5 p-10 text-center">
            <CheckCircle2 size={48} className="mx-auto text-positive" strokeWidth={1.5} />
            <h2 className="mt-4 text-2xl font-bold text-ink">Listing submitted!</h2>
            <p className="mt-3 text-ink-muted">
              VaultGG will review your account within 24 hours. We will contact you at{" "}
              <span className="text-ink">{form.seller_contact}</span> once it is approved and live.
            </p>
            <button onClick={() => { setForm(emptyForm); setDone(false); }} className="mt-6 text-sm text-accent hover:underline">
              Submit another listing
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-ink">Game *</label>
              <div className="mt-2 grid grid-cols-3 gap-3">
                {GAMES.map((g) => (
                  <button key={g.id} type="button" onClick={() => set("game", g.id)}
                    className={`rounded-xl border p-3 text-center transition-all ${form.game === g.id ? "border-accent bg-accent/10 text-accent" : "border-border bg-bg-card text-ink-muted hover:border-accent/50"}`}>
                    <div className="text-2xl">{g.emoji}</div>
                    <div className="mt-1 text-xs font-medium">{g.short}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-ink">Listing title *</label>
              <input value={form.title} onChange={(e) => set("title", e.target.value)}
                placeholder="e.g. MLBB Mythical Glory Account 150+ Skins"
                className="mt-2 w-full rounded-lg border border-border bg-bg-card px-4 py-2.5 text-sm text-ink outline-none focus:border-accent" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-ink">Rank</label>
                <input value={form.rank} onChange={(e) => set("rank", e.target.value)} placeholder="e.g. Mythical Glory"
                  className="mt-2 w-full rounded-lg border border-border bg-bg-card px-4 py-2.5 text-sm text-ink outline-none focus:border-accent" />
              </div>
              <div>
                <label className="text-sm font-medium text-ink">Account level</label>
                <input value={form.level} onChange={(e) => set("level", e.target.value)} placeholder="e.g. Level 120"
                  className="mt-2 w-full rounded-lg border border-border bg-bg-card px-4 py-2.5 text-sm text-ink outline-none focus:border-accent" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-ink">Heroes / Skins / Items included</label>
              <input value={form.heroes_skins} onChange={(e) => set("heroes_skins", e.target.value)}
                placeholder="e.g. 80 heroes, 150 skins including Legend and Special skins"
                className="mt-2 w-full rounded-lg border border-border bg-bg-card px-4 py-2.5 text-sm text-ink outline-none focus:border-accent" />
            </div>

            <div>
              <label className="text-sm font-medium text-ink">Description</label>
              <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={4}
                placeholder="Tell buyers more about the account..."
                className="mt-2 w-full resize-none rounded-lg border border-border bg-bg-card px-4 py-2.5 text-sm text-ink outline-none focus:border-accent" />
            </div>

            <div>
              <label className="text-sm font-medium text-ink">Your asking price (PHP) *</label>
              <div className="mt-2 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-sm">₱</span>
                <input type="number" value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="e.g. 2500"
                  className="w-full rounded-lg border border-border bg-bg-card pl-7 pr-4 py-2.5 text-sm text-ink outline-none focus:border-accent" />
              </div>
              {form.price && (
                <p className="mt-1.5 text-xs text-ink-muted">
                  You will receive ₱{Math.round(Number(form.price) * 0.9).toLocaleString()} after VaultGG&apos;s 10% fee
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-ink">Screenshot proof URL</label>
              <input value={form.proof_url} onChange={(e) => set("proof_url", e.target.value)}
                placeholder="Imgur or Google Drive link"
                className="mt-2 w-full rounded-lg border border-border bg-bg-card px-4 py-2.5 text-sm text-ink outline-none focus:border-accent" />
              <p className="mt-1 text-xs text-ink-muted">Upload a screenshot showing your rank/items and paste the link here.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-ink">Your name *</label>
                <input value={form.seller_name} onChange={(e) => set("seller_name", e.target.value)} placeholder="Juan dela Cruz"
                  className="mt-2 w-full rounded-lg border border-border bg-bg-card px-4 py-2.5 text-sm text-ink outline-none focus:border-accent" />
              </div>
              <div>
                <label className="text-sm font-medium text-ink">GCash / Telegram / FB *</label>
                <input value={form.seller_contact} onChange={(e) => set("seller_contact", e.target.value)} placeholder="09XX or @username"
                  className="mt-2 w-full rounded-lg border border-border bg-bg-card px-4 py-2.5 text-sm text-ink outline-none focus:border-accent" />
              </div>
            </div>

            {error && (
              <p className="rounded-lg bg-negative/10 border border-negative/30 px-4 py-3 text-sm text-negative">{error}</p>
            )}

            <div className="rounded-xl border border-border bg-bg-card p-4 flex items-start gap-3">
              <Shield size={18} className="text-accent shrink-0 mt-0.5" />
              <p className="text-xs text-ink-muted">
                By submitting, you confirm this account belongs to you and agree to VaultGG&apos;s 10% service fee.
                VaultGG will contact you to verify the account before it goes live.
              </p>
            </div>

            <Button type="submit" disabled={submitting} size="lg" className="w-full">
              {submitting ? "Submitting..." : "Submit Listing for Review"}
            </Button>
          </form>
        )}
      </main>
      <Footer />
    </>
  );
}
