    // src/components/Queen.js
    import Piece from "./Piece";
    import Rook from "./Rook";
    import Bishop from "./Bishop";

    class Queen extends Piece {
    getValidMoves(board) {
        // Clonamos la posición por seguridad
        const pos = [...this.position];

        const rook = new Rook(this.color, pos);
        const bishop = new Bishop(this.color, pos);

        const rookMoves = rook.getValidMoves(board);
        const bishopMoves = bishop.getValidMoves(board);

        return [...rookMoves, ...bishopMoves];
    }
    }

    export default Queen;
