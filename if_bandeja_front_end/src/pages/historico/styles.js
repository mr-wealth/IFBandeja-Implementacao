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
    color: ${({ theme }) => theme.text}; 
    font-size: 1rem;
    opacity: 0.8;
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
  
  background-color: ${({ theme }) => theme.cardBackground};
  
  border: 1px solid ${({ theme }) => theme.border || 'transparent'};
  
  border-left: 5px solid ${({ typeColor }) => typeColor};
  
  padding: 20px;
  border-radius: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2); 
    filter: brightness(1.1);
  }

  .order-info {
    display: flex;
    flex-direction: column;
    gap: 5px;

    h3 {
      font-size: 1.1rem;
      margin: 0;
      color: ${({ theme }) => theme.text};
    }

    .meta-info {
      display: flex;
      flex-direction: column;
      gap: 5px;
      font-size: 0.85rem;
      
      /* Texto secundário */
      color: ${({ theme }) => theme.text}; 
      opacity: 0.7;

      span {
        display: flex;
        align-items: center;
        gap: 6px;
      }
    }
  }

  .order-detail {
    text-align: right;
    flex: 1;
    margin-left: 20px;

    strong {
      display: block;
      color: ${({ typeColor }) => typeColor};
      margin-bottom: 4px;
      text-transform: uppercase;
      font-size: 0.8rem;
      letter-spacing: 1px;
    }

    span {
      font-size: 1rem;
      color: ${({ theme }) => theme.text};
      opacity: 0.9;
      display: block;
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;

    .order-detail {
      text-align: left;
      margin-left: 0;
    }
  }
`;

export const EmptyState = styled.div`
    text-align: center;
    padding: 40px;
    
    color: ${({ theme }) => theme.text};
    opacity: 0.5;
    
    border: 1px dashed ${({ theme }) => theme.text};
    border-radius: 8px;
    
    p { margin-top: 10px; }
`;