    // src/components/Bishop.js
    import Piece from "./Piece";

    class Bishop extends Piece {
    getValidMoves(board) {
        const moves = [];
        const [row, col] = this.position;
        const directions = [
        [-1, -1], [-1, 1], [1, -1], [1, 1], // diagonales
        ];

        for (let [dr, dc] of directions) {
        let r = row + dr;
        let c = col + dc;
        while (r >= 0 && r < 8 && c >= 0 && c < 8) {
            if (board[r][c] === null) {
            moves.push([r, c]);
            } else {
            if (board[r][c].color !== this.color) {
                moves.push([r, c]);
            }
            break;
            }
            r += dr;
            c += dc;
        }
        }

        return moves;
    }
    }

    export default Bishop;
