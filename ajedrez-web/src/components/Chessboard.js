import React, { useState } from "react";
import {
  FaChessKing,
  FaChessQueen,
  FaChessRook,
  FaChessBishop,
  FaChessKnight,
  FaChessPawn,
} from "react-icons/fa";
import "./Chessboard.css";

// ICONOS
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

  // Generar tablero inicial
  for (let row = 0; row < 8; row++) {
    const fila = [];
    for (let col = 0; col < 8; col++) {
      let pieza = null;

      // Peones
      if (row === 1) pieza = { icon: FaChessPawn, color: "black" };
      if (row === 6) pieza = { icon: FaChessPawn, color: "white" };

      // Piezas negras
      if (row === 0) {
        if (col === 0 || col === 7)
          pieza = { icon: FaChessRook, color: "black" };
        if (col === 1 || col === 6)
          pieza = { icon: FaChessKnight, color: "black" };
        if (col === 2 || col === 5)
          pieza = { icon: FaChessBishop, color: "black" };
        if (col === 3) pieza = { icon: FaChessQueen, color: "black" };
        if (col === 4) pieza = { icon: FaChessKing, color: "black" };
      }

      // Piezas blancas
      if (row === 7) {
        if (col === 0 || col === 7)
          pieza = { icon: FaChessRook, color: "white" };
        if (col === 1 || col === 6)
          pieza = { icon: FaChessKnight, color: "white" };
        if (col === 2 || col === 5)
          pieza = { icon: FaChessBishop, color: "white" };
        if (col === 3) pieza = { icon: FaChessQueen, color: "white" };
        if (col === 4) pieza = { icon: FaChessKing, color: "white" };
      }

      fila.push(pieza);
    }
    inicialBoard.push(fila);
  }

  const [board, setBoard] = useState(inicialBoard);
  const [selected, setSelected] = useState(null);

  // 🔄 ESTADO DEL TURNO
  const [turn, setTurn] = useState("white"); // blancas empiezan

  // ------------------------------
  // MOVIMIENTOS DEL PEÓN
  // ------------------------------
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
      if (
        row === startRow &&
        board[nextRow + direction] &&
        !board[nextRow + direction][col]
      ) {
        moves.push([nextRow + direction, col]);
      }
    }

    // Capturas diagonales
    for (let dc of [-1, 1]) {
      const nextCol = col + dc;
      if (
        board[nextRow] &&
        board[nextRow][nextCol] &&
        board[nextRow][nextCol].color !== pieza.color
      ) {
        moves.push([nextRow, nextCol]);
      }
    }

    return moves;
  };

  // ------------------------------
  // MOVIMIENTOS DEL CABALLO
  // ------------------------------
  const getKnightMoves = (row, col) => {
    const pieza = board[row][col];
    if (!pieza) return [];

    const jumps = [
      [-2, -1],
      [-2, 1],
      [-1, -2],
      [-1, 2],
      [1, -2],
      [1, 2],
      [2, -1],
      [2, 1],
    ];

    const moves = [];

    for (let [dr, dc] of jumps) {
      const r = row + dr;
      const c = col + dc;

      if (r >= 0 && r < 8 && c >= 0 && c < 8) {
        const target = board[r][c];
        if (!target || target.color !== pieza.color) {
          moves.push([r, c]);
        }
      }
    }

    return moves;
  };

  // ------------------------------
  // MANEJO DE CLICS
  // ------------------------------
  const handleClick = (row, col) => {
    const clickedPiece = board[row][col];

    // ===========================
    // SI YA HAY PIEZA SELECCIONADA
    // ===========================
    if (selected) {
      const pieza = board[selected.row][selected.col];

      // ❗ Evita mover pieza del color incorrecto
      if (pieza.color !== turn) {
        setSelected(null);
        return;
      }

      let validMoves = [];

      if (pieza?.icon === FaChessPawn) {
        validMoves = getPawnMoves(selected.row, selected.col);
      } else if (pieza?.icon === FaChessKnight) {
        validMoves = getKnightMoves(selected.row, selected.col);
      } else {
        validMoves = [];
      }

      // Movimiento válido
      if (validMoves.some(([r, c]) => r === row && c === col)) {
        const newBoard = board.map((r) => [...r]);

        newBoard[row][col] = board[selected.row][selected.col];
        newBoard[selected.row][selected.col] = null;

        setBoard(newBoard);
        setSelected(null);

        // 🔄 CAMBIO DE TURNO
        setTurn(turn === "white" ? "black" : "white");

        return;
      }

      // Selección de otra pieza del mismo color
      if (clickedPiece && clickedPiece.color === pieza.color) {
        setSelected({ row, col });
        return;
      }

      setSelected(null);
    }

    // ===========================
    // NO HAY PIEZA SELECCIONADA
    // ===========================
    else if (clickedPiece) {
      // ❗ Solo se puede seleccionar pieza del turno actual
      if (clickedPiece.color !== turn) return;

      setSelected({ row, col });
    }
  };

  // ------------------------------
  // RENDER DEL TABLERO
  // ------------------------------
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
            border:
              selected?.row === row && selected?.col === col
                ? "3px solid yellow"
                : "none",
          }}
          onClick={() => handleClick(row, col)}
        >
          {pieza && <pieza.icon size={48} color={pieza.color} />}
        </div>
      );
    }
  }

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "white" }}>
        Turno: {turn === "white" ? "Blancas ♟️" : "Negras ♟️"}
      </h2>

      <div className="Tablero">{squares}</div>
    </div>
  );
};

export default Chessboard;
