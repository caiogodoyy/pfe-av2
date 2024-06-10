import React from "react";
import "../styles/Home.css";
import caioba1 from "../images/photo-grid/caioba1.jpg";
import caioba2 from "../images/photo-grid/caioba2.jpg";
import caioba3 from "../images/photo-grid/caioba3.jpg";
import caioba4 from "../images/photo-grid/caioba4.jpg";

const images = [
  { src: caioba1, alt: "Espaço 1" },
  { src: caioba2, alt: "Espaço 2" },
  { src: caioba3, alt: "Espaço 3" },
  { src: caioba4, alt: "Espaço 4" },
];

const CarouselItem = ({ src, alt, isActive }) => (
  <div className={`carousel-item ${isActive ? "active" : ""}`}>
    <img src={src} className="d-block w-100" alt={alt} />
  </div>
);

const GallerySection = () => {
  return (
    <section className="view4">
      <h2>O espaço da Caioba Solutions</h2>
      <div className="gallery">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {images.map((image, index) => (
              <CarouselItem
                key={index}
                src={image.src}
                alt={image.alt}
                isActive={index === 0}
              />
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Próximo</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
