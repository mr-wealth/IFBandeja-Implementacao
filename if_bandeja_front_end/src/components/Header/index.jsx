import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logoImg from '../../assets/logo.png';

import { Container, ProfileContainer, Dropdown, MenuItem } from './styles';

import { FaUser, FaWallet, FaHistory, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleHistorico = () => {
    console.log("Clicou em Ver Histórico");
    // navigate('/historico'); // Futuramente descomente isso
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.clear();

    navigate('/'); 
  };

  return (
    <Container>
        <div className="logo-area">
            <img src={logoImg} alt="Logo" />
            <span>IFBandeja</span>
        </div>

        <div className="actions">
            <ProfileContainer>
                <button title="Perfil" onClick={toggleMenu}>
                    <FaUser />
                </button>

                {menuOpen && (
                    <Dropdown>
                        <MenuItem onClick={handleHistorico}>
                            <FaHistory /> 
                            <span>Ver Histórico</span>
                        </MenuItem>
                        
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

export {Header}