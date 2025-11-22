    // src/components/Pawn.js
    import Piece from "./Piece";

    class Pawn extends Piece {
    constructor(color, position) {
        super(color, position);
        this.hasMoved = false; // indica si ya se movió
    }

    getValidMoves(board) {
        const moves = [];
        const [row, col] = this.position;
        const dir = this.color === "white" ? -1 : 1;

        const inside = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;

        const oneR = row + dir;

        // Avance 1
        if (inside(oneR, col) && !board[oneR][col]) {
        moves.push([oneR, col]);

        // Avance 2 desde fila inicial, solo si no se ha movido y la casilla intermedia está libre
        const twoR = row + dir * 2;
        if (!this.hasMoved && inside(twoR, col) && !board[twoR][col]) {
            moves.push([twoR, col]);
        }
        }

        // Capturas diagonales
        for (let dc of [-1, 1]) {
        const c = col + dc;
        if (
            inside(oneR, c) &&
            board[oneR][c] &&
            board[oneR][c].color !== this.color
        ) {
            moves.push([oneR, c]);
        }
        }

        return moves;
    }

    // Método para mover el peón y marcarlo como movido
    moveTo(position) {
        this.position = position;
        this.hasMoved = true;
    }
    }

    export default Pawn;
