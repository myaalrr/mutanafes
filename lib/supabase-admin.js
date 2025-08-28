// my-website/lib/supabase-admin.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("[supabase-admin] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE");
}

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

