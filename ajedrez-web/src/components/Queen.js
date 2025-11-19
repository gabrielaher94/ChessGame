    // src/components/Queen.js
    import Piece from "./Piece";
    import Rook from "./Rook";
    import Bishop from "./Bishop";

    // Opcional: reutilizamos la lógica combinada
    class Queen extends Piece {
    getValidMoves(board) {
        // crear instancias temporales para reusar lógica de Rook y Bishop
        const r = new Rook(this.color, this.position);
        const b = new Bishop(this.color, this.position);
        return [...r.getValidMoves(board), ...b.getValidMoves(board)];
    }
    }

    export default Queen;
