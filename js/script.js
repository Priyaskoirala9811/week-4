// js/script.js

// Insert header nav on all pages
const headerEl = document.getElementById("site-header");
if (headerEl) {
  headerEl.innerHTML = `
    <nav class="nav">
      <a href="index.html">Home</a>
      <a href="journal.html">Journal</a>
      <a href="projects.html">Projects</a>
    </nav>
  `;
}

// Live date on home page only
const dateEl = document.getElementById("current-date");
if (dateEl) {
  const today = new Date();
  dateEl.textContent = today.toDateString();
}

// Footer year on all pages
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
