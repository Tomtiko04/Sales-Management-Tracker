import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://wwpomcfdbmtrutthlbok.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3cG9tY2ZkYm10cnV0dGhsYm9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA3Mjc3MTIsImV4cCI6MjAzNjMwMzcxMn0.-isdqqfcn4ygSesKJ7O-F5OR1ivFxwDe2GhvdCcfzm8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;