import React, { useState } from 'react';
import api from '../api'; // Certifique-se de que o caminho está correto

const CadastrarFornecedor = () => {
  const [fornecedor, setFornecedor] = useState({
    nome: '',
    contato: '',
    email: '',
    telefone: '',
    localizacao: ''
  });

  const handleChange = (e) => {
    setFornecedor({ ...fornecedor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/fornecedores', fornecedor);
      alert('Fornecedor cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar fornecedor:', error);
      alert('Erro ao cadastrar fornecedor.');
    }
  };

  return (
    <div>
      <h2>Cadastrar Fornecedor</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          value={fornecedor.nome}
          onChange={handleChange}
          placeholder="Nome"
          required
        />
        <input
          type="text"
          name="contato"
          value={fornecedor.contato}
          onChange={handleChange}
          placeholder="Contato"
        />
        <input
          type="email"
          name="email"
          value={fornecedor.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="telefone"
          value={fornecedor.telefone}
          onChange={handleChange}
          placeholder="Telefone"
          required
        />
        <input
          type="text"
          name="localizacao"
          value={fornecedor.localizacao}
          onChange={handleChange}
          placeholder="Localização"
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastrarFornecedor;