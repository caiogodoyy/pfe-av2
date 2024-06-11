import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Services.module.css';

const Services = () => {
    const [selectedServiceId, setSelectedServiceId] = useState('');
    const [selectedService, setSelectedService] = useState(null); // Estado para armazenar o serviço selecionado
    const [services] = useState([
        { id: 1, name: 'Instalação de Software', price: 100, deadlineDays: 2 },
        { id: 2, name: 'Configuração de Rede', price: 150, deadlineDays: 3 },
        { id: 3, name: 'Manutenção de Hardware', price: 200, deadlineDays: 5 }
    ]);
    const [serviceRequests, setServiceRequests] = useState([]);

    const handleServiceChange = (event) => {
        const serviceId = event.target.value;
        setSelectedServiceId(serviceId);
        const service = services.find(service => service.id === parseInt(serviceId));
        setSelectedService(service);
    };

    const addServiceRequest = () => {
        if (!selectedServiceId) return;

        const service = services.find(service => service.id === parseInt(selectedServiceId));
        const currentDate = new Date();
        const deadlineDate = new Date(currentDate);
        deadlineDate.setDate(currentDate.getDate() + service.deadlineDays);

        const newRequest = {
            serviceId: service.id,
            status: "EM ELABORAÇÃO",
            price: service.price,
            serviceDeadline: service.deadlineDays,
            scheduledDate: deadlineDate.toLocaleDateString(),
            requestDate: currentDate.toLocaleDateString(),
            requestNumber: Math.floor(Math.random() * 10000) + 1,
            clientId: "CLIENT_ID" // Ajuste conforme necessário
        };

        setServiceRequests([...serviceRequests, newRequest]);
    };

    const removeServiceRequest = (requestNumber) => {
        setServiceRequests(serviceRequests.filter(request => request.requestNumber !== requestNumber));
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
                                    <option value="">Selecione um serviço</option>
                                    {services.map(service => (
                                        <option key={service.id} value={service.id}>{service.name}</option>
                                    ))}
                                </select>
                            </div>
                            {selectedService && (
                                <>
                                    <div className="form-group">
                                        <label htmlFor="price">Preço:</label>
                                        <span id="price">{`R$ ${selectedService.price},00`}</span>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="deadline">Prazo de Atendimento:</label>
                                        <span id="deadline">{`${selectedService.deadlineDays} dias úteis`}</span>
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
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {serviceRequests.length > 0 && (
                    <section id="serviceRequests" className="table-section">
                        <h2>Solicitações de Serviço</h2>
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
                                {serviceRequests.map(request => (
                                    <tr key={request.requestNumber}>
                                        <td>{request.requestDate}</td>
                                        <td>{request.requestNumber}</td>
                                        <td>{services.find(service => service.id === request.serviceId)?.name}</td> {/* Obter o nome do serviço com base no ID */}
                                        <td>{request.status}</td>
                                        <td>{`R$ ${request.price},00`}</td>
                                        <td>{request.scheduledDate}</td>
                                        <td><button className="delete" onClick={() => removeServiceRequest(request.requestNumber)}>Excluir</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                )}

            </main>
            <Footer />
        </div>
    );
};

export default Services;
