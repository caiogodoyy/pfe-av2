import React from "react";
import "../styles/Home.css";

const services = [
  {
    icon: "eva-settings-2-outline",
    title: "Suporte Técnico",
    description:
      "Oferecemos suporte técnico abrangente para resolver problemas de hardware, software e rede.",
  },
  {
    icon: "eva-code-outline",
    title: "Desenvolvimento",
    description:
      "Nossa equipe especializada em desenvolvimento oferece soluções personalizadas para criar websites, aplicativos.",
  },
  {
    icon: "eva-activity-outline",
    title: "NOC",
    description:
      "Nosso NOC monitora proativamente suas redes e sistemas 24 horas por dia, garantindo alta disponibilidade e desempenho.",
  },
  {
    icon: "eva-shield-outline",
    title: "Segurança",
    description:
      "Proteja seus dados e sistemas com nossos serviços avançados de segurança cibernética.",
  },
  {
    icon: "eva-globe-outline",
    title: "Hospedagem",
    description:
      "Oferecemos serviços de hospedagem confiáveis e seguros para websites, aplicativos e bancos de dados.",
  },
  {
    icon: "eva-hard-drive-outline",
    title: "Servidores",
    description:
      "Fornecemos soluções de servidor personalizadas que se adaptam à crescente demanda da sua empresa.",
  },
  {
    icon: "eva-globe-2-outline",
    title: "Consultoria de Rede",
    description:
      "Nossa consultoria de rede oferece análises e recomendações estratégicas para otimizar o desempenho e a segurança das suas redes corporativas.",
  },
  {
    icon: "eva-people-outline",
    title: "Consultoria de TI",
    description:
      "Providenciamos consultoria especializada em TI para ajudar sua empresa a navegar pelas complexidades da tecnologia moderna.",
  },
];

function GridItem({ icon, title, description }) {
  return (
    <div className="service-item">
      <h3>{title}</h3>
      <p className="description">{description}</p>
    </div>
  );
}

function ServiceSection() {
  return (
    <section className="service-section">
      <h2>Nossas soluções inteligentes</h2>
      <div className="service-grid">
        {services.map((service, index) => (
          <GridItem
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </section>
  );
}

export default ServiceSection;
