    class Piece {
    constructor(type, color,position) {
        this.type = type; 
        this.color = color; 
        this.position=position;
    }
    //Metodo para redifinir en la subclase
    getValidMoves(board){
        return[];
    }
    }

    export default Piece;
