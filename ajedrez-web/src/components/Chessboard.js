import React, { useState } from "react";
import {
  FaChessKing,
  FaChessQueen,
  FaChessRook,
  FaChessBishop,
  FaChessKnight,
  FaChessPawn,
} from "react-icons/fa";
import Piece from "./Piece";
import "./Chessboard.css";

const pieceIcons = {
  king: FaChessKing,
  queen: FaChessQueen,
  rook: FaChessRook,
  bishop: FaChessBishop,
  knight: FaChessKnight,
  pawn: FaChessPawn,
};

const Chessboard = () => {
  // la matriz 8x8
  const initialBoard = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));

  // Piezas
  initialBoard[0][3] = new Piece("king", "black");
  initialBoard[7][3] = new Piece("king", "white");
  initialBoard[0][4] = new Piece("queen", "black");
  initialBoard[7][4] = new Piece("queen", "white");
  initialBoard[0][0] = new Piece("rook", "black");
  initialBoard[7][0] = new Piece("rook", "white");
  initialBoard[0][7] = new Piece("rook", "black");
  initialBoard[7][7] = new Piece("rook", "white");
  initialBoard[0][2] = new Piece("bishop", "black");
  initialBoard[7][2] = new Piece("bishop", "white");
  initialBoard[0][5] = new Piece("bishop", "black");
  initialBoard[7][5] = new Piece("bishop", "white");
  initialBoard[0][1] = new Piece("knight", "black");
  initialBoard[7][1] = new Piece("knight", "white");
  initialBoard[0][6] = new Piece("knight", "black");
  initialBoard[7][6] = new Piece("knight", "white");
  initialBoard[1][0] = new Piece("pawn", "black");
  initialBoard[6][0] = new Piece("pawn", "white");
  initialBoard[1][1] = new Piece("pawn", "black");
  initialBoard[6][1] = new Piece("pawn", "white");
  initialBoard[1][2] = new Piece("pawn", "black");
  initialBoard[6][2] = new Piece("pawn", "white");
  initialBoard[1][3] = new Piece("pawn", "black");
  initialBoard[6][3] = new Piece("pawn", "white");
  initialBoard[1][4] = new Piece("pawn", "black");
  initialBoard[6][4] = new Piece("pawn", "white");
  initialBoard[1][5] = new Piece("pawn", "black");
  initialBoard[6][5] = new Piece("pawn", "white");
  initialBoard[1][6] = new Piece("pawn", "black");
  initialBoard[6][6] = new Piece("pawn", "white");
  initialBoard[1][7] = new Piece("pawn", "black");
  initialBoard[6][7] = new Piece("pawn", "white");


  const [board, setBoard] = useState(initialBoard);

  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isDark = (rowIndex + colIndex) % 2 === 1;
          const squareColor = isDark ? "square dark" : "square light";
          const PieceIcon = cell ? pieceIcons[cell.type] : null;

          return (
            <div key={`${rowIndex}-${colIndex}`} className={squareColor}>
              {PieceIcon && (
                <PieceIcon
                  color={cell.color === "white" ? "white" : "black"}
                  size={32}
                />
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Chessboard;
