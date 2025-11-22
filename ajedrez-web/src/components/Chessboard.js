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

    // Función para crear el tablero inicial
    const createInitialBoard = () => {
      const board = createEmptyBoard();

      // Negras
      board[0][0] = crearPieza(Rook, "black", 0, 0, FaChessRook);
      board[0][1] = crearPieza(Knight, "black", 0, 1, FaChessKnight);
      board[0][2] = crearPieza(Bishop, "black", 0, 2, FaChessBishop);
      board[0][3] = crearPieza(Queen, "black", 0, 3, FaChessQueen);
      board[0][4] = crearPieza(King, "black", 0, 4, FaChessKing);
      board[0][5] = crearPieza(Bishop, "black", 0, 5, FaChessBishop);
      board[0][6] = crearPieza(Knight, "black", 0, 6, FaChessKnight);
      board[0][7] = crearPieza(Rook, "black", 0, 7, FaChessRook);
      for (let c = 0; c < 8; c++) {
        board[1][c] = crearPieza(Pawn, "black", 1, c, FaChessPawn);
      }

      // Blancas
      board[7][0] = crearPieza(Rook, "white", 7, 0, FaChessRook);
      board[7][1] = crearPieza(Knight, "white", 7, 1, FaChessKnight);
      board[7][2] = crearPieza(Bishop, "white", 7, 2, FaChessBishop);
      board[7][3] = crearPieza(Queen, "white", 7, 3, FaChessQueen);
      board[7][4] = crearPieza(King, "white", 7, 4, FaChessKing);
      board[7][5] = crearPieza(Bishop, "white", 7, 5, FaChessBishop);
      board[7][6] = crearPieza(Knight, "white", 7, 6, FaChessKnight);
      board[7][7] = crearPieza(Rook, "white", 7, 7, FaChessRook);
      for (let c = 0; c < 8; c++) {
        board[6][c] = crearPieza(Pawn, "white", 6, c, FaChessPawn);
      }

      return board;
    };

    const [board, setBoard] = useState(createInitialBoard());
    const [selected, setSelected] = useState(null);
    const [turn, setTurn] = useState("white");

    const handleClick = (row, col) => {
      const clicked = board[row][col];

      if (selected) {
        const pieza = board[selected.row][selected.col];

        if (!pieza || pieza.color !== turn) {
          setSelected(null);
          return;
        }

        const validMoves = pieza.getValidMoves(board);

        if (validMoves.some(([r, c]) => r === row && c === col)) {
          const newBoard = board.map((r) => r.slice());

          newBoard[row][col] = pieza;
          newBoard[selected.row][selected.col] = null;
          pieza.position = [row, col];

          // VERIFICAR SI ALGÚN REY FUE CAPTURADO
          const allPieces = newBoard.flat();
          const whiteKing = allPieces.find(p => p instanceof King && p.color === "white");
          const blackKing = allPieces.find(p => p instanceof King && p.color === "black");

          if (!whiteKing || !blackKing) {
            alert(`${!whiteKing ? "Negras" : "Blancas"} ganan!`);
            setBoard(createInitialBoard());
            setTurn("white");
            setSelected(null);
            return;
          }

          setBoard(newBoard);
          setSelected(null);
          setTurn(turn === "white" ? "black" : "white");
          return;
        }

        if (clicked && clicked.color === pieza.color) {
          setSelected({ row, col });
          return;
        }

        setSelected(null);
        return;
      }

      if (clicked) {
        if (clicked.color !== turn) return;
        setSelected({ row, col });
      }
    };

    // Renderizar tablero
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
