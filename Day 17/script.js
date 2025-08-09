const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("newQuoteBtn");

async function getQuote() {
  const response = await fetch("https://type.fit/api/quotes");
  const quotes = await response.json();
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

async function displayQuote() {
  const quote = await getQuote();
  quoteText.textContent = `"${quote.text}"`;
  authorText.textContent = quote.author ? `- ${quote.author}` : "- Unknown";
  document.body.style.backgroundColor = randomColor();
}

// Load first quote
displayQuote();

// Button click for new quote
newQuoteBtn.addEventListener("click", displayQuote);
