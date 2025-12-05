    import React from "react";

    function GameHistory({ moves }) {
    return (
        <div
        style={{
            width: "200px",
            background: "#f4f4f4",
            padding: "10px",
            borderRadius: "8px",
            maxHeight: "500px",
            overflowY: "auto",
            border: "1px solid #ccc",
        }}
        >
        <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
            Historial
        </h3>

        {moves.length === 0 ? (
            <p style={{ textAlign: "center", color: "gray" }}>
            No hay movimientos aún.
            </p>
        ) : (
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            {moves.map((move, index) => (
                <li
                key={index}
                style={{
                    background: index % 2 === 0 ? "#ffffff" : "#e8e8e8",
                    padding: "6px",
                    marginBottom: "4px",
                    borderRadius: "4px",
                    fontFamily: "monospace",
                    fontSize: "14px",
                }}
                >
                {index + 1}. {move}
                </li>
            ))}
            </ul>
        )}
        </div>
    );
    }

    export default GameHistory;
