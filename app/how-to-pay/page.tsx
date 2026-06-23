import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ArrowRight, Shield } from "lucide-react";

const GUIDES = [
  {
    id: "gcash",
    name: "GCash",
    emoji: "💙",
    color: "border-blue-500/30 bg-blue-500/5",
    steps: [
      "Open your GCash app on your phone",
      "Tap Send Money at the bottom",
      "Enter VaultGG's GCash number: 09XX-XXX-XXXX",
      "Enter the exact amount shown in your order (including the 10% fee)",
      "In the message/note field, type your Order ID (e.g. ORDER-AB1234)",
      "Tap Send and take a screenshot of the confirmation",
      "Send the screenshot to VaultGG on Telegram or FB",
      "We will verify payment and coordinate the account handover within 1 hour",
    ],
  },
  {
    id: "maya",
    name: "Maya (PayMaya)",
    emoji: "💚",
    color: "border-green-500/30 bg-green-500/5",
    steps: [
      "Open your Maya app on your phone",
      "Tap Send Money",
      "Enter VaultGG's Maya number: 09XX-XXX-XXXX",
      "Enter the exact total amount from your order",
      "Add your Order ID in the note field",
      "Confirm and take a screenshot",
      "Send the screenshot to VaultGG on Telegram or FB",
      "We will process your order within 1 hour",
    ],
  },
  {
    id: "bank",
    name: "Bank Transfer (BDO / BPI / UnionBank)",
    emoji: "🏦",
    color: "border-yellow-500/30 bg-yellow-500/5",
    steps: [
      "Log in to your online banking app (BDO, BPI, or UnionBank)",
      "Go to Transfer / Send Money",
      "Select the bank that matches VaultGG's account (we will tell you which after you order)",
      "Enter the account number and account name provided by VaultGG",
      "Enter the exact total amount from your order",
      "Add your Order ID in the remarks/reference field",
      "Complete the transfer and save the transaction reference number",
      "Send the reference number to VaultGG on Telegram or FB — we verify within 2 hours",
    ],
  },
  {
    id: "paypal",
    name: "PayPal",
    emoji: "🌐",
    color: "border-indigo-500/30 bg-indigo-500/5",
    steps: [
      "Log in to your PayPal account at paypal.com or on the app",
      "Click Send & Request",
      "Enter VaultGG's PayPal email: vaultgg@email.com (we will confirm this after your order)",
      "Enter the total amount in PHP or the equivalent in your currency",
      "Select Sending to a friend (to avoid extra fees)",
      "Add your Order ID in the note",
      "Click Send and take a screenshot",
      "Send the screenshot to VaultGG on Telegram — we will process within 2 hours",
    ],
  },
];

const WARNINGS = [
  "Always include your Order ID when sending payment — this is how we match your payment to your order",
  "Never send money directly to the seller — always send to VaultGG only",
  "Take a screenshot of every payment you make and keep it until the trade is complete",
  "If you sent the wrong amount, contact us immediately on Telegram before we process the order",
];

export default function HowToPay() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 pt-28 pb-20">
        <div className="mb-10">
          <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
            Payment Guide
          </span>
          <h1 className="mt-3 text-4xl font-bold text-ink">How to Pay VaultGG</h1>
          <p className="mt-2 text-ink-muted max-w-xl">
            Step-by-step instructions for every payment method. Follow exactly and your trade will go smoothly.
          </p>
        </div>

        {/* Important warnings */}
        <div className="mb-10 rounded-xl border border-accent/30 bg-accent/5 p-6">
          <h2 className="font-semibold text-accent flex items-center gap-2 mb-4">
            <Shield size={18} /> Important — read before paying
          </h2>
          <ul className="space-y-2">
            {WARNINGS.map((w) => (
              <li key={w} className="flex items-start gap-2.5 text-sm text-ink-muted">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {w}
              </li>
            ))}
          </ul>
        </div>

        {/* Payment guides */}
        <div className="space-y-6">
          {GUIDES.map((guide) => (
            <Card key={guide.id} className={`border ${guide.color} p-6`}>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl">{guide.emoji}</span>
                <h2 className="text-xl font-bold text-ink">{guide.name}</h2>
              </div>
              <ol className="space-y-3">
                {guide.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20 font-mono text-xs font-bold text-accent">
                      {i + 1}
                    </span>
                    <p className="text-sm text-ink-muted leading-relaxed pt-0.5">{step}</p>
                  </li>
                ))}
              </ol>
            </Card>
          ))}
        </div>

        {/* Still confused CTA */}
        <div className="mt-12 rounded-2xl border border-border bg-bg-card p-8 text-center">
          <h2 className="text-xl font-bold text-ink">Still confused?</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Message us directly and we will walk you through the payment step by step.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/contact" size="lg">
              Contact VaultGG <ArrowRight size={16} />
            </ButtonLink>
            <a
              href="https://t.me/VaultGG"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-bg-elevated px-5 py-2.5 text-sm font-medium text-ink hover:border-accent/50 transition-colors"
            >
              ✈️ Message on Telegram
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
