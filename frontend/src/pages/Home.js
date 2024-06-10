import React from "react";
import { useNavigate } from "react-router-dom";
import ServiceSection from "../components/ServiceSection";
import AboutUsSection from "../components/AboutSection";
import GallerySection from "../components/GallerySection";
import FoundersSection from "../components/FoundersSection";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  const handleServiceRequest = () => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/services");
    } else {
      alert("Login necessário");
    }
  };

  return (
    <>
      <Header />
      <section className="view1">
        <h2 className="title">
          Vença desafios
          <br />
          com tecnologia
        </h2>
        <p className="subtitle">
          Vença os grandes desafios do seu negócio com o uso de tecnologia,
          <br />
          aplicando soluções inteligentes através da automação, tornando a
          <br />
          eficiência do seu negócio imbatível.
        </p>
        <button
          className="button-service"
          id="serviceRequest"
          onClick={handleServiceRequest}
        >
          Solicitar Serviço
        </button>
      </section>
      <ServiceSection />
      <AboutUsSection />
      <GallerySection />
      <FoundersSection />
      <Footer />
    </>
  );
}

export default Home;
