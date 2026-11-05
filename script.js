
 

// 1. Piece Mapping Table linking board string state tracking values directly to high-quality CDN image markups
const pieceIcons = {
    'WP': '<img src="https://chessboardjs.com/img/chesspieces/wikipedia/wP.png" alt="White Pawn" style="width:100%; height:100%; object-fit:contain; display:block;">',
    'WR': '<img src="https://chessboardjs.com/img/chesspieces/wikipedia/wR.png" alt="White Rook" style="width:100%; height:100%; object-fit:contain; display:block;">',
    'WN': '<img src="https://chessboardjs.com/img/chesspieces/wikipedia/wN.png" alt="White Knight" style="width:100%; height:100%; object-fit:contain; display:block;">',
    'WB': '<img src="https://chessboardjs.com/img/chesspieces/wikipedia/wB.png" alt="White Bishop" style="width:100%; height:100%; object-fit:contain; display:block;">',
    'WQ': '<img src="https://chessboardjs.com/img/chesspieces/wikipedia/wQ.png" alt="White Queen" style="width:100%; height:100%; object-fit:contain; display:block;">',
    'WK': '<img src="https://chessboardjs.com/img/chesspieces/wikipedia/wK.png" alt="White King" style="width:100%; height:100%; object-fit:contain; display:block;">',
    
    'BP': '<img src="https://chessboardjs.com/img/chesspieces/wikipedia/bP.png" alt="Black Pawn" style="width:100%; height:100%; object-fit:contain; display:block;">',
    'BR': '<img src="https://chessboardjs.com/img/chesspieces/wikipedia/bR.png" alt="Black Rook" style="width:100%; height:100%; object-fit:contain; display:block;">',
    'BN': '<img src="https://chessboardjs.com/img/chesspieces/wikipedia/bN.png" alt="Black Knight" style="width:100%; height:100%; object-fit:contain; display:block;">',
    'BB': '<img src="https://chessboardjs.com/img/chesspieces/wikipedia/bB.png" alt="Black Bishop" style="width:100%; height:100%; object-fit:contain; display:block;">',
    'BQ': '<img src="https://chessboardjs.com/img/chesspieces/wikipedia/bQ.png" alt="Black Queen" style="width:100%; height:100%; object-fit:contain; display:block;">',
    'BK': '<img src="https://chessboardjs.com/img/chesspieces/wikipedia/bK.png" alt="Black King" style="width:100%; height:100%; object-fit:contain; display:block;">'
};

// Initial template starting structural array alignment snapshot matrix config
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

// Global runtime operation storage parameter states references
let boardState = [];
let moveHistory = [];
let isWhiteTurn = true;
let selectedSquare = null;
let isGameOver = false;

// DOM Engine UI references components mappings
const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const takebackBtn = document.getElementById("takebackBtn") || document.querySelector(".takeback-btn") || document.getElementsByTagName("button")[0];

// Deep copy initial setup template config values safely
function initGameData() {
    boardState = initialBoardLayout.map(row => [...row]);
    moveHistory = [];
    isWhiteTurn = true;
    selectedSquare = null;
    isGameOver = false;
    updateStatusMessage();
}

// Update game status display info text
function updateStatusMessage() {
    if (isGameOver) return;
    if (statusElement) {
        statusElement.textContent = isWhiteTurn ? "White's Turn" : "Black's Turn";
    }
}

// Generate the visual DOM square boxes on browser interface dynamically
function renderBoardDOM() {
    if (!boardElement) return;
    boardElement.innerHTML = "";
    
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const squareDiv = document.createElement('div');
