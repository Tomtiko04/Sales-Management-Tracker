import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = "https://xeiymqpwkikgxtzdaqju.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlaXltcXB3a2lrZ3h0emRhcWp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1NzcyNjQsImV4cCI6MjA0MDE1MzI2NH0.JT0tzjRLB0OatW8B6a1-Ap_Be1FYn1BcrV20pUZeuas";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

