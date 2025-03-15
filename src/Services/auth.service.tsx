import api from "./api/api";
import { AUTH_API_ROUTES } from "./api/routes";
import TokenService from "./token.service";

type signUpModel = {
  email: string;
  password: string;
};

class AuthService {
  async login(email: string, password: string) {
    const response = await api.post(AUTH_API_ROUTES.LOGIN, {
      email,
      password,
    });
    if (response.data.accessToken) {
      TokenService.setUserTokens({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });
    }
    return response.data;
  }

  logout() {
    TokenService.removeUserTokens();
  }

  async signUp(registerData: signUpModel) {
    console.log(process.env.REACT_APP_MUNITS_SERVER_URL);
    const response = await api.post(AUTH_API_ROUTES.SIGN_UP, registerData);
    if (response.data.accessToken) {
      TokenService.setUserTokens({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });
    }
    return response.data;
  }
}

const authServiceInstance = new AuthService();
export default authServiceInstance;
