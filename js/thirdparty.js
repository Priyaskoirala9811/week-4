// js/thirdparty.js
// uses a free public API (quotable.io) to show a random quote

async function getQuote() {
  const quoteOutput = document.getElementById("quoteText");
  if (!quoteOutput) return;

  quoteOutput.textContent = "Loading quote...";

  try {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    quoteOutput.textContent = `"${data.content}" — ${data.author}`;
  } catch (error) {
    console.error(error);
    quoteOutput.textContent = "Could not load a quote right now.";
  }
}
