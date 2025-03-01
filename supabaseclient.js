import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://fwzkswsesezxhpjyrbru.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3emtzd3Nlc2V6eGhwanlyYnJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyNTE1MzAsImV4cCI6MjA1NTgyNzUzMH0.fSXBhoqEUTGSg5Vq6Se6mzjzSM3g2USlinfRAHDxvcg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
