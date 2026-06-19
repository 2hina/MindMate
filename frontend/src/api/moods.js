import api from './axios';

// GET /api/moods/ — list current user's mood entries
export const getMoods = async () => {
  const { data } = await api.get('/api/moods/');
  return data.results || data;   // ✅ handles both paginated and plain array responses
};

// POST /api/moods/ — log a new mood entry
export const createMood = async ({ mood, label, note }) => {
  const { data } = await api.post('/api/moods/', { mood, label, note });
  return data;
};

// DELETE /api/moods/<id>/
export const deleteMood = async (id) => {
  await api.delete(`/api/moods/${id}/`);
};