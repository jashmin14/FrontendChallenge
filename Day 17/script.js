// script.js (replace your current file with this)

const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("newQuoteBtn");

// helper: show loading state
function showLoading() {
  quoteText.textContent = "Loading quote...";
  authorText.textContent = "";
}

// helper: show error
function showError(msg = "Failed to load quote. Try again.") {
  quoteText.textContent = msg;
  authorText.textContent = "";
}

// fetch quotes (cached on first call)
let quotesCache = null;
async function fetchQuotes() {
  if (quotesCache) return quotesCache;
  // API is free and CORS-friendly
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error(
        `Network response was not ok: ${res.status} ${res.statusText}`
      );
    }
    const json = await res.json();
    quotesCache = json;
    return json;
  } catch (err) {
    console.error("Error fetching quotes:", err);
    throw err;
  }
}

function randomColor() {
  const r = Math.floor(Math.random() * 160) + 60; // keep colors soft (not too dark/bright)
  const g = Math.floor(Math.random() * 160) + 60;
  const b = Math.floor(Math.random() * 160) + 60;
  return `rgb(${r}, ${g}, ${b})`;
}

async function displayQuote() {
  showLoading();
  try {
    const quotes = await fetchQuotes();
    if (!quotes || quotes.length === 0) {
      showError("No quotes available.");
      return;
    }
    const q = quotes[Math.floor(Math.random() * quotes.length)];
    quoteText.textContent = `"${q.text}"`;
    authorText.textContent = q.author ? `— ${q.author}` : "— Unknown";
    document.body.style.backgroundColor = randomColor();
  } catch (err) {
    showError("Could not load quote. Check console.");
  }
}

// initial load
displayQuote();

// button handler
newQuoteBtn.addEventListener("click", displayQuote);
