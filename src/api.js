// api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Verifique se há uma resposta de erro
    if (error.response) {
      // A resposta do servidor está disponível
      return Promise.reject(error.response.data.message || 'Erro desconhecido');
    } else if (error.request) {
      // A solicitação foi feita, mas sem resposta
      return Promise.reject('Erro na comunicação com o servidor');
    } else {
      // Alguma outra coisa aconteceu
      return Promise.reject('Erro desconhecido');
    }
  }
);

export default api;
