import React, { useEffect, useState } from "react";
import styles from "../styles/Services.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Services = () => {
  const [services, setServices] = useState([]);
  const [user, setUser] = useState(null);
  const [serviceType, setServiceType] = useState("");
  const [serviceRequests, setServiceRequests] = useState([]);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    if (user && user.email) {
      setUser(user);
    }

    if (user && user.id) {
      fetchServiceRequests(user.id);
    }

    fetchAllServices();
  }, []);

  const fetchServiceRequests = async (clientId) => {
    try {
      const response = await fetch(`http://localhost:3000/service/${clientId}`);
      const data = await response.json();
      const formattedData = data.map((request) => ({
        ...request,
        requestDate: formatDate(request.requestDate),
        scheduledDate: formatDate(request.scheduledDate),
      }));
      setServiceRequests(formattedData);
      setServiceType(formattedData[0]?.serviceId.toString() || "");
    } catch (error) {
      console.error("Error fetching service requests:", error);
    }
  };

  const fetchAllServices = async () => {
    try {
      const response = await fetch(`http://localhost:3000/service`);
      const data = await response.json();
      setServices(data);
      if (data.length > 0) {
        setServiceType(data[0].id.toString());
      }
    } catch (error) {
      console.error("Error fetching all services:", error);
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const calculateEstimatedDate = (deadlineDays) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + deadlineDays);
    return formatDate(currentDate);
  };

  const addServiceRequest = async () => {
    const selectedService = services.find(
      (s) => s.id.toString() === serviceType
    );
    if (!selectedService) return;

    const newRequest = {
      price: parseFloat(selectedService.price),
      serviceDeadline: selectedService.deadline,
      scheduledDate: calculateEstimatedDate(selectedService.deadline),
      status: "EM ELABORAÇÃO",
      requestDate: formatDate(new Date()),
      requestNumber: generateRequestId(),
      clientId: user.id,
      serviceId: selectedService.id,
    };

    const updatedRequests = [...serviceRequests, newRequest];

    try {
      await fetch("http://localhost:3000/service/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId: user.id,
          requests: updatedRequests,
        }),
      });
      setServiceRequests(updatedRequests);
    } catch (error) {
      console.error("Error adding service request:", error);
    }
  };

  const handleDeleteRequest = async (id) => {
    const updatedRequests = serviceRequests.filter(
      (request) => request.requestNumber !== id
    );

    try {
      await fetch("http://localhost:3000/service/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId: user.id,
          requests: updatedRequests,
        }),
      });
      setServiceRequests(updatedRequests);
    } catch (error) {
      console.error("Error deleting service request:", error);
    }
  };

  const generateRequestId = () => {
    return Math.floor(Math.random() * 10000) + 1;
  };

  return (
    <div>
      <Header serviceView={true} />

      <main>
        <section className={styles.emailSection}>
          <div id="emailSection" className={styles.sectionMessage}>
            {user ? `Bem vindo, ${user.name}!` : ""}
          </div>
        </section>
        <section id="serviceRequests" className={styles.tableSection}>
          <table>
            <thead>
              <tr>
                <th>Data do Pedido</th>
                <th>Número da Solicitação</th>
                <th>Serviço de TI Solicitado</th>
                <th>Status</th>
                <th>Preço Cobrado</th>
                <th>Data Prevista de Realização</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {serviceRequests.map((request) => (
                <tr key={request.requestNumber}>
                  <td>{request.requestDate}</td>
                  <td>{request.requestNumber}</td>
                  <td>
                    {services.find(
                      (service) => service.id === request.serviceId
                    )?.name || "N/A"}
                  </td>
                  <td>{request.status}</td>
                  <td>{`R$ ${request.price}`}</td>
                  <td>{request.scheduledDate}</td>
                  <td>
                    <button
                      className={styles.delete}
                      onClick={() => handleDeleteRequest(request.requestNumber)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section id="newServiceRequest" className={styles.newRequestSection}>
          <div className={styles.forms}>
            <div className={styles.formsWrapper}>
              <h3>Nova Solicitação de Serviço</h3>
              <div className={styles.formGroup}>
                <label htmlFor="serviceType">Serviço de TI:</label>
                <select
                  id="serviceType"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                >
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="price">Preço:</label>
                <span id="price">
                  {services.find((s) => s.id.toString() === serviceType)
                    ?.price || "N/A"}
                </span>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="deadline">Prazo de Atendimento:</label>
                <span id="deadline">
                  {services.find((s) => s.id.toString() === serviceType)
                    ?.deadline || "N/A"}
                </span>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="estimatedDate">
                  Data Prevista de Atendimento:
                </label>
                <span id="estimatedDate">
                  {calculateEstimatedDate(
                    services.find((s) => s.id.toString() === serviceType)
                      ?.deadline || 0
                  )}
                </span>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="status">Status:</label>
                <span id="status">EM ELABORAÇÃO</span>
              </div>
              <button
                id="addRequest"
                className={styles.submitButton}
                onClick={addServiceRequest}
              >
                Adicionar Solicitação
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
