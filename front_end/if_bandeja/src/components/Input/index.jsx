import React from 'react'

import { Container, StyledInput } from './styles'

const Input = ({ label, name, icon: Icon,  ...rest }) => {
  return (
    <Container>
      <label htmlFor={name}>{label}</label>
      <StyledInput id={name} name={name} {...rest} />
      {Icon && <Icon size={20} />}
    </Container>
  )
}

export {Input}
