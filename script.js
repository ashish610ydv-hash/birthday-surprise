const screens = [...document.querySelectorAll(".screen")];
const confettiLayer = document.querySelector(".confetti");
const balloonLayer = document.querySelector(".balloons");
const wishCards = [...document.querySelectorAll(".wish-card")];
const wishCount = document.querySelector("#wish-count");
const wishMeter = document.querySelector("#wish-meter");

function showScreen(name) {
  screens.forEach((screen) => screen.classList.toggle("active", screen.dataset.screen === name));
  if (name === "card") releaseBalloons();
  if (name === "cake") celebrate();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", () => {
    const next = button.dataset.go;
    showScreen(next);
    if (next === "wishes") celebrate();
  });
});

wishCards.forEach((card) => {
  card.addEventListener("click", () => {
    card.setAttribute("aria-pressed", card.getAttribute("aria-pressed") !== "true");
    const revealed = wishCards.filter((item) => item.getAttribute("aria-pressed") === "true").length;
    wishCount.textContent = `${revealed} of 3 wishes discovered`;
    wishMeter.style.width = `${(revealed / 3) * 100}%`;
  });
});

function releaseBalloons() {
  const colors = ["#d889a6", "#e6c776", "#9cc9c2", "#c2a8da", "#f1a88f"];
  for (let i = 0; i < 12; i += 1) {
    const balloon = document.createElement("i");
    balloon.className = "balloon";
    balloon.style.left = `${4 + Math.random() * 92}%`;
    balloon.style.setProperty("--balloon", colors[i % colors.length]);
    balloon.style.animationDelay = `${Math.random() * 1.5}s`;
    balloonLayer.append(balloon);
    balloon.addEventListener("animationend", () => balloon.remove(), { once: true });
  }
}

function celebrate() {
  const colors = ["#d889a6", "#e6c776", "#9cc9c2", "#c2a8da", "#f1a88f"];
  for (let i = 0; i < 34; i += 1) {
    const piece = document.createElement("i");
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.setProperty("--confetti", colors[i % colors.length]);
    piece.style.animationDelay = `${Math.random() * 1.1}s`;
    confettiLayer.append(piece);
    piece.addEventListener("animationend", () => piece.remove(), { once: true });
  }
}
