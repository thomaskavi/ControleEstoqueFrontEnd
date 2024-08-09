import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

const EditarFornecedor = () => {
  const { id } = useParams();
  const [fornecedor, setFornecedor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFornecedor = async () => {
      try {
        const response = await api.get(`/fornecedores/${id}`);
        setFornecedor(response.data);
      } catch (error) {
        console.error('Erro ao buscar fornecedor:', error);
      }
    };

    fetchFornecedor();
  }, [id]);

  const handleChange = (event) => {
    setFornecedor({ ...fornecedor, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.put(`/fornecedores/${id}`, fornecedor);
      navigate('/listar-fornecedores'); // Navega de volta para a lista após a atualização
    } catch (error) {
      console.error('Erro ao atualizar fornecedor:', error);
      alert('Erro ao atualizar fornecedor.');
    }
  };

  if (!fornecedor) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Editar Fornecedor</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" name="nome" value={fornecedor.nome} onChange={handleChange} />
        </label>
        <label>
          Contato:
          <input type="text" name="contato" value={fornecedor.contato} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={fornecedor.email} onChange={handleChange} />
        </label>
        <label>
          Telefone:
          <input type="text" name="telefone" value={fornecedor.telefone} onChange={handleChange} />
        </label>
        <label>
          Localização:
          <input type="text" name="localizacao" value={fornecedor.localizacao} onChange={handleChange} />
        </label>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default EditarFornecedor;
