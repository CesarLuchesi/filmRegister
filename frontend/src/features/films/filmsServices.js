import api from '../../api/axios';

export const fetchFilm = async () => {
  try {
    const response = await api.get('/films');
    return response.data;
  } catch (err) {
    throw err.response.data.error;
  }
};

export const addFilm = async (movieData) => {
  try {
    const response = await api.post('/films', movieData);
    return response.data;
  } catch (err) {
    throw err.response.data.error;
  }
};