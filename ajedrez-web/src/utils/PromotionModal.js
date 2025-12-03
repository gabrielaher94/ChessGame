    import React from "react";
    import {
    FaChessQueen,
    FaChessRook,
    FaChessBishop,
    FaChessKnight
    } from "react-icons/fa";

    const PromotionModal = ({ onSelect }) => {
    return (
        <div className="promotion-modal">
        <h3>Elige una pieza para coronar</h3>

        <div className="promotion-options">
            <button onClick={() => onSelect("queen")}><FaChessQueen size={40} /></button>
            <button onClick={() => onSelect("rook")}><FaChessRook size={40} /></button>
            <button onClick={() => onSelect("bishop")}><FaChessBishop size={40} /></button>
            <button onClick={() => onSelect("knight")}><FaChessKnight size={40} /></button>
        </div>
        </div>
    );
    };

    export default PromotionModal;
