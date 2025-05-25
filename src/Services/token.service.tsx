export type UserTokens = {
  accessToken: string;
  refreshToken: string;
};

class TokenService {
  getLocalRefreshToken() {
    return this.getUserTokens()?.refreshToken;
  }

  getLocalAccessToken() {
    return this.getUserTokens()?.accessToken;
  }

  updateLocalAccessToken(accessToken: string) {
    const userTokens = this.getUserTokens();
    userTokens.accessToken = accessToken;
    localStorage.setItem("userTokens", JSON.stringify(userTokens));
  }

  getUserTokens(): UserTokens {
    return JSON.parse(localStorage.getItem("userTokens")!);
  }

  isUserLogged() {
    return this.getUserTokens() !== null ? true : false;
  }

  setUserTokens(userTokens: UserTokens) {
    localStorage.setItem("userTokens", JSON.stringify(userTokens));
  }

  removeUserTokens() {
    localStorage.removeItem("userTokens");
  }
}

const tokenServiceInstance = new TokenService();
export default tokenServiceInstance;
