// js/thirdparty.js
// Uses a free Third-Party API (Quotable) to get a random quote

async function getQuote() {
  const el = document.getElementById("quoteText");
  if (!el) return;

  el.textContent = "Loading quote...";

  try {
    const res = await fetch("https://api.quotable.io/random");
    const data = await res.json();
    el.textContent = `"${data.content}" — ${data.author}`;
  } catch (err) {
    console.error(err);
    el.textContent = "Could not load quote right now.";
  }
}
