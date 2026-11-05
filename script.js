const pieceIcons = {
    'WP': '<img src="https://chessboardjs.com" alt="wP">',
    'WR': '<img src="https://chessboardjs.com" alt="wR">',
    'WN': '<img src="https://chessboardjs.com" alt="wN">',
    'WB': '<img src="https://chessboardjs.com" alt="wB">',
    'WQ': '<img src="https://chessboardjs.com" alt="wQ">',
    'WK': '<img src="https://chessboardjs.com" alt="wK">',
    'BP': '<img src="https://chessboardjs.com" alt="bP">',
    'BR': '<img src="https://chessboardjs.com" alt="bR">',
    'BN': '<img src="https://chessboardjs.com" alt="bN">', // Fixed path
    'BB': '<img src="https://chessboardjs.com" alt="bB">', // Fixed path
    'BQ': '<img src="https://chessboardjs.com" alt="bQ">',
    'BK': '<img src="https://chessboardjs.com" alt="bK">'  // Fixed path
};

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
        
        // If clicking the same square, deselect it
        if (fromRow === targetRow && fromCol === targetCol) {
            selectedSquare = null;
            renderBoardDOM();
            return;
        }

        // Prevent capturing own pieces
        if (pieceAtTarget && pieceAtTarget.startsWith(movingPiece[0])) {
            // Switch selection to the new friendly piece instead
            selectedSquare = { row: targetRow, col: targetCol };
            renderBoardDOM();
            return;
        }

        // Execute the move
        // Save history for potential takebacks
        moveHistory.push({
            from: { row: fromRow, col: fromCol },
            to: { row: targetRow, col: targetCol },
            movedPiece: movingPiece,
            capturedPiece: pieceAtTarget
        });

        // Update the internal state grid
        boardState[targetRow][targetCol] = movingPiece;
        boardState[fromRow][fromCol] = "";

        // Reset state tracker & toggle turn
        selectedSquare = null;
        isWhiteTurn = !isWhiteTurn;
        
        updateStatusMessage();
        renderBoardDOM();
    } 
}
