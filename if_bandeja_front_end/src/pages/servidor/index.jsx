import React from 'react';
import { FaClock, FaClipboardList, FaCheckCircle } from 'react-icons/fa';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

import { Container, Content, TitleSection, OrderList, OrderCard } from './styles';

function Servidor() {

  const dataHoje = "30/11/2025";

  const mockOrders = [
    { id: '#4092', time: '12:45', type: 'Principal', desc: 'Frango Assado', status: 'Entregue' },
    { id: '#4091', time: '12:42', type: 'Vegetariano', desc: 'Omelete de Legumes', status: 'Entregue' },
    { id: '#4090', time: '12:38', type: 'Principal', desc: 'Frango Assado', status: 'Entregue' },
    { id: '#4089', time: '12:35', type: 'Principal', desc: 'Frango Assado', status: 'Entregue' },
    { id: '#4088', time: '12:30', type: 'Vegetariano', desc: 'Omelete de Legumes', status: 'Entregue' },
    { id: '#4087', time: '12:15', type: 'Principal', desc: 'Frango Assado', status: 'Entregue' },
    { id: '#4086', time: '12:10', type: 'Principal', desc: 'Frango Assado', status: 'Entregue' },
    { id: '#4085', time: '12:05', type: 'Vegetariano', desc: 'Omelete de Legumes', status: 'Entregue' },
  ];

  const getTypeColor = (type) => {
    return type === 'Principal' ? '#28a745' : '#ffa500';
  };

  return (
    <Container>
      <Header />

      <Content>
        <TitleSection>
          <h1><FaClipboardList /> Histórico de Pedidos</h1>
          <p>Visualizando registros do dia: <span>{dataHoje}</span></p>
        </TitleSection>

        <OrderList>
          {mockOrders.map((order) => (
            <OrderCard key={order.id} typeColor={getTypeColor(order.type)}>
              
              <div className="order-info">
                <h3>Pedido {order.id}</h3>
                <span className="timestamp">
                  <FaClock size={12} /> {order.time}
                </span>
              </div>

              <div className="order-detail">
                <strong>{order.type}</strong>
                <span>{order.desc}</span>
              </div>

              <FaCheckCircle color="#333" size={24} style={{ opacity: 0.3 }} />

            </OrderCard>
          ))}
        </OrderList>

      </Content>

      <Footer />
    </Container>
  );
}

export { Servidor };