// ListarFornecedores.js
import React, { useState, useEffect } from 'react';
import api from '../api'; // Importa a instância do axios configurada

const ListarFornecedores = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [editandoFornecedorId, setEditandoFornecedorId] = useState(null);
  const [fornecedorEditado, setFornecedorEditado] = useState({});
  const [busca, setBusca] = useState('');

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await api.get('/api/fornecedores'); // Use a instância configurada do axios
        setFornecedores(response.data);
      } catch (error) {
        console.error('Erro ao buscar fornecedores:', error);
      }
    };
    fetchFornecedores();
  }, []);

  const iniciarEdicao = (fornecedor) => {
    setEditandoFornecedorId(fornecedor.id);
    setFornecedorEditado({ ...fornecedor });
  };

  const cancelarEdicao = () => {
    setEditandoFornecedorId(null);
    setFornecedorEditado({});
  };

  const salvarEdicao = async () => {
    try {
      await api.put(`/api/fornecedores/${fornecedorEditado.id}`, fornecedorEditado); // Use a instância configurada do axios
      setFornecedores(fornecedores.map(f => (f.id === fornecedorEditado.id ? fornecedorEditado : f)));
      cancelarEdicao();
    } catch (error) {
      alert('Erro ao salvar fornecedor. Verifique os campos em branco.');
      console.error('Erro ao salvar fornecedor:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFornecedorEditado({ ...fornecedorEditado, [name]: value });
  };

  const excluirFornecedor = async (id) => {
    if (window.confirm('Você tem certeza que deseja excluir este fornecedor?')) {
      try {
        await api.delete(`/api/fornecedores/${id}`); // Use a instância configurada do axios
        setFornecedores(fornecedores.filter(f => f.id !== id));
      } catch (error) {
        console.error('Erro ao excluir fornecedor:', error);
      }
    }
  };

  const handleBuscaChange = (e) => {
    setBusca(e.target.value);
  };

  const fornecedoresFiltrados = fornecedores.filter((fornecedor) => {
    const buscaLower = busca.toLowerCase();
    return (
      fornecedor.nome.toLowerCase().includes(buscaLower) ||
      fornecedor.contato.toLowerCase().includes(buscaLower) ||
      fornecedor.email.toLowerCase().includes(buscaLower) ||
      fornecedor.telefone.toLowerCase().includes(buscaLower) ||
      fornecedor.localizacao.toLowerCase().includes(buscaLower)
    );
  });

  return (
    <div className='main-container'>
      <div className='head-container'>
        <h1>Listar fornecedores: </h1>
        <div className='search-container'>
          <input
            type='text'
            value={busca}
            onChange={handleBuscaChange}
            placeholder='Digite para buscar...'
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Contato</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Localização</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {fornecedoresFiltrados.map(fornecedor => (
            <tr key={fornecedor.id}>
              <td>
                {editandoFornecedorId === fornecedor.id ? (
                  <input
                    type="text"
                    name="nome"
                    value={fornecedorEditado.nome}
                    onChange={handleChange}
                  />
                ) : (
                  fornecedor.nome
                )}
              </td>
              <td>
                {editandoFornecedorId === fornecedor.id ? (
                  <input
                    type="text"
                    name="contato"
                    value={fornecedorEditado.contato}
                    onChange={handleChange}
                  />
                ) : (
                  fornecedor.contato
                )}
              </td>
              <td>
                {editandoFornecedorId === fornecedor.id ? (
                  <input
                    type="email"
                    name="email"
                    value={fornecedorEditado.email}
                    onChange={handleChange}
                  />
                ) : (
                  fornecedor.email
                )}
              </td>
              <td>
                {editandoFornecedorId === fornecedor.id ? (
                  <input
                    type="text"
                    name="telefone"
                    value={fornecedorEditado.telefone}
                    onChange={handleChange}
                  />
                ) : (
                  fornecedor.telefone
                )}
              </td>
              <td>
                {editandoFornecedorId === fornecedor.id ? (
                  <input
                    type="text"
                    name="localizacao"
                    value={fornecedorEditado.localizacao}
                    onChange={handleChange}
                  />
                ) : (
                  fornecedor.localizacao
                )}
              </td>
              <td>
                {editandoFornecedorId === fornecedor.id ? (
                  <>
                    <button onClick={salvarEdicao}>Salvar</button>
                    <button onClick={cancelarEdicao}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => iniciarEdicao(fornecedor)}>Editar</button>
                    <button onClick={() => excluirFornecedor(fornecedor.id)}>Excluir</button>
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

export default ListarFornecedores;
