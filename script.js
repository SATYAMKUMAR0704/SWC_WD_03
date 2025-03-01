let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = false;
let vsComputer = false;

document.getElementById('pvp').addEventListener('click', () => startGame(false));
document.getElementById('pvc').addEventListener('click', () => startGame(true));
document.getElementById('reset').addEventListener('click', resetGame);

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function startGame(isComputer) {
    vsComputer = isComputer;
    gameActive = true;
    board.fill('');
    currentPlayer = 'X';
    document.getElementById('status').textContent = "Player X's turn";
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
}

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');
    if (board[index] || !gameActive) return;
    
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add('taken');
    
    if (checkWinner()) {
        document.getElementById('status').textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }
    
    if (!board.includes('')) {
        document.getElementById('status').textContent = "It's a draw!";
        gameActive = false;
        return;
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('status').textContent = `Player ${currentPlayer}'s turn`;
    
    if (vsComputer && currentPlayer === 'O') {
        setTimeout(computerMove, 500);
    }
}

function computerMove() {
    let emptyCells = board.map((val, idx) => (val === '' ? idx : null)).filter(val => val !== null);
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    
    document.querySelector(`.cell[data-index='${randomIndex}']`).click();
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function resetGame() {
    startGame(vsComputer);
}
