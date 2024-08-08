import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListarFornecedores = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [editandoFornecedorId, setEditandoFornecedorId] = useState(null);
  const [fornecedorEditado, setFornecedorEditado] = useState({});

  useEffect(() => {
    const fetchFornecedores = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/fornecedores'); // URL completa
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
      await axios.put(`http://localhost:8080/api/fornecedores/${fornecedorEditado.id}`, fornecedorEditado);
      setFornecedores(fornecedores.map(f => (f.id === fornecedorEditado.id ? fornecedorEditado : f)));
      cancelarEdicao();
    } catch (error) {
      alert('Erro ao salvar fornecedor. Verifique os campos em branco.', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFornecedorEditado({ ...fornecedorEditado, [name]: value });
  };

  const excluirFornecedor = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/fornecedores/${id}`);
      setFornecedores(fornecedores.filter(f => f.id !== id));
    } catch (error) {
      console.error('Erro ao excluir fornecedor. Verifique os campos em branco.', error);
    }
  };

  return (
    <div>
      <h1>Listar Fornecedores</h1>
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
          {fornecedores.map(fornecedor => (
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
