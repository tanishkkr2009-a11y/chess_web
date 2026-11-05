const pieceIcons = {
    'WP': '<img src="https://chessboardjs.com/img/chesspieces/wikipedia/wP.png" alt="wP">',
    'WR': '<img src="https://chessboardjs.com/img/chesspieces/wikipedia/wR.png" alt="wR">',
    'WN': '<img src="https://chessboardjs.com/img/chesspieces/wikipedia/wN.png" alt="wN">',
    'WB': '<img src="https://chessboardjs.com/img/chesspieces/wikipedia/wB.png" alt="wB">',
    'WQ': '<img src="https://chessboardjs.com/img/chesspieces/wikipedia/wQ.png" alt="wQ">',
    'WK': '<img src="https://chessboardjs.com/img/chesspieces/wikipedia/wK.png" alt="wK">',
    'BP': '<img src="https://chessboardjs.com/img/chesspieces/wikipedia/bP.png" alt="bP">',
    'BR': '<img src="https://chessboardjs.com/img/chesspieces/wikipedia/bR.png" alt="bR">',
    'BN': '<img src="https://chessboardjs.com" alt="bN">',
    'BB': '<img src="https://chessboardjs.com" alt="bB">',
    'BQ': '<img src="https://chessboardjs.com/img/chesspieces/wikipedia/bQ.png" alt="bQ">',
    'BK': '<img src="https://chessboardjs.com" alt="bK">'
};

const initialBoardLayout = [
    ["BR", "BN", "BB", "BQ", "BK", "BB", "BN", "BR"],
    ["BP", "BP", "BP", "BP", "BP", "BP", "BP", "BP"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["WP", "WP", "WP", "WP", "WP", "WP", "WP", "WP"],
    ["WR", "WN", "WB", "WQ", "WK", "WB", "WN", "WR"]
];

let boardState = [];
let moveHistory = [];
let isWhiteTurn = true;
let selectedSquare = null;
let isGameOver = false;

const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const takebackBtn = document.getElementById("takebackBtn");

function initGameData() {
    boardState = initialBoardLayout.map(row => [...row]);
    moveHistory = [];
    isWhiteTurn = true;
    selectedSquare = null;
    isGameOver = false;
    updateStatusMessage();
}

function updateStatusMessage() {
    if (isGameOver) return;
    if (statusElement) {
        statusElement.textContent = isWhiteTurn ? "White's Turn" : "Black's Turn";
    }
}

function renderBoardDOM() {
    if (!boardElement) return;
    boardElement.innerHTML = "";
    
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const squareDiv = document.createElement('div');
            squareDiv.classList.add('square');
            
            if ((r + c) % 2 === 0) {
                squareDiv.classList.add('light');
            } else {
                squareDiv.classList.add('dark');
            }
            
            squareDiv.dataset.row = r;
            squareDiv.dataset.col = c;
            
            const pieceCode = boardState[r][c];
            if (pieceCode && pieceIcons[pieceCode]) {
                squareDiv.innerHTML = pieceIcons[pieceCode];
            }
            
            if (selectedSquare && selectedSquare.row === r && selectedSquare.col === c) {
                squareDiv.classList.add('selected');
            }
            
            squareDiv.addEventListener('click', handleSquareSelectionClick);
            boardElement.appendChild(squareDiv);
        }
    }
}

function handleSquareSelectionClick(e) {
    if (isGameOver) return;
    
    const squareElement = e.currentTarget;
    const targetRow = parseInt(squareElement.dataset.row);
    const targetCol = parseInt(squareElement.dataset.col);
    const pieceAtTarget = boardState[targetRow][targetCol];
    
    if (selectedSquare === null) {
        if (pieceAtTarget) {
            const isPieceWhite = pieceAtTarget.startsWith('W');
            if ((isWhiteTurn && isPieceWhite) || (!isWhiteTurn && !isPieceWhite)) {
                selectedSquare = { row: targetRow, col: targetCol };
                renderBoardDOM();
            }
        }
    } else {
        const fromRow = selectedSquare.row;
        const fromCol = selectedSquare.col;
        const movingPiece = boardState[fromRow][fromCol];
        
        if (fromRow === targetRow && fromCol === targetCol) {
            selectedSquare = null;
            updateStatusMessage();
            renderBoardDOM();
        }
    } 
}    
