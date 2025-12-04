import React, { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import api from '../../api'

import { FaUserAlt, FaLock } from 'react-icons/fa';

import logo from '../../assets/logo.png'

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { Container, Form, Logo } from './styles';

const Login = () => {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  const handleOnSubmit = async (event) => {
    
    event.preventDefault();

    try{
      const response = await api.post('/login/', {
        prontuario: email,
        senha: senha
      });

      const {access, refresh, usuario } = response.data;

      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      localStorage.setItem('loginTime', Date.now());
      localStorage.setItem('usuario_id', usuario.id);

      navigate('/home');

    } catch (error) {
      if(error.message === "Network Error"){
        setError("Houve algum erro com o servidor tente novamente mais tarde!")
        return
      }
      setError("Credenciais Invalidas");
    }
  }

  return (
    <>
    <Container>
      <Logo src={logo} alt='Imagem da Logo'/>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Form onSubmit={handleOnSubmit}>
      <Input name="prontuario" label="Email" type="text" placeholder="Digite seu e-mail" value={email}
      onChange = {e => setEmail(e.target.value)} autoComplete="username" icon={FaUserAlt}/>
      <Input name="senha" label="Senha" type="password" placeholder="Digite sua senha" value={senha}
      onChange = {e => setSenha(e.target.value)} autoComplete="current-password" icon={FaLock}/>
      <Button type="submit" >Acessar</Button>
      </Form>
    </Container>
    </>
  )
}

export {Login};