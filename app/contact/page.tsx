"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { supabase } from "@/lib/supabase";
import { MessageCircle, Send, Clock, CheckCircle2, Copy } from "lucide-react";

const CONTACT_METHODS = [
  {
    icon: "💙",
    name: "GCash",
    value: "09XX-XXX-XXXX",
    detail: "Send payment here — always include your order ID in the note",
    copyable: true,
  },
  {
    icon: "💚",
    name: "Maya",
    value: "09XX-XXX-XXXX",
    detail: "Alternative payment method",
    copyable: true,
  },
  {
    icon: "✈️",
    name: "Telegram",
    value: "@VaultGG",
    detail: "Fastest response — usually reply within 1 hour",
    copyable: false,
    link: "https://t.me/VaultGG",
  },
  {
    icon: "📘",
    name: "Facebook",
    value: "VaultGG Official",
    detail: "Message us on FB for support",
    copyable: false,
    link: "https://facebook.com/VaultGG",
  },
];

const HOURS = [
  { day: "Monday – Friday", time: "9:00 AM – 10:00 PM" },
  { day: "Saturday", time: "10:00 AM – 10:00 PM" },
  { day: "Sunday", time: "12:00 PM – 8:00 PM" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  function copyText(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.contact || !form.message) return;
    setSubmitting(true);
    // Store message in Supabase — we'll add a messages table
    // For now just simulate
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    setDone(true);
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 pt-28 pb-20">
        <div className="mb-10">
          <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
            Support
          </span>
          <h1 className="mt-3 text-4xl font-bold text-ink">Contact VaultGG</h1>
          <p className="mt-2 text-ink-muted">
            Need help with a trade? Want to report an issue? We respond fast.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Left — contact methods */}
          <div className="space-y-6">
            {/* Payment contacts */}
            <div>
              <h2 className="font-semibold text-ink mb-4 flex items-center gap-2">
                <span>💳</span> Payment & Coordination
              </h2>
              <div className="space-y-3">
                {CONTACT_METHODS.map((c) => (
                  <Card key={c.name} className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{c.icon}</span>
                        <div>
                          <p className="font-semibold text-ink">{c.name}</p>
                          <p className="font-mono text-sm text-accent">{c.value}</p>
                          <p className="text-xs text-ink-muted mt-0.5">{c.detail}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        {c.copyable && (
                          <button
                            onClick={() => copyText(c.value)}
                            className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs text-ink-muted hover:text-ink hover:border-accent/50 transition-colors"
                          >
                            {copied === c.value ? (
                              <><CheckCircle2 size={12} className="text-positive" /> Copied!</>
                            ) : (
                              <><Copy size={12} /> Copy</>
                            )}
                          </button>
                        )}
                        {c.link && (
                          <a
                            href={c.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs text-ink-muted hover:text-ink hover:border-accent/50 transition-colors"
                          >
                            <Send size={12} /> Open
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div>
              <h2 className="font-semibold text-ink mb-4 flex items-center gap-2">
                <Clock size={16} /> Operating Hours (PHT)
              </h2>
              <Card className="divide-y divide-border">
                {HOURS.map((h) => (
                  <div key={h.day} className="flex items-center justify-between px-4 py-3">
                    <span className="text-sm text-ink-muted">{h.day}</span>
                    <span className="text-sm font-medium text-ink">{h.time}</span>
                  </div>
                ))}
              </Card>
              <p className="mt-3 text-xs text-ink-muted">
                Outside hours? Leave a message — we'll reply when we're back online.
              </p>
            </div>

            {/* Response time */}
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
              <p className="font-semibold text-accent">⚡ Average response time: under 1 hour</p>
              <p className="mt-1 text-sm text-ink-muted">
                Telegram is fastest. For urgent trade issues, always message us on Telegram first.
              </p>
            </div>
          </div>

          {/* Right — message form */}
          <div>
            <Card className="p-6">
              {done ? (
                <div className="py-8 text-center">
                  <CheckCircle2 size={40} className="mx-auto text-positive" strokeWidth={1.5} />
                  <h3 className="mt-4 font-bold text-ink text-xl">Message sent!</h3>
                  <p className="mt-2 text-sm text-ink-muted">
                    We'll get back to you at <span className="text-ink">{form.contact}</span> within the hour.
                  </p>
                  <button
                    onClick={() => { setForm({ name: "", contact: "", message: "" }); setDone(false); }}
                    className="mt-5 text-sm text-accent hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-semibold text-ink mb-1 flex items-center gap-2">
                    <MessageCircle size={18} /> Send us a message
                  </h2>
                  <p className="text-xs text-ink-muted mb-5">For trade disputes, questions, or anything else</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-ink">Your name</label>
                      <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Juan dela Cruz"
                        className="mt-1.5 w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-ink">GCash / Telegram / Email</label>
                      <input
                        value={form.contact}
                        onChange={(e) => setForm({ ...form, contact: e.target.value })}
                        placeholder="So we can reply to you"
                        className="mt-1.5 w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-ink">Message</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={5}
                        placeholder="Describe your issue or question..."
                        className="mt-1.5 w-full resize-none rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={!form.name || !form.contact || !form.message || submitting}
                      className="w-full"
                    >
                      {submitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </>
              )}
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
