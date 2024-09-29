import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getGetSessionQueryOptions } from "src/hooks/useGetSession";
import { SessionRefresh } from "./SessionRefresh";
import { apiCatcher } from "src/utils/apiCatcher";

export const AuthGuard = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = new QueryClient();

  await apiCatcher(queryClient.fetchQuery(getGetSessionQueryOptions()));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SessionRefresh />

      {children}
    </HydrationBoundary>
  );
};
