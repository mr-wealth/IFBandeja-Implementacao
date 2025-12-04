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
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
`;

export const TitleSection = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    color: ${({ theme }) => theme.text};
  }

  p {
    color: ${({ theme }) => theme.textSecondary || '#aaa'};
    font-size: 1rem;
  }

  .month-selector {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
    font-size: 1.5rem;
    font-weight: bold;

    button {
      background: none;
      border: none;
      
      color: ${({ theme }) => theme.text}; 
      
      cursor: pointer;
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      transition: transform 0.2s;

      &:hover {
        transform: scale(1.2);
        color: ${({ theme }) => theme.primary || '#28a745'}; 
      }
    }
    
    span {
      min-width: 150px;
      text-align: center;
      text-transform: capitalize;
      color: ${({ theme }) => theme.text};
    }
  }
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  /* Aumentei o gap vertical para as bolinhas não baterem no card de cima */
  gap: 30px 20px; 
  width: 100%;
  padding-top: 15px;
`;

export const AdminCard = styled.div`
  background-color: ${({ theme }) => theme.cardBackground || 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${({ theme }) => theme.border || '#333'};
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  
  overflow: visible; 
  margin-top: 10px; /* Garante espaço visual */

  &:hover {
    transform: translateY(-5px);
    border-color: ${({ theme }) => theme.primary || '#28a745'};
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }

  .date-badge {
    position: absolute;
    top: -20px; /* Subi um pouco mais a bolinha */
    left: 50%;
    transform: translateX(-50%);
    
    background-color: ${({ theme }) => theme.background};
    border: 2px solid ${({ theme }) => theme.border || '#555'};
    color: ${({ theme }) => theme.text};
    
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.1rem;
    z-index: 2;
  }

  .card-content {
    margin-top: 15px;
    text-align: left;
  }

  h4 {
    color: ${({ theme }) => theme.text};
    font-size: 0.9rem;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    gap: 8px;
    opacity: 0.9;

    svg {
        color: ${({ theme }) => theme.text}; 
        /* Ou use theme.primary se quiser colorido: */
        /* color: ${({ theme }) => theme.primary || '#28a745'}; */
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 15px 0;
    font-size: 0.85rem;
    color: ${({ theme }) => theme.textSecondary || theme.text};
    opacity: 0.8;
    min-height: 40px;
  }

  .empty-state {
    color: ${({ theme }) => theme.textSecondary || '#777'};
    opacity: 0.6;
    font-style: italic;
    font-size: 0.8rem;
    text-align: center;
    padding: 10px;
    border: 1px dashed ${({ theme }) => theme.border || '#444'};
    border-radius: 4px;
  }
`;