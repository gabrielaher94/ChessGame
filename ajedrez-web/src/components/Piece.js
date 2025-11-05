    class Piece {
    constructor(type, color) {
        this.type = type; 
        this.color = color; 
        this.position=this.position;
    }
    //Metodo para redifinir en la subclase
    getValidMoves(board){
        return[];
    }
    }

    export default Piece;
