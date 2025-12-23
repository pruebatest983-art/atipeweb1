import { createClient } from '@supabase/supabase-js';

// Use dummy values if env vars are missing to prevent createClient from throwing an error
// The pages are already prepared to handle 'null' data or errors and fallback to mock data
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn('Supabase credentials missing. Database functionality will be limited.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
