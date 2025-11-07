import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

import { FaUserAlt, FaLock } from 'react-icons/fa';

import logo from '../../assets/logo.png'

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { Container, Form, Logo } from './styles';

const Login = () => {

  const [prontuario, setProntuario] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  //Quando BackEnd Estiver Disponivel Alterar essa função
  const handleOnSubmit = (event) => {
    
    event.preventDefault();

    if (!prontuario || !senha) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if(prontuario === "admin" && senha === '123'){
      navigate('/home')
      return;
    }

    setError('Prontuário ou senha inválidos !')
  }

  return (
    <>
    <Container>
      <Logo src={logo} alt='Imagem da Logo'/>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Form onSubmit={handleOnSubmit}>
      <Input name="prontuario" label="Prontuario" type="text" placeholder="Digite seu prontuario" value={prontuario}
      onChange = {e => setProntuario(e.target.value)} autoComplete="username" icon={FaUserAlt}/>
      <Input name="senha" label="Senha" type="password" placeholder="Digite sua senha" value={senha}
      onChange = {e => setSenha(e.target.value)} autoComplete="current-password" icon={FaLock}/>
      <Button type="submit" >Acessar</Button>
      </Form>
    </Container>
    </>
  )
}

export {Login};