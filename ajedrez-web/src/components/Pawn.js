    // src/components/Pawn.js
    import Piece from "./Piece";

    class Pawn extends Piece {
    getValidMoves(board) {
        const moves = [];
        const [row, col] = this.position;
        const direction = this.color === "white" ? -1 : 1;

        // Movimiento hacia adelante
        const nextRow = row + direction;
        if (board[nextRow] && board[nextRow][col] === null) {
        moves.push([nextRow, col]);
        }

        // Doble avance desde posición inicial
        const startRow = this.color === "white" ? 6 : 1;
        if (row === startRow && board[row + 2 * direction][col] === null) {
        moves.push([row + 2 * direction, col]);
        }

        // Capturas diagonales
        const captureCols = [col - 1, col + 1];
        for (let c of captureCols) {
        if (
            board[nextRow] &&
            board[nextRow][c] &&
            board[nextRow][c].color !== this.color
        ) {
            moves.push([nextRow, c]);
        }
        }

        return moves;
    }
    }

    export default Pawn;
