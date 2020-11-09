import Axios from 'axios';

const BASE_URL = 'https://api.quran.sutanlab.id';

const apiService = {
  get(resource = '', slug = '') {
    return Axios.get(`${resource}/${slug}`).catch(err => {
      throw new Error(err);
    });
  },
};

export const surah = {
  fetchAll() {
    return apiService.get(BASE_URL, 'surah');
  },
};
