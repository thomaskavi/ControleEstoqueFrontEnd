import React, { useState, useEffect } from 'react';
import api from '../api/api';

function AtualizarProduto({ id }) {
  const [referencia, setReferencia] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [cor, setCor] = useState('');
  const [unidades, setUnidades] = useState(0);
  const [precoAVista, setPrecoAVista] = useState(0.0);
  const [precoParcelado, setPrecoParcelado] = useState(0.0);
  const [fornecedores, setFornecedores] = useState([]);
  const [fornecedorId, setFornecedorId] = useState('');

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

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await api.get(`/produtos/${id}`);
        const produto = response.data;
        setReferencia(produto.referencia);
        setDescricao(produto.descricao);
        setTamanho(produto.tamanho);
        setCor(produto.cor);
        setUnidades(produto.unidades);
        setPrecoAVista(produto.precoAVista);
        setPrecoParcelado(produto.precoParcelado);
        setFornecedorId(produto.fornecedor ? produto.fornecedor.id : '');
      } catch (error) {
        console.error('Erro ao buscar o produto:', error);
      }
    };

    if (id) {
      fetchProduto();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/produtos/${id}`, {
        referencia,
        descricao,
        tamanho,
        cor,
        unidades,
        precoAVista,
        precoParcelado,
        fornecedor: { id: fornecedorId }
      });
      alert('Produto atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar o produto:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={referencia}
        onChange={(e) => setReferencia(e.target.value)}
        placeholder="Referência"
        required
      />
      <input
        type="text"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        placeholder="Descrição"
        required
      />
      <input
        type="text"
        value={tamanho}
        onChange={(e) => setTamanho(e.target.value)}
        placeholder="Tamanho"
        required
      />
      <input
        type="text"
        value={cor}
        onChange={(e) => setCor(e.target.value)}
        placeholder="Cor"
        required
      />
      <input
        type="number"
        value={unidades}
        onChange={(e) => setUnidades(e.target.value)}
        placeholder="Unidades"
        required
      />
      <input
        type="number"
        step="0.01"
        value={precoAVista}
        onChange={(e) => setPrecoAVista(e.target.value)}
        placeholder="Preço à Vista"
        required
      />
      <input
        type="number"
        step="0.01"
        value={precoParcelado}
        onChange={(e) => setPrecoParcelado(e.target.value)}
        placeholder="Preço Parcelado"
        required
      />
      <select
        value={fornecedorId}
        onChange={(e) => setFornecedorId(e.target.value)}
        required
      >
        <option value="">Selecione o Fornecedor</option>
        {fornecedores.map(fornecedor => (
          <option key={fornecedor.id} value={fornecedor.id}>
            {fornecedor.nome}
          </option>
        ))}
      </select>
      <button type="submit">Atualizar Produto</button>
    </form>
  );
}

export default AtualizarProduto;
