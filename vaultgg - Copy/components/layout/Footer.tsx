export function Footer() {
  return (
    <footer className="border-t border-border mt-24 py-10 px-6">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-black font-bold text-xs">V</div>
          <span className="font-bold text-ink">VaultGG</span>
        </div>
        <p className="text-xs text-ink-muted text-center">
          Trusted middleman for gaming accounts in Southeast Asia. All trades protected by escrow.
        </p>
        <div className="flex gap-4 text-xs text-ink-muted">
          <a href="/terms" className="hover:text-ink">Terms</a>
          <a href="/privacy" className="hover:text-ink">Privacy</a>
          <a href="/sell" className="hover:text-ink">Sell</a>
        </div>
      </div>
    </footer>
  );
}
