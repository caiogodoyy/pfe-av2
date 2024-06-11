import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  validateEmail,
  checkPasswordRequirements,
} from "../utils/validation.js";
import PasswordRequirements from "../components/PasswordRequirements.js";
import styles from "../styles/Login.module.css";
import logo from "../images/logo.png";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(form.email)) {
      alert("Por favor, insira um email válido.");
      return;
    }

    if (form.newPassword !== form.confirmNewPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    if (!checkPasswordRequirements(form.newPassword)) {
      alert("Por favor, insira uma senha válida.");
      return;
    }

    sendPostRequest();
  };

  const sendPostRequest = () => {
    const payload = {
      email: form.email,
      oldPassword: form.oldPassword,
      newPassword: form.newPassword,
    };

    fetch("http://localhost:3000/login/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            setError("Email ou senha antiga inválido");
          }
          throw new Error("Erro na resposta do servidor");
        }
        return response.json();
      })
      .then((data) => {
        alert("Troca de senha realizada com sucesso");
        localStorage.clear();
        localStorage.setItem("user", JSON.stringify(data?.user));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <header>
        <a href="http://localhost:4000">
          <img src={logo} alt="Caioba Solutions Logo" className={styles.img} />
        </a>
      </header>
      <div className={styles.loginContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.container}>
            <h1>Trocar Senha</h1>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              placeholder="Senha Antiga"
              value={form.oldPassword}
              onChange={handleChange}
              required
            />
            <div className={styles.inputGroup}>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="Nova Senha"
                value={form.newPassword}
                onChange={(e) => {
                  handleChange(e);
                  checkPasswordRequirements(e.target.value);
                }}
                required
              />
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                placeholder="Confirmar Nova Senha"
                value={form.confirmNewPassword}
                onChange={handleChange}
                required
              />
            </div>
            <PasswordRequirements password={form.newPassword} />
            {error && <p className={styles.invalid}>{error}</p>}
            <button type="submit">Trocar Senha</button>
            <button
              type="reset"
              onClick={() =>
                setForm({
                  email: "",
                  oldPassword: "",
                  newPassword: "",
                  confirmNewPassword: "",
                })
              }
            >
              Limpar
            </button>
            <button type="button" onClick={() => navigate("/")}>
              Voltar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
