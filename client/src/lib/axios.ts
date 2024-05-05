import axios from "axios";
// import "vite/client";
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export default api;
