    // src/components/Bishop.js
    import Piece from "./Piece";

    class Bishop extends Piece {
    getValidMoves(board) {
        const moves = [];
        const [row, col] = this.position;
        const dirs = [
        [-1, -1], [-1, 1],
        [1, -1], [1, 1],
        ];
        const inside = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;

        for (const [dr, dc] of dirs) {
        let r = row + dr;
        let c = col + dc;
        while (inside(r, c)) {
            const target = board[r][c];
            if (!target) {
            moves.push([r, c]);
            } else {
            if (target.color !== this.color) moves.push([r, c]);
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
