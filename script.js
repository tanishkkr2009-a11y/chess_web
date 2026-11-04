const game = new Chess();
let board = null;

const statusEl = document.getElementById('status');
const takebackBtn = document.getElementById('takeback-btn');

function onDragStart(source, piece, position, orientation) {
    if (game.game_over()) return false;

    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
        return false;
    }
}

function onDrop(source, target) {
    let move = game.move({
        from: source,
        to: target,
        promotion: 'q'
    });

    if (move === null) return 'snapback';

    updateStatus();
}

function onSnapEnd() {
    board.position(game.fen());
}

function updateStatus() {
    let statusText = '';
    let moveColor = 'White';
    
    if (game.turn() === 'b') {
        moveColor = 'Black';
    }

    if (game.in_checkmate()) {
        statusText = `Game Over! ${moveColor} is in checkmate.`;
        statusEl.style.color = '#ff1744';
    } 
    else if (game.in_draw()) {
        statusText = 'Game Over! The match ended in a draw.';
        statusEl.style.color = '#aaaaaa';
    } 
    else {
        statusText = `${moveColor}'s turn`;
        statusEl.style.color = '#03dac6';
        
        if (game.in_check()) {
            statusText += ` (Check!)`;
            statusEl.style.color = '#ff9100';
        }
    }

    statusEl.innerText = statusText;
    takebackBtn.disabled = game.history().length === 0;
}

takebackBtn.addEventListener('click', () => {
    game.undo();
    board.position(game.fen());
    updateStatus();
});

const config = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd,
    pieceTheme: 'https://chessboardjs.com{piece}.png'
};

board = Chessboard('board', config);
updateStatus();