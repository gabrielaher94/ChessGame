    // src/components/Pawn.js
    import Piece from "./Piece";

    class Pawn extends Piece {
    getValidMoves(board) {
        const moves = [];
        const [row, col] = this.position;
        const dir = this.color === "white" ? -1 : 1;

        const inside = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;

        const oneR = row + dir;
        // Avance 1
        if (inside(oneR, col) && !board[oneR][col]) {
        moves.push([oneR, col]);

        // Avance 2 desde fila inicial
        const start = this.color === "white" ? 6 : 1;
        const twoR = row + dir * 2;
        if (row === start && inside(twoR, col) && !board[twoR][col]) {
            moves.push([twoR, col]);
        }
        }

        // Capturas diagonales
        for (let dc of [-1, 1]) {
        const c = col + dc;
        if (inside(oneR, c) && board[oneR][c] && board[oneR][c].color !== this.color) {
            moves.push([oneR, c]);
        }
        }

        return moves;
    }
    }

    export default Pawn;
