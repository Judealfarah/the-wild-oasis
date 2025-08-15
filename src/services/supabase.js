import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://nmyzfzghidtkuveenvzl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5teXpmemdoaWR0a3V2ZWVudnpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwMDkzNzksImV4cCI6MjA3MDU4NTM3OX0.QcXGDnGevUnoXaeL9m43_YTdEDTdwhduuIfGnTT0Zt8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
