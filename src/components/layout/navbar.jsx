import React from 'react';
import '../../styles/global.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        {/* Brand on the left */}
        <a className="navbar-brand ms-4" href="#">
          <img 
            src="https://i.pinimg.com/736x/d7/77/3f/d7773f02adc26716a60799160c6be52a.jpg" 
            alt="Logo" 
            width="30" 
            height="24" 
            className="d-inline-block align-text-top" 
          />
          <span className="ms-2 fw-bold fs-3"
            style={{
    background: "linear-gradient(90deg, #a8d0ff 0%, #cda4de 100%)", // ice blue to lavender
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "inline-block",
  }}>PersonaFied</span>
        </a>

        {/* Right-aligned links */}
        <div className="d-flex gap-5 justify-content-end" style={{ marginRight: "4rem" }}>
          <a className="nav-link fs-5" href="/about">About</a>
          <a className="nav-link fs-5" href="/login">Login</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;