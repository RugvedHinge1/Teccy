-- =============================================
-- FIX: Row Level Security Policies for user_progress
-- Run this in Supabase SQL Editor
-- =============================================

-- STEP 1: Drop existing policies (if any conflicts)
DROP POLICY IF EXISTS "Users can view their own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can insert their own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can update their own progress" ON public.user_progress;
DROP POLICY IF EXISTS "Users can delete their own progress" ON public.user_progress;

-- STEP 2: Ensure RLS is enabled
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- STEP 3: Create SELECT policy (allows reading own data)
CREATE POLICY "Users can view their own progress"
  ON public.user_progress 
  FOR SELECT
  USING (auth.uid() = user_id);

-- STEP 4: Create INSERT policy (allows creating own data)
CREATE POLICY "Users can insert their own progress"
  ON public.user_progress 
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- STEP 5: Create UPDATE policy (allows updating own data)
CREATE POLICY "Users can update their own progress"
  ON public.user_progress 
  FOR UPDATE
  USING (auth.uid() = user_id);

-- STEP 6: Create DELETE policy (allows deleting own data)
CREATE POLICY "Users can delete their own progress"
  ON public.user_progress 
  FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================
-- BONUS: Allow users to view OTHER users' progress for buddy system
-- This is CRITICAL for the mentor feature to work!
-- =============================================

CREATE POLICY "Users can view all users' progress for buddy matching"
  ON public.user_progress 
  FOR SELECT
  USING (true); -- Allow everyone to read all progress (needed for mentor list)

-- =============================================
-- VERIFICATION QUERY
-- Run this after applying the policies to verify
-- =============================================

-- Check if RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'user_progress';

-- List all policies
SELECT policyname, cmd, qual, with_check 
FROM pg_policies 
WHERE schemaname = 'public' AND tablename = 'user_progress';
