// src/components/Header.js
import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <div className="logo">

        <Link href={{ pathname: '/' }}>
          <h1><i><u style={{display:"flex", color:"white"}}>Sudoku</u></i></h1>
          <p >Desafía tu mente!</p>
        </Link>
      </div>
      {/* <div className="auth-buttons">
        <button className="login-btn">Iniciar sesión</button>
        <button className="signup-btn">Registrarse</button>
      </div> */}
    </header>

  );
}
