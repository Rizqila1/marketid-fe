import axios from "axios";
import store from "../stores";
const { auth } = store.getState();

// export const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_BASE_URL,
// });

export const axiosInstance = axios;

axiosInstance.interceptors.request.use(
  async function (config) {
    const token = await auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const statusCode = error.response.status;
    if (statusCode === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/marketid/login";
    }

    return Promise.reject(error);
  }
);
