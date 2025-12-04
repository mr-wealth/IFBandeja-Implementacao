import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
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
      
      &:hover {
        transform: scale(1.2);
        color: ${({ theme }) => theme.primary || '#28a745'}; 
      }
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
