    import Piece from "./Piece";
    import Rook from "./Rook";

    class King extends Piece {
    constructor(color, position) {
        super(color, position);
        this.hasMoved = false;
    }

    getValidMoves(board) {
        const moves = [];
        const [row, col] = this.position;

        const dirs = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1]
        ];

        const inside = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;

        // Movimiento normal del rey
        for (const [dr, dc] of dirs) {
        const r = row + dr;
        const c = col + dc;

        if (!inside(r, c)) continue;

        const p = board[r][c];
        if (!p || p.color !== this.color) {
            moves.push([r, c]);
        }
        }

        // -------------------------------------------
        //               ENROQUE
        // -------------------------------------------
        if (!this.hasMoved && !this.squareIsAttacked(board, row, col)) {
        
        // ---- Enroque corto (Rey hacia la derecha)
        const rookK = board[row][7];
        if (
            rookK &&
            rookK instanceof Rook &&
            !rookK.hasMoved &&
            !board[row][5] &&
            !board[row][6] &&
            !this.squareIsAttacked(board, row, 5) &&
            !this.squareIsAttacked(board, row, 6)
        ) {
            moves.push([row, 6]);
        }

        // ---- Enroque largo (Rey hacia la izquierda)
        const rookQ = board[row][0];
        if (
            rookQ &&
            rookQ instanceof Rook &&
            !rookQ.hasMoved &&
            !board[row][1] &&
            !board[row][2] &&
            !board[row][3] &&
            !this.squareIsAttacked(board, row, 2) &&
            !this.squareIsAttacked(board, row, 3)
        ) {
            moves.push([row, 2]);
        }
        }

        return moves;
    }

    moveTo([toRow, toCol], board) {
        const [row, col] = this.position;

        // Detectar enroque corto
        if (toRow === row && toCol === 6) {
        const rook = board[row][7];
        board[row][5] = rook;
        board[row][7] = null;
        rook.position = [row, 5];
        rook.hasMoved = true;
        }

        // Detectar enroque largo
        if (toRow === row && toCol === 2) {
        const rook = board[row][0];
        board[row][3] = rook;
        board[row][0] = null;
        rook.position = [row, 3];
        rook.hasMoved = true;
        }

        // Actualizar rey
        this.position = [toRow, toCol];
        this.hasMoved = true;
    }

    // Esta función debe estar implementada en tu motor
    squareIsAttacked(board, r, c) {
        // Si ya existe en tu proyecto, usa esa versión.
        // Si no la tienes, puedo darte una versión completa.
        return false;
    }
    }

    export default King;
