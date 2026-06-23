"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Shield, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { supabase, type Listing } from "@/lib/supabase";
import { getGame, gameBadgeClass, PAYMENT_METHODS } from "@/lib/games";

// Group payment methods by country
const PAYMENT_GROUPS = [
  { country: "🇵🇭 Philippines", ids: ["gcash", "maya", "shopeepay", "grabpay", "bdo", "bpi", "unionbank", "seabank"] },
  { country: "🇲🇾 Malaysia", ids: ["tng"] },
  { country: "🇸🇬 Singapore", ids: ["paynow"] },
  { country: "🇮🇩 Indonesia", ids: ["gopay"] },
  { country: "🌏 International", ids: ["paypal"] },
];

export default function ListingPage() {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<"view" | "payment" | "details" | "done">("view");
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [form, setForm] = useState({ buyer_name: "", buyer_contact: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    supabase.from("listings").select("*").eq("id", id).single()
      .then(({ data }) => { setListing(data); setLoading(false); });
  }, [id]);

  async function handleOrder() {
    if (!listing) return;
    setSubmitting(true);
    const method = PAYMENT_METHODS.find(m => m.id === selectedPayment);
    await supabase.from("orders").insert({
      listing_id: listing.id,
      buyer_name: form.buyer_name,
      buyer_contact: form.buyer_contact,
      payment_method: method?.name ?? selectedPayment,
      status: "pending",
    });
    setSubmitting(false);
    setStep("done");
  }

  if (loading) return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="h-8 w-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
    </div>
  );
  if (!listing) return (
    <div className="min-h-screen bg-bg flex items-center justify-center text-ink-muted">Listing not found</div>
  );

  const game = getGame(listing.game);
  const fee = Math.round(listing.price * 0.1);
  const total = listing.price + fee;
  const selectedMethod = PAYMENT_METHODS.find(m => m.id === selectedPayment);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 pt-28 pb-20">
        <ButtonLink href="/browse" variant="ghost" size="sm" className="mb-6 -ml-1">
          <ArrowLeft size={15} /> Back to listings
        </ButtonLink>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Left - listing info */}
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
              {listing.rank && (
                <div className="rounded-lg border border-border bg-bg-card p-3">
                  <p className="text-xs text-ink-muted">Rank</p>
                  <p className="mt-1 font-semibold text-ink">{listing.rank}</p>
                </div>
              )}
              {listing.level && (
                <div className="rounded-lg border border-border bg-bg-card p-3">
                  <p className="text-xs text-ink-muted">Level</p>
                  <p className="mt-1 font-semibold text-ink">{listing.level}</p>
                </div>
              )}
              <div className="rounded-lg border border-border bg-bg-card p-3">
                <p className="text-xs text-ink-muted">Listing ID</p>
                <p className="mt-1 font-mono text-sm text-ink">#{listing.id.slice(0, 8).toUpperCase()}</p>
              </div>
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

          {/* Right - order panel */}
          <div>
            <Card className="p-6 sticky top-24">

              {/* STEP 1 - View price */}
              {step === "view" && (
                <>
                  <p className="text-sm text-ink-muted">Account price</p>
                  <p className="text-4xl font-bold text-accent mt-1">₱{listing.price.toLocaleString()}</p>
                  <div className="mt-4 space-y-2 border-t border-border pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-ink-muted">Account price</span>
                      <span className="text-ink">₱{listing.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-ink-muted">VaultGG fee (10%)</span>
                      <span className="text-ink">₱{fee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t border-border pt-2 mt-2">
                      <span className="text-ink">Total</span>
                      <span className="text-accent">₱{total.toLocaleString()}</span>
                    </div>
                  </div>
                  {listing.status === "sold" ? (
                    <div className="mt-5 rounded-lg bg-negative/10 border border-negative/30 p-3 text-center text-sm text-negative">
                      This account has been sold
                    </div>
                  ) : (
                    <Button onClick={() => setStep("payment")} className="mt-5 w-full" size="lg">
                      Buy This Account
                    </Button>
                  )}
                  <p className="mt-3 text-center text-xs text-ink-muted">Choose your payment method on the next step</p>
                </>
              )}

              {/* STEP 2 - Pick payment method */}
              {step === "payment" && (
                <>
                  <h3 className="font-semibold text-ink mb-1">Choose payment method</h3>
                  <p className="text-xs text-ink-muted mb-4">Select how you want to pay VaultGG</p>

                  <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
                    {PAYMENT_GROUPS.map((group) => {
                      const methods = PAYMENT_METHODS.filter(m => group.ids.includes(m.id));
                      if (methods.length === 0) return null;
                      return (
                        <div key={group.country}>
                          <p className="text-[10px] font-mono uppercase tracking-widest text-ink-muted mb-2">{group.country}</p>
                          <div className="space-y-2">
                            {methods.map((method) => (
                              <button
                                key={method.id}
                                type="button"
                                onClick={() => setSelectedPayment(method.id)}
                                className={`w-full rounded-xl border p-3 text-left transition-all ${
                                  selectedPayment === method.id
                                    ? "border-accent bg-accent/10"
                                    : "border-border bg-bg hover:border-accent/40"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2.5">
                                    <span className="text-xl">{method.emoji}</span>
                                    <div>
                                      <p className="text-sm font-medium text-ink">{method.name}</p>
                                      <p className="text-xs text-ink-muted">{method.description}</p>
                                    </div>
                                  </div>
                                  {selectedPayment === method.id && (
                                    <CheckCircle2 size={18} className="text-accent shrink-0" />
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <Button
                    onClick={() => setStep("details")}
                    disabled={!selectedPayment}
                    className="mt-5 w-full"
                  >
                    Continue with {selectedMethod?.name ?? "selected method"}
                  </Button>
                  <button onClick={() => setStep("view")} className="mt-3 w-full text-xs text-ink-muted hover:text-ink">
                    ← Go back
                  </button>
                </>
              )}

              {/* STEP 3 - Enter details */}
              {step === "details" && (
                <>
                  <div className="flex items-center gap-2 mb-4 rounded-lg bg-accent/10 border border-accent/20 px-3 py-2">
                    <span className="text-lg">{selectedMethod?.emoji}</span>
                    <div>
                      <p className="text-sm font-medium text-accent">{selectedMethod?.name}</p>
                      <p className="text-xs text-ink-muted">{selectedMethod?.detail}</p>
                    </div>
                  </div>

                  <h3 className="font-semibold text-ink mb-4">Your details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-ink-muted">Your name</label>
                      <input
                        value={form.buyer_name}
                        onChange={(e) => setForm({ ...form, buyer_name: e.target.value })}
                        placeholder="Juan dela Cruz"
                        className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-ink-muted">
                        Your {selectedMethod?.id === "paypal" ? "PayPal email" : "GCash / Telegram / FB"} for coordination
                      </label>
                      <input
                        value={form.buyer_contact}
                        onChange={(e) => setForm({ ...form, buyer_contact: e.target.value })}
                        placeholder={selectedMethod?.id === "paypal" ? "your@email.com" : "09XX-XXX-XXXX or @username"}
                        className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-accent"
                      />
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg bg-accent/5 border border-accent/20 p-3 text-xs text-ink-muted">
                    After submitting, VaultGG will contact you with exact payment details for <strong className="text-ink">{selectedMethod?.name}</strong>. Only send money to VaultGG — never directly to the seller.
                  </div>

                  <Button
                    onClick={handleOrder}
                    disabled={!form.buyer_name || !form.buyer_contact || submitting}
                    className="mt-4 w-full"
                    size="lg"
                  >
                    {submitting ? "Submitting..." : `Confirm · ₱${total.toLocaleString()}`}
                  </Button>
                  <button onClick={() => setStep("payment")} className="mt-3 w-full text-xs text-ink-muted hover:text-ink">
                    ← Change payment method
                  </button>
                </>
              )}

              {/* STEP 4 - Done */}
              {step === "done" && (
                <div className="text-center py-4">
                  <div className="text-4xl">✅</div>
                  <h3 className="mt-3 font-bold text-ink">Order received!</h3>
                  <p className="mt-2 text-sm text-ink-muted">
                    VaultGG will contact you at{" "}
                    <span className="text-ink font-medium">{form.buyer_contact}</span>{" "}
                    with {selectedMethod?.name} payment instructions within a few hours.
                  </p>
                  <div className="mt-4 rounded-lg bg-accent/5 border border-accent/20 p-3 text-xs text-ink-muted">
                    Only send payment to VaultGG — never directly to the seller.
                  </div>
                  <ButtonLink href="/browse" variant="secondary" className="mt-5 w-full justify-center">
                    Browse more accounts
                  </ButtonLink>
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
