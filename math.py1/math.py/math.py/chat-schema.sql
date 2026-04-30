-- =============================================
-- REAL USER-TO-USER CHAT SYSTEM - DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- =============================================

-- STEP 1: Create friend_requests table
CREATE TABLE IF NOT EXISTS public.friend_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  from_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  to_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status TEXT CHECK (status IN ('pending', 'accepted', 'rejected')) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(from_user_id, to_user_id)
);

-- STEP 2: Create messages table
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  from_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  to_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- STEP 3: Enable RLS on friend_requests
ALTER TABLE public.friend_requests ENABLE ROW LEVEL SECURITY;

-- STEP 4: Drop existing policies if any (for clean re-run)
DROP POLICY IF EXISTS "Users can view their friend requests" ON public.friend_requests;
DROP POLICY IF EXISTS "Users can send friend requests" ON public.friend_requests;
DROP POLICY IF EXISTS "Users can update requests sent to them" ON public.friend_requests;

-- STEP 5: Create RLS policies for friend_requests
CREATE POLICY "Users can view their friend requests"
  ON public.friend_requests FOR SELECT
  USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);

CREATE POLICY "Users can send friend requests"
  ON public.friend_requests FOR INSERT
  WITH CHECK (auth.uid() = from_user_id);

CREATE POLICY "Users can update requests sent to them"
  ON public.friend_requests FOR UPDATE
  USING (auth.uid() = to_user_id);

-- STEP 6: Enable RLS on messages
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- STEP 7: Drop existing policies if any (for clean re-run)
DROP POLICY IF EXISTS "Users can view their messages" ON public.messages;
DROP POLICY IF EXISTS "Users can send messages" ON public.messages;
DROP POLICY IF EXISTS "Users can update received messages" ON public.messages;

-- STEP 8: Create RLS policies for messages
CREATE POLICY "Users can view their messages"
  ON public.messages FOR SELECT
  USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);

CREATE POLICY "Users can send messages"
  ON public.messages FOR INSERT
  WITH CHECK (
    auth.uid() = from_user_id 
    AND EXISTS (
      SELECT 1 FROM public.friend_requests 
      WHERE status = 'accepted' 
      AND ((from_user_id = auth.uid() AND to_user_id = NEW.to_user_id)
           OR (to_user_id = auth.uid() AND from_user_id = NEW.to_user_id))
    )
  );

CREATE POLICY "Users can update received messages"
  ON public.messages FOR UPDATE
  USING (auth.uid() = to_user_id);

-- STEP 9: Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_friend_requests_from_user ON public.friend_requests(from_user_id);
CREATE INDEX IF NOT EXISTS idx_friend_requests_to_user ON public.friend_requests(to_user_id);
CREATE INDEX IF NOT EXISTS idx_friend_requests_status ON public.friend_requests(status);

CREATE INDEX IF NOT EXISTS idx_messages_from_user ON public.messages(from_user_id);
CREATE INDEX IF NOT EXISTS idx_messages_to_user ON public.messages(to_user_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at DESC);

-- =============================================
-- VERIFICATION QUERIES
-- Run these after creating tables to verify
-- =============================================

-- Check friend_requests table
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'friend_requests';

-- Check messages table
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'messages';

-- Check RLS policies
SELECT tablename, policyname FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('friend_requests', 'messages');
