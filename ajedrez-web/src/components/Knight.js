    import Piece from "./Piece";

    class Knight extends Piece {
    getValidMoves(board) {
        const [row, col] = this.position;

        const jumps = [
        [-2, -1], [-2, 1],
        [-1, -2], [-1, 2],
        [1, -2],  [1, 2],
        [2, -1],  [2, 1],
        ];

        const isInside = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;

        return jumps
        .map(([dr, dc]) => [row + dr, col + dc])
        .filter(([r, c]) => isInside(r, c))
        .filter(([r, c]) => {
            const target = board[r][c];
            return !target || target.color !== this.color;
        });
    }
    }

    export default Knight;
