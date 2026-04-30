const sunflowerImg = document.getElementById("wheat"); // keep ID if unchanged
const statusText = document.getElementById("status");

const stages = [
  "/Plants/Sunflower 0.png",
  "/Plants/Sunflower 1.png",
  "/Plants/Sunflower 2.png",
  "/Plants/Sunflower 3.png",
  "/Plants/Sunflower 4.png"
];

// --- DATE HELPERS ---
function normalizeDate(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

// --- LOAD STATE ---
let stage = parseInt(localStorage.getItem("sunflowerStage")) || 0;
let lastVisit = localStorage.getItem("sunflowerLastVisit");

const today = normalizeDate(new Date());
let grewToday = false;

// --- GROWTH LOGIC ---
if (lastVisit) {
  const last = normalizeDate(lastVisit);
  const diffDays = (today - last) / (1000 * 60 * 60 * 24);

  // Grow only if yesterday was visited
  if (diffDays === 1 && stage < stages.length - 1) {
    stage++;
    grewToday = true;
  }
} else {
  statusText.innerText = "🌱 Sunflower seed planted!";
}

// --- STATUS ---
if (lastVisit && grewToday) {
  statusText.innerText = "🌞 Sunflower grew today!";
} else if (lastVisit && !grewToday) {
  statusText.innerText = "⏳ No growth today. Visit daily!";
}

// --- SAVE STATE ---
localStorage.setItem("sunflowerStage", stage);
localStorage.setItem("sunflowerLastVisit", today.toISOString());

// --- UPDATE IMAGE ---
sunflowerImg.src = stages[stage];
