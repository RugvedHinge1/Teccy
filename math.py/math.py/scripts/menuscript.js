// Global state to track current topic
let currentActiveTopic = 'Algebra';

// Cache all progress data to avoid repeated DB calls and ensure consistency
let globalUserProgress = null;

async function showCard(topic) {
  currentActiveTopic = topic;
  const topicKey = topic.toLowerCase();

  // 1. Hide all cards initially
  const allCards = document.querySelectorAll('.card');
  allCards.forEach(card => card.style.display = 'none');

  // 2. Identify the specific cards for this topic
  const diagnosisCard = document.getElementById(`card-diagnosis-${topicKey}`);
  const practiceCard = document.getElementById(`card-practice-${topicKey}`);
  const levelBadge = document.getElementById(`level-badge-${topicKey}`);

  // 3. Show diagnosis card temporarily as fallback/loading state
  if (diagnosisCard) diagnosisCard.style.display = 'block';

  try {
    // 4. Load ALL progress if not already loaded (mimics dashboard logic)
    if (!globalUserProgress) {
      if (typeof loadAllProgressFromSupabase === 'function') {
        globalUserProgress = await loadAllProgressFromSupabase();
      }
    }

    // 5. Find progress for this topic (case-insensitive check)
    let progress = null;
    if (globalUserProgress && Array.isArray(globalUserProgress)) {
      progress = globalUserProgress.find(p => p.topic && p.topic.toLowerCase() === topicKey);
    } else {
      // Fallback if loadAll fails or returns null
      if (typeof loadProgressFromSupabase === 'function') {
        progress = await loadProgressFromSupabase(topic);
      }
    }

    const level = progress?.diagnosed_level || null;

    if (level && practiceCard) {
      // User has already diagnosed: Switch to Practice Hub
      if (diagnosisCard) diagnosisCard.style.display = 'none';
      practiceCard.style.display = 'block';

      if (levelBadge) {
        levelBadge.textContent = 'Level: ' + level;
        // Color code level
        if (level === 'Beginner') levelBadge.style.backgroundColor = '#28a745';
        else if (level === 'Intermediate') levelBadge.style.backgroundColor = '#ffc107';
        else if (level === 'Pro') levelBadge.style.backgroundColor = '#dc3545';
      }
    }
  } catch (error) {
    console.error("Error in showCard:", error);
  }
}

// default topic initialization
document.addEventListener('DOMContentLoaded', () => {
  // slightly delayed to ensure scripts are loaded
  setTimeout(() => showCard('Algebra'), 100);
});

// =============================================
// FEATURE 1 — WELCOME POPUP (on signup only)
// =============================================
function closeWelcomeModal() {
  const modal = document.getElementById('welcomeModal');
  if (modal) modal.classList.remove('show');
  // 🎁 Award welcome seed to warehouse (only runs when isNewUser = true)
  addToWarehouse('🌻', 'Sunflower Seed — Welcome Gift!');
  // After closing welcome, check if level modal is needed
  checkLevelModal();
}

function showWelcomeModal(username) {
  const modal = document.getElementById('welcomeModal');
  const nameEl = document.getElementById('welcomeUserName');
  if (nameEl) {
    nameEl.textContent = username
      ? `Hey ${username}, your adventure begins now! 🌟`
      : 'Your adventure begins now!';
  }
  if (modal) modal.classList.add('show');

  // ── Ensure streak modal fires after level modal for new users ──
  // Set modal_pending in Supabase so it fires even if Supabase is slow
  if (_currentUserId) {
    supabaseClient
      .from('user_streaks')
      .upsert({ user_id: _currentUserId, modal_pending: true }, { onConflict: 'user_id' })
      .then(() => console.log('✅ Streak modal_pending set for new user'))
      .catch(e => console.warn('Streak pending set failed:', e));
  }
}

// =============================================
// FEATURE 2 — LEVEL MODAL (once per account)
// =============================================
let currentLevelStep = 'current'; // 'current' or 'target'
let selectedCurrentLevel = null;
let selectedTargetLevel = null;
const levels = ['Beginner', 'Intermediate', 'Pro'];

let _currentUserId = null; // set once session is loaded

function levelModalDoneKey(userId) {
  return 'levelSetup_' + userId;
}

async function checkLevelModal() {
  if (!_currentUserId) return;
  const doneKey = levelModalDoneKey(_currentUserId);
  const done = localStorage.getItem(doneKey);
  if (done) return; // already completed — never show again

  // One-time migration: if returning user already has Supabase progress,
  // silently mark them as done so the modal never interrupts them again.
  try {
    if (typeof loadAllProgressFromSupabase === 'function') {
      const allProgress = await loadAllProgressFromSupabase();
      if (allProgress && allProgress.length > 0) {
        localStorage.setItem(doneKey, '1');
        return; // existing user — skip modal
      }
    }
  } catch (e) { /* ignore — fall through to show modal for truly new users */ }

  // Genuinely new user with no progress — show the level modal
  initLevelModal();
}

function initLevelModal() {
  const modal = document.getElementById('levelModal');
  if (modal && !modal.classList.contains('show')) {
    currentLevelStep = 'current';
    selectedCurrentLevel = null;
    selectedTargetLevel = null;
    const title = document.getElementById('modalTitle');
    const desc = document.getElementById('modalDescription');
    const btn = document.getElementById('nextLevelBtn');
    if (title) title.textContent = 'What level are you?';
    if (desc) desc.textContent = 'Select your current skill level';
    if (btn) { btn.textContent = 'Next'; btn.disabled = true; }
    modal.classList.add('show');
    renderLevelButtons();
  }
}

function renderLevelButtons() {
  const container = document.getElementById('levelButtons');
  container.innerHTML = '';

  levels.forEach(level => {
    const btn = document.createElement('button');
    btn.className = 'level-btn';
    btn.textContent = level;
    btn.onclick = () => selectLevel(level, btn);
    container.appendChild(btn);
  });
}

function selectLevel(level, btnEl) {
  const buttons = document.querySelectorAll('.level-btn');
  buttons.forEach(btn => btn.classList.remove('selected'));
  btnEl.classList.add('selected');

  if (currentLevelStep === 'current') {
    selectedCurrentLevel = level;
  } else {
    selectedTargetLevel = level;
  }

  document.getElementById('nextLevelBtn').disabled = false;
}

function nextLevelStep() {
  if (currentLevelStep === 'current') {
    currentLevelStep = 'target';
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const nextBtn = document.getElementById('nextLevelBtn');

    if (modalTitle) modalTitle.textContent = 'What level would you like to reach?';
    if (modalDescription) modalDescription.textContent = 'Select your target skill level';
    if (nextBtn) { nextBtn.textContent = 'Start Learning'; nextBtn.disabled = true; }
    selectedTargetLevel = null;
    renderLevelButtons();
  } else {
    // Save temporarily in window for use during diagnosis
    window.tempCurrentLevel = selectedCurrentLevel;
    window.tempTargetLevel = selectedTargetLevel;

    // Mark as done for this user — never show again
    if (_currentUserId) {
      localStorage.setItem(levelModalDoneKey(_currentUserId), '1');
    }

    const modal = document.getElementById('levelModal');
    if (modal) modal.classList.remove('show');

    // ── For new users: show streak modal right after level modal ──
    const isNew = sessionStorage.getItem('_newUserStreakPending');
    if (isNew === 'true') {
      sessionStorage.removeItem('_newUserStreakPending');
      setTimeout(() => showStreakModal(), 400);
    }
  }
}




// =============================================
// FEATURE 3 — STREAK GOAL MODAL  (Supabase-backed)
// =============================================
let _selectedStreakDays = null;

// ── Supabase helpers ──────────────────────────

// Fetch the user's streak row; creates it if it doesn't exist yet
async function getStreakRow() {
  const { data, error } = await supabaseClient
    .from('user_streaks')
    .select('*')
    .eq('user_id', _currentUserId)
    .maybeSingle();
  if (error) { console.error('getStreakRow:', error); return null; }
  return data; // null if no row yet
}

// Upsert (create or update) the user's streak row
async function updateStreakRow(fields) {
  const { error } = await supabaseClient
    .from('user_streaks')
    .upsert({ user_id: _currentUserId, ...fields }, { onConflict: 'user_id' });
  if (error) console.error('updateStreakRow:', error);
}

// ── UI helpers ────────────────────────────────

function selectStreakGoal(days) {
  _selectedStreakDays = days;
  document.querySelectorAll('.streak-tier-card').forEach(card => {
    card.classList.toggle('selected', parseInt(card.dataset.days) === days);
  });
  const btn = document.getElementById('confirmStreakBtn');
  if (btn) btn.disabled = false;
}

async function confirmStreakGoal() {
  if (!_selectedStreakDays || !_currentUserId) return;
  const today = new Date().toISOString().slice(0, 10);

  // Only reset start + done if no active goal exists
  const existing = await getStreakRow();
  const alreadyStarted = existing && existing.streak_goal > 0;

  await updateStreakRow({
    streak_goal: _selectedStreakDays,
    streak_start: alreadyStarted ? existing.streak_start : today,
    streak_done: alreadyStarted ? existing.streak_done : 0,
    modal_pending: false
  });

  const modal = document.getElementById('streakModal');
  if (modal) modal.classList.remove('show');
  loadStreakWidget();
}

function showStreakModal() {
  _selectedStreakDays = null;
  document.querySelectorAll('.streak-tier-card').forEach(c => c.classList.remove('selected'));
  const btn = document.getElementById('confirmStreakBtn');
  if (btn) btn.disabled = true;
  const modal = document.getElementById('streakModal');
  if (modal) modal.classList.add('show');
}

// Call after each qualifying activity (diagnosis / final-test / practice)
async function logStreakActivity() {
  if (!_currentUserId) return;

  const row = await getStreakRow();
  if (!row || !row.streak_goal) return; // no goal set yet

  const today = new Date().toISOString().slice(0, 10);
  if (row.last_activity === today) return; // already credited today

  const newDone = (row.streak_done || 0) + 1;

  // 🌿 Every 5 consecutive days → award 1 fertilizer
  if (newDone % 5 === 0) {
    addToWarehouse('🌿', `Fertilizer — ${newDone}-Day Streak Reward!`);
    setTimeout(() => alert(`🌿 ${newDone}-Day Streak! You earned a Fertilizer!\nCheck your Warehouse!`), 300);
  }

  if (newDone >= row.streak_goal) {
    // 🎉 Streak complete — award seed, reset, prompt for new goal
    awardStreakSeed(row.streak_goal);
    await updateStreakRow({
      streak_goal: 0,
      streak_done: 0,
      streak_start: null,
      last_activity: today,
      modal_pending: true   // will trigger modal on next index.html load
    });
    setTimeout(() => showStreakModal(), 600);
  } else {
    await updateStreakRow({ streak_done: newDone, last_activity: today });
  }

  loadStreakWidget();
}

function awardStreakSeed(days) {
  let icon = '🌸'; let name = 'Basic Flower Seed';
  if (days >= 100) { icon = '🌹'; name = 'Exotic Flower Seed'; }
  else if (days >= 50) { icon = '🌺'; name = 'Rare Flower Seed'; }
  addToWarehouse(icon, name);
  alert(`🎉 Streak Complete! You earned: ${icon} ${name}\nCheck your Warehouse!`);
}

// =============================================
// WAREHOUSE / INVENTORY ITEM SYSTEM  (Supabase-backed)
// =============================================

/**
 * Add an item to the player's warehouse in Supabase.
 * @param {string} icon  - Emoji to display in grid slot
 * @param {string} name  - Tooltip text on hover
 */
async function addToWarehouse(icon, name) {
  if (!_currentUserId) return;
  const { error } = await supabaseClient
    .from('warehouse_items')
    .insert({ user_id: _currentUserId, icon, name });
  if (error) console.error('addToWarehouse:', error);
}

/**
 * Render all warehouse items from Supabase into the inventory grid.
 * Shows a loading indicator while fetching, then fills slots.
 */
async function renderWarehouse() {
  const grid = document.getElementById('inventoryGrid');
  if (!grid) return;

  const TOTAL_SLOTS = 63;  // 9 × 7 grid
  grid.innerHTML = '<div style="padding:12px;opacity:0.6;">Loading...</div>';

  let items = [];
  if (_currentUserId) {
    const { data, error } = await supabaseClient
      .from('warehouse_items')
      .select('icon, name, earned_at')
      .eq('user_id', _currentUserId)
      .order('earned_at', { ascending: true });
    if (!error && data) items = data;
  }

  grid.innerHTML = '';

  for (let i = 0; i < TOTAL_SLOTS; i++) {
    const slot = document.createElement('div');
    slot.className = 'inv-slot';

    if (items[i]) {
      slot.textContent = items[i].icon;
      slot.title = items[i].name;   // native browser tooltip on hover
      slot.style.fontSize = '1.6rem';
      slot.style.cursor = 'pointer';
      slot.style.lineHeight = '1';
      slot.style.display = 'flex';
      slot.style.alignItems = 'center';
      slot.style.justifyContent = 'center';
    }

    grid.appendChild(slot);
  }
}

/** Toggle the inventory modal open/closed; re-fetches items from Supabase on open */
function toggleInventory() {
  const modal = document.getElementById('inventoryModal');
  if (!modal) return;
  const isOpen = modal.style.display === 'flex';
  modal.style.display = isOpen ? 'none' : 'flex';
  if (!isOpen) renderWarehouse();   // async — refreshes from Supabase every open
}

// =============================================
// FINAL TEST — open with correct level
// =============================================
async function openFinalTest(topic) {
  const progress = await loadProgressFromSupabase(topic);
  const level = (progress?.diagnosed_level || progress?.current_level || 'AMATEUR').toUpperCase();
  window.open(`pages/final-test.html?topic=${topic}&level=${level}`, '_blank');
}

// =============================================
// MODULE COMPLETION — lock/unlock per topic
// =============================================
const ALL_TOPICS = ['Algebra', 'Geometry', 'Calculus', 'Probability', 'Trigonometry'];

async function checkModuleCompletion() {
  if (!_currentUserId) return;
  try {
    const { data, error } = await supabaseClient
      .from('user_progress')
      .select('topic, final_test_passed')
      .eq('user_id', _currentUserId);
    if (error || !data) return;

    data.forEach(row => {
      const t = (row.topic || '').toLowerCase();
      if (row.final_test_passed) {
        const btnSpan = document.getElementById(`ft-btn-${t}`);
        const doneSpan = document.getElementById(`ft-done-${t}`);
        if (btnSpan) btnSpan.style.display = 'none';
        if (doneSpan) doneSpan.style.display = 'inline';
      }
    });
  } catch (e) { console.warn('checkModuleCompletion:', e); }
}

// =============================================
// THE FINAL — unlock sidebar link
// =============================================
async function checkTheFinal() {
  if (!_currentUserId) return;
  try {
    const { data, error } = await supabaseClient
      .from('user_progress')
      .select('topic, diagnosed_level, target_level, final_test_passed')
      .eq('user_id', _currentUserId);
    if (error || !data) return;

    const LEVEL_ORDER = ['AMATEUR', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'PRO'];
    const rankOf = l => LEVEL_ORDER.indexOf((l || '').toUpperCase());

    // All 5 topics must: (a) have passed the final test, (b) diagnosed_level >= target_level
    const allDone = ALL_TOPICS.every(t => {
      const row = data.find(r => r.topic && r.topic.toLowerCase() === t.toLowerCase());
      if (!row) return false;
      const passedTest = !!row.final_test_passed;
      const reachedTarget = row.target_level
        ? rankOf(row.diagnosed_level) >= rankOf(row.target_level)
        : true; // If no target set, only require test pass
      return passedTest && reachedTarget;
    });

    if (allDone) {
      // Determine user's max target level for "The Final" difficulty
      let maxTarget = 'AMATEUR';
      data.forEach(row => {
        if (rankOf(row.target_level) > rankOf(maxTarget)) maxTarget = (row.target_level || 'AMATEUR').toUpperCase();
      });

      const link = document.getElementById('theFinalLink');
      if (link) {
        link.style.opacity = '1';
        link.style.cursor = 'pointer';
        link.style.pointerEvents = 'auto';
        link.textContent = '🏆 The Final';
        link.title = 'Grand Final — 25 questions across all topics!';
        link.href = `pages/the-final.html?level=${maxTarget}`;
        link.target = '_blank';
      }
    }
  } catch (e) { console.warn('checkTheFinal:', e); }
}

// =============================================
// FEATURE 4 — STREAK PROGRESS WIDGET
// =============================================
async function startPractice(topic) {
  // Credit streak activity for doing a practice question
  logStreakActivity();

  // Load diagnosed level + target from Supabase
  const progress = await loadProgressFromSupabase(topic);
  const level = (progress?.diagnosed_level || progress?.current_level || 'Beginner').toUpperCase();
  const target = (progress?.target_level || '').toUpperCase();

  // Change this URL to your deployed Streamlit app URL once you deploy it!
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const baseUrl = isLocal ? 'http://localhost:8501/' : 'https://teccy.streamlit.app/'; 
  
  const url = `${baseUrl}?topic=${topic}&level=${level}&target=${target}`;
  window.open(url, '_blank');
}

async function loadStreakWidget() {
  if (!_currentUserId) return;
  const widget = document.getElementById('streakProgressWidget');
  if (!widget) return;

  const row = await getStreakRow();
  if (!row || !row.streak_goal) {
    widget.style.display = 'none';
    return;
  }

  const goalDays = row.streak_goal;
  const done = row.streak_done || 0;
  const pct = Math.min(100, Math.round((done / goalDays) * 100));

  widget.style.display = 'flex';

  const bar = document.getElementById('streakWidgetBar');
  const daysEl = document.getElementById('streakWidgetDays');
  const iconEl = document.getElementById('streakFlowerIcon');

  if (bar) bar.style.width = pct + '%';
  if (daysEl) daysEl.textContent = `${done} / ${goalDays} days`;
  if (iconEl) {
    if (goalDays >= 100) iconEl.textContent = '🌹';
    else if (goalDays >= 50) iconEl.textContent = '🌺';
    else iconEl.textContent = '🌸';
  }
}

// =============================================
// INVENTORY LOGIC
// =============================================
function toggleInventory() {
  const modal = document.getElementById('inventoryModal');
  modal.classList.toggle('show');
  if (modal.classList.contains('show')) {
    renderInventory();
  }
}

function renderInventory() {
  const grid = document.getElementById('inventoryGrid');
  grid.innerHTML = '';

  // Default items (Slot 0 and 1)
  const items = {
    0: { img: 'assets/hoe.png', count: 1 },
    1: { img: 'assets/sickle.png', count: 1 }
  };

  // Create 64 slots (8x8)
  for (let i = 0; i < 64; i++) {
    const slot = document.createElement('div');
    slot.className = 'inventory-slot';

    if (items[i]) {
      const img = document.createElement('img');
      img.src = items[i].img;
      slot.appendChild(img);

      if (items[i].count > 1) {
        const count = document.createElement('span');
        count.className = 'count';
        count.textContent = items[i].count;
        slot.appendChild(count);
      }
    }

    grid.appendChild(slot);
  }
}

// =============================================
// GAME CLOCK
// =============================================
function updateGameClock() {
  const clockElement = document.getElementById('game-clock');
  if (!clockElement) return;

  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  const hoursStr = hours < 10 ? '0' + hours : hours;

  clockElement.textContent = `${hoursStr}:${minutesStr} ${ampm}`;
}

// =============================================
// LOGOUT & RESET
// =============================================
function resetAllProgress() {
  if (confirm('Are you sure you want to reset ALL diagnosis progress for all topics?')) {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key.startsWith('sb-')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
    alert('All progress has been reset!');
    location.reload();
  }
}

async function logout() {
  if (confirm('Are you sure you want to logout?')) {
    try {
      // Preserve levelSetup keys so the level modal never re-triggers after logout
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key.startsWith('sb-') && !key.startsWith('levelSetup_')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));

      if (typeof supabaseClient !== 'undefined' && supabaseClient) {
        await supabaseClient.auth.signOut();
      }
      window.location.href = 'landing.html';
    } catch (error) {
      console.error('Logout error:', error);
      window.location.href = 'landing.html';
    }
  }
}

// =============================================
// PAGE INIT — orchestrate all features
// =============================================
window.addEventListener('load', async () => {
  // Safe place to attach listeners (DOM guaranteed ready)
  const nextLevelBtn = document.getElementById('nextLevelBtn');
  if (nextLevelBtn) nextLevelBtn.addEventListener('click', nextLevelStep);

  updateGameClock();
  setInterval(updateGameClock, 1000);

  // Load user session
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (session && session.user) {
    _currentUserId = session.user.id;
    const username = session.user.user_metadata?.username || session.user.email.split('@')[0];

    const greetingEl = document.getElementById('user-greeting');
    if (greetingEl) greetingEl.textContent = `Welcome back, ${username}! 👋`;

    // ── Feature 1: show welcome popup for new signups only ──
    const isNew = sessionStorage.getItem('isNewUser');
    if (isNew === 'true') {
      sessionStorage.removeItem('isNewUser');
      const newName = sessionStorage.getItem('newUsername') || username;
      sessionStorage.removeItem('newUsername');
      sessionStorage.setItem('_newUserStreakPending', 'true'); // chain: Welcome → Level → Streak
      showWelcomeModal(newName);
      // Level modal will show after user closes welcome (closeWelcomeModal → checkLevelModal)
    } else {
      // Returning user — level modal is only for first signup, so do NOT call checkLevelModal() here.
      // The levelSetup key is preserved across logouts to prevent re-triggering.
    }

    // ── Feature 3: streak modal — check Supabase user_streaks row ──
    try {
      const streakRow = await getStreakRow();

      if (streakRow && streakRow.modal_pending) {
        // Diagnosis page flagged: show streak modal + clear flag
        await updateStreakRow({ modal_pending: false });
        setTimeout(() => showStreakModal(), 400);

      } else if (!streakRow || !streakRow.streak_goal) {
        // No goal set yet — show modal if user has any diagnosis progress
        if (typeof loadAllProgressFromSupabase === 'function') {
          const allProgress = await loadAllProgressFromSupabase();
          if (allProgress && allProgress.length > 0) {
            setTimeout(() => showStreakModal(), 600);
          }
        }
      }
    } catch (e) { console.warn('Streak modal check skipped:', e); }

    // ── Feature 4: load streak progress widget ──
    loadStreakWidget();

    // ── Feature 5: module completion lock & The Final unlock ──
    checkModuleCompletion();
    checkTheFinal();
  }
});

// Expose logStreakActivity globally so diagnosis/final-test pages can call it
window.logStreakActivity = logStreakActivity;
