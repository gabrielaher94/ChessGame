import React from "react";
import { FaChessKing, FaChessQueen, FaChessRook, FaChessBishop, FaChessKnight, FaChessPawn } from "react-icons/fa";
import "./Chessboard.css";

const Chessboard = () => {
  const squares = [];

  // Función que devuelve la pieza con el color adecuado
  const getPiece = (row, col) => {
    const isBlack = row < 2; // filas 0 y 1 → piezas negras
    const color = isBlack ? "black" : "white";

    // Filas iniciales de piezas grandes
    const firstRowPieces = [FaChessRook, FaChessKnight, FaChessBishop, FaChessQueen, FaChessKing, FaChessBishop, FaChessKnight, FaChessRook];

    if (row === 0 || row === 7) {
      const Piece = firstRowPieces[col];
      return <Piece color={color} />;
    } else if (row === 1 || row === 6) {
      return <FaChessPawn color={color} />;
    }
    return null; // casilla vacía
  };

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const isDark = (row + col) % 2 === 1;
      squares.push(
        <div
          key={`${row}-${col}`}
          className={`square ${isDark ? "dark" : "light"}`}
        >
          {getPiece(row, col)}
        </div>
      );
    }
  }

  return <div className="chessboard">{squares}</div>;
};

export default Chessboard;
