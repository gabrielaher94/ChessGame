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
  const initialBoard = Array(8)
    .fill(null)
    .map(() => Array(8).fill(null));

  // Colocación de piezas
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

  for (let i = 0; i < 8; i++) {
    initialBoard[1][i] = new Piece("pawn", "black");
    initialBoard[6][i] = new Piece("pawn", "white");
  }

  const [board, setBoard] = useState(initialBoard);
  const [selected, setSelected] = useState(null);
  const [validMoves, setValidMoves] = useState([]);

  const handleClick = (rowIndex, colIndex) => {
    const piece = board[rowIndex][colIndex];

    if (!piece) {
      console.log("No hay pieza en esta casilla");
      setSelected(null);
      setValidMoves([]);
      return;
    }

    console.log("Pieza seleccionada:", piece);
    const moves = piece.getValidMoves(board);
    setSelected([rowIndex, colIndex]);
    setValidMoves(moves);
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isDark = (rowIndex + colIndex) % 2 === 1;
          const squareColor = isDark ? "square dark" : "square light";
          const PieceIcon = cell ? pieceIcons[cell.type] : null;

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={squareColor}
              onClick={() => handleClick(rowIndex, colIndex)}
            >
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
