import axios from "axios";

const api = axios.create({
  baseURL: "https://event-platform-d66f.onrender.com/api",
});
// export default api;

// Attach JWT token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
