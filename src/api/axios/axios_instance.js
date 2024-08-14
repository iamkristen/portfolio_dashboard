import axios from "axios";
import { getToken } from "../../helper/token";

const AxiosInstance = axios.create({
  baseURL: "https://portmainapp.onrender.com",
  // headers: {
  //   "Content-Type": "application/json",
  //   Accept: "application/json",
  // },
});

// Add a request interceptor
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["auth-token"] = token;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export default AxiosInstance;
