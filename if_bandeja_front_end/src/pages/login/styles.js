import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

export const Logo = styled.img`
  width: 180px;
  height: auto;
  margin-bottom: 48px;

  filter: ${({ theme }) => theme.logoFilter}
`;

export const Form = styled.form`
  width: 100%;
  max-width: 400px;
  
  display: flex;
  flex-direction: column;

  button {
    margin-top: 32px;
  }
`;