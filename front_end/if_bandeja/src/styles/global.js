import { createGlobalStyle } from 'styled-components';

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