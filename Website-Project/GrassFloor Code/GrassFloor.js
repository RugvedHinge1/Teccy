let densityofgrass = 7;
let minsizeofgrass = 24;
let grassunitofrandomness = 20;
let verticlerandomness = 10;

const grassImages = [
  "/assets/Grass/SpringGrass1.png",
  "/assets/Grass/SpringGrass2.png",
  "/assets/Grass/SpringGrass3.png"
];

const grassField = document.getElementById("grass-field");

// Controls how dense the grass is
const grassCount = Math.floor(window.innerWidth / densityofgrass);

const grasses = []; // Store grass elements

for (let i = 0; i < grassCount; i++) {
  const grass = document.createElement("img");

  grass.src = grassImages[Math.floor(Math.random() * grassImages.length)];

  grass.classList.add("grass");

  const size = minsizeofgrass + Math.random() * grassunitofrandomness; // height randomness
  const x = Math.random() * window.innerWidth;
  const yOffset = Math.random() * verticlerandomness;

  grass.style.height = `${size}px`;
  grass.style.left = `${x}px`;
  grass.style.bottom = `${yOffset}px`;
  grass.style.transition = "transform 0.2s ease"; // smooth sway
  grass.style.transformOrigin = "bottom center"; // rotate from bottom

  grassField.appendChild(grass);
  grasses.push(grass);
}

// --- Interaction: sway grass with cursor ---
document.addEventListener("mousemove", (e) => {
  grasses.forEach((grass) => {
    const rect = grass.getBoundingClientRect();
    const grassX = rect.left + rect.width / 2;

    // distance from cursor
    const distance = e.clientX - grassX;

    // map distance to sway angle
    let angle = distance / 15; // smaller divisor = bigger sway
    if (angle > 20) angle = 20;
    if (angle < -20) angle = -20;

    grass.style.transform = `scale(4) rotate(${angle}deg)`;
  });
});

// Reset when mouse leaves the window
document.addEventListener("mouseleave", () => {
  grasses.forEach((grass) => {
    grass.style.transform = "scale(4) rotate(0deg)";
  });
});
