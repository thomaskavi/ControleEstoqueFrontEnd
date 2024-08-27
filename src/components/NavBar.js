// NavBar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cadastrar-produto">Cadastrar Produto</Link></li>
        <li><Link to="/listar-produtos">Listar Produtos</Link></li>
        <li><Link to="/cadastrar-fornecedor">Cadastrar Fornecedor</Link></li>
        <li><Link to="/listar-fornecedores">Listar Fornecedores</Link></li>
        {token ? (
          <li><button onClick={handleLogout}>Logout</button></li>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
