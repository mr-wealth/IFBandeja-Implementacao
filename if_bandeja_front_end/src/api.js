import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const realizarLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('loginTime'); 
    window.location.href = '/';
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    
    const loginTime = localStorage.getItem('loginTime');
    const TEMPO_LIMITE = 2 * 60 * 60 * 1000; 

    if (loginTime) {
        const tempoPassado = Date.now() - parseInt(loginTime);

        if (tempoPassado > TEMPO_LIMITE) {
            console.warn("Sessão expirada pelo limite de tempo (2h).");
            realizarLogout();

            const controller = new AbortController();
            config.signal = controller.signal;
            controller.abort(); 
            return config;
        }
    }

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest.url.endsWith('/login/')) {
      console.error("Token inválido ou expirado no servidor.");
      realizarLogout();
    }

    return Promise.reject(error);
  }
);

export default api;