import React, { useState, useEffect, useMemo } from 'react';
import { FaClock, FaClipboardList, FaCheckCircle, FaUser, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import { format, addDays, subDays, isSameDay, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'react-toastify';

import api from '../../api';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

import { Container, Content, TitleSection, OrderList, OrderCard, DateFilter } from './styles';

function Servidor() {
  const [fullOrders, setFullOrders] = useState([]); 
  
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('hoje');
  
  const SEPARATOR = '||';

  useEffect(() => {
    async function loadAllData() {
      setLoading(true);
      try {
        const response = await api.get('/pedido');
        const rawOrders = response.data;

        if (rawOrders.length === 0) {
          setFullOrders([]);
          setLoading(false);
          return;
        }

        const cardapioIds = [...new Set(rawOrders.map(o => o.cardapio).filter(id => id))];
        const userIds = [...new Set(rawOrders.map(o => o.usuario).filter(id => id))];

        const [cardapiosRes, usuariosRes] = await Promise.all([
          Promise.all(cardapioIds.map(id => 
            api.get(`/cardapio/${id}/`).then(res => ({ id, ...res.data })).catch(() => null)
          )),
          Promise.all(userIds.map(id => 
            api.get(`/usuarios/${id}/`).then(res => ({ id, ...res.data })).catch(() => null)
          ))
        ]);

        const cardapioMap = {};
        cardapiosRes.forEach(c => { if(c) cardapioMap[c.id] = c; });

        const usuarioMap = {};
        usuariosRes.forEach(u => { if(u) usuarioMap[u.id] = u; });

        const enrichedList = rawOrders.map(order => ({
          ...order,
          cardapioDetails: cardapioMap[order.cardapio] || null, 

          usuarioDetails: usuarioMap[order.usuario] || null
        }));

        setFullOrders(enrichedList);

      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        toast.error("Erro ao sincronizar pedidos.");
      } finally {
        setLoading(false);
      }
    }

    loadAllData();
  }, []); 
  
  const filteredOrders = useMemo(() => {
    const hoje = new Date();
    let targetDate;

    if (filterType === 'ontem') targetDate = subDays(hoje, 1);
    else if (filterType === 'amanha') targetDate = addDays(hoje, 1);
    else targetDate = hoje;

    return fullOrders.filter(order => {
      
      if (!order.cardapioDetails || !order.cardapioDetails.data) return false;

      const dataDoCardapio = parseISO(order.cardapioDetails.data);
      return isSameDay(dataDoCardapio, targetDate);
    });
  }, [fullOrders, filterType]);

  const getMealText = (cardapioObj, tipo) => {
    if (!cardapioObj) return "Carregando...";
    const desc = cardapioObj.descricao || "";
    const parts = desc.split(SEPARATOR);
    
    if (tipo === 1) return parts[0] || desc;
    if (tipo === 2) return parts[1] || desc;
    return desc;
  };

  const getTargetDateDisplay = () => {
    const hoje = new Date();
    if (filterType === 'ontem') return subDays(hoje, 1);
    if (filterType === 'amanha') return addDays(hoje, 1);
    return hoje;
  };

  const displayDate = format(getTargetDateDisplay(), "dd 'de' MMMM", { locale: ptBR });

  return (
    <Container>
      <Header />
      <Content>
        <TitleSection>
          <h1><FaClipboardList /> Histórico de Pedidos</h1>
          <p>Visualizando refeição de: <span style={{ textTransform: 'capitalize' }}>{displayDate}</span></p>
        </TitleSection>

        <DateFilter>
          <button className={filterType === 'ontem' ? 'active' : ''} onClick={() => setFilterType('ontem')}>Ontem</button>
          <button className={filterType === 'hoje' ? 'active' : ''} onClick={() => setFilterType('hoje')}>Hoje</button>
          <button className={filterType === 'amanha' ? 'active' : ''} onClick={() => setFilterType('amanha')}>Amanhã</button>
        </DateFilter>

        <OrderList>
          {loading && (
            <div style={{textAlign: 'center', padding: '40px'}}>
              <FaSpinner className="spin" size={30} />
              <p>Sincronizando pedidos e cardápios...</p>
            </div>
          )}
          
          {!loading && filteredOrders.length === 0 && (
             <div style={{ textAlign: 'center', padding: '30px', color: '#888', border: '1px dashed #444', borderRadius: '8px' }}>
                <FaExclamationTriangle size={24} style={{marginBottom: 10}}/>
                <p>Nenhum pedido encontrado para o cardápio desta data.</p>
             </div>
          )}

          {!loading && filteredOrders.map((order) => {
            const tipoColor = order.tipo === 1 ? '#28a745' : '#ffa500';
            const tipoNome = order.tipo === 1 ? 'Principal' : 'Vegetariano';
            
            const pratoNome = getMealText(order.cardapioDetails, order.tipo);
          
            const usuarioNome = order.usuarioDetails 
                ? (order.usuarioDetails.prontuario || order.usuarioDetails.username) 
                : `User ${order.usuario}`;

            const horario = order.data_pedido ? format(parseISO(order.data_pedido), 'HH:mm') : '--:--';

            return (
              <OrderCard key={order.id} typeColor={tipoColor}>
                
                <div className="order-info">
                  <h3>Pedido #{order.id}</h3>
                  <div className="meta-info">
                    <span className="timestamp" title="Hora da solicitação">
                      <FaClock size={12} /> {horario}
                    </span>
                    <span className="prontuario">
                      <FaUser size={12} /> {usuarioNome}
                    </span>
                  </div>
                  <small style={{ color: '#666', marginTop: 5, display: 'block' }}>Status: {order.status}</small>
                </div>

                <div className="order-detail">
                  <strong style={{ color: tipoColor }}>{tipoNome}</strong>
                  <span>{pratoNome}</span>
                </div>

                <FaCheckCircle className="status-icon" color="#333" size={24} style={{ opacity: 0.3 }} />

              </OrderCard>
            );
          })}
        </OrderList>

      </Content>
      <Footer />
    </Container>
  );
}

export { Servidor };