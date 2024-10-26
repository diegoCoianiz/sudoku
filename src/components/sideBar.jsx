// src/components/Sidebar.js
import React, { useState, useEffect } from 'react';

export default function Sidebar({ setAnnotationColor }) {
  // Estado para el cronómetro
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  // Estado para los colores seleccionables
  const colors = ["#FF6B6B", "#4ECDC4", "#6A0572", "#0A81D1"];

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev + 1) % 60);
      if (seconds === 59) setMinutes((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer); // Limpia el intervalo al desmontar
  }, [seconds]);

  return (
    <aside className="sidebar">
      {/* Sección del cronómetro */}
      <div className="timer">
        <h3>Tiempo:</h3>
        <p>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </p>
      </div>

      {/* Sección de paleta de colores */}
      <div className="color-palette">
        <div className="color-options">
          {colors.map((color, index) => (
            <button
              key={index}
              className="color-button"
              style={{ backgroundColor: color }}
              onClick={() => setAnnotationColor(color)}
            ></button>
          ))}
        </div>
      </div>
    </aside>
  );
}
