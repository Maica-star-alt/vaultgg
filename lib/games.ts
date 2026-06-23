export const GAMES = [
  { id: "mlbb", name: "Mobile Legends", short: "MLBB", color: "#e63946", emoji: "⚔️" },
  { id: "pubg", name: "PUBG Mobile", short: "PUBG", color: "#f4a261", emoji: "🔫" },
  { id: "roblox", name: "Roblox", short: "Roblox", color: "#ff6b6b", emoji: "🎮" },
];

export function getGame(id: string) {
  return GAMES.find((g) => g.id === id) ?? { id, name: id, short: id, color: "#f59e0b", emoji: "🎮" };
}

export function gameBadgeClass(id: string) {
  const map: Record<string, string> = {
    mlbb: "game-badge-mlbb",
    pubg: "game-badge-pubg",
    roblox: "game-badge-roblox",
  };
  return map[id] ?? "game-badge-default";
}

export type PaymentMethod = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  detail: string;
  country: string;
};

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: "gcash", name: "GCash", emoji: "💙", description: "Send to GCash number", detail: "You will receive our GCash number.", country: "🇵🇭 Philippines" },
  { id: "maya", name: "Maya (PayMaya)", emoji: "💚", description: "Send to Maya number", detail: "You will receive our Maya number.", country: "🇵🇭 Philippines" },
  { id: "shopeepay", name: "ShopeePay", emoji: "🧡", description: "Send via ShopeePay", detail: "You will receive our ShopeePay link.", country: "🇵🇭 Philippines / SEA" },
  { id: "grabpay", name: "GrabPay", emoji: "🟢", description: "Send via GrabPay", detail: "You will receive our GrabPay details.", country: "🇵🇭 Philippines / SEA" },
  { id: "bdo", name: "Bank Transfer (BDO)", emoji: "🏦", description: "Transfer to BDO account", detail: "You will receive our BDO account number.", country: "🇵🇭 Philippines" },
  { id: "bpi", name: "Bank Transfer (BPI)", emoji: "🏦", description: "Transfer to BPI account", detail: "You will receive our BPI account number.", country: "🇵🇭 Philippines" },
  { id: "unionbank", name: "Bank Transfer (UnionBank)", emoji: "🏦", description: "Transfer to UnionBank", detail: "You will receive our UnionBank account details.", country: "🇵🇭 Philippines" },
  { id: "seabank", name: "SeaBank", emoji: "🌊", description: "Send to SeaBank number", detail: "You will receive our SeaBank mobile number.", country: "🇵🇭 Philippines" },
  { id: "tng", name: "Touch n Go (TNG)", emoji: "🇲🇾", description: "Send via TNG eWallet", detail: "You will receive our TNG QR code.", country: "🇲🇾 Malaysia" },
  { id: "paynow", name: "PayNow", emoji: "🇸🇬", description: "Send via PayNow", detail: "You will receive our PayNow number.", country: "🇸🇬 Singapore" },
  { id: "gopay", name: "GoPay / OVO / Dana", emoji: "🇮🇩", description: "Send via Indonesian e-wallet", detail: "You will receive our GoPay number.", country: "🇮🇩 Indonesia" },
  { id: "paypal", name: "PayPal", emoji: "🌐", description: "Send via PayPal", detail: "You will receive our PayPal email.", country: "🌏 International" },
];
