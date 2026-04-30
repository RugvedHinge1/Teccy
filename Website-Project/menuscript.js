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

let currentLevelStep = 'current'; // 'current' or 'target'
let selectedCurrentLevel = null;
let selectedTargetLevel = null;
const levels = ['Beginner', 'Intermediate', 'Pro'];

function initLevelModal() {
  const modal = document.getElementById('levelModal');
  // Always show level modal on first visit to let user set their levels
  // Levels will be saved to Supabase when they complete diagnosis
  if (modal && !modal.classList.contains('show')) {
    // Only show if not already shown
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
    btn.onclick = () => selectLevel(level);
    container.appendChild(btn);
  });
}

function selectLevel(level) {
  const buttons = document.querySelectorAll('.level-btn');
  buttons.forEach(btn => btn.classList.remove('selected'));

  event.target.classList.add('selected');

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
    if (nextBtn) {
      nextBtn.textContent = 'Start Learning';
      nextBtn.disabled = true;
    }
    selectedCurrentLevel = null;
    renderLevelButtons();
  } else {
    // Levels will be saved to Supabase when user completes diagnosis
    // Store temporarily in window for use during diagnosis
    window.tempCurrentLevel = selectedCurrentLevel;
    window.tempTargetLevel = selectedTargetLevel;
    const modal = document.getElementById('levelModal');
    if (modal) modal.classList.remove('show');
  }
}

async function startPractice(topic) {
  // Load diagnosed level from Supabase
  const progress = await loadProgressFromSupabase(topic);
  const level = progress?.diagnosed_level || progress?.current_level || 'Beginner';

  // Change this URL to your deployed Streamlit app URL once you deploy it!
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const baseUrl = isLocal ? 'http://localhost:8501/' : 'https://tecchy.streamlit.app/'; 
  
  const url = `${baseUrl}?topic=${topic}&level=${level}`;
  window.open(url, '_blank');
}

document.getElementById('nextLevelBtn').addEventListener('click', nextLevelStep);


// Inventory Logic
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

// Game Clock Logic
function updateGameClock() {
  const clockElement = document.getElementById('game-clock');
  if (!clockElement) return;

  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  const hoursStr = hours < 10 ? '0' + hours : hours; // Leading zero for style

  clockElement.textContent = `${hoursStr}:${minutesStr} ${ampm}`;
}

// Initialize on page load
window.addEventListener('load', async () => {
  initLevelModal();
  updateGameClock();
  setInterval(updateGameClock, 1000); // Update every second

  // Display user greeting from Supabase
  const { data: { session } } = await supabaseClient.auth.getSession();
  if (session && session.user) {
    const username = session.user.user_metadata?.username || session.user.email.split('@')[0];
    const greetingEl = document.getElementById('user-greeting');
    if (greetingEl) {
      greetingEl.textContent = `Welcome back, ${username}! 👋`;
    }
  }
});


// Reset all progress function
function resetAllProgress() {
  if (confirm('Are you sure you want to reset ALL diagnosis progress for all topics?')) {
    // Clear all localStorage except Supabase session
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key.startsWith('sb-')) { // Preserve Supabase keys
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));

    alert('All progress has been reset!');
    location.reload();
  }
}

// Logout function
async function logout() {
  if (confirm('Are you sure you want to logout?')) {
    try {
      // Clear ALL localStorage except Supabase session keys
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key.startsWith('sb-')) { // Preserve Supabase auth keys
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));

      // Sign out from Supabase
      if (typeof supabaseClient !== 'undefined' && supabaseClient) {
        await supabaseClient.auth.signOut();
      } else {
        console.error('Supabase client not found');
      }

      window.location.href = 'landing.html';
    } catch (error) {
      console.error('Logout error:', error);
      // Force redirect even if logout fails
      window.location.href = 'landing.html';
    }
  }
}
