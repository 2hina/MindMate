import api from './axios';

// POST /api/stress/analyze/
// body: { text: "I've been feeling overwhelmed..." }
// returns: { score, level, tips, analyzed_at }
export const analyzeStress = async (text) => {
  const { data } = await api.post('/api/stress/analyze/', { text });
  return data;
};
