const screens = [...document.querySelectorAll(".screen")];
const navigationButtons = document.querySelectorAll("[data-page]");
const heartsContainer = document.querySelector("#hearts");

function showPage(pageId, updateHistory = true) {
  const nextScreen = document.getElementById(pageId);

  if (!nextScreen) return;

  screens.forEach((screen) => {
    screen.classList.toggle("screen--active", screen === nextScreen);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (updateHistory) {
    const nextHash = pageId === "home" ? "#home" : `#${pageId}`;
    window.history.pushState({ pageId }, "", nextHash);
  }

  const heading = nextScreen.querySelector("h1, h2");
  window.setTimeout(() => heading?.focus({ preventScroll: true }), 50);
}

navigationButtons.forEach((button) => {
  button.addEventListener("click", () => showPage(button.dataset.page));
});

window.addEventListener("popstate", () => {
  const pageId = window.location.hash.slice(1) || "home";
  showPage(pageId, false);
});

function createFloatingHearts() {
  const symbols = ["♡", "♥", "♡"];
  const amount = window.innerWidth < 600 ? 10 : 16;

  for (let index = 0; index < amount; index += 1) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = symbols[index % symbols.length];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${10 + Math.random() * 16}px`;
    heart.style.animationDuration = `${10 + Math.random() * 10}s`;
    heart.style.animationDelay = `${-Math.random() * 18}s`;
    heartsContainer.appendChild(heart);
  }
}

createFloatingHearts();

const initialPage = window.location.hash.slice(1);
if (initialPage && document.getElementById(initialPage)) {
  showPage(initialPage, false);
}
