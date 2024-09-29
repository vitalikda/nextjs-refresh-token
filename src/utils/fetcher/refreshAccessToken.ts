import { postRefreshToken } from "src/hooks/usePostRefreshToken";
import { RefreshToken, Token } from "src/utils/tokens";

const isServer = typeof window === "undefined";

export const refreshAccessToken = async () => {
  const refreshToken = RefreshToken.get();

  const res = await postRefreshToken({ refreshToken: refreshToken ?? "" });

  // Updating cookies possible only on the client (RSC streaming limitation)
  if (res && !isServer) {
    Token.set(res.accessToken);
  }

  return res;
};
