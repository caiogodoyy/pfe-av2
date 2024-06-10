import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  validateEmail,
  validateName,
  validateCPF,
  calculateAge,
  checkPasswordRequirements,
} from "../utils/validation";
import PasswordRequirements from "../components/PasswordRequirements.js";
import styles from "../styles/Login.module.css";
import logo from "../images/logo.png";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    cpf: "",
    phone: "",
    date: "",
    status: "solteiro",
    education: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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

    if (!validateName(form.name)) {
      alert("Por favor, insira um nome válido.");
      return;
    }

    if (!validateCPF(form.cpf)) {
      alert("Por favor, insira um CPF válido.");
      return;
    }

    if (calculateAge(form.date) < 18) {
      alert("Você deve ter pelo menos 18 anos para se cadastrar.");
      return;
    }

    if (form.phone && !/^\(?\d{2}\)?[\s-]?9?\d{4}-?\d{4}$/.test(form.phone)) {
      alert("Por favor, insira um número de telefone válido.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    if (checkPasswordRequirements(form.password)) {
      alert("Validação realizada com sucesso.");
      sendPostRequest();
    } else {
      alert("Por favor, insira uma senha válida.");
    }
  };

  const mapCivilStatus = (status) => {
    const statusMap = {
      solteiro: "Solteiro(a)",
      casado: "Casado(a)",
      divorciado: "Divorciado(a)",
      viuvo: "Viúvo(a)",
    };
    return statusMap[status];
  };

  const mapEducation = (education) => {
    const educationMap = {
      "1_grau_incompleto": "1º Grau Incompleto",
      "1_grau_completo": "1º Grau Completo",
      "2_grau_completo": "2º Grau Completo",
      nivel_superior: "Ensino Superior Completo",
      pos_graduado: "Pós-Graduado",
    };
    return educationMap[education];
  };

  const sendPostRequest = () => {
    const payload = {
      name: form.name,
      cpf: form.cpf,
      birthDate: form.date,
      civilStatus: mapCivilStatus(form.status),
      education: mapEducation(form.education),
      email: form.email,
      password: form.password,
    };

    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na resposta do servidor");
        }
        alert(`Cadastro realizado com sucesso`);
        localStorage.clear();
        localStorage.setItem("user", JSON.stringify(payload));
        navigate("/");
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <header>
        <a href="/">
          <img src={logo} alt="Caioba Solutions Logo" className={styles.img} />
        </a>
      </header>
      <div className={styles.loginContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.container}>
            <h1>Cadastro</h1>
            <div className={styles.inputGroup}>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Nome Completo"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                id="cpf"
                name="cpf"
                placeholder="CPF"
                value={form.cpf}
                onChange={handleChange}
                required
                pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
              />
            </div>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Telefone Celular (opcional)"
              value={form.phone}
              onChange={handleChange}
            />
            <div className={styles.inputGroup}>
              <label htmlFor="date">Data de Nascimento</label>
              <input
                type="date"
                id="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>
            <label className={styles.state}>
              Estado Civil:
              <input
                type="radio"
                name="status"
                value="solteiro"
                checked={form.status === "solteiro"}
                onChange={handleChange}
              />
              Solteiro(a)
              <input
                type="radio"
                name="status"
                value="casado"
                checked={form.status === "casado"}
                onChange={handleChange}
              />
              Casado(a)
              <input
                type="radio"
                name="status"
                value="divorciado"
                checked={form.status === "divorciado"}
                onChange={handleChange}
              />
              Divorciado(a)
              <input
                type="radio"
                name="status"
                value="viuvo"
                checked={form.status === "viuvo"}
                onChange={handleChange}
              />
              Viúvo(a)
            </label>
            <select
              id="education"
              name="education"
              value={form.education}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Selecione a Escolaridade
              </option>
              <option value="1_grau_incompleto">1º Grau Incompleto</option>
              <option value="1_grau_completo">1º Grau Completo</option>
              <option value="2_grau_completo">2º Grau Completo</option>
              <option value="nivel_superior">Ensino Superior Completo</option>
              <option value="pos_graduado">Pós-Graduado</option>
            </select>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <div className={styles.inputGroup}>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Senha"
                value={form.password}
                onChange={(e) => {
                  handleChange(e);
                  checkPasswordRequirements(e.target.value);
                }}
                required
              />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirmar Senha"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <PasswordRequirements password={form.password} />
            <button type="submit">Incluir</button>
            <button
              type="reset"
              onClick={() =>
                setForm({
                  name: "",
                  cpf: "",
                  phone: "",
                  date: "",
                  status: "solteiro",
                  education: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
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

export default Signup;
