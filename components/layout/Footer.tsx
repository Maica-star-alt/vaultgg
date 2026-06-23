export function Footer() {
  return (
    <footer className="border-t border-border mt-24 py-10 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-black font-bold text-xs">V</div>
              <span className="font-bold text-ink">VaultGG</span>
            </div>
            <p className="text-xs text-ink-muted leading-relaxed">
              Trusted middleman for gaming accounts in Southeast Asia.
            </p>
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-ink-muted mb-3">Trade</p>
            <div className="space-y-2">
              <a href="/browse" className="block text-sm text-ink-muted hover:text-ink">Browse Accounts</a>
              <a href="/sell" className="block text-sm text-ink-muted hover:text-ink">Sell Account</a>
              <a href="/how-to-pay" className="block text-sm text-ink-muted hover:text-ink">How to Pay</a>
            </div>
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-ink-muted mb-3">Support</p>
            <div className="space-y-2">
              <a href="/contact" className="block text-sm text-ink-muted hover:text-ink">Contact Us</a>
              <a href="/faq" className="block text-sm text-ink-muted hover:text-ink">FAQ</a>
              <a href="/admin" className="block text-sm text-ink-muted hover:text-ink">Admin</a>
            </div>
          </div>
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-ink-muted mb-3">Connect</p>
            <div className="space-y-2">
              <a href="https://t.me/VaultGG" target="_blank" rel="noopener noreferrer" className="block text-sm text-ink-muted hover:text-ink">✈️ Telegram</a>
              <a href="https://facebook.com/VaultGG" target="_blank" rel="noopener noreferrer" className="block text-sm text-ink-muted hover:text-ink">📘 Facebook</a>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ink-muted">© 2026 VaultGG. All rights reserved.</p>
          <p className="text-xs text-ink-muted">🔒 All trades protected by VaultGG escrow</p>
        </div>
      </div>
    </footer>
  );
}
