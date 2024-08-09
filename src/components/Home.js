import React from 'react';
import logoLelu from '../assets/logoLelu.png'; // Ajuste o caminho conforme a localização
import './Home.css'; // Importe o arquivo CSS


function Home() {
  return (
    <div className="container">
      <div>
        <h1>Bem-vindo ao Sistema Lelu Store</h1>
      </div>
      <img src={logoLelu} alt="Logo da Lelu Store" className="logoLelu" />
    </div>
  );
}

export default Home;
