import axios from 'axios';

const baseUrl = 'http://localhost:3000';

export const api = {
  get: (url) => axios.get(`${baseUrl}${url}`),
  post: (url, data) => axios.post(`${baseUrl}${url}`, data),
  put: (url, data) => axios.put(`${baseUrl}${url}`, data),
  delete: (url) => axios.delete(`${baseUrl}${url}`)
};
