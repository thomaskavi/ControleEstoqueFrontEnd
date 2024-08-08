import React, { useState, useEffect } from 'react';
import api from '../api'; // Certifique-se de que o caminho está correto

const CadastrarProduto = () => {
  const [produto, setProduto] = useState({
    referencia: '',
    descricao: '',
    tamanho: '',
    cor: '',
    unidades: '',
    precoAVista: '',
    precoParcelado: '',
    fornecedor: { id: '' }
  });
  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await api.get('/fornecedores');
        setFornecedores(response.data);
      } catch (error) {
        console.error('Erro ao buscar fornecedores:', error);
      }
    };
    fetchFornecedores();
  }, []);

  const handleChange = (e) => {
    setProduto({ ...produto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/produtos', produto);
      alert('Produto cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      alert('Erro ao cadastrar produto.');
    }
  };

  return (
    <div>
      <h2>Cadastrar Produto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="referencia"
          value={produto.referencia}
          onChange={handleChange}
          placeholder="Referência"
          required
        />
        <input
          type="text"
          name="descricao"
          value={produto.descricao}
          onChange={handleChange}
          placeholder="Descrição"
          required
        />
        <input
          type="text"
          name="tamanho"
          value={produto.tamanho}
          onChange={handleChange}
          placeholder="Tamanho"
          required
        />
        <input
          type="text"
          name="cor"
          value={produto.cor}
          onChange={handleChange}
          placeholder="Cor"
          required
        />
        <input
          type="number"
          name="unidades"
          value={produto.unidades}
          onChange={handleChange}
          placeholder="Unidades"
          required
        />
        <input
          type="number"
          name="precoAVista"
          value={produto.precoAVista}
          onChange={handleChange}
          placeholder="Preço à Vista"
          required
        />
        <input
          type="number"
          name="precoParcelado"
          value={produto.precoParcelado}
          onChange={handleChange}
          placeholder="Preço Parcelado"
          required
        />
        <select
          name="fornecedor"
          value={produto.fornecedor.id}
          onChange={(e) => setProduto({ ...produto, fornecedor: { id: e.target.value } })}
          required
        >
          <option value="">Selecione um fornecedor</option>
          {fornecedores.map((fornecedor) => (
            <option key={fornecedor.id} value={fornecedor.id}>
              {fornecedor.nome}
            </option>
          ))}
        </select>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastrarProduto;
