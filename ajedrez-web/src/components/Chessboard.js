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
import PromotionModal from "../utils/PromotionModal";
import GameHistory from "../utils/GameHistory";
import "./Chessboard.css";

const Chessboard = () => {
  const createEmptyBoard = () => Array.from({ length: 8 }, () => Array(8).fill(null));
  const [history, setHistory] = useState([]);

  const crearPieza = (Clase, color, row, col, icon) => {
    let p;
    if (Clase === Pawn) {
      p = new Pawn(color, [row, col]);
    } else {
      p = new Clase(color, [row, col]);
    }
    p.icon = icon;
    return p;
  };

  const createInitialBoard = () => {
    const board = createEmptyBoard();

    board[0][0] = crearPieza(Rook, "black", 0, 0, FaChessRook);
    board[0][1] = crearPieza(Knight, "black", 0, 1, FaChessKnight);
    board[0][2] = crearPieza(Bishop, "black", 0, 2, FaChessBishop);
    board[0][3] = crearPieza(Queen, "black", 0, 3, FaChessQueen);
    board[0][4] = crearPieza(King, "black", 0, 4, FaChessKing);
    board[0][5] = crearPieza(Bishop, "black", 0, 5, FaChessBishop);
    board[0][6] = crearPieza(Knight, "black", 0, 6, FaChessKnight);
    board[0][7] = crearPieza(Rook, "black", 0, 7, FaChessRook);
    for (let c = 0; c < 8; c++) board[1][c] = crearPieza(Pawn, "black", 1, c, FaChessPawn);

    board[7][0] = crearPieza(Rook, "white", 7, 0, FaChessRook);
    board[7][1] = crearPieza(Knight, "white", 7, 1, FaChessKnight);
    board[7][2] = crearPieza(Bishop, "white", 7, 2, FaChessBishop);
    board[7][3] = crearPieza(Queen, "white", 7, 3, FaChessQueen);
    board[7][4] = crearPieza(King, "white", 7, 4, FaChessKing);
    board[7][5] = crearPieza(Bishop, "white", 7, 5, FaChessBishop);
    board[7][6] = crearPieza(Knight, "white", 7, 6, FaChessKnight);
    board[7][7] = crearPieza(Rook, "white", 7, 7, FaChessRook);
    for (let c = 0; c < 8; c++) board[6][c] = crearPieza(Pawn, "white", 6, c, FaChessPawn);

    return board;
  };

  const [board, setBoard] = useState(createInitialBoard());
  const [selected, setSelected] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [turn, setTurn] = useState("white");

  const [whiteMoves, setWhiteMoves] = useState(0);
  const [blackMoves, setBlackMoves] = useState(0);

  const [capturedWhite, setCaptureWhite] = useState([]);
  const [captureBlack, setCaptureBlack] = useState([]);

  const [isPromoting, setIsPromoting] = useState(false);
  const [promotePos, setPromotePos] = useState(null);

  // ------------------------
  // Funciones JAQUE / JAQUE MATE
  // ------------------------
  const simulateMove = (board, piece, r, c) => {
    const newBoard = board.map(row => row.map(p => p));
    const from = piece.position;
    newBoard[r][c] = piece;
    newBoard[from[0]][from[1]] = null;
    piece.position = [r, c];
    return newBoard;
  };

  const isKingInCheck = (board, color) => {
    const allPieces = board.flat();
    const king = allPieces.find(p => p instanceof King && p.color === color);
    if (!king) return false; // Rey capturado
    const [kr, kc] = king.position;

    for (let piece of allPieces) {
      if (!piece || piece.color === color) continue;
      const moves = piece.getValidMoves(board);
      if (moves.some(([r, c]) => r === kr && c === kc)) return true;
    }
    return false;
  };

  const isCheckmate = (board, color) => {
    if (!isKingInCheck(board, color)) return false;
    const allPieces = board.flat().filter(p => p && p.color === color);
    for (let piece of allPieces) {
      const moves = piece.getValidMoves(board);
      for (let [r, c] of moves) {
        const simulated = simulateMove(board, piece, r, c);
        if (!isKingInCheck(simulated, color)) return false;
      }
    }
    return true;
  };

  // ------------------------
  // Guardar historial
  // ------------------------
  const guardarMovimiento = (pieza, from, to, captura = null) => {
    if (pieza instanceof King && Math.abs(from.col - to.col) === 2) {
      setHistory(prev => [
        ...prev,
        pieza.color === "white" ? "♔ Enroque Blanco" : "♚ Enroque Negro"
      ]);
      return;
    }

    const letra = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const mov =
      `${pieza.color === "white" ? "♙" : "♟"} ${pieza.constructor.name} ` +
      `${letra[from.col]}${8 - from.row} → ${letra[to.col]}${8 - to.row}` +
      (captura ? ` (x ${captura.constructor.name})` : "");

    setHistory(prev => [...prev, mov]);
  };

  // ------------------------
  // Manejo de click
  // ------------------------
  const handleClick = (row, col) => {
    const clicked = board[row][col];

    if (selected) {
      const pieza = board[selected.row][selected.col];
      if (!pieza || pieza.color !== turn) {
        setSelected(null);
        setValidMoves([]);
        return;
      }

      const moves = pieza.getValidMoves(board);
      if (moves.some(([r, c]) => r === row && c === col)) {
        const newBoard = board.map(r => r.slice());
        const piezaDestino = newBoard[row][col];

        // Simular movimiento y verificar jaque propio
        const tempBoard = simulateMove(newBoard, pieza, row, col);
        if (isKingInCheck(tempBoard, pieza.color)) {
          alert("Movimiento inválido: deja a tu rey en jaque");
          return;
        }

        // Capturas
        if (piezaDestino) {
          if (piezaDestino.color === "white") setCaptureWhite(prev => [...prev, piezaDestino]);
          else setCaptureBlack(prev => [...prev, piezaDestino]);
        }

        guardarMovimiento(pieza, { row: selected.row, col: selected.col }, { row, col }, piezaDestino);

        // Mover pieza
        newBoard[row][col] = pieza;
        newBoard[selected.row][selected.col] = null;

        // ENROQUE
        if (pieza instanceof King && Math.abs(col - selected.col) === 2) {
          if (col === 6) {
            const rook = newBoard[row][7];
            newBoard[row][5] = rook;
            newBoard[row][7] = null;
            rook.position = [row, 5];
            rook.hasMoved = true;
          }
          if (col === 2) {
            const rook = newBoard[row][0];
            newBoard[row][3] = rook;
            newBoard[row][0] = null;
            rook.position = [row, 3];
            rook.hasMoved = true;
          }
          pieza.hasMoved = true;
        }

        if (pieza instanceof Pawn) pieza.moveTo([row, col]);
        else pieza.position = [row, col];

        // Coronación
        if (pieza instanceof Pawn && pieza.isPromotionSquare()) {
          setPromotePos({ row, col, pieza });
          setIsPromoting(true);
          return;
        }

        setBoard(newBoard);
        setSelected(null);
        setValidMoves([]);

        if (turn === "white") setWhiteMoves(p => p + 1);
        else setBlackMoves(p => p + 1);

        // ------------------------
        // Verificar JAQUE / JAQUE MATE / Rey capturado
        // ------------------------
        const allPieces = newBoard.flat();
        const whiteKing = allPieces.find(p => p instanceof King && p.color === "white");
        const blackKing = allPieces.find(p => p instanceof King && p.color === "black");

        if (!whiteKing || !blackKing) {
          alert(`${!whiteKing ? "Negras" : "Blancas"} ganan!`);
          setBoard(createInitialBoard());
          setTurn("white");
          setWhiteMoves(0);
          setBlackMoves(0);
          setCaptureBlack([]);
          setCaptureWhite([]);
          setSelected(null);
          setValidMoves([]);
          setHistory([]);
          return;
        }

        const enemyColor = turn === "white" ? "black" : "white";
        if (isKingInCheck(newBoard, enemyColor)) {
          if (isCheckmate(newBoard, enemyColor)) {
            alert(`JAQUE MATE — Ganan las ${turn === "white" ? "BLANCAS" : "NEGRAS"}`);
            setBoard(createInitialBoard());
            setTurn("white");
            setWhiteMoves(0);
            setBlackMoves(0);
            setCaptureBlack([]);
            setCaptureWhite([]);
            setSelected(null);
            setValidMoves([]);
            setHistory([]);
            return;
          } else {
            alert("Jaque");
          }
        }

        setTurn(turn === "white" ? "black" : "white");
        return;
      }

      if (clicked && clicked.color === pieza.color) {
        setSelected({ row, col });
        setValidMoves(clicked.getValidMoves(board));
        return;
      }

      setSelected(null);
      setValidMoves([]);
      return;
    }

    if (clicked && clicked.color === turn) {
      setSelected({ row, col });
      setValidMoves(clicked.getValidMoves(board));
    }
  };

  // ------------------------
  // Coronación
  // ------------------------
  const promotePawn = type => {
    if (!promotePos) return;
    const { row, col, pieza } = promotePos;
    const newBoard = board.map(r => r.slice());

    let newPiece;
    switch (type) {
      case "queen":
        newPiece = new Queen(pieza.color, [row, col]);
        newPiece.icon = FaChessQueen;
        break;
      case "rook":
        newPiece = new Rook(pieza.color, [row, col]);
        newPiece.icon = FaChessRook;
        break;
      case "bishop":
        newPiece = new Bishop(pieza.color, [row, col]);
        newPiece.icon = FaChessBishop;
        break;
      case "knight":
        newPiece = new Knight(pieza.color, [row, col]);
        newPiece.icon = FaChessKnight;
        break;
      default:
        return;
    }

    newBoard[row][col] = newPiece;
    setBoard(newBoard);
    setIsPromoting(false);
    setPromotePos(null);
    setTurn(turn === "white" ? "black" : "white");
  };

  // ------------------------
  // Render del tablero
  // ------------------------
  const squares = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const isDark = (r + c) % 2 === 1;
      const pieza = board[r][c];
      const isMoveOption = validMoves.some(([vr, vc]) => vr === r && vc === c);

      let border = "none";
      if (selected?.row === r && selected?.col === c) border = "3px solid yellow";
      else if (isMoveOption) border = "3px solid green";
      else if (pieza instanceof King && isKingInCheck(board, pieza.color)) border = "3px solid red";

      squares.push(
        <div
          key={`${r}-${c}`}
          className={`square ${isDark ? "dark" : "light"}`}
          style={{ border }}
          onClick={() => handleClick(r, c)}
        >
          {pieza && <pieza.icon size={48} color={pieza.color} />}
        </div>
      );
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "20px", alignItems: "center" }}>
      {isPromoting && <PromotionModal onSelect={promotePawn} />}

      <div style={{ width: "80px", color: "white", textAlign: "center" }}>
        <h4>♟️ Blancas</h4>
        {capturedWhite.map((p, i) => (
          <p.icon key={i} size={32} color="white" />
        ))}
      </div>

      <div>
        <h2 style={{ textAlign: "center", color: "black" }}>
          Turno: {turn === "white" ? "Blancas ♟️" : "Negras ♟️"}
        </h2>
        <h3 style={{ textAlign: "center", color: "gray" }}>
          Jugadas-Blancas:{whiteMoves} | Negras:{blackMoves}
        </h3>
        <div className="Tablero">{squares}</div>
      </div>

      <div style={{ width: "80px", color: "black" }}>
        <h4>♟️ Negras</h4>
        {captureBlack.map((p, i) => (
          <p.icon key={i} size={32} color="black" />
        ))}
      </div>

      <GameHistory moves={history} />
    </div>
  );
};

export default Chessboard;
