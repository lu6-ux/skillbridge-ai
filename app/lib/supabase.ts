"use client";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://csrngmlkcpqwmzlxojkp.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzcm5nbWxrY3Bxd216bHhvamtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM3NTkwNzcsImV4cCI6MjA5OTMzNTA3N30.ARV1cCSNaGEvaEGeKEXzpqhH9gZwzmDQLdSHmMFjfFo";

export const supabase = createClient(supabaseUrl, supabaseKey);