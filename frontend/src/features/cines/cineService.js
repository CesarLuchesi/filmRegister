import api from '../../api/axios';

export const cineService = {
  getCines: async () => {
    try {
      const response = await api.get('/cines');
      return response.data;
    } catch (err) {
      throw err.response.data.error;
    }
  },
};
