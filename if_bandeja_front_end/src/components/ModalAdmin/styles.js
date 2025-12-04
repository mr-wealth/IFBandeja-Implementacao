import styled, { css } from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(2px);   
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalBody = styled.div`
  background-color: #1a1a1a;
  width: 90%;
  max-width: 400px;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #333;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  color: #fff;
  animation: fadeIn 0.2s ease-in-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
`;

export const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.5rem;
  text-align: center;
  color: #eee;

  span {
    color: #2e7d32;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #ccc;
  font-size: 0.9rem;
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const RadioOption = styled.label`
  flex: 1;
  padding: 12px;
  background-color: ${props => props.checked ? '#2e7d32' : '#333'};
  border: 1px solid ${props => props.checked ? '#4caf50' : '#444'};
  color: ${props => props.checked ? '#fff' : '#bbb'};
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover {
    background-color: ${props => props.checked ? '#2e7d32' : '#444'};
  }

  input {
    display: none;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  background-color: #333;
  color: #fff;
  border: 1px solid #444;
  font-size: 1rem;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: #2e7d32;
  }
`;

export const PriceBox = styled.div`
  background-color: #222;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  border: 1px solid #444;

  strong {
    font-size: 1.4rem;
    color: #4caf50;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 12px;
  border-radius: 8px;
  background-color: #333;
  color: #fff;
  border: 1px solid #444;
  font-size: 1rem;
  outline: none;
  resize: vertical;
  font-family: inherit;

  &:focus {
    border-color: #28a745;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
`;

export const TabButton = styled.button`
  padding: 10px 15px;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  color: #888;
  border-bottom: 3px solid transparent;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;

  ${props => props.$isActive && css`
    color: #2e7d32;
    border-bottom-color: #2e7d32;
    font-weight: bold;
  `}

  &:hover {
    color: #2e7d32;
  }
`;

export const TinyText = styled.p`
  color: #aaa; 
  fontSize: 0.9rem; 
  marginBottom: 10px; 
`;