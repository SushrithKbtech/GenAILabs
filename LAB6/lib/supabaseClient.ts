import { createClient } from '@supabase/supabase-js';

// ====================================================================================
// 🚨 ACTION REQUIRED: PASTE YOUR SUPABASE KEYS BELOW
// 1. Go to https://supabase.com/dashboard/project/_/settings/api
// 2. Copy "Project URL" -> Paste into supabaseUrl
// 3. Copy "anon" / "public" key -> Paste into supabaseKey
// ====================================================================================

const supabaseUrl: string = 'https://lljgyxwzlbfgmfyuwbsk.supabase.co'; 
const supabaseKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxsamd5eHd6bGJmZ21meXV3YnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNTk4NjgsImV4cCI6MjA3OTkzNTg2OH0.BiGfBfIes9B4pyTurkqLp7ldjsO32jp8Yi-ZYQokMYk';

// Helper to check if the user has actually replaced the placeholders
const isConfigured = supabaseUrl !== 'YOUR_SUPABASE_URL' && 
                     supabaseUrl !== '' && 
                     supabaseKey !== 'YOUR_SUPABASE_ANON_KEY';

// Internal validation to prevent app crash on load if keys are missing or invalid
const isValidUrl = (url: string) => {
  try { return Boolean(new URL(url)); } catch(e) { return false; }
}

if (!isConfigured || !isValidUrl(supabaseUrl)) {
  console.warn('⚠️ Supabase credentials missing! Please update lib/supabaseClient.ts');
}

export const isSupabaseConnected = isConfigured && isValidUrl(supabaseUrl);

// Export the client. If url is invalid, we create a dummy one to allow the UI to render
// This prevents the "Invalid URL" error that crashes the whole app
export const supabase = (isConfigured && isValidUrl(supabaseUrl))
  ? createClient(supabaseUrl, supabaseKey)
  : createClient('https://placeholder.supabase.co', 'placeholder');