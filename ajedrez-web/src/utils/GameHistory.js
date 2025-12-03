    import React from "react";

    function GameHistory({ moves }) {
    return (
        <div style={{
        width: "200px",
        background: "#f4f4f4",
        padding: "10px",
        borderRadius: "8px"
        }}>
        <h3>Historial</h3>

        {moves.length === 0 && <p>No hay movimientos aún.</p>}

        <ul>
            {moves.map((move, index) => (
            <li key={index}>{move}</li>
            ))}
        </ul>
        </div>
    );
    }

    export default GameHistory;