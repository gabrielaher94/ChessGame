    // src/components/King.js
    import Piece from "./Piece";

    class King extends Piece {
    getValidMoves(board) {
        const moves = [];
        const [row, col] = this.position;
        const dirs = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1],
        ];
        const inside = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;

        for (const [dr, dc] of dirs) {
        const r = row + dr;
        const c = col + dc;
        if (!inside(r, c)) continue;
        const target = board[r][c];
        if (!target || target.color !== this.color) moves.push([r, c]);
        }

        return moves;
    }
    }

    export default King;
