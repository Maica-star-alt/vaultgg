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

export const PAYMENT_METHODS = [
  "GCash",
  "Maya (PayMaya)",
  "Bank Transfer (BDO)",
  "Bank Transfer (BPI)",
  "Bank Transfer (Seabank)",
  "GrabPay",
];
