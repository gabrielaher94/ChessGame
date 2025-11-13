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
import Pawn from "./Pawn";
import Knight from "./Knight";
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
  const inicialBoard = [];

  for (let row = 0; row < 8; row++) {
    const fila = [];
    for (let col = 0; col < 8; col++) {
      let pieza = null;

      // Peones
      if (row === 1) pieza = { icon: FaChessPawn, color: "black" };
      if (row === 6) pieza = { icon: FaChessPawn, color: "white" };

      // Piezas mayores negras
      if (row === 0) {
        if (col === 0 || col === 7) pieza = { icon: FaChessRook, color: "black" };
        if (col === 1 || col === 6) pieza = { icon: FaChessKnight, color: "black" };
        if (col === 2 || col === 5) pieza = { icon: FaChessBishop, color: "black" };
        if (col === 3) pieza = { icon: FaChessQueen, color: "black" };
        if (col === 4) pieza = { icon: FaChessKing, color: "black" };
      }

      // Piezas mayores blancas
      if (row === 7) {
        if (col === 0 || col === 7) pieza = { icon: FaChessRook, color: "white" };
        if (col === 1 || col === 6) pieza = { icon: FaChessKnight, color: "white" };
        if (col === 2 || col === 5) pieza = { icon: FaChessBishop, color: "white" };
        if (col === 3) pieza = { icon: FaChessQueen, color: "white" };
        if (col === 4) pieza = { icon: FaChessKing, color: "white" };
      }

      fila.push(pieza);
    }
    inicialBoard.push(fila);
  }

  const [board, setBoard] = useState(inicialBoard);
  const [selected, setSelected] = useState(null);

  // Función que devuelve los movimientos válidos del peón
  const getPawnMoves = (row, col) => {
    const moves = [];
    const pieza = board[row][col];
    if (!pieza) return moves;

    const direction = pieza.color === "white" ? -1 : 1;
    const nextRow = row + direction;

    // Avance 1 casilla
    if (board[nextRow] && !board[nextRow][col]) {
      moves.push([nextRow, col]);

      // Avance 2 casillas desde fila inicial
      const startRow = pieza.color === "white" ? 6 : 1;
      if (row === startRow && board[nextRow + direction] && !board[nextRow + direction][col]) {
        moves.push([nextRow + direction, col]);
      }
    }

    // Capturas diagonales
    for (let dc of [-1, 1]) {
      const nextCol = col + dc;
      if (board[nextRow] && board[nextRow][nextCol] && board[nextRow][nextCol].color !== pieza.color) {
        moves.push([nextRow, nextCol]);
      }
    }

    return moves;
  };

  const handleClick = (row, col) => {
  const clickedPiece = board[row][col];

  if (selected) {
    const pieza = board[selected.row][selected.col];
    let validMoves = [];

    if (pieza?.icon === FaChessPawn) {
      validMoves = getPawnMoves(selected.row, selected.col);
    } else {
      validMoves = [[row, col]];
    }

    // Mover si es un movimiento válido
    if (validMoves.some(([r, c]) => r === row && c === col)) {
      const newBoard = board.map(r => [...r]);
      newBoard[row][col] = board[selected.row][selected.col];
      newBoard[selected.row][selected.col] = null;
      setBoard(newBoard);
      setSelected(null);
      return;
    }

    // Cambiar selección si haces click en otra pieza de tu color
    if (clickedPiece && clickedPiece.color === pieza.color) {
      setSelected({ row, col });
      return;
    }

    // Si no es válido ni tu color, deseleccionar
    setSelected(null);
  } else if (clickedPiece) {
    setSelected({ row, col });
  }
};

  const squares = [];
for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 8; col++) {
    const isDark = (row + col) % 2 === 1;
    const pieza = board[row][col];

    squares.push(
      <div
        key={`${row}-${col}`}
        className={`square ${isDark ? "dark" : "light"}`}
        style={{
          border: selected?.row === row && selected?.col === col ? "3px solid yellow" : "none"
        }}
        onClick={() => handleClick(row, col)}
      >
        {pieza && <pieza.icon size={48} color={pieza.color} />}
      </div>
    );
  }
}

  return <div className="Tablero">{squares}</div>;
};


export default Chessboard;
