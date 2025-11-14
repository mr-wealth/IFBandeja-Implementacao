import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

import { FaUserAlt, FaLock } from 'react-icons/fa';

import logo from '../../assets/logo.png'

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { Container, Form, Logo } from './styles';

const API_URL = 'http://127.0.0.1:8000/api/login/';

const Login = () => {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleOnSubmit = async (event) => {
    
    event.preventDefault();

    try{
      const response = await axios.post(`${API_URL}`, {
        email: email,
        password: senha
      });

      const {access, refresh } = response.data;

      localStorage.setItem('acessToken', access);
      localStorage.setItem('refreshToken', refresh);

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