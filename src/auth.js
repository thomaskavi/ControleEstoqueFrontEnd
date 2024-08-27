import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const login = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginData);
    return response.data; // Assumindo que o token está na resposta
  } catch (error) {
    // Verificar se o erro tem uma resposta
    if (error.response) {
      // A resposta do servidor pode conter uma mensagem de erro mais detalhada
      const errorMessage = error.response.data || error.message;
      throw new Error(errorMessage);
    } else {
      // Caso não haja uma resposta (por exemplo, problemas de rede)
      throw new Error(`Erro ao fazer login: ${error.message}`);
    }
  }
};


export const fetchData = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/produtos`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao buscar dados: ${error.message}`);
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};
