// Libs
import axios, { AxiosError } from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    Accept: 'application/json'
  }
});

export const fetcher = async (endpoint: string) => {
  try {
    const res = await apiClient.get(process.env.NEXT_PUBLIC_API_URL + endpoint);

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const serverError = err as AxiosError;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }

      return { errorMessage: 'An error occurred' };
    }
  }
};

export const postMethod = async <T>(endpoint: string, { arg }: { arg: T }) => {
  await apiClient.post(endpoint, arg);
};

export const putMethod = async <T>(endpoint: string, { arg }: { arg: T }) => {
  await apiClient.put(endpoint, arg);
};

export const deleteMethod = async (endpoint: string) => {
  await apiClient.delete(endpoint);
};
