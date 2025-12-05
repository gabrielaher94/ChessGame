    // src/components/Rook.js
    import Piece from "./Piece";

    class Rook extends Piece {
    constructor(color, position) {
        super(color, position);
        this.hasMoved = false; // agregado para enroque
    }

    getValidMoves(board) {
        const [row, col] = this.position;
        const directions = [[-1,0],[1,0],[0,-1],[0,1]];
        const moves = [];
        const inside = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;

        for (const [dr, dc] of directions) {
        let r = row + dr, c = col + dc;
        while (inside(r,c)) {
            const p = board[r][c];
            if (!p) moves.push([r,c]);
            else {
            if (p.color !== this.color) moves.push([r,c]);
            break;
            }
            r += dr; c += dc;
        }
        }

        return moves;
    }

    moveTo([toRow, toCol]) {
        this.position = [toRow, toCol];
        this.hasMoved = true; // agregado para enroque
    }
    }

    export default Rook;