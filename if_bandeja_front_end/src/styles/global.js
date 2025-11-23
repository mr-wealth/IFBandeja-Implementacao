import { createGlobalStyle, styled } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }

  body {
    background: ${({ theme }) => theme.background}; 
    color: ${({ theme }) => theme.text};        
    
    font-family: 'Arial', 'Helvetica', sans-serif; 
  }

  body, input, button, textarea {
    font-family: 'Arial', 'Helvetica', sans-serif;
    font-size: 15px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 700; 
  }
`;

export const HeaderActionButton = styled.button`
  position: fixed;
  top: 20px;      
  right: 144px;   
  width: 40px;
  height: 40px;
  z-index: 999;

  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.2); 
  color: ${({ theme }) => theme.text};
  
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;

  svg {
    font-size: 22px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

