"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ListingCard } from "@/components/ui/ListingCard";
import { supabase, type Listing } from "@/lib/supabase";
import { GAMES } from "@/lib/games";

function BrowseContent() {
  const searchParams = useSearchParams();
  const gameFilter = searchParams.get("game") ?? "all";
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeGame, setActiveGame] = useState(gameFilter);
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    setLoading(true);
    let q = supabase.from("listings").select("*").eq("status", "approved");
    if (activeGame !== "all") q = q.eq("game", activeGame);
    if (sort === "newest") q = q.order("created_at", { ascending: false });
    if (sort === "price_asc") q = q.order("price", { ascending: true });
    if (sort === "price_desc") q = q.order("price", { ascending: false });
    q.then(({ data }) => { setListings(data ?? []); setLoading(false); });
  }, [activeGame, sort]);

  const filtered = listings.filter((l) =>
    search === "" || l.title.toLowerCase().includes(search.toLowerCase()) || l.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pt-28 pb-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ink">Browse Accounts</h1>
          <p className="mt-1 text-ink-muted">All listings verified by VaultGG before going live</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveGame("all")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-colors ${activeGame === "all" ? "bg-accent text-black border-accent" : "border-border text-ink-muted hover:text-ink"}`}
            >
              All Games
            </button>
            {GAMES.map((g) => (
              <button
                key={g.id}
                onClick={() => setActiveGame(g.id)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium border transition-colors ${activeGame === g.id ? "bg-accent text-black border-accent" : "border-border text-ink-muted hover:text-ink"}`}
              >
                {g.emoji} {g.short}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-border bg-bg-card px-3 py-2 text-sm text-ink outline-none"
          >
            <option value="newest">Newest first</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
          <input
            type="text"
            placeholder="Search by game, rank, or keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-bg-card pl-9 pr-4 py-2.5 text-sm text-ink outline-none focus:border-accent"
          />
        </div>

        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => <div key={i} className="h-52 rounded-xl bg-bg-card animate-pulse border border-border" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-3xl">🎮</p>
            <p className="mt-4 text-lg font-medium text-ink">No accounts found</p>
            <p className="mt-2 text-sm text-ink-muted">Try a different filter or check back later</p>
          </div>
        ) : (
          <>
            <p className="mb-4 text-sm text-ink-muted">{filtered.length} account{filtered.length !== 1 ? "s" : ""} available</p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((l) => <ListingCard key={l.id} listing={l} />)}
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default function Browse() {
  return <Suspense fallback={<div className="min-h-screen bg-bg" />}><BrowseContent /></Suspense>;
}
