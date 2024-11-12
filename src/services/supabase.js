import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = process.env.SALES_MANAGEMENT_APP_SUPABASE_URL;
const supabaseKey = process.env.SALES_MANAGEMENT_APP_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

