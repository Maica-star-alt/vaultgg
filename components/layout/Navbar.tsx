"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

const links = [
  { href: "/browse", label: "Browse" },
  { href: "/sell", label: "Sell Account" },
  { href: "/how-to-pay", label: "How to Pay" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-black font-bold text-sm">V</div>
          <span className="font-bold text-lg text-ink">VaultGG</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-ink-muted hover:text-ink transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <ButtonLink href="/sell" variant="secondary" size="sm">Sell Account</ButtonLink>
          <ButtonLink href="/browse" size="sm">Browse Accounts</ButtonLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-ink md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-bg px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm text-ink-muted hover:text-ink">
                {l.label}
              </a>
            ))}
            <ButtonLink href="/browse" className="mt-2 w-full justify-center">Browse Accounts</ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}
