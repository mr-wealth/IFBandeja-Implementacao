import styled from 'styled-components';

const colors = {
  primary: '#28a745', 
  primaryHover: '#218838',

  cancelar: '#6c757d',
  cancelarHover: '#5a6268',

  deletar: '#ef4444',
  deletarHover: '#dc2626',

  disabled: '#CCCCCC',
  text: '#FFFFFF',
};

export const Container = styled.button`
  padding: 10px 22px;
  font-size: 15px;
  font-weight: bold;
  color: ${colors.text};

  border: none;
  border-radius: 6px;
  cursor: pointer;

  transition: background-color 0.2s ease-in-out, transform 0.1s;

  background-color: ${(props) => {
    switch (props.variant) {
        case 'cancelar':
            return colors.cancelar;
        case 'deletar':
            return colors.deletar;
        default:
            return colors.primary;
    }
  }};

  &:hover:not(:disabled) {
    background-color: ${(props) => {
      switch (props.variant) {
          case 'cancelar':
              return colors.cancelarHover;
          case 'deletar':
              return colors.deletarHover;
          default:
              return colors.primaryHover;
      }
    }};

  &:active:not(:disabled) {
    transform: scale(0.98); /* Efeito de clique */
  }

  &:disabled {
    background-color: ${colors.disabled};
    color: #888;
    cursor: not-allowed;
  }
`;