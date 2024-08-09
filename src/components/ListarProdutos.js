import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListarProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [editandoProdutoId, setEditandoProdutoId] = useState(null);
  const [produtoEditado, setProdutoEditado] = useState({});
  const [busca, setBusca] = useState('');

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/produtos');
        setProdutos(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };
    fetchProdutos();
  }, []);

  const iniciarEdicao = (produto) => {
    setEditandoProdutoId(produto.id);
    setProdutoEditado({ ...produto });
  };

  const cancelarEdicao = () => {
    setEditandoProdutoId(null);
    setProdutoEditado({});
  };

  const salvarEdicao = async () => {
    try {
      await axios.put(`http://localhost:8080/api/produtos/${produtoEditado.id}`, produtoEditado);
      setProdutos(produtos.map(p => (p.id === produtoEditado.id ? produtoEditado : p)));
      cancelarEdicao();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProdutoEditado({ ...produtoEditado, [name]: value });
  };

  const excluirProduto = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/produtos/${id}`);
      setProdutos(produtos.filter(p => p.id !== id));
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  const handleBuscaChange = (e) => {
    setBusca(e.target.value);
  };

  const produtosFiltrados = produtos.filter((produto) => {
    const buscaLower = busca.toLowerCase();
    const fornecedorNome = produto.fornecedor ? produto.fornecedor.nome.toLowerCase() : '';

    return (
      produto.referencia.toLowerCase().includes(buscaLower) ||
      produto.descricao.toLowerCase().includes(buscaLower) ||
      produto.tamanho.toLowerCase().includes(buscaLower) ||
      produto.cor.toLowerCase().includes(buscaLower) ||
      produto.precoAVista.toString().includes(buscaLower) ||
      produto.precoParcelado.toString().includes(buscaLower) ||
      fornecedorNome.includes(buscaLower)
    );
  });


  return (
    <div className='main-container'>
      <div className='head-container'>
        <h1>Listar produtos:</h1>
        <div className='search-container'>
          <input
            type='text'
            name='Buscar'
            value={busca}
            onChange={handleBuscaChange}
            placeholder='Digite para buscar...'
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Referência</th>
            <th>Descrição</th>
            <th>Tamanho</th>
            <th>Cor</th>
            <th>Unidades</th>
            <th>Preço à Vista</th>
            <th>Preço Parcelado</th>
            <th>Fornecedor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtosFiltrados.map(produto => (
            <tr key={produto.id}>
              <td>
                {editandoProdutoId === produto.id ? (
                  <input
                    type="text"
                    name="referencia"
                    value={produtoEditado.referencia}
                    onChange={handleChange}
                  />
                ) : (
                  produto.referencia
                )}
              </td>
              <td>
                {editandoProdutoId === produto.id ? (
                  <input
                    type="text"
                    name="descricao"
                    value={produtoEditado.descricao}
                    onChange={handleChange}
                  />
                ) : (
                  produto.descricao
                )}
              </td>
              <td>
                {editandoProdutoId === produto.id ? (
                  <input
                    type="text"
                    name="tamanho"
                    value={produtoEditado.tamanho}
                    onChange={handleChange}
                  />
                ) : (
                  produto.tamanho
                )}
              </td>
              <td>
                {editandoProdutoId === produto.id ? (
                  <input
                    type="text"
                    name="cor"
                    value={produtoEditado.cor}
                    onChange={handleChange}
                  />
                ) : (
                  produto.cor
                )}
              </td>
              <td>
                {editandoProdutoId === produto.id ? (
                  <input
                    type="number"
                    name="unidades"
                    value={produtoEditado.unidades}
                    onChange={handleChange}
                  />
                ) : (
                  produto.unidades
                )}
              </td>
              <td>
                {editandoProdutoId === produto.id ? (
                  <input
                    type="number"
                    name="precoAVista"
                    value={produtoEditado.precoAVista}
                    onChange={handleChange}
                  />
                ) : (
                  produto.precoAVista
                )}
              </td>
              <td>
                {editandoProdutoId === produto.id ? (
                  <input
                    type="number"
                    name="precoParcelado"
                    value={produtoEditado.precoParcelado}
                    onChange={handleChange}
                  />
                ) : (
                  produto.precoParcelado
                )}
              </td>
              <td>{produto.fornecedor ? produto.fornecedor.nome : 'N/A'}</td>
              <td>
                {editandoProdutoId === produto.id ? (
                  <>
                    <button onClick={salvarEdicao}>Salvar</button>
                    <button onClick={cancelarEdicao}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => iniciarEdicao(produto)}>Editar</button>
                    <button onClick={() => excluirProduto(produto.id)}>Excluir</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarProdutos;
