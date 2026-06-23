import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Listing = {
  id: string;
  game: string;
  title: string;
  description: string;
  price: number;
  rank?: string;
  level?: string;
  heroes_skins?: string;
  seller_name: string;
  seller_contact: string;
  proof_url?: string;
  status: "pending" | "approved" | "sold";
  created_at: string;
};
