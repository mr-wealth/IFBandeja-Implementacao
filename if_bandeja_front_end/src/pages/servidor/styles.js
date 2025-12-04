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
  margin-bottom: 20px;

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

export const DateFilter = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;

  button {
    background: transparent;
    color: ${({ theme }) => theme.textSecondary || '#aaa'};
    border: 1px solid ${({ theme }) => theme.border || '#444'};
    padding: 8px 24px;
    border-radius: 50px; /* Borda arredondada estilo "pill" */
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s ease;
    font-size: 0.9rem;

    &:hover {
      background: ${({ theme }) => theme.cardBackground || '#252525'};
      color: ${({ theme }) => theme.text};
      border-color: #666;
    }

    &.active {
      background: ${({ theme }) => theme.primary || '#28a745'};
      border-color: ${({ theme }) => theme.primary || '#28a745'};
      color: #fff;
      font-weight: bold;
      box-shadow: 0 0 10px rgba(40, 167, 69, 0.3);
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
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateX(5px);
    background-color: ${({ theme }) => theme.border || '#252525'};
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }

  .order-info {
    display: flex;
    flex-direction: column;
    gap: 8px;

    h3 {
      font-size: 1.2rem;
      margin: 0;
      color: ${({ theme }) => theme.text};
    }

    .meta-info {
      display: flex;
      align-items: center;
      gap: 15px;
      
      span {
        font-size: 0.85rem;
        color: #888;
        display: flex;
        align-items: center;
        gap: 6px;
      }
    }
  }

  .order-detail {
    text-align: right;
    margin-right: 20px; 
    flex: 1; 

    strong {
      display: block;
      font-size: 1.1rem;
      color: ${({ typeColor }) => typeColor || '#fff'};
      margin-bottom: 4px;
      text-transform: capitalize;
    }

    span {
      font-size: 0.95rem;
      color: #ccc;
      display: block;
      
      max-width: 300px; 
      margin-left: auto; 
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .status-icon {
    flex-shrink: 0;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    padding: 15px;

    .order-detail {
      text-align: left;
      margin-right: 0;
      margin-left: 0;
      
      span {
        margin-left: 0;
        white-space: normal; 
      }
    }

    .status-icon {
        position: absolute;
        top: 15px;
        right: 15px;
        opacity: 0.2;
    }
  }
`;