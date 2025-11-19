// src/components/Chessboard.js
import React, { useState } from "react";
import {
  FaChessKing,
  FaChessQueen,
  FaChessRook,
  FaChessBishop,
  FaChessKnight,
  FaChessPawn,
} from "react-icons/fa";

import Queen from "./Queen";
import King from "./King";
import Knight from "./Knight";
import Rook from "./Rook";
import Pawn from "./Pawn";
import Bishop from "./Bishop";

import "./Chessboard.css";

const Chessboard = () => {
  // Crea tablero vacío 8x8
  const createEmptyBoard = () => Array.from({ length: 8 }, () => Array(8).fill(null));

  // Helper para crear pieza (instancia) y asignarle icono
  const crearPieza = (Clase, color, row, col, icon) => {
    const p = new Clase(color, [row, col]);
    p.icon = icon;
    return p;
  };

  // Inicializar posiciones iniciales con instancias
  const inicialBoard = createEmptyBoard();

  // Negras
  inicialBoard[0][0] = crearPieza(Rook, "black", 0, 0, FaChessRook);
  inicialBoard[0][1] = crearPieza(Knight, "black", 0, 1, FaChessKnight);
  inicialBoard[0][2] = crearPieza(Bishop, "black", 0, 2, FaChessBishop);
  inicialBoard[0][3] = crearPieza(Queen, "black", 0, 3, FaChessQueen);
  inicialBoard[0][4] = crearPieza(King, "black", 0, 4, FaChessKing);
  inicialBoard[0][5] = crearPieza(Bishop, "black", 0, 5, FaChessBishop);
  inicialBoard[0][6] = crearPieza(Knight, "black", 0, 6, FaChessKnight);
  inicialBoard[0][7] = crearPieza(Rook, "black", 0, 7, FaChessRook);
  for (let c = 0; c < 8; c++) {
    inicialBoard[1][c] = crearPieza(Pawn, "black", 1, c, FaChessPawn);
  }

  // Blancas
  inicialBoard[7][0] = crearPieza(Rook, "white", 7, 0, FaChessRook);
  inicialBoard[7][1] = crearPieza(Knight, "white", 7, 1, FaChessKnight);
  inicialBoard[7][2] = crearPieza(Bishop, "white", 7, 2, FaChessBishop);
  inicialBoard[7][3] = crearPieza(Queen, "white", 7, 3, FaChessQueen);
  inicialBoard[7][4] = crearPieza(King, "white", 7, 4, FaChessKing);
  inicialBoard[7][5] = crearPieza(Bishop, "white", 7, 5, FaChessBishop);
  inicialBoard[7][6] = crearPieza(Knight, "white", 7, 6, FaChessKnight);
  inicialBoard[7][7] = crearPieza(Rook, "white", 7, 7, FaChessRook);
  for (let c = 0; c < 8; c++) {
    inicialBoard[6][c] = crearPieza(Pawn, "white", 6, c, FaChessPawn);
  }

  const [board, setBoard] = useState(inicialBoard);
  const [selected, setSelected] = useState(null);

  // TURNO (no lo tocamos)
  const [turn, setTurn] = useState("white");

  // Manejo de click (selección y movimiento)
  const handleClick = (row, col) => {
    const clicked = board[row][col];

    // Si ya hay selección previa
    if (selected) {
      const pieza = board[selected.row][selected.col];

      // Evitar mover si la pieza seleccionada no es del turno
      if (!pieza || pieza.color !== turn) {
        setSelected(null);
        return;
      }

      // obtener movimientos válidos desde la propia pieza
      const validMoves = pieza.getValidMoves(board);

      // si el click es un movimiento válido, mover la pieza
      if (validMoves.some(([r, c]) => r === row && c === col)) {
        const newBoard = board.map((r) => r.slice());

        newBoard[row][col] = pieza;
        newBoard[selected.row][selected.col] = null;

        // actualizar posición interna de la pieza
        pieza.position = [row, col];

        setBoard(newBoard);
        setSelected(null);

        // CAMBIO DE TURNO — lo dejamos EXACTO
        setTurn(turn === "white" ? "black" : "white");
        return;
      }

      // si se clickea otra pieza del mismo color -> cambiar selección
      if (clicked && clicked.color === pieza.color) {
        setSelected({ row, col });
        return;
      }

      // en cualquier otro caso, deseleccionar
      setSelected(null);
      return;
    }

    // Si no hay selección previa y se clickea una pieza
    if (clicked) {
      // solo seleccionar si pertenece al turno actual
      if (clicked.color !== turn) return;
      setSelected({ row, col });
    }
  };

  // Render tablero
  const squares = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const isDark = (r + c) % 2 === 1;
      const pieza = board[r][c];

      squares.push(
        <div
          key={`${r}-${c}`}
          className={`square ${isDark ? "dark" : "light"}`}
          style={{
            border:
              selected?.row === r && selected?.col === c
                ? "3px solid yellow"
                : "none",
          }}
          onClick={() => handleClick(r, c)}
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
