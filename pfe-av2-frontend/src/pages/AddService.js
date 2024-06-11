// src/pages/AddService.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Services.module.add.css';

const AddService = () => {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState({});
    const [status] = useState("EM ELABORAÇÃO");

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axios.get('/api/service');
            setServices(response.data);
            setSelectedService(response.data[0]);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const handleServiceChange = (event) => {
        const service = services.find(s => s.id === parseInt(event.target.value));
        setSelectedService(service);
    };

    const addServiceRequest = async () => {
        const newRequest = {
            serviceType: selectedService.id,
            status,
            price: selectedService.price,
            deadlineDays: selectedService.deadlineDays,
            scheduledDate: new Date(new Date().setDate(new Date().getDate() + selectedService.deadlineDays)).toISOString(),
            requestDate: new Date().toISOString(),
            requestNumber: Math.floor(Math.random() * 10000) + 1,
            clientId: "CLIENT_ID" // Ajuste conforme necessário
        };

        try {
            await axios.post('/api/service/request', [newRequest]);
            // Opcionalmente, atualize a UI ou notifique o usuário
        } catch (error) {
            console.error('Error adding service request:', error);
        }
    };

    return (
        <div className="page-container">
            <Header />
            <main className="content-wrap">
                <section id="newServiceRequest" className="new-request-section">
                    <div className="forms">
                        <div className="forms-wrapper">
                            <h3>Nova Solicitação de Serviço</h3>
                            <div className="form-group">
                                <label htmlFor="serviceType">Serviço de TI:</label>
                                <select id="serviceType" onChange={handleServiceChange}>
                                    {services.map(service => (
                                        <option key={service.id} value={service.id}>{service.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Preço:</label>
                                <span id="price">{`R$ ${selectedService.price},00`}</span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="deadline">Prazo de Atendimento:</label>
                                <span id="deadline">{selectedService.deadlineDays} dias úteis</span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="estimatedDate">Data Prevista de Atendimento:</label>
                                <span id="estimatedDate">{new Date(new Date().setDate(new Date().getDate() + selectedService.deadlineDays)).toLocaleDateString()}</span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Status:</label>
                                <span id="status">EM ELABORAÇÃO</span>
                            </div>
                            <button id="addRequest" className="submit-button" onClick={addServiceRequest}>Adicionar Solicitação</button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default AddService;
