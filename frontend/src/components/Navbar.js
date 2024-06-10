import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Navbar() {
  const navigate = useNavigate();
  const isLoggegIn = localStorage.getItem("user") !== null;

  const handleServiceClick = (e) => {
    e.preventDefault();
    if (isLoggegIn) {
      navigate("/services");
    } else {
      alert("Login necessário");
    }
  };

  return (
    <nav>
      <ul className="nav-links">
        <li>
          {isLoggegIn ? (
            <a href="#" onClick={() => localStorage.clear()}>
              Log Out
            </a>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
        <li>
          <Link to="/signup">Cadastrar</Link>
        </li>
        <li>
          <a href="#" onClick={handleServiceClick}>
            Solicitar Serviço
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
