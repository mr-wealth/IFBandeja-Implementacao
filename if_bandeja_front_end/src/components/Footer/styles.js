import styled from "styled-components";

export const Container = styled.header`
  background-color: #8B0000;
  padding: 16px;
  text-align: center;
  color: ${({ theme }) => theme.text};;
  font-size: 14px;
`;