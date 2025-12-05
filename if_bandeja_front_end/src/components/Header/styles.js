import styled from "styled-components";
import { Link } from 'react-router-dom';

export const Container = styled.header`
  width: 100%;
  height: 80px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  background: linear-gradient(135deg, #28a745 85%, #8B0000 85%);
  
  color: ${({ theme }) => theme.text};
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  
  position: relative; 
  z-index: 10;

  .logo-area {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 24px;
    font-weight: bold;
    
    img { 
        height: 40px; 
        filter: ${({ theme }) => theme.logoFilter};
    }
  }

  .actions {
    display: flex;
    gap: 16px;
    align-items: center;
    
    > button {
      background: rgba(255,255,255,0.2);
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;  /* Corrigido de fle#x */
      align-items: center;
      justify-content: center;
      color: ${({ theme }) => theme.text};
      cursor: pointer;
      transition: background 0.2s;

      &:hover { background: rgba(255,255,255,0.3); }
    }
  }
`;

export const ProfileContainer = styled.div`
  position: relative;
  
  > button {
      background: rgba(255,255,255,0.2);
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: inherit; 
      cursor: pointer;
      transition: background 0.2s;
      
      &:hover { background: rgba(255,255,255,0.3); }
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  top: 55px;
  right: 0;
  width: 180px;
  background: ${({ theme }) => theme.background};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  z-index: 100;

  &::before {
    content: '';
    position: absolute;
    top: -6px;
    right: 14px;
    width: 0; 
    height: 0; 
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #fff;
  }
`;

export const MenuItem = styled.button`
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  width: 100% !important;
  height: auto !important;

  padding: 12px 16px !important;
  display: flex !important;
  align-items: center;
  justify-content: flex-start !important;
  gap: 12px;
  
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;

  color: ${props => props.isLogout ? '#d32f2f' : '#868686ff'} !important;

  &:hover {
    background: ${props => props.isLogout ? '#ffebee' : '#f5f5f5'} !important;
  }
`;

export const LogoLink = styled(Link)`
  text-decoration: none;
  color: inherit;  
  }
`;