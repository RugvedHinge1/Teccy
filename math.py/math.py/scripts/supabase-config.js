// Supabase Configuration
const SUPABASE_URL = 'https://feyodgbzzznfogexwzwa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZleW9kZ2J6enpuZm9nZXh3endhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0NjQ2MzAsImV4cCI6MjA4NjA0MDYzMH0.xGRkDRk9UdTKMW3ULpxBAEy5qqX_sLwTppuaPX5wFUk';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export for use in other files
window.supabaseClient = supabase;
