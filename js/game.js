let initialBoard = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

let selectedPiece = null;
let selectedSquare = null;
let tutorialMode = false;
let tutorialStage = 0;
let enPassantSquare = null;
let aiDifficulty = 3;

const tutorialMessages = [
  "Welcome to Chess! Let's start with the pawn...",
  // Other messages
];

// Board setup and rendering logic
function createBoard() {
  const board = document.getElementById('board');
  board.innerHTML = ''; // Clear previous board
  for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
          let square = document.createElement('div');
          square.classList.add('square');
          square.dataset.row = row;
          square.dataset.col = col;
          let piece = initialBoard[row][col];
          if (piece) {
              square.innerText = piece;
          }
          square.addEventListener('click', handleSquareClick);
          board.appendChild(square);
      }
  }
}

// Tutorial and scenario functions
function startTutorial() {
  tutorialMode = true;
  tutorialStage = 0;
  displayTutorialMessage();
  highlightTutorialMoves();
}

function loadCheckmateScenario() {
  initialBoard = [
      ['r', '', 'b', '', 'k', 'b', 'n', 'r'],
      ['p', 'p', 'p', 'q', 'p', 'p', 'p', 'p'],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['P', 'P', 'P', '', 'P', 'P', 'P', 'P'],
      ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
  ];
  createBoard();
  document.getElementById('scenario-message').innerText = "Checkmate in one move!";
}

// AI logic
function aiMove() {
  let bestMove = null;
  let bestValue = -Infinity;
  let moves = generateMoves(initialBoard, 'white');
  for (let move of moves) {
      makeMove(initialBoard, move);
      let boardValue = minimax(initialBoard, aiDifficulty, false);
      undoMove(initialBoard, move);
      if (boardValue > bestValue) {
          bestValue = boardValue;
          bestMove = move;
      }
  }
  if (bestMove) {
      makeMove(initialBoard, bestMove);
      createBoard();
  }
}

// Score tracking
function updateScore(points) {
  let currentScore = parseInt(localStorage.getItem('chessScore')) || 0;
  currentScore += points;
  localStorage.setItem('chessScore', currentScore);
  displayScore();
}

function displayScore() {
  const scoreElement = document.getElementById('score');
  const currentScore = parseInt(localStorage.getItem('chessScore')) || 0;
  scoreElement.innerText = `Score: ${currentScore}`;
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
  createBoard();
  displayScore();
  document.getElementById('start-tutorial').addEventListener('click', startTutorial);
  document.getElementById('load-checkmate-scenario').addEventListener('click', loadCheckmateScenario);
  document.getElementById('ai-move').addEventListener('click', aiMove);
});
