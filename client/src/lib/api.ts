import axios from "axios";
import { AuthService } from "@/config/firebaseConfig";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    try {
      // Get fresh token, forceRefresh if needed could be handled here too
      const token = await AuthService.getUserAccessToken();
      console.log("Access Token " + token);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error attaching auth token", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling logic (e.g. logging, toast notifications)
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);
