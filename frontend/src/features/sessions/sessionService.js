import api from '../../api/axios';

export const sessionService = {
  getSessions: async () => {
    try {
      const response = await api.get('/sessions');
      return response.data;
    } catch (err) {
        throw err.response.data.error;
    }
  },
}; 