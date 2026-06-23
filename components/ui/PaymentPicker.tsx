"use client";

import { PAYMENT_METHODS, type PaymentMethod } from "@/lib/games";

const groups = [
  { label: "🇵🇭 Philippines", ids: ["gcash", "maya", "shopeepay", "grabpay", "bdo", "bpi", "unionbank", "seabank"] },
  { label: "🇲🇾 Malaysia", ids: ["tng"] },
  { label: "🇸🇬 Singapore", ids: ["paynow"] },
  { label: "🇮🇩 Indonesia", ids: ["gopay"] },
  { label: "🌏 International", ids: ["paypal"] },
];

export function PaymentPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  const selected = PAYMENT_METHODS.find((m) => m.id === value);

  return (
    <div className="space-y-4">
      {groups.map((group) => {
        const methods = PAYMENT_METHODS.filter((m) => group.ids.includes(m.id));
        return (
          <div key={group.label}>
            <p className="mb-2 text-xs font-medium text-ink-muted">{group.label}</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {methods.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => onChange(method.id)}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left transition-all ${
                    value === method.id
                      ? "border-accent bg-accent/10 text-ink"
                      : "border-border bg-bg-card text-ink-muted hover:border-accent/40 hover:text-ink"
                  }`}
                >
                  <span className="text-lg shrink-0">{method.emoji}</span>
                  <span className="text-xs font-medium leading-tight">{method.name}</span>
                </button>
              ))}
            </div>
          </div>
        );
      })}

      {/* Selected method info box */}
      {selected && (
        <div className="rounded-lg border border-accent/30 bg-accent/5 p-3 mt-2">
          <p className="text-xs font-medium text-accent">{selected.emoji} {selected.name} selected</p>
          <p className="mt-1 text-xs text-ink-muted">{selected.detail}</p>
        </div>
      )}
    </div>
  );
}
