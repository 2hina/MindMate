import api from './axios';

// GET /api/therapists/ — list all therapists
export const getTherapists = async (params = {}) => {
  const { data } = await api.get('/api/therapists/', { params });
  return data;
};

// GET /api/therapists/<id>/
export const getTherapist = async (id) => {
  const { data } = await api.get(`/api/therapists/${id}/`);
  return data;
};

// POST /api/therapists/<id>/book/
export const bookSession = async (id, { date, note }) => {
  const { data } = await api.post(`/api/therapists/${id}/book/`, { date, note });
  return data;
};
