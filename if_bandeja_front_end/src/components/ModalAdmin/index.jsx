import React, { useState, useEffect } from 'react';
import { FaMoneyBill, FaDrumstickBite, FaLeaf } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { Input } from '../../components/Input'; 
import { Overlay, ModalBody, Title, FormGroup, Footer, TextArea, TabContainer, TabButton, TinyText } from './styles';
import { Button } from '../Button';

const ModalAdmin = ({ dia, onClose, onConfirm, onDelete }) => {
  const [activeTab, setActiveTab] = useState('principal');

  const [principalText, setPrincipalText] = useState('');
  const [vegText, setVegText] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (dia) {
      const pratoP = dia.principal ? dia.principal.join(', ') : '';
      const pratoV = dia.veg ? dia.veg.join(', ') : '';
      const precoAtual = dia.price || '';

      setPrincipalText(pratoP);
      setVegText(pratoV);
      setPrice(precoAtual);
    }
  }, [dia]);

  const handleSalvar = () => {
    const arrayPrincipal = principalText.split(',').map(item => item.trim()).filter(i => i);
    const arrayVeg = vegText.split(',').map(item => item.trim()).filter(i => i);

    onConfirm({
      ...dia,
      principal: arrayPrincipal.length > 0 ? arrayPrincipal : null,
      veg: arrayVeg.length > 0 ? arrayVeg : null,
      price: price
    });
  };

  const handleDelete = () => {
    if (!dia || !dia.id) {
        toast.error("Erro: ID do cardápio não encontrado.");
        return;
    }

    const confirmacao = window.confirm(`Tem certeza que deseja excluir permanentemente o cardápio de ${dia.day}/${dia.month}?`);

    if (confirmacao) {
        if (onDelete) {
            onDelete(dia.id);
        } else {
            toast.error("Erro interno: Função de deletar não foi encontrada.");
        }
    }
  };

  if (!dia) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalBody onClick={(e) => e.stopPropagation()}>
        
        <Title>Editar Cardápio: <span>{dia.day ? dia.day : ''}/{dia.month ? dia.month : ''}</span></Title>
        
        <FormGroup>
          <Input 
            label="Preço do dia (R$)"
            name="price"
            icon={FaMoneyBill}
            type="number"
            step="0.01"
            placeholder="0,00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormGroup>

        <TabContainer>
          <TabButton 
            $isActive={activeTab === 'principal'} 
            onClick={() => setActiveTab('principal')}
          >
            <FaDrumstickBite /> Principal
          </TabButton>
          
          <TabButton 
            $isActive={activeTab === 'veg'} 
            onClick={() => setActiveTab('veg')}
          >
            <FaLeaf /> Vegetariano
          </TabButton>
        </TabContainer>
        
        {activeTab === 'principal' && (
          <div className="tab-content">
            <TinyText>Liste o prato principal (Separe os alimentos por virgula!):</TinyText>
            <FormGroup>
              <TextArea 
                value={principalText}
                onChange={(e) => setPrincipalText(e.target.value)}
                placeholder="Ex: Arroz, Feijão, Frango Grelhado, Farofa..."
                style={{ height: '150px' }} 
              />
            </FormGroup>
          </div>
        )}

        {activeTab === 'veg' && (
          <div className="tab-content">
            <TinyText>Liste o prato vegetariano (Separe os alimentos por virgula!):</TinyText>
            <FormGroup>
              <TextArea 
                value={vegText}
                onChange={(e) => setVegText(e.target.value)}
                placeholder="Ex: Arroz, Feijão, Omelete de Espinafre..."
                style={{ height: '150px' }}
              />
            </FormGroup>
          </div>
        )}

        <Footer>
          <Button onClick={handleSalvar}>Salvar</Button>
          <Button variant="deletar" onClick={handleDelete}>Deletar</Button>
          <Button variant="cancelar" onClick={onClose}>Cancelar</Button>
        </Footer>

      </ModalBody>
    </Overlay>
  );
};

export default ModalAdmin;