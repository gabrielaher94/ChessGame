    // src/components/King.js
    import Piece from "./Piece";

    class King extends Piece {
    getValidMoves(board) {
        const moves = [];
        const [row, col] = this.position;

        const dirs = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],          [0, 1],
        [1, -1],  [1, 0], [1, 1],
        ];

        const inside = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;

        for (const [dr, dc] of dirs) {
        const r = row + dr;
        const c = col + dc;

        if (!inside(r, c)) continue;

        const target = board[r][c];

        // no puedo ir donde hay mi propia pieza
        if (target && target.color === this.color) continue;

        // EVITAR MOVERSE A UNA CASILLA ATACADA
        if (!this.squareIsAttacked(board, r, c)) {
            moves.push([r, c]);
        }
        }

        return moves;
    }

    squareIsAttacked(board, r, c) {
        const enemy = this.color === "white" ? "black" : "white";

        const inside = (x, y) => x >= 0 && x < 8 && y >= 0 && y < 8;

        // ⚠️ IMPORTANTE:
        // No usamos getValidMoves() del rey enemigo
        // porque causa recursión infinita.

        // 1. Ataques de peones
        const pawnDir = enemy === "white" ? -1 : 1;
        const pawnAttacks = [
        [r + pawnDir, c - 1],
        [r + pawnDir, c + 1],
        ];
        for (const [pr, pc] of pawnAttacks) {
        if (inside(pr, pc)) {
            const p = board[pr][pc];
            if (p && p.color === enemy && p.type === "pawn") return true;
        }
        }

        // 2. Ataques de caballos
        const knightMoves = [
        [-2, -1], [-2, 1],
        [-1, -2], [-1, 2],
        [1, -2], [1, 2],
        [2, -1], [2, 1],
        ];
        for (const [dr, dc] of knightMoves) {
        const nr = r + dr;
        const nc = c + dc;
        if (inside(nr, nc)) {
            const p = board[nr][nc];
            if (p && p.color === enemy && p.type === "knight") return true;
        }
        }

        // 3. Ataques en línea recta (torre o reina)
        const rookDirs = [
        [-1, 0], [1, 0], [0, -1], [0, 1],
        ];
        for (const [dr, dc] of rookDirs) {
        let nr = r + dr;
        let nc = c + dc;
        while (inside(nr, nc)) {
            const piece = board[nr][nc];
            if (piece) {
            if (piece.color === enemy && (piece.type === "rook" || piece.type === "queen")) {
                return true;
            }
            break;
            }
            nr += dr;
            nc += dc;
        }
        }

        // 4. Ataques diagonales (alfil o reina)
        const bishopDirs = [
        [-1, -1], [-1, 1], [1, -1], [1, 1],
        ];
        for (const [dr, dc] of bishopDirs) {
        let nr = r + dr;
        let nc = c + dc;
        while (inside(nr, nc)) {
            const piece = board[nr][nc];
            if (piece) {
            if (piece.color === enemy && (piece.type === "bishop" || piece.type === "queen")) {
                return true;
            }
            break;
            }
            nr += dr;
            nc += dc;
        }
        }

        // 5. Ataques del rey enemigo (solo casillas adyacentes)
        const kingDirs = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],          [0, 1],
        [1, -1],  [1, 0], [1, 1],
        ];
        for (const [dr, dc] of kingDirs) {
        const kr = r + dr;
        const kc = c + dc;
        if (inside(kr, kc)) {
            const k = board[kr][kc];
            if (k && k.color === enemy && k.type === "king") {
            return true;
            }
        }
        }

        return false;
    }
    }

    export default King;
