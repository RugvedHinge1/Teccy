/* ================= CONFIG ================= */

const UPDATE_INTERVAL_MS = 1000
const HOURS_PER_DAY = 24
const MINUTES_PER_HOUR = 60
const SECONDS_PER_MINUTE = 60
const MS_PER_SECOND = 1000

const SAVE_KEY = "greenhouseSave_v1"
const LAST_SEEN_KEY = "greenhouseLastSeen"

const MAX_PROGRESS_PERCENT = 100

/* ================= SEED INVENTORY ================= */

const seedInventory = {
  radish: {
    count: 5,
    growDays: 3,
    stages: 3,
    images: [
      "/assets/crops/turnip1.png",
      "/assets/crops/turnip2.png",
      "/assets/crops/turnip3.png"
    ]
  },
  carrot: {
    count: 3,
    growDays: 5,
    stages: 4,
    images: [
      "/assets/crops/carrot_stage1.png",
      "/assets/crops/carrot_stage2.png",
      "/assets/crops/carrot_stage3.png",
      "/assets/crops/carrot_stage4.png"
    ]
  }
}

/* GRID SIZE */
const GRID_COLS = 14
const GRID_ROWS = 8

/* ================= STATE ================= */

let selectedTool = null
let selectedSeed = null
let hoePickedUp = false

let toolStartX = 0
let toolStartY = 0

/* ================= HELPERS ================= */

function getTotalGrowTime(seed) {
  return seedInventory[seed].growDays *
    HOURS_PER_DAY *
    MINUTES_PER_HOUR *
    SECONDS_PER_MINUTE *
    MS_PER_SECOND
}

function formatTimeRemaining(ms) {
  if (ms <= 0) return "Ready!"

  const totalSeconds = Math.floor(ms / 1000)
  const days = Math.floor(totalSeconds / (60 * 60 * 24))
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))

  if (days > 0) return `Ready in ${days}d ${hours}h`
  return `Ready in ${hours}h`
}

/* ================= SEED SELECTION ================= */

function selectSeed(seed) {
  selectedSeed = seed
}

/* ================= CREATE TILES ================= */

const greenhouse = document.getElementById("greenhouse")

for (let i = 0; i < GRID_ROWS * GRID_COLS; i++) {
  const tile = document.createElement("div")
  tile.className = "tile"
  tile.dataset.tilled = "false"

  tile.addEventListener("click", () => handleTile(tile))
  greenhouse.appendChild(tile)
}

/* ================= TILE LOGIC ================= */

function handleTile(tile) {

  if (selectedTool === "hoe" && tile.dataset.tilled === "false") {
    tile.dataset.tilled = "true"
    saveGame()
    return
  }

  if (
    selectedSeed &&
    tile.dataset.tilled === "true" &&
    !tile.dataset.planted
  ) {
    plantCrop(tile, selectedSeed)
    saveGame()
  }
}

/* ================= PLANTING ================= */

function plantCrop(tile, seed) {
  if (seedInventory[seed].count <= 0) return

  seedInventory[seed].count--

  tile.dataset.planted = seed
  tile.dataset.startTime = Date.now()
  tile.dataset.stage = "0"
  tile.dataset.ready = "false"

  tile.innerHTML = `
    <img class="crop" src="${seedInventory[seed].images[0]}" />
    <div class="progress"><div class="progress-fill"></div></div>
    <div class="timer-text"></div>
  `

  renderSeedBar()
}

/* ================= GROWTH LOOP ================= */

setInterval(() => {
  document.querySelectorAll(".tile").forEach(tile => {
    if (!tile.dataset.planted) return

    const seed = tile.dataset.planted
    const totalTime = getTotalGrowTime(seed)
    const elapsed = Date.now() - Number(tile.dataset.startTime)

    const percent = Math.min(
      (elapsed / totalTime) * MAX_PROGRESS_PERCENT,
      MAX_PROGRESS_PERCENT
    )

    const stageCount = seedInventory[seed].stages
    const stageIndex = Math.min(
      Math.floor((elapsed / totalTime) * stageCount),
      stageCount - 1
    )

    if (tile.dataset.stage !== String(stageIndex)) {
      tile.dataset.stage = stageIndex
      tile.querySelector(".crop").src =
        seedInventory[seed].images[stageIndex]
    }

    tile.querySelector(".progress-fill").style.width = percent + "%"

    const timer = tile.querySelector(".timer-text")
    if (timer) {
      timer.textContent = formatTimeRemaining(totalTime - elapsed)
    }

    if (percent >= 100) {
      tile.dataset.ready = "true"
    }
  })
}, UPDATE_INTERVAL_MS)

/* ================= SAVE / LOAD ================= */

function saveGame() {
  const tiles = []

  document.querySelectorAll(".tile").forEach(tile => {
    tiles.push({
      tilled: tile.dataset.tilled === "true",
      planted: tile.dataset.planted || null,
      startTime: tile.dataset.startTime || null,
      stage: tile.dataset.stage || 0
    })
  })

  localStorage.setItem(SAVE_KEY, JSON.stringify({
    tiles,
    seedInventory
  }))

  localStorage.setItem(LAST_SEEN_KEY, Date.now())
}

function loadGame() {
  const raw = localStorage.getItem(SAVE_KEY)
  if (!raw) return

  const data = JSON.parse(raw)
  Object.assign(seedInventory, data.seedInventory)

  const tiles = document.querySelectorAll(".tile")

  data.tiles.forEach((saved, i) => {
    const tile = tiles[i]
    if (!tile) return

    if (saved.tilled) tile.dataset.tilled = "true"

    if (saved.planted) {
      tile.dataset.planted = saved.planted
      tile.dataset.startTime = saved.startTime
      tile.dataset.stage = saved.stage
      tile.dataset.ready = "false"

      tile.innerHTML = `
        <img class="crop" src="${seedInventory[saved.planted].images[saved.stage]}" />
        <div class="progress"><div class="progress-fill"></div></div>
        <div class="timer-text"></div>
      `
    }
  })

  renderSeedBar()
}

/* ================= OFFLINE PROGRESS ================= */

function checkOfflineProgress() {
  const lastSeen = Number(localStorage.getItem(LAST_SEEN_KEY))
  if (!lastSeen) return

  let grown = 0

  document.querySelectorAll(".tile").forEach(tile => {
    if (!tile.dataset.planted) return

    const seed = tile.dataset.planted
    const totalTime = getTotalGrowTime(seed)
    const elapsed = Date.now() - Number(tile.dataset.startTime)

    if (elapsed >= totalTime && tile.dataset.ready !== "true") {
      tile.dataset.ready = "true"
      grown++
    }
  })

  if (grown > 0) showOfflinePopup(grown)
}

function showOfflinePopup(count) {
  const popup = document.createElement("div")
  popup.className = "offline-popup"
  popup.textContent = `${count} crops finished growing while you were away!`

  document.body.appendChild(popup)
  setTimeout(() => popup.classList.add("show"), 50)
  setTimeout(() => popup.remove(), 4000)
}

/* ================= SEED BAR ================= */

const seedBar = document.getElementById("seedBar")

function renderSeedBar() {
  seedBar.innerHTML = ""

  for (const seed in seedInventory) {
    const data = seedInventory[seed]
    if (data.count <= 0) continue

    const el = document.createElement("div")
    el.className = "seed-item"
    el.innerHTML = `<img src="${data.images[0]}" /><span>${data.count}</span>`

    el.onclick = () => {
      selectedSeed = seed
      document.querySelectorAll(".seed-item")
        .forEach(s => s.classList.remove("selected"))
      el.classList.add("selected")
    }

    seedBar.appendChild(el)
  }
}

/* ================= INIT ================= */

loadGame()
checkOfflineProgress()
renderSeedBar()
