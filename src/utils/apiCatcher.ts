import { redirect } from "next/navigation";
import { publicPaths } from "src/configs/routes";
import { ApiError } from "src/utils/fetcher";

/**
 * Catch errors from API calls and redirect to login page if the error is 401
 */
export const apiCatcher = async <T>(
  promise: Promise<T>,
): Promise<[T, undefined] | [undefined, ApiError]> => {
  try {
    const res = await promise;

    return [res, undefined];
  } catch (error) {
    if (error instanceof ApiError) {
      console.log("API_ERROR:", error.getErrorMessage());
      if (error.status === 401) {
        redirect(publicPaths.login);
      }
      return [undefined, error];
    }

    console.error("UNCAUGHT_API_ERROR:", error);
    throw new Error("Unknown Error");
  }
};
