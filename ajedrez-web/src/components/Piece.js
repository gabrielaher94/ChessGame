    class Piece {
    constructor(color,position) {
        this.icon=null; 
        this.color = color; 
        this.position=position;
    }
    //Metodo para redifinir en la subclase
    getValidMoves(board){
        return[];
    }
    }

    export default Piece;
