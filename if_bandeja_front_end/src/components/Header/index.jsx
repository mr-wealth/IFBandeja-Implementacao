import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logoImg from '../../assets/logo.png';

import { Container, ProfileContainer, Dropdown, MenuItem, LogoLink } from './styles';

import { FaUser, FaWallet, FaHistory, FaSignOutAlt, FaUserCog, FaConciergeBell } from 'react-icons/fa';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const userRole = Number(localStorage.getItem('tipo'));

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/'); 
  };

  return (
    <Container>
      <LogoLink to="/home">
        <div className="logo-area">
            <img src={logoImg} alt="Logo"/>
            <span>IFBandeja</span>
        </div>
      </LogoLink>

        <div className="actions">
            <ProfileContainer>
                <button title="Perfil" onClick={toggleMenu}>
                    <FaUser />
                </button>

                {menuOpen && (
                    <Dropdown>
                        <MenuItem onClick={() => handleNavigation('/historico')}>
                            <FaHistory /> 
                            <span>Ver Histórico</span>
                        </MenuItem>

                        {userRole === 3 && (
                            <MenuItem onClick={() => handleNavigation('/admin')}>
                                <FaUserCog /> 
                                <span>Painel Admin</span>
                            </MenuItem>
                        )}

                        {(userRole === 2 || userRole === 3) && (
                            <MenuItem onClick={() => handleNavigation('/servidor')}>
                                <FaConciergeBell /> 
                                <span>Área Servidor</span>
                            </MenuItem>
                        )}

                        <MenuItem onClick={handleLogout} isLogout>
                            <FaSignOutAlt />
                            <span>Sair</span>
                        </MenuItem>
                    </Dropdown>
                )}
            </ProfileContainer>

            <button title="Carteira"><FaWallet /></button>
        </div>
    </Container>
  )
}

export { Header };