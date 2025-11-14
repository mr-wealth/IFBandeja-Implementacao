import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    console.log(localStorage)
    const token = localStorage.getItem('acessToken');
    if (!token) {
        return <Navigate to="/" replace />
    }
    return <Outlet />;
};

export default ProtectedRoute;