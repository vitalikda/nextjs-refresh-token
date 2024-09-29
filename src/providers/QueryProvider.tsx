"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { publicPaths } from "src/configs/routes";
import { ApiError } from "src/utils/fetcher";

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const { push } = useRouter();

  const [client] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            if (error instanceof ApiError && error.status === 401) {
              console.log("Redirecting to login");
              push(publicPaths.login);
            }
          },
        }),
        defaultOptions: {
          queries: {
            staleTime: 1000 * 30, // 30 seconds
            gcTime: 1000 * 60 * 60, // 1 hour
            retry: (failureCount, error) => {
              if (
                error instanceof ApiError &&
                [401, 403].includes(error.status)
              ) {
                return false;
              }
              return failureCount < 3;
            },
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={client}>
      {/*  */}
      {children}
    </QueryClientProvider>
  );
};
