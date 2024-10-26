'use server';
import axios from 'axios';

const TOKEN = process.env.APP_TOKEN || '';
const APP_API_URL = process.env.NEXT_PUBLIC_APP_API_URL;

export const axiosInstance = axios.create({
  baseURL: APP_API_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + TOKEN,
  },
});
