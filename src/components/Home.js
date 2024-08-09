import React from 'react';
import './Home.css'; // Certifique-se de que o caminho está correto
import logoLelu from '../assets/logoLelu.png'; // Ajuste o caminho conforme a localização

function Home() {
  return (
    <div className="container">
      <h1>Bem-vindo a Lelu Store</h1>
      <img src={logoLelu} alt="Logo da Lelu Store" className="logoLelu" />
    </div>
  );
}

export default Home;
