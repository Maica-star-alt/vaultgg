import { type Listing } from "@/lib/supabase";
import { getGame, gameBadgeClass } from "@/lib/games";
import { Shield, Tag } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export function ListingCard({ listing }: { listing: Listing }) {
  const game = getGame(listing.game);

  return (
    <div className="group rounded-xl border border-border bg-bg-card hover:border-accent/40 hover:shadow-glow transition-all duration-300 flex flex-col">
      {/* Game color bar */}
      <div className="h-1 rounded-t-xl" style={{ background: game.color }} />

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3">
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${gameBadgeClass(listing.game)}`}>
            {game.emoji} {game.short}
          </span>
          <span className="font-mono text-xs text-ink-muted">#{listing.id.slice(0, 6).toUpperCase()}</span>
        </div>

        <h3 className="mt-3 font-semibold text-ink group-hover:text-accent transition-colors line-clamp-2">
          {listing.title}
        </h3>

        {listing.rank && (
          <p className="mt-1 text-xs text-ink-muted flex items-center gap-1">
            <Tag size={11} /> {listing.rank}
          </p>
        )}

        {listing.description && (
          <p className="mt-2 text-sm text-ink-muted line-clamp-2 flex-1">{listing.description}</p>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <div>
            <p className="font-mono text-xs text-ink-muted">Price</p>
            <p className="font-bold text-accent text-lg">₱{listing.price.toLocaleString()}</p>
          </div>
          <ButtonLink href={`/listing/${listing.id}`} size="sm">
            View Deal
          </ButtonLink>
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-xs text-ink-muted">
          <Shield size={11} className="text-positive" />
          <span>Protected by VaultGG escrow</span>
        </div>
      </div>
    </div>
  );
}
