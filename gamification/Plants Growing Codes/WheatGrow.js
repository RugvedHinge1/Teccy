const wheatImg = document.getElementById("wheat");
const statusText = document.getElementById("status");
const nextDayBtn = document.getElementById("nextDayBtn");

const stages = [
  "/Plants/Wheat 0.png",
  "/Plants/Wheat 1.png",
  "/Plants/Wheat 2.png",
  "/Plants/Wheat 3.png",
  "/Plants/Wheat 4.png"
];

// --- DEV TIME SYSTEM ---
function getToday() {
  let devDay = localStorage.getItem("devDay");

  if (!devDay) {
    devDay = new Date().toISOString();
    localStorage.setItem("devDay", devDay);
  }

  const date = new Date(devDay);
  date.setHours(0, 0, 0, 0);
  return date;
}

function advanceDay() {
  const day = getToday();
  day.setDate(day.getDate() + 1);
  localStorage.setItem("devDay", day.toISOString());
  location.reload();
}

// --- GROWTH LOGIC ---
let stage = parseInt(localStorage.getItem("wheatStage")) || 0;
let lastVisit = localStorage.getItem("wheatLastVisit");

const today = getToday();
let grewToday = false;

if (lastVisit) {
  const last = new Date(lastVisit);
  last.setHours(0, 0, 0, 0);

  const diffDays = (today - last) / (1000 * 60 * 60 * 24);

  // STRICT: grow only if yesterday was visited
  if (diffDays === 1 && stage < stages.length - 1) {
    stage++;
    grewToday = true;
  }
}

// --- STATUS TEXT ---
if (!lastVisit) {
  statusText.innerText = "🌱 Wheat seed planted!";
} else if (grewToday) {
  statusText.innerText = "🌞 Wheat grew today!";
} else {
  statusText.innerText = "⏳ No growth today. Visit daily!";
}

// --- SAVE STATE ---
localStorage.setItem("wheatStage", stage);
localStorage.setItem("wheatLastVisit", today.toISOString());

// --- UPDATE IMAGE ---
wheatImg.src = stages[stage];

// --- BUTTON ---
nextDayBtn.addEventListener("click", advanceDay);

/*localStorage.removeItem("wheatStage");
localStorage.removeItem("wheatLastVisit");
localStorage.removeItem("devDay");
location.reload();*/