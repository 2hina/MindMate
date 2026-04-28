import api from './axios';

// POST /api/chat/
// body: { message: "I'm feeling anxious today" }
// returns: { reply: "...", timestamp: "..." }
export const sendMessage = async (message) => {
  const { data } = await api.post('/api/chat/', { message });
  return data;
};

// GET /api/chat/history/ — past conversation (optional)
export const getChatHistory = async () => {
  const { data } = await api.get('/api/chat/history/');
  return data;
};
