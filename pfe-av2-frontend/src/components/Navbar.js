import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Navbar({ serviceView, backLink }) {
  console.log(serviceView);
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
        {!serviceView ? (
          <>
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
          </>
        ) : (
          <>
            <li>
              <Link to={backLink}>Voltar</Link>
            </li>
            <li>
              <Link to="/add-service">Cadastrar Novo Serviço</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
