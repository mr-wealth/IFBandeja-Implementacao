import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
`;

export const Header = styled.header`
  width: 100%;
  height: 80px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  background: linear-gradient(135deg, #28a745 85%, #8B0000 85%);
  color: ${({ theme }) => theme.text};
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);

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
    
    button {
      background: rgba(255,255,255,0.2);
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: fle#x;
      align-items: center;
      justify-content: center;
      color: ${({ theme }) => theme.text};;
      cursor: pointer;
      transition: background 0.2s;

      &:hover { background: rgba(255,255,255,0.3); }
    }
  }
`;

export const Content = styled.main`
  flex: 1;
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

export const TitleSection = styled.div`
  text-align: center;
  margin-bottom: 32px;
  color: ${({ theme }) => theme.text};

  h1 { font-size: 28px; margin-bottom: 8px; }
  p { font-size: 14px; opacity: 0.7; }

  .month-selector {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 16px;
    font-size: 20px;
    font-weight: bold;
    
    button {
      background: none;
      border: none;
      color: ${({ theme }) => theme.text};
      font-size: 24px;
      cursor: pointer;
    }
  }
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
  gap: 20px;
`;

export const MenuCard = styled.div`
  background-color: ${({ theme }) => theme.green}; 
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  color: ${({ theme }) => theme.text};;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  }

  .card-header {
    padding: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    .date-circle {
      width: 50px;
      height: 50px;
      border: 2px solid ${({ theme }) => theme.text};;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: bold;
    }
  }

  .card-body {
    background-color: ${({ theme }) => theme.background === '#121212' ? '#333' : '#CBCBCB'};
    color: ${({ theme }) => theme.text};
    padding: 16px;
    margin: 0 8px 8px 8px;
    border-radius: 8px;
    flex: 1;

    h3 { font-size: 16px; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;}
    ul { list-style: none; margin-bottom: 16px; font-size: 13px; opacity: 0.8; }
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  padding: 32px;
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
  position: relative;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);

  h2 { margin-bottom: 16px; color: ${({ theme }) => theme.green}; }
  
  .buttons {
    display: flex;
    gap: 16px;
    margin-top: 24px;
  }
`;

export const Footer = styled.footer`
  background-color: #8B0000;
  padding: 16px;
  text-align: center;
  color: ${({ theme }) => theme.text};;
  font-size: 14px;
`;