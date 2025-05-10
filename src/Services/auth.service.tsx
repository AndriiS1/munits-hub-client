import api from "./api/api";
import { AUTH_API_ROUTES } from "./api/routes";
import TokenService from "./token.service";

type signUpModel = {
  email: string;
  password: string;
};

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  [key: string]: unknown;
}

class AuthService {
  async login(email: string, password: string) {
    const response = await api.post(AUTH_API_ROUTES.LOGIN, {
      email,
      password,
    });
    const data = response.data as AuthResponse;
    if (data.accessToken) {
      TokenService.setUserTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
    }
    return data;
  }

  async getUserEmail(): Promise<string> {
    const response = await api.get(AUTH_API_ROUTES.GET_USER_EMAIL);
    const data = response.data as { email: string };
    return data.email;
  }

  logout() {
    TokenService.removeUserTokens();
  }

  async signUp(registerData: signUpModel) {
    const response = await api.post(AUTH_API_ROUTES.SIGN_UP, registerData);
    const data = response.data as AuthResponse;
    if (data.accessToken) {
      TokenService.setUserTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
    }
    return data;
  }
}

const authServiceInstance = new AuthService();
export default authServiceInstance;
