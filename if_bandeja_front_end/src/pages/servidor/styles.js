import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  

  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

export const Content = styled.main`
  flex: 1;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
`;

export const TitleSection = styled.div`
  text-align: center;
  margin-bottom: 30px;

  h1 {
    font-size: 2rem;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.text};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  p {
    color: ${({ theme }) => theme.textSecondary || '#aaa'};
    font-size: 1rem;
    
    span {
      color: ${({ theme }) => theme.primary || '#28a745'};
      font-weight: bold;
    }
  }
`;

export const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

export const OrderCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  background-color: ${({ theme }) => theme.cardBackground || '#1e1e1e'};
  border: 1px solid ${({ theme }) => theme.border || '#333'};
  border-left: 5px solid ${({ typeColor }) => typeColor || '#ccc'};
  
  padding: 20px;
  border-radius: 8px;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(5px);
    background-color: ${({ theme }) => theme.border || '#252525'};
  }

  /* Área da Esquerda: ID e Hora */
  .order-info {
    display: flex;
    flex-direction: column;
    gap: 5px;

    h3 {
      font-size: 1.2rem;
      margin: 0;
      color: ${({ theme }) => theme.text};
    }

    .timestamp {
      font-size: 0.85rem;
      color: #888;
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }

  /* Área da Direita: O Pedido */
  .order-detail {
    text-align: right;

    strong {
      display: block;
      font-size: 1.1rem;
      color: ${({ typeColor }) => typeColor || '#fff'};
      margin-bottom: 4px;
    }

    span {
      font-size: 0.9rem;
      color: #aaa;
    }
  }

  /* Responsividade para celular */
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;

    .order-detail {
      text-align: left;
    }
  }
`;