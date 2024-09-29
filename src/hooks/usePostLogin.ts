import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { SecondParameter } from "src/hooks/types";
import { ApiError, fetcher } from "src/utils/fetcher";
import { RefreshToken, Token } from "src/utils/tokens";

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  sessionId: string;
  email: string;
  accessToken: string;
  refreshToken: string;
};

const loginRoute = `/api/auth/login`;

const postLogin = (
  data: LoginRequest,
  options?: SecondParameter<typeof fetcher>,
  signal?: AbortSignal,
) => {
  return fetcher<LoginResponse>(
    {
      url: loginRoute,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data,
      signal,
    },
    options,
  );
};

export const usePostLogin = (
  mutationOptions: UseMutationOptions<LoginResponse, ApiError, LoginRequest>,
) =>
  useMutation({
    ...mutationOptions,
    mutationKey: [loginRoute],
    mutationFn: async ({ email, password }) => {
      const res = await postLogin({ email, password });

      if (res.accessToken) {
        Token.set(res.accessToken);
      }
      if (res.refreshToken) {
        RefreshToken.set(res.refreshToken);
      }

      return res;
    },
  });
