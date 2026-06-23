"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Eye, ShoppingBag } from "lucide-react";
import { supabase, type Listing } from "@/lib/supabase";
import { getGame } from "@/lib/games";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const ADMIN_PASSWORD = "vaultgg2024admin";

type Order = {
  id: string; listing_id: string; buyer_name: string;
  buyer_contact: string; payment_method: string;
  status: string; created_at: string;
};

export default function Admin() {
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState("");
  const [tab, setTab] = useState<"pending" | "approved" | "orders">("pending");
  const [listings, setListings] = useState<Listing[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  function login() {
    if (pw === ADMIN_PASSWORD) setAuth(true);
    else alert("Wrong password");
  }

  async function fetchListings(status: string) {
    setLoading(true);
    const { data } = await supabase.from("listings").select("*").eq("status", status).order("created_at", { ascending: false });
    setListings(data ?? []);
    setLoading(false);
  }

  async function fetchOrders() {
    setLoading(true);
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setOrders(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    if (!auth) return;
    if (tab === "orders") fetchOrders();
    else fetchListings(tab);
  }, [auth, tab]);

  async function updateListing(id: string, status: string) {
    await supabase.from("listings").update({ status }).eq("id", id);
    setListings((l) => l.filter((x) => x.id !== id));
  }

  async function updateOrder(id: string, status: string) {
    await supabase.from("orders").update({ status }).eq("id", id);
    fetchOrders();
  }

  if (!auth) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-bg-card p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-8 rounded-lg bg-accent text-black font-bold text-sm flex items-center justify-center">V</div>
            <span className="font-bold text-ink">VaultGG Admin</span>
          </div>
          <label className="text-sm text-ink-muted">Admin password</label>
          <input type="password" value={pw} onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            className="mt-2 w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-ink outline-none focus:border-accent"
            placeholder="Enter password" />
          <Button onClick={login} className="mt-4 w-full">Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-bg-card px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-accent text-black font-bold text-sm flex items-center justify-center">V</div>
          <span className="font-bold text-ink">VaultGG Admin</span>
        </div>
        <a href="/" className="text-xs text-ink-muted hover:text-ink">← Back to site</a>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex gap-2 mb-8">
          {[
            { key: "pending", label: "Pending Review" },
            { key: "approved", label: "Live Listings" },
            { key: "orders", label: "Orders" },
          ].map((t) => (
            <button key={t.key} onClick={() => setTab(t.key as any)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${tab === t.key ? "bg-accent text-black" : "border border-border text-ink-muted hover:text-ink"}`}>
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-20 text-center text-ink-muted">Loading...</div>
        ) : tab === "orders" ? (
          <div className="space-y-4">
            {orders.length === 0 ? <p className="text-center py-20 text-ink-muted">No orders yet</p> : orders.map((o) => (
              <Card key={o.id} className="p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="font-mono text-xs text-ink-muted">Order #{o.id.slice(0, 8).toUpperCase()}</p>
                    <p className="mt-1 font-semibold text-ink">{o.buyer_name}</p>
                    <p className="text-sm text-ink-muted">{o.buyer_contact} · {o.payment_method}</p>
                    <p className="text-xs text-ink-muted mt-1">Listing: {o.listing_id.slice(0, 8).toUpperCase()}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${o.status === "completed" ? "bg-positive/10 text-positive" : o.status === "cancelled" ? "bg-negative/10 text-negative" : "bg-accent/10 text-accent"}`}>
                      {o.status}
                    </span>
                    {o.status === "pending" && (
                      <>
                        <Button size="sm" variant="success" onClick={() => updateOrder(o.id, "completed")}>Mark complete</Button>
                        <Button size="sm" variant="danger" onClick={() => updateOrder(o.id, "cancelled")}>Cancel</Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {listings.length === 0 ? (
              <p className="text-center py-20 text-ink-muted">
                {tab === "pending" ? "No listings waiting for review" : "No approved listings"}
              </p>
            ) : listings.map((l) => {
              const game = getGame(l.game);
              return (
                <Card key={l.id} className="p-5">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm">{game.emoji}</span>
                        <span className="font-mono text-xs text-ink-muted">{game.short}</span>
                        <span className="font-mono text-xs text-ink-muted">#{l.id.slice(0, 8).toUpperCase()}</span>
                      </div>
                      <p className="font-semibold text-ink">{l.title}</p>
                      {l.rank && <p className="text-sm text-ink-muted mt-0.5">Rank: {l.rank}</p>}
                      <p className="text-lg font-bold text-accent mt-1">₱{l.price.toLocaleString()}</p>
                      <p className="text-xs text-ink-muted mt-1">Seller: {l.seller_name} · {l.seller_contact}</p>
                      {l.description && <p className="text-xs text-ink-muted mt-1 line-clamp-2">{l.description}</p>}
                      {l.proof_url && (
                        <a href={l.proof_url} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-2 text-xs text-accent hover:underline">
                          <Eye size={12} /> View proof
                        </a>
                      )}
                    </div>
                    <div className="flex gap-2 flex-col sm:flex-row">
                      {tab === "pending" && (
                        <>
                          <Button size="sm" variant="success" onClick={() => updateListing(l.id, "approved")}>
                            <CheckCircle2 size={14} /> Approve
                          </Button>
                          <Button size="sm" variant="danger" onClick={() => updateListing(l.id, "sold")}>
                            <XCircle size={14} /> Reject
                          </Button>
                        </>
                      )}
                      {tab === "approved" && (
                        <Button size="sm" variant="danger" onClick={() => updateListing(l.id, "sold")}>
                          Mark as Sold
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
