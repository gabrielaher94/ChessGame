    // src/components/Knight.js
    import Piece from "./Piece";

    class Knight extends Piece {
    getValidMoves(board) {
        const moves = [];
        const [row, col] = this.position;
        const jumps = [
        [-2, -1], [-2, 1], [2, -1], [2, 1],
        [-1, -2], [-1, 2], [1, -2], [1, 2],
        ];

        for (let [dr, dc] of jumps) {
        const r = row + dr;
        const c = col + dc;
        if (r >= 0 && r < 8 && c >= 0 && c < 8) {
            const target = board[r][c];
            if (!target || target.color !== this.color) {
            moves.push([r, c]);
            }
        }
        }

        return moves;
    }
    }

    export default Knight;
