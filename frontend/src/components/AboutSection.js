import React from "react";
import "../styles/Home.css";

const aboutUsItems = [
  {
    content:
      "Fundada em 2012, a Caioba Solutions emergiu no cenário tecnológico com o compromisso de fornecer soluções inovadoras e eficientes para os desafios de TI das empresas modernas. Localizada no coração de São Paulo, crescemos com a visão de sermos mais que um provedor de serviços tecnológicos; nosso objetivo é ser um parceiro estratégico para nossos clientes.",
  },
  {
    content:
      "Nossa missão é empoderar nossos clientes através de soluções tecnológicas personalizadas que promovam a eficiência, escalabilidade e segurança. Estamos dedicados a transformar a infraestrutura de TI de nossos clientes para que eles possam se concentrar no que fazem de melhor - operar seus negócios com sucesso.",
  },
  {
    content:
      "Somos reconhecidos como líderes na prestação de serviços de TI, respeitados por nossa inovação, confiabilidade e ética profissional. Aspiramos a ser a primeira escolha para empresas de todos os tamanhos que buscam transformar suas operações de TI e alcançar resultados extraordinários.",
  },
];

const GridItem = ({ content }) => (
  <div className="grid-item">
    <p>{content}</p>
  </div>
);

const AboutUsSection = () => {
  return (
    <section className="view3">
      <h2>Nos conheça melhor!</h2>
      <div className="grid-container">
        {aboutUsItems.map((item, index) => (
          <GridItem key={index} content={item.content} />
        ))}
      </div>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/cRkhRVPU27E?si=FApqnsrL2Ky-XZVa"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </section>
  );
};

export default AboutUsSection;
