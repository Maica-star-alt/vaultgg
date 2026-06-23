"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Shield, ArrowLeft, MessageCircle, AlertTriangle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { supabase, type Listing } from "@/lib/supabase";
import { getGame, gameBadgeClass, PAYMENT_METHODS } from "@/lib/games";

export default function ListingPage() {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<"view" | "order" | "done">("view");
  const [form, setForm] = useState({ buyer_name: "", buyer_contact: "", payment_method: "GCash" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    supabase.from("listings").select("*").eq("id", id).single()
      .then(({ data }) => { setListing(data); setLoading(false); });
  }, [id]);

  async function handleOrder() {
    if (!listing) return;
    setSubmitting(true);
    await supabase.from("orders").insert({
      listing_id: listing.id,
      buyer_name: form.buyer_name,
      buyer_contact: form.buyer_contact,
      payment_method: form.payment_method,
      status: "pending",
    });
    setSubmitting(false);
    setStep("done");
  }

  if (loading) return <div className="min-h-screen bg-bg flex items-center justify-center"><div className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent animate-spin" /></div>;
  if (!listing) return <div className="min-h-screen bg-bg flex items-center justify-center text-ink-muted">Listing not found</div>;

  const game = getGame(listing.game);
  const fee = Math.round(listing.price * 0.1);
  const total = listing.price + fee;

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 pt-28 pb-20">
        <ButtonLink href="/browse" variant="ghost" size="sm" className="mb-6 -ml-1">
          <ArrowLeft size={15} /> Back to listings
        </ButtonLink>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-medium ${gameBadgeClass(listing.game)}`}>
                {game.emoji} {game.name}
              </span>
              {listing.status === "sold" && (
                <span className="rounded-full bg-negative/10 border border-negative/30 px-3 py-1 text-xs text-negative">SOLD</span>
              )}
            </div>

            <h1 className="text-2xl font-bold text-ink sm:text-3xl">{listing.title}</h1>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {listing.rank && <div className="rounded-lg border border-border bg-bg-card p-3"><p className="text-xs text-ink-muted">Rank</p><p className="mt-1 font-semibold text-ink">{listing.rank}</p></div>}
              {listing.level && <div className="rounded-lg border border-border bg-bg-card p-3"><p className="text-xs text-ink-muted">Level</p><p className="mt-1 font-semibold text-ink">{listing.level}</p></div>}
              <div className="rounded-lg border border-border bg-bg-card p-3"><p className="text-xs text-ink-muted">Listing ID</p><p className="mt-1 font-mono text-sm text-ink">#{listing.id.slice(0, 8).toUpperCase()}</p></div>
            </div>

            {listing.description && (
              <div className="mt-6">
                <h2 className="font-semibold text-ink mb-2">Description</h2>
                <p className="text-sm text-ink-muted leading-relaxed whitespace-pre-wrap">{listing.description}</p>
              </div>
            )}

            {listing.heroes_skins && (
              <div className="mt-6">
                <h2 className="font-semibold text-ink mb-2">Heroes / Skins included</h2>
                <p className="text-sm text-ink-muted leading-relaxed">{listing.heroes_skins}</p>
              </div>
            )}

            <div className="mt-8 rounded-xl border border-positive/30 bg-positive/5 p-5">
              <div className="flex items-start gap-3">
                <Shield size={20} className="text-positive shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-positive">VaultGG Escrow Protection</p>
                  <p className="mt-1 text-sm text-ink-muted">Your payment is held by VaultGG until you confirm the account works. Zero scam risk.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — order panel */}
          <div>
            <Card className="p-6 sticky top-24">
              {step === "view" && (
                <>
                  <p className="text-sm text-ink-muted">Account price</p>
                  <p className="text-4xl font-bold text-accent mt-1">₱{listing.price.toLocaleString()}</p>
                  <div className="mt-4 space-y-2 border-t border-border pt-4">
                    <div className="flex justify-between text-sm"><span className="text-ink-muted">Account price</span><span className="text-ink">₱{listing.price.toLocaleString()}</span></div>
                    <div className="flex justify-between text-sm"><span className="text-ink-muted">VaultGG service fee (10%)</span><span className="text-ink">₱{fee.toLocaleString()}</span></div>
                    <div className="flex justify-between font-semibold border-t border-border pt-2 mt-2"><span className="text-ink">Total</span><span className="text-accent">₱{total.toLocaleString()}</span></div>
                  </div>
                  {listing.status === "sold" ? (
                    <div className="mt-5 rounded-lg bg-negative/10 border border-negative/30 p-3 text-center text-sm text-negative">This account has been sold</div>
                  ) : (
                    <Button onClick={() => setStep("order")} className="mt-5 w-full" size="lg">Buy This Account</Button>
                  )}
                  <p className="mt-3 text-center text-xs text-ink-muted">Payment via GCash, Maya, or bank transfer</p>
                </>
              )}

              {step === "order" && (
                <>
                  <h3 className="font-semibold text-ink mb-4">Enter your details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-ink-muted">Your name</label>
                      <input value={form.buyer_name} onChange={(e) => setForm({ ...form, buyer_name: e.target.value })}
                        placeholder="Juan dela Cruz"
                        className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent" />
                    </div>
                    <div>
                      <label className="text-xs text-ink-muted">GCash / Telegram / FB for coordination</label>
                      <input value={form.buyer_contact} onChange={(e) => setForm({ ...form, buyer_contact: e.target.value })}
                        placeholder="09XX-XXX-XXXX or @username"
                        className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent" />
                    </div>
                    <div>
                      <label className="text-xs text-ink-muted">Payment method</label>
                      <select value={form.payment_method} onChange={(e) => setForm({ ...form, payment_method: e.target.value })}
                        className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent">
                        {PAYMENT_METHODS.map((m) => <option key={m}>{m}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 rounded-lg bg-accent/5 border border-accent/20 p-3 text-xs text-ink-muted">
                    After submitting, VaultGG will contact you with payment instructions. Only send money to VaultGG — never directly to the seller.
                  </div>
                  <Button
                    onClick={handleOrder}
                    disabled={!form.buyer_name || !form.buyer_contact || submitting}
                    className="mt-4 w-full"
                  >
                    {submitting ? "Submitting..." : `Confirm Order · ₱${total.toLocaleString()}`}
                  </Button>
                  <button onClick={() => setStep("view")} className="mt-3 w-full text-xs text-ink-muted hover:text-ink">← Go back</button>
                </>
              )}

              {step === "done" && (
                <div className="text-center py-4">
                  <div className="text-4xl">✅</div>
                  <h3 className="mt-3 font-bold text-ink">Order received!</h3>
                  <p className="mt-2 text-sm text-ink-muted">VaultGG will contact you at <span className="text-ink">{form.buyer_contact}</span> within a few hours with payment instructions.</p>
                  <div className="mt-4 rounded-lg bg-accent/5 border border-accent/20 p-3 text-xs text-ink-muted">
                    Remember: only send payment to VaultGG, never directly to the seller.
                  </div>
                  <ButtonLink href="/browse" variant="secondary" className="mt-5 w-full justify-center">Browse more accounts</ButtonLink>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
