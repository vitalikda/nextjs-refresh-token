import { SecondParameter } from "src/hooks/types";
import { fetcher } from "src/utils/fetcher";

const logoutRoute = `/api/auth/logout`;

export const postLogout = (
  options?: SecondParameter<typeof fetcher>,
  signal?: AbortSignal,
) => {
  return fetcher<void>(
    {
      url: logoutRoute,
      method: "DELETE",
      signal,
    },
    options,
  );
};
