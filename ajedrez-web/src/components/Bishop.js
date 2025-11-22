    import Piece from "./Piece";

    class Bishop extends Piece {
    getValidMoves(board) {
        const [row, col] = this.position;

        const directions = [
        [-1, -1], [-1, 1],
        [1, -1],  [1, 1],
        ];

        const isInside = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;

        const moves = [];

        for (const [dr, dc] of directions) {
        let r = row + dr;
        let c = col + dc;

        while (isInside(r, c)) {
            const piece = board[r][c];

            if (!piece) {
            moves.push([r, c]);
            } else {
            if (piece.color !== this.color) {
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
