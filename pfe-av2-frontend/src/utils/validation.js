export function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export function checkPasswordRequirements(password) {
  let validation = true;

  const lengthValid = password.length >= 6;
  const numberValid = /[0-9]/.test(password);
  const upperValid = /[A-Z]/.test(password);
  const specialValid = /[@#$%&*!?/\\|\-_+=.]/.test(password);
  const prohibitedValid = !/[̈{}[\]́`~^:;<>,"‘]/.test(password);

  validation =
    lengthValid && numberValid && upperValid && specialValid && prohibitedValid;

  return validation;
}

export function validateName(fullName) {
  const names = fullName.split(" ");

  return (
    names.length > 1 &&
    names[0].length > 1 &&
    !/[@#$%&*!?/\\|\-_+=.]/.test(fullName) &&
    !/[̈{}[\]́`~^:;<>,"‘]/.test(fullName)
  );
}

export function validateCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (cpf.length !== 11) return false;

  let sum = 0;
  let rest;

  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++)
    sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(cpf.substring(10, 11))) return false;
  return true;
}

export function calculateAge(date) {
  const birthday = new Date(date);
  const today = new Date();
  const m = today.getMonth() - birthday.getMonth();
  let age = today.getFullYear() - birthday.getFullYear();

  if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }

  return age;
}
