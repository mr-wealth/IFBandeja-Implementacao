import React, { useState } from 'react';

import { 
  Overlay, ModalBody, Title, FormGroup, Label, 
  RadioGroup, RadioOption, Select, PriceBox, Footer,
} from './styles';

import { Button } from '../Button';

const ModalFormulario = ({ dia, onClose, onConfirm }) => {
  const [opcao, setOpcao] = useState('Principal');
  const [turno, setTurno] = useState('Almoco');

  const preco = turno === 'Ambos' ? 6.00 : 3.00;

  const handleConfirmar = () => {
    onConfirm({
      data: dia.day,
      opcao,
      turno,
      valorTotal: preco
    });
  };

  if (!dia) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalBody onClick={(e) => e.stopPropagation()}>
        
        <Title>Reserva: <span>{dia.day}/11</span></Title>

        <FormGroup>
          <Label>Opção do Cardápio</Label>
          <RadioGroup>
            <RadioOption checked={opcao === 'Principal'}>
              <input 
                type="radio" 
                value="Principal"
                checked={opcao === 'Principal'}
                onChange={(e) => setOpcao(e.target.value)}
              />
              🍖 Principal
            </RadioOption>

            <RadioOption checked={opcao === 'Vegetariano'}>
              <input 
                type="radio" 
                value="Vegetariano"
                checked={opcao === 'Vegetariano'}
                onChange={(e) => setOpcao(e.target.value)}
              />
              🥗 Vegetariano
            </RadioOption>
          </RadioGroup>
        </FormGroup>

        <FormGroup>
          <Label>Turno da Refeição</Label>
          <Select value={turno} onChange={(e) => setTurno(e.target.value)}>
            <option value="Almoco">☀️ Almoço</option>
            <option value="Janta">🌙 Janta</option>
            <option value="Ambos">🍱 Almoço e Janta</option>
          </Select>
        </FormGroup>

        <PriceBox>
          <span>Valor Total:</span>
          <strong>R$ {preco.toFixed(2).replace('.', ',')}</strong>
        </PriceBox>

        <Footer>
          <Button onClick={handleConfirmar}>Confirmar</Button>
          <Button variant="negative" onClick={onClose}>Cancelar</Button>
        </Footer>

      </ModalBody>
    </Overlay>
  );
};

export default ModalFormulario;