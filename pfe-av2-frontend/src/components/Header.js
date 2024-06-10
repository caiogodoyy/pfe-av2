import React from "react";
import Navbar from "./Navbar";
import "../styles/Home.css";
import logo from "../images/logo.png";

function Header() {
  return (
    <header>
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo da Empresa" className="logo" />
          <span>Welcome to Caioba Solutions!</span>
        </div>
        <Navbar />
      </div>
    </header>
  );
}

export default Header;
