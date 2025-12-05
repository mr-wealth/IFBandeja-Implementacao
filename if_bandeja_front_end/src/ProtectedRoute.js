import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('accessToken');
  const [isTokenValid, setIsTokenValid] = useState(null); 
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (!token) {
      setIsTokenValid(false);
      return;
    }

    const verificarToken = async () => {
      try {
        console.log(localStorage.getItem('tipo'))
        const storedRole = localStorage.getItem('tipo'); 
        setUserRole(storedRole ? Number(storedRole) : null);

        setIsTokenValid(true);
      } catch (error) {
        console.log("Token inválido ou expirado");
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('tipo');
        localStorage.removeItem('usuario_id');
        setIsTokenValid(false);
      }
    };

    verificarToken();
  }, [token]);

  if (isTokenValid === null) {
    return <div style={{ color: '#fff', padding: 20 }}>Verificando permissões...</div>;
  }

  if (!isTokenValid) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    toast.error("Acesso não autorizado."); 
    console.warn(`Acesso negado. Role do usuário: ${userRole}. Permitidos: ${allowedRoles}`);
    
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;