import axios from "axios";

const httpClientInstance = axios.create({
  baseURL: "http://localhost:4000/",
  timeout: 100000,
});

httpClientInstance.interceptors.request.use(function (config) {
  if (config.method && ["post", "put", "patch"].includes(config.method)) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

export default httpClientInstance;
