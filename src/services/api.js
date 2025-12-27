import axios from "axios";
import { logApiRequest } from "./telegram";

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
  const params = { username };
  try {
    const response = await api.get("/instagram-stalker-updated", {
      params: params,
    });

    // Log successful request to Telegram
    logApiRequest("Instagram Stalker", params, true);

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    // Log failed request to Telegram
    logApiRequest("Instagram Stalker", params, false, errorMessage);

    throw error.response?.data || error.message;
  }
};

// E-Wallet Name Check API
export const checkEWalletName = async (bank, accountNumber) => {
  const params = { bank, accountNumber };
  try {
    const response = await api.get("/cek-name-e-wallet-id", {
      params: params,
    });

    // Log successful request to Telegram
    logApiRequest("E-Wallet Check", params, true);

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    // Log failed request to Telegram
    logApiRequest("E-Wallet Check", params, false, errorMessage);

    throw error.response?.data || error.message;
  }
};

export default api;
