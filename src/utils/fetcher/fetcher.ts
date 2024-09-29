import { Token } from "src/utils/tokens";
import { ApiError } from "./ApiError";
import { type FetcherOptions, fetchClient } from "./fetchClient";
import { refreshAccessToken } from "./refreshAccessToken";

const isPublicRoute = (url: string) => {
  const authPath = "/api/auth";
  const publicPaths = [
    authPath + "/login",
    authPath + "/logout",
    authPath + "/refresh-token",
  ];
  return publicPaths.includes(url);
};

const mergeHeaders = (
  headers?: HeadersInit,
  override?: HeadersInit,
): Headers => {
  const merged = new Headers(headers);
  if (override) {
    for (const [key, value] of Object.entries(override)) {
      if (value === "undefined" || value === undefined) {
        merged.delete(key);
      } else {
        merged.set(key, value);
      }
    }
  }
  return merged;
};

export const fetcher = async <T>(
  options: FetcherOptions,
  override?: Pick<FetcherOptions, "headers" | "cache" | "next" | "credentials">,
): Promise<T> => {
  const headers = mergeHeaders(options?.headers, override?.headers);

  if (!headers.has("Authorization")) {
    const token = Token.get();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  try {
    const res = await fetchClient({ ...options, ...override, headers });
    const data = await res.json().catch(() => ""); // response can be empty

    if (!res.ok) {
      throw new ApiError(res.status, data?.message ?? "Internal Server Error", {
        url: res.url ?? options.url,
      });
    }

    return data;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      console.info(error);
      return "" as unknown as T;
    }
    // TypeError: fetch failed due to network error (e.g. CORS, no internet)
    if (error instanceof TypeError) {
      throw new ApiError(500, "Network Error");
    }

    console.error(error);

    if (
      !options.sent &&
      !isPublicRoute(options.url) &&
      error instanceof ApiError &&
      [401, 403].includes(error.status)
    ) {
      const res = await refreshAccessToken().catch(() => {
        // if refresh token fails, throw original error (ApiError)
        throw error;
      });
      headers.set("Authorization", `Bearer ${res.accessToken}`);

      return fetcher<T>({ ...options, ...override, sent: true, headers });
    }

    throw error;
  }
};
