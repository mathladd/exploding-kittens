import baseAxios from 'axios';

const timeout = 1000 * 20;

const axios = baseAxios.create({
  //   baseURL: process.env.API_ENDPOINT,
  baseURL: 'http://localhost:8000',
  timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { axios };
