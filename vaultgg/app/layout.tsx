import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: { default: "VaultGG — Trusted Gaming Account Marketplace SEA", template: "%s · VaultGG" },
  description: "Buy and sell gaming accounts safely in Southeast Asia. MLBB, PUBG Mobile, Roblox and more. Protected by VaultGG escrow.",
  keywords: ["buy gaming account", "sell gaming account", "MLBB account", "PUBG account", "Roblox account", "Philippines", "Southeast Asia"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
