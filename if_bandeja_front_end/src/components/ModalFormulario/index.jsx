import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../api';

import { 
  Overlay, ModalBody, Title, FormGroup, Label, 
  RadioGroup, RadioOption, Select, PriceBox, Footer,
} from './styles';
import { Button } from '../Button';

// Adicionei usuarioId nas props recebidas
const ModalFormulario = ({ dia, usuarioId, onClose, onSuccess }) => {

  const { id: cardapioId, meuPedido, podeAlterar, day, monthName } = dia;

  const modoEdicao = !!meuPedido; 
  const modoLeitura = modoEdicao && !podeAlterar;

  // MUDANÇA: Estado agora é numérico (1 = Principal, 2 = Vegetariano)
  const [tipo, setTipo] = useState(1); 
  const [turno, setTurno] = useState('Almoco');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (meuPedido) {
      // Verifica se o backend já retorna 'tipo', senão usa 1 como padrão
      setTipo(meuPedido.tipo || 1); 
      setTurno(meuPedido.turno || 'Almoco');
    }
  }, [meuPedido]);

  const preco = turno === 'Ambos' ? 6.00 : 3.00;

  const handleSalvar = async () => {
    try {
      setLoading(true);

      const payload = {
        usuario: usuarioId, // Usa a prop passada pelo Home
        cardapio: cardapioId, 
        tipo: tipo, // Envia 1 ou 2
        turno: turno,
        status: "Solicitado",
        retirado: false
      };

      await api.post('/pedido/', payload);
      
      toast.success('Pedido realizado com sucesso!');
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao realizar pedido.');
    } finally {
      setLoading(false);
    }
  };

  const handleAtualizar = async () => {
    if (!meuPedido?.id) return;

    try {
      setLoading(true);

      const payload = {
        usuario: usuarioId,
        cardapio: cardapioId,
        tipo: tipo, // Envia 1 ou 2
        turno: turno,
        status: "Solicitado",
        retirado: false
      };

      await api.put(`/pedido/${meuPedido.id}/`, payload);
      
      toast.success('Pedido atualizado com sucesso!');
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao atualizar pedido.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelarPedido = async () => {
    if (!meuPedido?.id) return;

    const confirmou = window.confirm("Tem certeza que deseja cancelar (excluir) este pedido?");
    if (!confirmou) return;

    try {
      setLoading(true);
      await api.delete(`/pedido/${meuPedido.id}/`);
      
      toast.info('Pedido cancelado e removido.');
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao cancelar pedido.');
    } finally {
      setLoading(false);
    }
  };

  if (!dia) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalBody onClick={(e) => e.stopPropagation()}>
        
        <Title>
            {modoLeitura ? 'Visualizar Pedido' : (modoEdicao ? 'Editar Pedido' : 'Novo Pedido')} 
            <span> ({day}/{monthName})</span>
        </Title>

        {modoLeitura && (
            <div style={{
                background: '#fff3cd', color: '#856404', padding: '10px', 
                borderRadius: '5px', marginBottom: '15px', fontSize: '0.9rem', border: '1px solid #ffeeba'
            }}>
                ⚠️ <strong>Prazo encerrado.</strong> Não é possível alterar ou cancelar.
            </div>
        )}

        <FormGroup>
          <Label>Opção do Prato</Label>
          <RadioGroup>
            {/* MUDANÇA: value agora é numérico e verificamos com integers */}
            <RadioOption checked={tipo === 1} disabled={modoLeitura}>
              <input 
                type="radio" 
                value={1} 
                checked={tipo === 1} 
                onChange={(e) => setTipo(Number(e.target.value))} 
                disabled={modoLeitura} 
              />
              🍖 Principal
            </RadioOption>
            
            <RadioOption checked={tipo === 2} disabled={modoLeitura}>
              <input 
                type="radio" 
                value={2} 
                checked={tipo === 2} 
                onChange={(e) => setTipo(Number(e.target.value))} 
                disabled={modoLeitura} 
              />
              🥗 Vegetariano
            </RadioOption>
          </RadioGroup>
        </FormGroup>

        <FormGroup>
          <Label>Turno</Label>
          <Select value={turno} onChange={(e) => setTurno(e.target.value)} disabled={modoLeitura}>
            <option value="Almoco">☀️ Almoço</option>
            <option value="Janta">🌙 Janta</option>
            <option value="Ambos">🍱 Almoço e Janta</option>
          </Select>
        </FormGroup>

        <PriceBox>
          <span>Total:</span>
          <strong>R$ {preco.toFixed(2).replace('.', ',')}</strong>
        </PriceBox>

        <Footer>
          {loading ? (
             <Button disabled>Processando...</Button>
          ) : (
             <>
                {modoLeitura && (
                    <Button variant="cancelar" onClick={onClose} style={{width: '100%'}}>
                        Fechar
                    </Button>
                )}

                {!modoEdicao && !modoLeitura && (
                    <>
                        <Button onClick={handleSalvar}>Confirmar Pedido</Button>
                        <Button variant="cancelar" onClick={onClose}>Voltar</Button>
                    </>
                )}

                {modoEdicao && !modoLeitura && (
                    <div style={{ display: 'flex', width: '100%', gap: '10px' }}>
                        <Button onClick={handleAtualizar} style={{ flex: 1 }}>
                            Salvar Alterações
                        </Button>
                        
                        <Button 
                            style={{ backgroundColor: '#dc3545', color: '#fff', flex: 1 }} 
                            onClick={handleCancelarPedido}
                        >
                            Excluir Pedido
                        </Button>
                    </div>
                )}
             </>
          )}
        </Footer>

      </ModalBody>
    </Overlay>
  );
};

export default ModalFormulario;