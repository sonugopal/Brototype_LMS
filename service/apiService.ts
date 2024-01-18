import axios from 'axios';

const apiService = axios.create({
  baseURL: `${process.env.BASE_URL}/`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiService;