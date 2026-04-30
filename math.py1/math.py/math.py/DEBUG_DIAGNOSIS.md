# Diagnosis Save/Load - Debug Instructions

## Problem
User completes diagnosis test but results aren't showing on dashboard. Still sees "Diagnosed: -", "Tests: 0", "Score: 0%"

## Current Status
- ✅ RLS policies created in Supabase
- ✅ Supabase scripts loaded in diagnosis.html
- ✅ saveProgressToSupabase() function called in showSummary()
- ❌ Results not persisting after test completion

## Debug Test - Follow These Steps EXACTLY

### Step 1: Clear EVERYTHING
```javascript
// In browser console, run:
localStorage.clear();
await supabaseClient.auth.signOut();
```

Then **close ALL browser tabs** and **restart browser**.

### Step 2: Fresh Login
1. Go to: `http://localhost:8000/landing.html`
2. **Login** as existing user (e.g., mentor7@gmail.com)
3. **Check console** - should see no errors

### Step 3: Test Diagnosis
1. **Go to any topic** (e.g., Algebra)
2. **Open Console** (F12) and clear it
3. **Start Diagnosis Test**
4. **Answer ALL questions** (any answers)
5. **Click Submit**

### Step 4: Check Console Output
You should see this EXACT sequence:
```
=== SAVING DIAGNOSIS RESULTS ===
Topic: algebra
Progress Data: {diagnosed_level: "Pro", current_level: "Beginner", ...}
Fetching progress for user: mentor7@gmail.com 8e018285-...
Progress saved to Supabase: [data object]
Save result: {data: {...}}
✅ Diagnosis results saved to Supabase: algebra Pro
```

### Step 5: Verify in Supabase Dashboard
1. Go to Supabase Dashboard → Table Editor
2. Open `user_progress` table
3. **Look for a row** with:
   - `user_id` = your user ID
   - `topic` = "algebra"
   - `diagnosed_level` = "Pro" (or whatever you got)

### Step 6: Test Dashboard
1. **Go to Dashboard**
2. **Check console** - should see:
   ```
   === DASHBOARD LOAD ===
   Current user email: mentor7@gmail.com
   Current user ID: 8e018285-...
   Fetching progress for user: ...
   All progress loaded from Supabase: [{...}]
   ```
3. **Dashboard should show**:
   - Diagnosed: **PRO** (not "-")
   - Tests: **1** (not "0")
   - Score: **XX%** (not "0%")

---

## If It STILL Doesn't Work

### Check 1: Is saveProgressToSupabase defined?
```javascript
console.log(typeof saveProgressToSupabase); // Should be "function"
```

### Check 2: Is supabaseClient defined?
```javascript
console.log(typeof supabaseClient); // Should be "object"
```

### Check 3: Manual save test
```javascript
const testData = {
  diagnosed_level: "Pro",
  current_level: "Beginner",
  target_level: "Pro",
  total_questions: 20,
  correct_answers: 18
};
const result = await saveProgressToSupabase('algebra', testData);
console.log('Manual save result:', result);
```

If this throws an error, copy the EXACT error message.

---

## Common Fixes

### Fix 1: Browser Hard Refresh
- Press: **Ctrl + Shift + R** (or **Ctrl + F5**)
- This forces reload without cache

### Fix 2: Disable Cache (DevTools)
1. Open DevTools (F12)
2. Open Network tab
3. Check "Disable cache"
4. Keep DevTools open while testing

### Fix 3: Check Service Worker
```javascript
// Check if service worker is interfering
navigator.serviceWorker.getRegistrations().then(registrations => {
  registrations.forEach(r => r.unregister());
  console.log('Service workers cleared');
});
```

---

## Report Back With:
1. Screenshot of Step 4 console output
2. Screenshot of Step 5 (Supabase table row)
3. Screenshot of Step 6 console output
4. Any error messages you see
