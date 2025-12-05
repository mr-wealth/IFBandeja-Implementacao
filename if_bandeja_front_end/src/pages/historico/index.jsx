import React, { useState, useEffect } from 'react';
import { FaHistory, FaCalendarAlt, FaUtensils, FaSpinner, FaReceipt } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'react-toastify';

import api from '../../api'; 
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

import { Container, Content, TitleSection, OrderList, OrderCard, EmptyState } from './styles';

function HistoricoUsuario() {
  const [historyOrders, setHistoryOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const SEPARATOR = '||';

  useEffect(() => {
    async function fetchUserHistory() {
      setLoading(true);
      try {
        const usuarioId = localStorage.getItem('usuario_id');
        
        if (!usuarioId) {
            toast.error("Usuário não identificado. Faça login novamente.");
            setLoading(false);
            return;
        }

        // Busca os pedidos (O Back-end está retornando TODOS, infelizmente)
        const response = await api.get(`/pedido/?usuario=${usuarioId}`);
        
        // --- CORREÇÃO AQUI: FILTRAGEM MANUAL ---
        // Filtramos apenas os pedidos onde o ID do usuário bate com o logado
        const rawOrders = response.data.filter(order => order.usuario === Number(usuarioId));

        if (!rawOrders || rawOrders.length === 0) {
            setHistoryOrders([]);
            setLoading(false);
            return;
        }

        const cardapioIds = [...new Set(rawOrders.map(o => o.cardapio).filter(id => id))];

        const cardapiosResponses = await Promise.all(
            cardapioIds.map(id => 
                api.get(`/cardapio/${id}/`)
                   .then(res => ({ id, ...res.data }))
                   .catch(() => null)
            )
        );

        const cardapioMap = {};
        cardapiosResponses.forEach(c => {
            if (c) cardapioMap[c.id] = c;
        });

        const enrichedList = rawOrders.map(order => ({
            ...order,
            cardapioDetails: cardapioMap[order.cardapio] || null
        }));

        enrichedList.sort((a, b) => {
            const dateA = new Date(a.data_pedido);
            const dateB = new Date(b.data_pedido);
            return dateB - dateA;
        });

        setHistoryOrders(enrichedList);

      } catch (error) {
        console.error("Erro ao carregar histórico:", error);
        toast.error("Não foi possível carregar seu histórico.");
      } finally {
        setLoading(false);
      }
    }

    fetchUserHistory();
  }, []);

  const getMealText = (cardapioObj, tipo) => {
    if (!cardapioObj) return "Carregando informações do prato...";
    
    const desc = cardapioObj.descricao || "Sem descrição";
    const parts = desc.split(SEPARATOR);
    
    const principal = parts[0] ? parts[0].trim() : "";
    const vegetariano = parts[1] ? parts[1].trim() : "";

    if (tipo === 1) return principal || desc;
    if (tipo === 2) return vegetariano || desc;
    
    return desc;
  };

  const getTypeName = (tipo) => (tipo === 1 ? 'Prato Principal' : 'Opção Vegetariana');
  const getTypeColor = (tipo) => (tipo === 1 ? '#28a745' : '#ffa500');

  return (
    <Container>
      <Header />

      <Content>
        <TitleSection>
          <h1><FaHistory /> Meus Pedidos</h1>
          <p>Confira o histórico de todas as suas solicitações de refeição.</p>
        </TitleSection>

        {loading ? (
            <EmptyState style={{ border: 'none' }}>
                <FaSpinner className="spin" size={30} />
                <p>Carregando seu histórico...</p>
            </EmptyState>
        ) : (
            <OrderList>
                {historyOrders.length === 0 ? (
                    <EmptyState>
                        <FaUtensils size={40} style={{ opacity: 0.5, marginBottom: 15 }} />
                        <h3>Nenhum pedido encontrado</h3>
                        <p>Você ainda não realizou solicitações de refeição.</p>
                    </EmptyState>
                ) : (
                    historyOrders.map(order => {
                        const tipoColor = getTypeColor(order.tipo);
                        const pratoNome = getMealText(order.cardapioDetails, order.tipo);
                        
                        const dataObj = order.data_pedido ? parseISO(order.data_pedido) : new Date();
                        const dataFormatada = format(dataObj, "dd 'de' MMM, yyyy", { locale: ptBR });
                        const horaFormatada = format(dataObj, "HH:mm");

                        return (
                            <OrderCard key={order.id} typeColor={tipoColor}>
                                
                                <div className="order-info">
                                    <h3>Pedido #{order.id}</h3>
                                    
                                    <div className="meta-info">
                                        <span title="Data do Pedido">
                                            <FaCalendarAlt size={12} /> {dataFormatada}
                                        </span>
                                        <span title="Horário">
                                            <FaHistory size={12} /> às {horaFormatada}
                                        </span>
                                        <span style={{ color: order.status === 'Solicitado' ? '#ffa500' : '#aaa' }}>
                                            <FaReceipt size={12} /> Status: {order.status || 'Processando'}
                                        </span>
                                    </div>
                                </div>

                                <div className="order-detail">
                                    <strong>{getTypeName(order.tipo)}</strong>
                                    <span>{pratoNome}</span>
                                </div>

                            </OrderCard>
                        );
                    })
                )}
            </OrderList>
        )}

      </Content>

      <Footer />
    </Container>
  );
}

export { HistoricoUsuario };