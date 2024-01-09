import Axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const createInstance = (URL) => {
  const instance = Axios.create({
    baseURL: URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') || ""}`,
    },
  });

  // Add an interceptor to update headers before each request
  instance.interceptors.request.use(
    (config) => {
      // Update Authorization header with the latest token
      config.headers.Authorization = `Bearer ${localStorage.getItem('token') || ""}`;
      // Add other dynamic headers as needed
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export const backendAPI = createInstance(API_URL);
