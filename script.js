const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const takebackBtn = document.getElementById('takeback-btn');

// Game state tracking variables
let boardState = [];
let moveHistory = [];
let isWhiteTurn = true;
let selectedSquare = null;
let isGameOver = false;

// Starting standard chess piece configuration grid layout mapping
const initialBoardLayout = [
    ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
    ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
    ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr']
];

// Map piece codes to their respective Font Awesome web font icon tags
const pieceIcons = {
    'wp': '<i class="fa-solid fa-chess-pawn piece white-piece"></i>',
    'wr': '<i class="fa-solid fa-chess-rook piece white-piece"></i>',
    'wn': '<i class="fa-solid fa-chess-knight piece white-piece"></i>',
    'wb': '<i class="fa-solid fa-chess-bishop piece white-piece"></i>',
    'wq': '<i class="fa-solid fa-chess-queen piece white-piece"></i>',
    'wk': '<i class="fa-solid fa-chess-king piece white-piece"></i>',
    'bp': '<i class="fa-solid fa-chess-pawn piece black-piece"></i>',
    'br': '<i class="fa-solid fa-chess-rook piece black-piece"></i>',
    'bn': '<i class="fa-solid fa-chess-knight piece black-piece"></i>',
    'bb': '<i class="fa-solid fa-chess-bishop piece black-piece"></i>',
    'bq': '<i class="fa-solid fa-chess-queen piece black-piece"></i>',
    'bk': '<i class="fa-solid fa-chess-king piece black-piece"></i>'
};

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
    statusElement.textContent = isWhiteTurn ? "White's Turn" : "Black's Turn";
}

// Generate the visual DOM square boxes on browser interface dynamically
function renderBoardDOM() {
    boardElement.innerHTML = '';
    
    for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
            const squareDiv = document.createElement('div');
            squareDiv.classList.add('square');
            
            // Background alternating coloring pattern mapping
            if ((r + c) % 2 === 0) {
                squareDiv.classList.add('light');
            } else {
                squareDiv.classList.add('dark');
            }
            
            squareDiv.dataset.row = r;
            squareDiv.dataset.col = c;
            
            // Set piece icon graphic markup strings
            const pieceCode = boardState[r][c];
            if (pieceCode) {
                squareDiv.innerHTML = pieceIcons[pieceCode];
            }
            
            // Retain active item highlighted visually if matches select target coordinate pointer reference rules tracking
            if (selectedSquare && selectedSquare.row === r && selectedSquare.col === c) {
                squareDiv.classList.add('selected');
            }
            
            // Core mouse/touch interactive action click routing handler logic
            squareDiv.addEventListener('click', handleSquareSelectionClick);
            boardElement.appendChild(squareDiv);
        }
    }
}

// Core step interaction controller routing rules processing function logic engine
function handleSquareSelectionClick(e) {
    if (isGameOver) return;
    
    // Ensure we reference structural square element node coordinates directly
    const squareElement = e.currentTarget;
    const targetRow = parseInt(squareElement.dataset.row);
    const targetCol = parseInt(squareElement.dataset.col);
    const pieceAtTarget = boardState[targetRow][targetCol];
    
    // Selection state routing branch check logic evaluation framework rules handler
    if (selectedSquare === null) {
        if (pieceAtTarget) {
            const isPieceWhite = pieceAtTarget.startsWith('w');
            if ((isWhiteTurn && isPieceWhite) || (!isWhiteTurn && !isPieceWhite)) {
                selectedSquare = { row: targetRow, col: targetCol };
                renderBoardDOM();
            }
        }
    } else {
        const fromRow = selectedSquare.row;
        const fromCol = selectedSquare.col;
        const movingPiece = boardState[fromRow][fromCol];
        
        // Re-clicking same selected target square deselects it safely
        if (fromRow === targetRow && fromCol === targetCol) {
            selectedSquare = null;
            renderBoardDOM();
            return;
        }
        
        // Check alignment parameters constraints checking framework block
        if (pieceAtTarget) {
            const isTargetPieceWhite = pieceAtTarget.startsWith('w');
            if ((isWhiteTurn && isTargetPieceWhite) || (!isWhiteTurn && !isTargetPieceWhite)) {
                // Adjust pick selector directly over to your new ally piece placement grid square point
                selectedSquare = { row: targetRow, col: targetCol };
                renderBoardDOM();
                return;
            }
        }
        
        // Checkmate core safeguard processing tracking rules block evaluation constraints check loop:
        // King cannot be captured directly dynamically via structural move logic framework step mappings
        if (pieceAtTarget && pieceAtTarget.endsWith('k')) {
            statusElement.textContent = `Checkmate! ${isWhiteTurn ? 'White' : 'Black'} wins the game match!`;
            isGameOver = true;
            selectedSquare = null;
            renderBoardDOM();
            return;
        }
        
        // Push board configuration deep snapshot log data into memory history tracker context buffer index array array
        moveHistory.push(boardState.map(row => [...row]));
        
        // Execute placement move step changes updating memory board context tracker tables state values records
        boardState[targetRow][targetCol] = movingPiece;
        boardState[fromRow][fromCol] = '';
        
        // Clear global selections indicator pointer references and flip side switch tracking boolean value states mapping
        selectedSquare = null;
        isWhiteTurn = !isWhiteTurn;
        
        updateStatusMessage();
        renderBoardDOM();
    }
}

// Actionable structural reverse steps handler framework engine operation processing flow execution logic
takebackBtn.addEventListener('click', () => {
    if (moveHistory.length > 0) {
        // Roll back array buffer pointer configuration mappings context entries dynamically to previous saved item log frame snapshot values
        boardState = moveHistory.pop();
        isWhiteTurn = !isWhiteTurn;
        isGameOver = false;
        selectedSquare = null;
        
        updateStatusMessage();
        renderBoardDOM();
    }
});

// Run execution setups logic loop immediately on tab window thread startup load lifecycle execution
initGameData();
renderBoardDOM();
