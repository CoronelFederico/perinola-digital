import { createClient } from "@supabase/supabase-js";

export const supabase = (() => {
  if (typeof window === "undefined") return null;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.error("❌ Supabase env variables missing");
    return null;
  }

  return createClient(url, key);
})();
