import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import api from './api'; 

const ProtectedRoute = () => {
  const token = localStorage.getItem('accessToken');
  const [isTokenValid, setIsTokenValid] = useState(null); 

  useEffect(() => {
    if (!token) {
      setIsTokenValid(false);
      return;
    }

    const verificarToken = async () => {
      try {
        await api.get('/usuarios/'); 
        
        setIsTokenValid(true);
      } catch (error) {
        console.log("Token inválido ou expirado");
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsTokenValid(false);
      }
    };

    verificarToken();
  }, [token]);

  if (isTokenValid === null) {
    return <div>Verificando autenticação...</div>;
  }

  if (!isTokenValid) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;