import axios from "axios";
import TokenService from "../token.service";
import { API_BASE_URL, AUTH_API_ROUTES } from "./routes";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== AUTH_API_ROUTES.LOGIN && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const response = await api.post(AUTH_API_ROUTES.REFRESH_TOKEN, {
            refreshToken: TokenService.getLocalRefreshToken(),
          });

          const { accessToken } = response.data;
          TokenService.updateLocalAccessToken(accessToken);

          return api(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default api;
