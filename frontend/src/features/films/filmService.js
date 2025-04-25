import api from '../../api/axios';

export const filmService = {
  getFilms: async () => {
    try {
      const response = await api.get('/films');
      return response.data;
    } catch (err) {
        throw err.response.data.error;
    }
  },
}; 