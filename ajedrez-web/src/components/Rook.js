    // src/components/Rook.js
    import Piece from "./Piece";

    class Rook extends Piece {
    getValidMoves(board) {
        const moves = [];
        const [row, col] = this.position;
        const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1], // arriba, abajo, izq, der
        ];

        for (let [dr, dc] of directions) {
        let r = row + dr;
        let c = col + dc;
        while (r >= 0 && r < 8 && c >= 0 && c < 8) {
            if (board[r][c] === null) {
            moves.push([r, c]);
            } else {
            if (board[r][c].color !== this.color) {
                moves.push([r, c]); // puede capturar
            }
            break; // no puede saltar piezas
            }
            r += dr;
            c += dc;
        }
        }

        return moves;
    }
    }

    export default Rook;
