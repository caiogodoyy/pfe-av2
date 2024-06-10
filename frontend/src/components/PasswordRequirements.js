import React from "react";
import styles from "../styles/Login.module.css";

const PasswordRequirements = ({ password }) => {
  const lengthValid = password.length >= 6;
  const numberValid = /[0-9]/.test(password);
  const upperValid = /[A-Z]/.test(password);
  const specialValid = /[@#$%&*!?/\\|\-_+=.]/.test(password);
  const prohibitedValid = !/[{}[\]`~^:;<>,"'’]/.test(password);

  return (
    <ul className={styles.container}>
      <li id="length" className={lengthValid ? styles.valid : styles.invalid}>
        Pelo menos 6 caracteres
      </li>
      <li id="number" className={numberValid ? styles.valid : styles.invalid}>
        Conter um número
      </li>
      <li id="upper" className={upperValid ? styles.valid : styles.invalid}>
        Conter uma letra maiúscula
      </li>
      <li id="special" className={specialValid ? styles.valid : styles.invalid}>
        Conter um caracter especial @ # $ % & * ! ? / \ | - _ + . =
      </li>
      <li
        id="prohibited"
        className={prohibitedValid ? styles.valid : styles.invalid}
      >
        Não conter caracteres proibidos {} [] ` ~ ^ : ; &lt; &gt; , " '
      </li>
    </ul>
  );
};

export default PasswordRequirements;
