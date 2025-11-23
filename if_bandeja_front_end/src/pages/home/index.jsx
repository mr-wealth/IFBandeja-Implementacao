import React, { useState } from 'react';
import { 
  Container, Header, Content, TitleSection, CardGrid, MenuCard, Footer, ModalOverlay, ModalContent 
} from './styles';

import { FaUser, FaWallet, FaLeaf, FaDrumstickBite, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import {Button} from '../../components/Button'; 


import logoImg from '../../assets/logo.png';

function Home() {

  const [selectedDay, setSelectedDay] = useState(null);

  const days = [
    { id: 1, day: '10', principal: ['Arroz', 'Feijão', 'Carne Assada', 'Salada'], veg: ['Arroz', 'Feijão', 'Tofu', 'Salada'] },
    { id: 2, day: '11', principal: ['Arroz', 'Feijão', 'Frango Grelhado', 'Legumes'], veg: ['Arroz', 'Feijão', 'PTS', 'Legumes'] },
    { id: 3, day: '12', principal: ['Arroz', 'Feijão', 'Peixe Empanado', 'Purê'], veg: ['Arroz', 'Feijão', 'Grão de Bico', 'Purê'] },
    { id: 4, day: '13', principal: ['Arroz', 'Feijão', 'Estrogonofe', 'Batata Palha'], veg: ['Arroz', 'Feijão', 'Estrogonofe de Cogumelos', 'Batata'] },
    { id: 5, day: '14', principal: ['Arroz', 'Feijão', 'Feijoada', 'Couve'], veg: ['Arroz', 'Feijão', 'Feijoada Vegana', 'Couve'] },
  ];

  return (
    <Container>
      <Header>
        <div className="logo-area">
          <img src={logoImg} alt="Logo" />
          <span>IFBandeja</span>
        </div>
        
        <div className="actions">
          <button title="Perfil"><FaUser /></button>
          <button title="Carteira"><FaWallet /></button>
        </div>
      </Header>

      <Content>
        <TitleSection>
          <h1>Faça Sua Reserva</h1>
          <p>Cardápio sujeito a possíveis alterações.</p>
          
          <div className="month-selector">
            <button><FaChevronLeft /></button>
            <span>Outubro</span>
            <button><FaChevronRight /></button>
          </div>
        </TitleSection>

        <CardGrid>
          {days.map((item) => (
            <MenuCard key={item.id} onClick={() => setSelectedDay(item)}>
              <div className="card-header">
                <div className="date-circle">{item.day}</div>
              </div>
              
              <div className="card-body">
                <h3><FaDrumstickBite /> Principal</h3>
                <ul>
                  {item.principal.map((food, index) => <li key={index}>- {food}</li>)}
                </ul>

                <h3><FaLeaf /> Vegetariano</h3>
                <ul>
                  {item.veg.map((food, index) => <li key={index}>- {food}</li>)}
                </ul>
              </div>
            </MenuCard>
          ))}
        </CardGrid>
      </Content>

      <Footer>
        IFBandeja, 2025 - Todos os direitos reservados.
      </Footer>

      {selectedDay && (
        <ModalOverlay onClick={() => setSelectedDay(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>Reserva para o dia {selectedDay.day}</h2>
            <p>Você deseja confirmar sua refeição para este dia?</p>
            
            <div style={{ marginTop: '16px', background: '#eee', padding: '10px', borderRadius: '8px', color: '#333' }}>
              <strong>Opção Principal:</strong> {selectedDay.principal.join(', ')}
            </div>

            <div className="buttons">
              <Button onClick={() => alert('Reserva Confirmada!')}>Confirmar</Button>
              <Button variant="negative" onClick={() => setSelectedDay(null)}>Cancelar</Button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}

    </Container>
  );
}

export  {Home};