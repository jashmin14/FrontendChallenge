const gameBoard = document.getElementById("gameBoard");
const statusEl = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let cards = ["🍎", "🍌", "🍇", "🍒", "🍊", "🍍", "🥝", "🍉"];
cards = [...cards, ...cards]; // duplicate for pairs
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  gameBoard.innerHTML = "";
  matches = 0;
  lockBoard = false;
  firstCard = null;
  secondCard = null;

  shuffle(cards).forEach((symbol) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;
    card.textContent = "?"; // hidden face
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });

  statusEl.textContent = "Find all the pairs!";
}

function flipCard(e) {
  const card = e.target;
  if (lockBoard || card.classList.contains("flipped")) return;

  card.textContent = card.dataset.symbol;
  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  checkMatch();
}

function checkMatch() {
  if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
    matches++;
    resetTurn();
    if (matches === cards.length / 2) {
      statusEl.textContent = "🎉 You found all pairs!";
    }
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.textContent = "?";
      secondCard.textContent = "?";
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

restartBtn.addEventListener("click", createBoard);

// init game
createBoard();
