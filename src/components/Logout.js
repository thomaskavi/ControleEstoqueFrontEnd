// Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
