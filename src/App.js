import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import CadastrarProduto from './components/CadastrarProduto';
import ListarProdutos from './components/ListarProdutos';
import CadastrarFornecedor from './components/CadastrarFornecedor';
import ListarFornecedores from './components/ListarFornecedores';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/global.css';
import './styles/layout.css';
import './styles/components/form.css';
import './styles/components/button.css';
import './styles/components/logo.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="App">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/cadastrar-produto">Cadastrar Produto</Link></li>
          <li><Link to="/listar-produtos">Listar Produtos</Link></li>
          <li><Link to="/cadastrar-fornecedor">Cadastrar Fornecedor</Link></li>
          <li><Link to="/listar-fornecedores">Listar Fornecedores</Link></li>
          <li>
            {isAuthenticated ? (
              <button onClick={() => {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
                navigate('/login');
              }}>Logout</button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/cadastrar-produto" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CadastrarProduto />
            </ProtectedRoute>
          } />
          <Route path="/listar-produtos" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ListarProdutos />
            </ProtectedRoute>
          } />
          <Route path="/cadastrar-fornecedor" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CadastrarFornecedor />
            </ProtectedRoute>
          } />
          <Route path="/listar-fornecedores" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ListarFornecedores />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
