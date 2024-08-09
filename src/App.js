import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import CadastrarProduto from './components/CadastrarProduto';
import ListarProdutos from './components/ListarProdutos';
import CadastrarFornecedor from './components/CadastrarFornecedor';
import ListarFornecedores from './components/ListarFornecedores';
import './styles/global.css'; // Importa estilos globais
import './styles/layout.css'; // Importa estilos de layout
import './styles/components/form.css'; // Importa estilos para formulários
import './styles/components/button.css'; // Importa estilos para botões
import './styles/components/logo.css'; // Importa estilos para logos

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/cadastrar-produto">Cadastrar Produto</Link></li>
            <li><Link to="/listar-produtos">Listar Produtos</Link></li>
            <li><Link to="/cadastrar-fornecedor">Cadastrar Fornecedor</Link></li>
            <li><Link to="/listar-fornecedores">Listar Fornecedores</Link></li>
          </ul>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastrar-produto" element={<CadastrarProduto />} />
            <Route path="/listar-produtos" element={<ListarProdutos />} />
            <Route path="/cadastrar-fornecedor" element={<CadastrarFornecedor />} />
            <Route path="/listar-fornecedores" element={<ListarFornecedores />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
