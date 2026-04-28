import api from './axios';

// POST /api/auth/register/
export const register = async ({ name, email, password }) => {
  const { data } = await api.post('/api/auth/register/', { name, email, password });
  _storeTokens(data);
  return data.user;
};

// POST /api/auth/login/
export const login = async ({ email, password }) => {
  const { data } = await api.post('/api/auth/login/', { email, password });
  _storeTokens(data);
  return data.user;
};

// POST /api/auth/token/refresh/
export const refreshToken = async () => {
  const refresh = localStorage.getItem('refresh_token');
  const { data } = await api.post('/api/auth/token/refresh/', { refresh });
  localStorage.setItem('access_token', data.access);
  return data.access;
};

// GET /api/auth/me/
export const getMe = async () => {
  const { data } = await api.get('/api/auth/me/');
  return data;
};

// Client-side logout
export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

const _storeTokens = ({ access, refresh }) => {
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
};
