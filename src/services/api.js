import axios from "axios";

// Use proxy in development, direct URL in production
const isDev = import.meta.env.DEV;
const baseURL = isDev ? "/api" : import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_API_KEY,
  },
});

// Instagram Stalker API
export const instagramStalker = async (username) => {
  try {
    const response = await api.request({
      method: "GET",
      url: "/instagram-stalker-updated",
      data: {
        username: username,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;
