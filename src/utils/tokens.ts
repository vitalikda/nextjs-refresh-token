import { deleteCookieValue, getCookieValue, setCookieValue } from "./cookies";

export const TOKEN_KEY = "token";

export const Token = {
  get: () => getCookieValue(TOKEN_KEY),
  set: (token: string) => setCookieValue(TOKEN_KEY, token),
  clear: () => deleteCookieValue(TOKEN_KEY),
};

export const REFRESH_TOKEN_KEY = "refreshToken";

export const RefreshToken = {
  get: () => getCookieValue(REFRESH_TOKEN_KEY),
  set: (token: string) => setCookieValue(REFRESH_TOKEN_KEY, token),
  clear: () => deleteCookieValue(REFRESH_TOKEN_KEY),
};
