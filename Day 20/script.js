// Simple quiz app with timer and localStorage high scores

let QUESTIONS = []; // will load from JSON
let currentIndex = 0;
let timeLeft = 60;
let timerId = null;
let score = 0;
let allowChoice = true;

// Load questions from external JSON
async function loadQuestions() {
  try {
    const response = await fetch("questions.json"); // ensure lowercase filename
    if (!response.ok) throw new Error("Failed to load questions");
    QUESTIONS = await response.json();
  } catch (err) {
    alert("Error loading questions: " + err.message);
  }
}

// DOM references
const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const endScreen = document.getElementById("endScreen");
const scoresScreen = document.getElementById("scoresScreen");

const startBtn = document.getElementById("startBtn");
const startTimeInput = document.getElementById("startTime");
const questionText = document.getElementById("questionText");
const choicesList = document.getElementById("choices");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const timerEl = document.getElementById("time");

const finalScoreEl = document.getElementById("finalScore");
const initialsInput = document.getElementById("initials");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const playAgainBtn = document.getElementById("playAgain");

const viewScoresBtn = document.getElementById("viewScores");
const highScoresList = document.getElementById("highScoresList");
const clearScoresBtn = document.getElementById("clearScores");
const backBtn = document.getElementById("backBtn");

// Start quiz
startBtn.addEventListener("click", () => {
  const t = parseInt(startTimeInput.value, 10);
  timeLeft = isNaN(t) ? 60 : Math.max(10, Math.min(300, t)); // between 10–300 seconds
  timerEl.textContent = timeLeft;
  score = 0;
  currentIndex = 0;
  startScreen.classList.add("hidden");
  scoresScreen.classList.add("hidden");
  endScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  startTimer();
  renderQuestion();
});

// Timer
function startTimer() {
  if (timerId) clearInterval(timerId);
  timerId = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerId);
      endQuiz();
    }
  }, 1000);
}

// Render question
function renderQuestion() {
  allowChoice = true;
  nextBtn.classList.add("hidden");
  feedback.textContent = "";
  const q = QUESTIONS[currentIndex];
  questionText.textContent = `${currentIndex + 1}. ${q.q}`;
  choicesList.innerHTML = "";
  q.choices.forEach((c, i) => {
    const li = document.createElement("li");
    li.textContent = c;
    li.dataset.index = i;
    li.addEventListener("click", onChoiceClick);
    choicesList.appendChild(li);
  });
}

// Handle choice click
function onChoiceClick(e) {
  if (!allowChoice) return;
  allowChoice = false;
  const selected = parseInt(e.currentTarget.dataset.index, 10);
  const correct = QUESTIONS[currentIndex].answer;
  const items = choicesList.querySelectorAll("li");
  items.forEach((li) => li.removeEventListener("click", onChoiceClick));

  if (selected === correct) {
    e.currentTarget.classList.add("correct");
    feedback.textContent = "Correct!";
    score += 10;
  } else {
    e.currentTarget.classList.add("wrong");
    // highlight correct
    items.forEach((li) => {
      if (parseInt(li.dataset.index, 10) === correct) {
        li.classList.add("correct");
      }
    });
    feedback.textContent = "Wrong! 10s penalty.";
    timeLeft = Math.max(0, timeLeft - 10);
    timerEl.textContent = timeLeft;
  }

  if (currentIndex < QUESTIONS.length - 1) {
    nextBtn.classList.remove("hidden");
  } else {
    setTimeout(endQuiz, 700);
  }
}

// Next button
nextBtn.addEventListener("click", () => {
  currentIndex++;
  renderQuestion();
});

// End quiz
function endQuiz() {
  clearInterval(timerId);
  quizScreen.classList.add("hidden");
  endScreen.classList.remove("hidden");
  finalScoreEl.textContent = score;
}

// Save score
saveScoreBtn.addEventListener("click", () => {
  const initials = initialsInput.value.trim().substring(0, 3).toUpperCase();
  if (!initials) {
    alert("Enter your initials (max 3 chars)");
    return;
  }
  const entry = { initials, score, date: Date.now() };
  const list = JSON.parse(localStorage.getItem("quiz_highscores") || "[]");
  list.push(entry);
  list.sort((a, b) => b.score - a.score);
  localStorage.setItem("quiz_highscores", JSON.stringify(list.slice(0, 10)));
  initialsInput.value = "";
  showScores();
});

// View scores
viewScoresBtn.addEventListener("click", showScores);
backBtn.addEventListener("click", () => {
  scoresScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
});

// Clear scores
clearScoresBtn.addEventListener("click", () => {
  if (!confirm("Clear all saved high scores?")) return;
  localStorage.removeItem("quiz_highscores");
  renderHighScores();
});

playAgainBtn.addEventListener("click", () => {
  endScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
});

// Show scores helper
function showScores() {
  startScreen.classList.add("hidden");
  quizScreen.classList.add("hidden");
  endScreen.classList.add("hidden");
  scoresScreen.classList.remove("hidden");
  renderHighScores();
}

function renderHighScores() {
  const list = JSON.parse(localStorage.getItem("quiz_highscores") || "[]");
  highScoresList.innerHTML = "";
  if (list.length === 0) {
    highScoresList.innerHTML = "<li>No high scores yet</li>";
    return;
  }
  list.forEach((item) => {
    const li = document.createElement("li");
    const date = new Date(item.date);
    li.textContent = `${item.initials} — ${
      item.score
    } pts — ${date.toLocaleDateString()}`;
    highScoresList.appendChild(li);
  });
}

// Init
timerEl.textContent = startTimeInput.value || 60;

// Load questions at start
loadQuestions();
