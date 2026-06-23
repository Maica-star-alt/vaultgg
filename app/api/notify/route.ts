import { NextResponse } from "next/server";

// This endpoint is called by Supabase webhooks when new listings/orders arrive
// Set up in Supabase: Database → Webhooks → Create new webhook
// URL: https://your-site.netlify.app/api/notify
// Events: INSERT on listings table, INSERT on orders table

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, table, record } = body;

    // Your Telegram bot token and chat ID
    // Set these in Netlify environment variables
    const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT_ID) {
      return NextResponse.json({ ok: false, reason: "Telegram not configured" });
    }

    let message = "";

    if (table === "listings" && type === "INSERT") {
      message = `🆕 NEW LISTING SUBMITTED\n\n` +
        `Game: ${record.game?.toUpperCase()}\n` +
        `Title: ${record.title}\n` +
        `Price: ₱${Number(record.price).toLocaleString()}\n` +
        `Seller: ${record.seller_name} (${record.seller_contact})\n\n` +
        `👉 Review at: https://vaultgg-sea.netlify.app/admin`;
    }

    if (table === "orders" && type === "INSERT") {
      message = `💰 NEW ORDER RECEIVED\n\n` +
        `Buyer: ${record.buyer_name}\n` +
        `Contact: ${record.buyer_contact}\n` +
        `Payment: ${record.payment_method}\n` +
        `Listing ID: ${record.listing_id?.slice(0, 8).toUpperCase()}\n\n` +
        `👉 Manage at: https://vaultgg-sea.netlify.app/admin`;
    }

    if (!message) {
      return NextResponse.json({ ok: true, skipped: true });
    }

    // Send Telegram message
    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "HTML",
        }),
      }
    );

    const result = await res.json();
    return NextResponse.json({ ok: result.ok });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
