    // src/components/Knight.js
    import Piece from "./Piece";

    class Knight extends Piece {
    getValidMoves(board) {
        const moves = [];
        const [row, col] = this.position;
        const inside = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;

        const jumps = [
        [-2, -1], [-2, 1],
        [-1, -2], [-1, 2],
        [1, -2], [1, 2],
        [2, -1], [2, 1],
        ];

        for (const [dr, dc] of jumps) {
        const r = row + dr;
        const c = col + dc;
        if (!inside(r, c)) continue;
        const target = board[r][c];
        if (!target || target.color !== this.color) moves.push([r, c]);
        }

        return moves;
    }
    }

    export default Knight;
