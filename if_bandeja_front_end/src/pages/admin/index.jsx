import React, { useState, useEffect, useCallback } from 'react';
import { FaLeaf, FaDrumstickBite, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval,} from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { toast } from 'react-toastify';

import api from '../../api';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import ModalAdmin from '../../components/ModalAdmin'; 

import { Container, Content, TitleSection, CardGrid, AdminCard } from './styles';

function Admin() {
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const [apiData, setApiData] = useState([]);

  const SEPARATOR = '||'; 

  const fetchCardapios = useCallback(async () => {
    try {
      const month = format(currentDate, 'MM');
      const year = format(currentDate, 'yyyy');

      const response = await api.get(`/cardapio?mes=${month}&ano=${year}`);
      setApiData(response.data); 
    } catch (error) {
      console.error("Erro ao buscar cardápios", error);
      toast.error("Erro ao carregar dados.");
    }
  }, [currentDate]);

  useEffect(() => {
    fetchCardapios();
  }, [fetchCardapios]);

  const handlePrevMonth = () => setCurrentDate(prev => subMonths(prev, 1));
  const handleNextMonth = () => setCurrentDate(prev => addMonths(prev, 1));

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const allDaysInMonth = eachDayOfInterval({ start, end });

  const days = allDaysInMonth.map(date => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    
    const item = apiData.find(i => i.data === formattedDate);

    let principalArr = null;
    let vegArr = null;

    if (item && item.descricao) {
      const parts = item.descricao.split(SEPARATOR);
      
      const principalStr = parts[0] || '';
      const vegStr = parts[1] || '';

      if (principalStr.trim()) principalArr = principalStr.split(', ');
      if (vegStr.trim()) vegArr = vegStr.split(', ');
    }

    return {
      dateObject: date,
      day: format(date, 'dd'),
      month: format(date, 'MM' ),
      fullDate: formattedDate,
      
      id: item?.id || null, 
      
      principal: principalArr,
      veg: vegArr,
      price: item?.preco || ''
    };
  });

  const handleEditDay = (dayItem) => {
    setSelectedDay(dayItem);
  };

  const handleSalvarCardapio = async (dadosAtualizados) => {
    const { fullDate, principal, veg, price, id } = dadosAtualizados;

    const principalStr = principal ? principal.join(', ') : '';
    const vegStr = veg ? veg.join(', ') : '';

    const descricaoUnificada = `${principalStr}${SEPARATOR}${vegStr}`;

    if (!principalStr && !vegStr) {
       toast.warn("O cardápio está vazio.");
       return; 
    }

    const payload = {
      data: fullDate,
      descricao: descricaoUnificada,
      preco: parseFloat(price) || 0
    };

    try {
      if (id) {
        await api.put(`/cardapio/${id}/`, payload);
        toast.success('Cardápio atualizado!');
      } else {
        await api.post('/cardapio/', payload);
        toast.success('Cardápio criado!');
      }
      
      await fetchCardapios();
      setSelectedDay(null);

    } catch (error) {
      console.error("Erro ao salvar", error);
      toast.error('Erro ao salvar no servidor.');
    }
  };

  const handleDeleteCardapio = async (id) => {
    try {

      await api.delete(`/cardapio/${id}/`);
      
      toast.success("Cardápio excluído com sucesso!");
      
      await fetchCardapios();
      
      setSelectedDay(null);

    } catch (error) {
      console.error("Erro ao deletar cardápio", error);
      toast.error("Erro ao excluir o cardápio. Tente novamente.");
    }
  };

  const monthTitle = format(currentDate, 'MMMM yyyy', { locale: ptBR });

  return (
    <Container>
      <Header />
      <Content>
        <TitleSection>
          <h1>Gerenciar Cardápio</h1>
          <div className="month-selector">
            <button onClick={handlePrevMonth}><FaChevronLeft /></button>
            <span style={{ textTransform: 'capitalize' }}>{monthTitle}</span>
            <button onClick={handleNextMonth}><FaChevronRight /></button>
          </div>
        </TitleSection>

        <CardGrid>
          {days.map((item) => (
            <AdminCard key={item.fullDate} onClick={() => handleEditDay(item)}>
              <div className="card-header">
                <div className="date-circle">{item.day}</div>
                <small style={{ textTransform: 'capitalize' }}>{format(item.dateObject, 'EEE', { locale: ptBR })}</small>
              </div>
              
              <div className="card-body">
                <h3><FaDrumstickBite /> Principal</h3>
                {item.principal ? (
                  <ul>{item.principal.map((food, idx) => <li key={idx}>- {food}</li>)}</ul>
                ) : <div className="empty-state">Não definido</div>}

                <h3><FaLeaf /> Vegetariano</h3>
                {item.veg ? (
                  <ul>{item.veg.map((food, idx) => <li key={idx}>- {food}</li>)}</ul>
                ) : <div className="empty-state">Não definido</div>}
                
                {item.price > 0 && (
                   <div style={{marginTop: '10px', fontWeight: 'bold', color: '#2ecc71'}}>
                     R$ {Number(item.price).toFixed(2).replace('.', ',')}
                   </div>
                )}
              </div>
            </AdminCard>
          ))}
        </CardGrid>
      </Content>
      <Footer />

      {selectedDay && (
        <ModalAdmin 
          dia={selectedDay} 
          onClose={() => setSelectedDay(null)} 
          onConfirm={handleSalvarCardapio} 
          onDelete={handleDeleteCardapio}
        />
      )}
    </Container>
  );
}

export { Admin };