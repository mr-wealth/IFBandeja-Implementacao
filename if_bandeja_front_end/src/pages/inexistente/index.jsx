import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Message, Title } from './styles';
import {Button} from '../../components/Button/index'

const Inexistente = () => {
  const navigate = useNavigate();

  const handleNavigate = () =>{
    navigate("/home");
  }

  return (
      <Container>
        <Title>404 - Página Não Encontrada</Title>
        <Message>O caminho que você está procurando não existe.</Message>
        <Button onClick={handleNavigate}>
          Voltar ao início
        </Button>
      </Container>
    );
};

export default Inexistente;