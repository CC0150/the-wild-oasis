import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://orlkodjvpprzfnzceywu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ybGtvZGp2cHByemZuemNleXd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4Njk2MzYsImV4cCI6MjA3ODQ0NTYzNn0.Ogkox4_KisTOE3bqfGTXaV8J2YKBceZnaE0MGKmYlwI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
