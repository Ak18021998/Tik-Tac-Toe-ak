const board = document.getElementById('board');
let currentPlayer = 'X';
let winner = null;
let isDraw = false;
const cells = Array.from({ length: 9 });

const checkWinner = () => {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      winner = cells[a];
      break;
    }
  }

  if (!cells.includes(null) && !winner) {
    isDraw = true;
  }
};

const renderBoard = () => {
  board.innerHTML = '';
  cells.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.textContent = cell;
    cellElement.addEventListener('click', () => handleCellClick(index));
    board.appendChild(cellElement);
  });
};

const handleCellClick = (index) => {
  if (cells[index] || winner) return;
  cells[index] = currentPlayer;
  checkWinner();
  if (!winner && !isDraw) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
  renderBoard();
  if (winner || isDraw) {
    setTimeout(() => {
      alert(winner ? `Player ${winner} wins!` : 'It\'s a draw!');
      resetGame();
    }, 100);
  }
};

const resetGame = () => {
  currentPlayer = 'X';
  winner = null;
  isDraw = false;
  cells.fill(null);
  renderBoard();
};

renderBoard();
