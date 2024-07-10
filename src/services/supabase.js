import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://twuylquryexsgasuhofc.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3dXlscXVyeWV4c2dhc3Vob2ZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc2NzQzODAsImV4cCI6MjAzMzI1MDM4MH0.j-7vI_Y2vx-odwpW7fwMdF466En9KV19JBb606wY9Ng"
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;