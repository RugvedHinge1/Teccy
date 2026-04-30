-- =============================================
-- TECCY Platform - Complete Database Schema
-- =============================================
-- This script will DROP all existing tables and recreate them
-- Run this in your Supabase SQL Editor

-- =============================================
-- STEP 1: DROP ALL EXISTING TABLES
-- =============================================
-- Drop tables in reverse order of dependencies
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

DROP TABLE IF EXISTS public.buddy_matches CASCADE;
DROP TABLE IF EXISTS public.buddy_requests CASCADE;
DROP TABLE IF EXISTS public.user_progress CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- =============================================
-- STEP 2: CREATE PROFILES TABLE
-- =============================================
-- Stores user profiles with username and additional info
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  current_level TEXT DEFAULT 'Beginner',
  target_level TEXT DEFAULT 'Intermediate',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- =============================================
-- STEP 3: CREATE USER PROGRESS TABLE
-- =============================================
-- Stores diagnosis results and learning progress per topic
CREATE TABLE public.user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  topic TEXT NOT NULL,
  diagnosed_level TEXT,
  current_level TEXT,
  target_level TEXT,
  easy_score INTEGER DEFAULT 0,
  medium_score INTEGER DEFAULT 0,
  hard_score INTEGER DEFAULT 0,
  total_questions INTEGER DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,
  last_practice_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, topic)
);

-- Enable Row Level Security
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Policies for user_progress
CREATE POLICY "Users can view their own progress"
  ON public.user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
  ON public.user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON public.user_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- =============================================
-- STEP 4: CREATE BUDDY REQUESTS TABLE
-- =============================================
-- Stores buddy connection requests
CREATE TABLE public.buddy_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  requester_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  recipient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(requester_id, recipient_id)
);

-- Enable Row Level Security
ALTER TABLE public.buddy_requests ENABLE ROW LEVEL SECURITY;

-- Policies for buddy_requests
CREATE POLICY "Users can view requests involving them"
  ON public.buddy_requests FOR SELECT
  USING (auth.uid() = requester_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can create buddy requests"
  ON public.buddy_requests FOR INSERT
  WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Recipients can update requests"
  ON public.buddy_requests FOR UPDATE
  USING (auth.uid() = recipient_id);

-- =============================================
-- STEP 5: CREATE BUDDY MATCHES TABLE
-- =============================================
-- Stores active buddy connections
CREATE TABLE public.buddy_matches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user1_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  user2_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  shared_topics TEXT[] DEFAULT '{}',
  match_score INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CHECK (user1_id < user2_id), -- Ensure consistent ordering
  UNIQUE(user1_id, user2_id)
);

-- Enable Row Level Security
ALTER TABLE public.buddy_matches ENABLE ROW LEVEL SECURITY;

-- Policies for buddy_matches
CREATE POLICY "Users can view their buddy matches"
  ON public.buddy_matches FOR SELECT
  USING (auth.uid() = user1_id OR auth.uid() = user2_id);

CREATE POLICY "Users can create buddy matches"
  ON public.buddy_matches FOR INSERT
  WITH CHECK (auth.uid() = user1_id OR auth.uid() = user2_id);

CREATE POLICY "Users can update their buddy matches"
  ON public.buddy_matches FOR UPDATE
  USING (auth.uid() = user1_id OR auth.uid() = user2_id);

-- =============================================
-- STEP 6: CREATE TRIGGER FOR AUTO PROFILE CREATION
-- =============================================
-- Automatically create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- STEP 7: CREATE INDEXES FOR PERFORMANCE
-- =============================================
CREATE INDEX idx_user_progress_user_id ON public.user_progress(user_id);
CREATE INDEX idx_user_progress_topic ON public.user_progress(topic);
CREATE INDEX idx_buddy_requests_requester ON public.buddy_requests(requester_id);
CREATE INDEX idx_buddy_requests_recipient ON public.buddy_requests(recipient_id);
CREATE INDEX idx_buddy_requests_status ON public.buddy_requests(status);
CREATE INDEX idx_buddy_matches_user1 ON public.buddy_matches(user1_id);
CREATE INDEX idx_buddy_matches_user2 ON public.buddy_matches(user2_id);
CREATE INDEX idx_buddy_matches_active ON public.buddy_matches(is_active);

-- =============================================
-- STEP 8: VERIFY TABLES CREATED
-- =============================================
-- Run this to check if all tables were created successfully
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE columns.table_name = tables.table_name) as column_count
FROM information_schema.tables tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- =============================================
-- STEP 9: SAMPLE QUERIES (For Testing)
-- =============================================
-- View all profiles
-- SELECT * FROM profiles;

-- View all user progress
-- SELECT * FROM user_progress;

-- View all buddy requests
-- SELECT * FROM buddy_requests;

-- View all buddy matches
-- SELECT * FROM buddy_matches;

-- Count total users
-- SELECT COUNT(*) as total_users FROM profiles;

-- Find potential buddies (users with similar levels)
-- SELECT p.username, p.current_level, p.target_level
-- FROM profiles p
-- WHERE p.id != auth.uid()
-- AND p.current_level = (SELECT current_level FROM profiles WHERE id = auth.uid())
-- LIMIT 10;
