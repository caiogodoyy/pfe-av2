import React, { useEffect, useState } from "react";
import styles from "../styles/Services.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AddService = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    name: "",
    price: "",
    deadline: "",
  });

  useEffect(() => {
    fetchAllServices();
  }, []);

  const fetchAllServices = async () => {
    try {
      const response = await fetch("http://localhost:3000/service");
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error("Error fetching all services:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    if (newService.price <= 0 || newService.deadline <= 0) {
      alert("Preço e Prazo devem ser maiores que zero.");
      return;
    }
    try {
      await fetch("http://localhost:3000/service", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newService),
      });
      fetchAllServices();
      setNewService({ name: "", price: "", deadline: "" });
    } catch (error) {
      console.error("Error adding new service:", error);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Header serviceView={true} backLink="/services" />
      <main className={styles.mainContent}>
        <section id="serviceList" className={styles.tableSection}>
          <h4>Serviços Atuais</h4>
          <table>
            <thead>
              <tr>
                <th>Nome do Serviço</th>
                <th>Preço</th>
                <th>Prazo</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id}>
                  <td>{service.name}</td>
                  <td>{`R$ ${parseFloat(service.price).toFixed(2)}`}</td>
                  <td>{`${service.deadline} dias`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section id="addService" className={styles.newRequestSection}>
          <div className={styles.forms}>
            <div className={styles.formsWrapper}>
              <h4>Adicionar Novo Serviço</h4>
              <form onSubmit={handleAddService}>
                <div className={styles.formGroupAdd}>
                  <label htmlFor="name">Nome do Serviço:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newService.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroupAdd}>
                  <label htmlFor="price">Preço:</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={newService.price}
                    onChange={handleChange}
                    min="1"
                    step="0.01"
                    required
                  />
                </div>
                <div className={styles.formGroupAdd}>
                  <label htmlFor="deadline">Prazo (dias):</label>
                  <input
                    type="number"
                    id="deadline"
                    name="deadline"
                    value={newService.deadline}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </div>
                <button className={styles.submitButton} type="submit">
                  Adicionar Serviço
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AddService;
