import React from "react";
import "../styles/Home.css";
import pix from "../images/payment-methods/pix.png";
import boleto from "../images/payment-methods/boleto.png";
import card from "../images/payment-methods/cartao.png";

const contactInfo = [
  {
    type: "Email",
    value: "caioba@solutions.com",
    link: "mailto:caioba@solutions.com",
  },
  { type: "Celular", value: "(81) 99764-2358" },
  { type: "Telefone", value: "(81) 3729-3732" },
];

const paymentMethods = [
  { src: pix, alt: "PIX", name: "PIX" },
  { src: boleto, alt: "Boleto", name: "Boleto" },
  { src: card, alt: "Cartão", name: "Cartão" },
];

const FooterSection = ({ title, children }) => (
  <div className="footer-section">
    <h3>{title}</h3>
    {children}
  </div>
);

const ContactItem = ({ type, value, link }) => (
  <p>
    {type}: {link ? <a href={link}>{value}</a> : value}
  </p>
);

const PaymentMethodItem = ({ src, alt, name }) => (
  <p>
    <img src={src} alt={alt} /> {name}
  </p>
);

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <FooterSection title="Contato">
          {contactInfo.map((info, index) => (
            <ContactItem
              key={index}
              type={info.type}
              value={info.value}
              link={info.link}
            />
          ))}
        </FooterSection>
        <FooterSection title="Endereço">
          <p>Rua Exemplo, 123, Bairro, Cidade - Estado, CEP 01234-567</p>
        </FooterSection>
        <FooterSection title="Formas de Pagamento">
          {paymentMethods.map((method, index) => (
            <PaymentMethodItem
              key={index}
              src={method.src}
              alt={method.alt}
              name={method.name}
            />
          ))}
        </FooterSection>
      </div>
      <div className="footer-bottom">
        &copy; 2024 Caioba Solutions | Todos os Direitos Reservados
      </div>
    </footer>
  );
}

export default Footer;
