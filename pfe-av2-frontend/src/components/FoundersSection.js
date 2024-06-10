import React from "react";
import "../styles/Home.css";

const founders = [
  {
    role: "CEO",
    name: "Caio Gogoy",
    cv: "Caio tem mais de 20 anos de experiência em liderança de tecnologia.",
  },
  {
    role: "CTO",
    name: "João Guilherme Mendonça",
    cv: "João é especialista em desenvolvimento de software e infraestrutura em nuvem.",
  },
  {
    role: "CMO",
    name: "Marcoantonio Manso",
    cv: "Marcoantonio possui vasta experiência em marketing digital e estratégias de mercado.",
  },
];

const TableRow = ({ role, name, cv }) => (
  <tr>
    <td>{role}</td>
    <td>{name}</td>
    <td>{cv}</td>
  </tr>
);

const FoundersSection = () => {
  return (
    <section className="view5">
      <h2>Fundadores</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Cargo</th>
              <th>Nome</th>
              <th>Breve CV</th>
            </tr>
          </thead>
          <tbody>
            {founders.map((founder, index) => (
              <TableRow
                key={index}
                role={founder.role}
                name={founder.name}
                cv={founder.cv}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default FoundersSection;
