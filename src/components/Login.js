import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Certifique-se de que o caminho está correto
import { login } from '../auth';

const Login = ({ setIsAuthenticated }) => {
  const [loginData, setLoginData] = useState({ login: '', senha: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await login(loginData);
      localStorage.setItem('token', token);
      setIsAuthenticated(true); // Atualiza o estado de autenticação
      navigate('/'); // Redireciona para a página inicial após login
    } catch (err) {
      setError(err.message); // Exibe a mensagem de erro retornada
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="text"
          name="login"
          value={loginData.login}
          onChange={handleChange}
          placeholder="Login"
          required
        />
        <input
          type="password"
          name="senha"
          value={loginData.senha}
          onChange={handleChange}
          placeholder="Senha"
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
