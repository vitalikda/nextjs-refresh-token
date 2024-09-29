import { SecondParameter } from "src/hooks/types";
import { fetcher } from "src/utils/fetcher";

type RefreshTokenRequest = {
  refreshToken: string;
};

type RefreshTokenResponse = {
  sessionId: string;
  accessToken: string;
};

const refreshTokenRoute = `/api/auth/refresh-token`;

export const postRefreshToken = (
  data: RefreshTokenRequest,
  options?: SecondParameter<typeof fetcher>,
  signal?: AbortSignal,
) => {
  return fetcher<RefreshTokenResponse>(
    {
      url: refreshTokenRoute,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "force-cache",
      data,
      signal,
    },
    options,
  );
};
