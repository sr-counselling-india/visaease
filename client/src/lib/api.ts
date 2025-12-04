import axios, { type AxiosRequestHeaders } from "axios";
import { API } from "@/constants/api";
import { TOKENS } from "@/constants/tokens";

export const api = axios.create({
  baseURL: API.BASE_URL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem(TOKENS.ACCESS_TOKEN);

    if (token) {
      // Ensure headers exists and satisfy Axios' expected header type.
      const headers: AxiosRequestHeaders = (config.headers ?? {}) as AxiosRequestHeaders;
      headers.Authorization = `Bearer ${token}`;
      config.headers = headers;
    }
  }

  return config;
});

export default api;