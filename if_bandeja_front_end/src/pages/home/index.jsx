import React, { useState, useEffect, useCallback } from 'react';
import { Container, Content, TitleSection, CardGrid, MenuCard } from './styles';

import { FaLeaf, FaDrumstickBite, FaLock, FaCheckCircle } from 'react-icons/fa';
import { format, startOfWeek, addWeeks, endOfWeek, eachDayOfInterval, differenceInCalendarDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'react-toastify';

import api from '../../api';
import ModalFormulario from '../../components/ModalFormulario';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

function Home() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);

  const [usuarioId, setUsuarioId] = useState(null);
  
  const SEPARATOR = '||';

  useEffect(() => {
    const idSalvo = localStorage.getItem('usuario_id');
    
    if (idSalvo) {
      setUsuarioId(Number(idSalvo));
    } else {
      setLoading(false);
    }
  }, []);

  const loadData = useCallback(async () => {
    if (!usuarioId) return; 

    try {
      setLoading(true);
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      const start = startOfWeek(hoje, { locale: ptBR });
      const end = endOfWeek(addWeeks(hoje, 1), { locale: ptBR });
      const intervaloDias = eachDayOfInterval({ start, end });

      const mesesParaBuscar = [];
      intervaloDias.forEach(date => {
        const mesAno = format(date, 'MM-yyyy');
        if (!mesesParaBuscar.includes(mesAno)) {
          mesesParaBuscar.push(mesAno);
        }
      });

      const requestsCardapio = mesesParaBuscar.map(mesAnoStr => {
        const [mes, ano] = mesAnoStr.split('-');
        return api.get(`/cardapio/?mes=${mes}&ano=${ano}`);
      });

      const [responsesCardapio, responsePedidos] = await Promise.all([
        Promise.all(requestsCardapio),
        api.get(`/pedido/?usuario=${usuarioId}`) 
      ]);

      const todosCardapios = responsesCardapio.flatMap(res => res.data);
      const todosPedidos = responsePedidos.data || [];

      const dadosFormatados = intervaloDias.map(date => {
        const dataFormatadaAPI = format(date, 'yyyy-MM-dd');
        
        const itemCardapio = todosCardapios.find(c => c.data === dataFormatadaAPI);
        
        let pedidoExistente = null;
        if (itemCardapio) {
            pedidoExistente = todosPedidos.find(pedido => 
                pedido.cardapio === itemCardapio.id && pedido.usuario === usuarioId
            );
        }

        let principalArr = [];
        let vegArr = [];

        if (itemCardapio && itemCardapio.descricao) {
          const parts = itemCardapio.descricao.split(SEPARATOR);
          const principalStr = parts[0] || '';
          const vegStr = parts[1] || '';

          if (principalStr.trim()) principalArr = principalStr.split(', ');
          if (vegStr.trim()) vegArr = vegStr.split(', ');
        }

        const diffDias = differenceInCalendarDays(date, hoje);

        const podeAlterar = diffDias >= 2;

        return {
          id: itemCardapio?.id || date.getTime(), 
          dateObject: date,
          day: format(date, 'dd'),
          monthName: format(date, 'MMM', { locale: ptBR }), 
          fullDate: dataFormatadaAPI,
          price: itemCardapio?.preco || '',
          
          principal: principalArr,
          veg: vegArr,
          
          temCardapio: !!itemCardapio,
          podeAlterar: podeAlterar,      
          meuPedido: pedidoExistente 
        };
      });

      setDays(dadosFormatados);

    } catch (error) {
      console.error(error);
      toast.error("Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  }, [usuarioId]);

  useEffect(() => {
    if (usuarioId) {
        loadData();
    }
  }, [loadData, usuarioId]);

  const handleRefresh = () => {
    loadData();
    setSelectedDay(null);
  };

  const getTitle = () => {
    if (days.length === 0) return 'Carregando...';
    const firstDay = days[0].dateObject;
    const lastDay = days[days.length - 1].dateObject;
    
    const mes1 = format(firstDay, 'MMMM', { locale: ptBR });
    const mes2 = format(lastDay, 'MMMM', { locale: ptBR });

    return mes1 === mes2 ? mes1 : `${mes1} / ${mes2}`;
  };

  return (
    <Container>
      <Header />
      <Content>
        <TitleSection>
          <h1>Faça Seu Pedido</h1>
          <p>Pedidos e alterações permitidos com mínimo de 2 dias de antecedência.</p>
          <div className="month-selector">
            <span style={{ textTransform: 'capitalize', fontSize: '1.2rem' }}>
                {getTitle()}
            </span>
          </div>
        </TitleSection>

        {loading ? (
            <p style={{textAlign: 'center', color: '#fff'}}>Carregando...</p>
        ) : (
            <CardGrid>
            {days.map((item) => {
                const isClickable = item.temCardapio && (item.podeAlterar || item.meuPedido);

                const borderStyle = item.meuPedido ? '2px solid #28a745' : '1px solid transparent';

                return (
                    <MenuCard 
                        key={item.fullDate} 
                        onClick={() => isClickable ? setSelectedDay(item) : null}
                        style={{ 
                            opacity: item.temCardapio ? 1 : 0.6, 
                            cursor: isClickable ? 'pointer' : 'default',
                            border: borderStyle,
                            filter: (item.temCardapio && !item.podeAlterar && !item.meuPedido) ? 'grayscale(40%)' : 'none'
                        }}
                    >
                        <div className="card-header">
                            <div className="date-circle">{item.day}</div>
                            <small style={{ textTransform: 'capitalize', fontSize: '1.2rem' }}>{item.monthName}</small> 
                            
                            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                                {item.meuPedido && (
                                    <FaCheckCircle color="#28a745" title="Pedido realizado" />
                                )}
                                {item.temCardapio && !item.podeAlterar && !item.meuPedido && (
                                    <FaLock color="#666" title="Encerrado" />
                                )}
                            </div>
                        </div>
                    
                        <div className="card-body">
                            {item.temCardapio ? (
                                <>
                                    <h3><FaDrumstickBite /> Principal</h3>
                                    <ul>
                                    {item.principal.length > 0 ? (
                                        item.principal.map((food, index) => <li key={index}>- {food}</li>)
                                    ) : <li>Sem informação</li>}
                                    </ul>

                                    <h3><FaLeaf /> Vegetariano</h3>
                                    <ul>
                                    {item.veg.length > 0 ? (
                                        item.veg.map((food, index) => <li key={index}>- {food}</li>)
                                    ) : <li>Sem informação</li>}
                                    </ul>

                                    {item.meuPedido && (
                                        <div style={{ 
                                            marginTop: '10px', padding: '5px', background: '#d4edda', 
                                            color: '#155724', borderRadius: '4px', fontSize: '0.8rem', 
                                            textAlign: 'center', fontWeight: 'bold'
                                        }}>
                                            Pedido Confirmado
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                                    <p>Cardápio não disponível</p>
                                </div>
                            )}
                        </div>
                    </MenuCard>
                );
            })}
            </CardGrid>
        )}
      </Content>
      <Footer />

      {selectedDay && (
        <ModalFormulario 
          dia={selectedDay} 
          usuarioId={usuarioId} 
          onClose={() => setSelectedDay(null)} 
          onSuccess={handleRefresh} 
        />
      )}
    </Container>
  );
}

export { Home };