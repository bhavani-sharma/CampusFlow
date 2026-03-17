import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,       // uses localStorage automatically
    autoRefreshToken: true,
    detectSessionInUrl: true,   // reads token from magic link URL
  }
});

// Redirect URL helper — works on localhost AND Vercel
export const getRedirectURL = () =>
  window.location.origin + '/auth/callback';