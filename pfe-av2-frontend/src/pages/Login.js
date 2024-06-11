import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";
import { validateEmail } from "../utils/validation";
import logo from "../images/logo.png";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [emailError, setEmailError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateLogin = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!validateEmail(email)) {
      setEmailError("Email inválido");
      return;
    }

    setEmailError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Falha no login");
      }
      const data = await response.json();
      console.log(data);
      setLoginError("");
      alert("Login bem-sucedido!");
      localStorage.clear();
      localStorage.setItem("user", JSON.stringify(data?.user));
      navigate("/");
    } catch (error) {
      setLoginError("Email ou senha incorretos");
    } finally {
      setIsLoading(false);
    }
  };

  const setFocus = () => {
    emailRef.current.focus();
  };

  return (
    <div className={styles.body}>
      <a href="/">
        <img src={logo} alt="Caioba Solutions Logo" className={styles.img} />
      </a>
      <div className={styles.loginContainer}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            validateLogin();
          }}
          onReset={setFocus}
        >
          <div className={styles.container}>
            <h1>Login</h1>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              ref={emailRef}
              required
            />
            {emailError && <p className={styles.invalid}>{emailError}</p>}
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Senha"
              ref={passwordRef}
              required
            />
            {loginError && <p className={styles.invalid}>{loginError}</p>}
            <a href="/change-password">Esqueceu a senha?</a>
            <div className={styles.buttons}>
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Carregando..." : "Login"}
              </button>
              <button type="reset">Limpar</button>
            </div>
          </div>
        </form>
        <a href="/signup">Não possui uma conta? Cadastre-se</a>
      </div>
    </div>
  );
};

export default Login;
