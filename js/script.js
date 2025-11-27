// js/script.js
// basic stuff that should run on every page

document.addEventListener("DOMContentLoaded", () => {
  setupHeader();
  setupTheme();    // load saved theme if there is one
  showTodayDate(); // only does something on home page
  setFooterYear();
});

// create the header with nav + theme toggle
function setupHeader() {
  const headerSection = document.getElementById("site-header");
  if (!headerSection) return;

  headerSection.innerHTML = `
    <div class="header-inner">
      <div class="brand">Learning Journal</div>
      <button id="themeToggle" type="button">Light</button>
      <nav class="nav">
        <a href="index.html">Home</a>
        <a href="journal.html">Journal</a>
        <a href="projects.html">Projects</a>
      </nav>
    </div>
  `;

  const themeButton = document.getElementById("themeToggle");
  if (themeButton) {
    themeButton.addEventListener("click", toggleTheme);
  }
}

// load theme from localStorage and apply it
function setupTheme() {
  const savedTheme = localStorage.getItem("theme");
  const body = document.body;
  const themeButton = document.getElementById("themeToggle");

  // I decided dark as default
  const themeToUse = savedTheme || "dark";

  if (themeToUse === "light") {
    body.classList.add("theme-light");
    body.classList.remove("theme-dark");
    if (themeButton) themeButton.textContent = "Dark";
  } else {
    body.classList.add("theme-dark");
    body.classList.remove("theme-light");
    if (themeButton) themeButton.textContent = "Light";
  }
}

// switch theme when user presses the button
function toggleTheme() {
  const body = document.body;
  const themeButton = document.getElementById("themeToggle");
  let newTheme;

  if (body.classList.contains("theme-light")) {
    // switch to dark
    body.classList.remove("theme-light");
    body.classList.add("theme-dark");
    newTheme = "dark";
    if (themeButton) themeButton.textContent = "Light";
  } else {
    // switch to light
    body.classList.remove("theme-dark");
    body.classList.add("theme-light");
    newTheme = "light";
    if (themeButton) themeButton.textContent = "Dark";
  }

  localStorage.setItem("theme", newTheme);
}

// show date on home page (index.html)
function showTodayDate() {
  const dateDisplay = document.getElementById("current-date");
  if (!dateDisplay) return;

  const today = new Date();
  dateDisplay.textContent = today.toDateString();
}

// update footer year everywhere
function setFooterYear() {
  const yearSpan = document.getElementById("year");
  if (!yearSpan) return;

  yearSpan.textContent = new Date().getFullYear();
}
