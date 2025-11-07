import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  position: relative;
  
  & + & {
    margin-top: 24px; 
  }

  label {
    font-size: 14px;
    font-weight: bold;
    color: ${({ theme }) => theme.text};
    display: block;
    margin-bottom: 8px;
  }

  svg {
    position: absolute;
    left: 10px;
    bottom: 10px; 
    
    color: ${({ theme }) => theme.text};
    transition: color 0.2s;
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 40px; 
  background: transparent;
  border: none;
  border-radius: 0;

  border-bottom: 2px solid ${({ theme }) => theme.inputBorder};
  
  padding: 8px 8px 8px 40px; 

  font-size: 16px;
  color: ${({ theme }) => theme.text};
  transition: border-color 0.2s;

  &::placeholder {
    color: ${({ theme }) => theme.text};
  }

  &:focus {
    border-bottom-color: ${({ theme }) => theme.green}; 
  }

  &:focus + svg {
    color: ${({ theme }) => theme.green};
  }
`;