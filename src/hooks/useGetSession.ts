import type {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { SecondParameter } from "src/hooks/types";
import { fetcher } from "src/utils/fetcher";

type SessionResponse = {
  sessionId: string;
  email: string;
};

const sessionRoute = `/api/auth/session`;

const getSession = (
  options?: SecondParameter<typeof fetcher>,
  signal?: AbortSignal,
) => {
  return fetcher<SessionResponse>(
    { url: sessionRoute, method: "GET", signal },
    options,
  );
};

export const getGetSessionQueryOptions = <
  TData = Awaited<ReturnType<typeof getSession>>,
  TError = void,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getSession>>, TError, TData>
  >;
  request?: SecondParameter<typeof fetcher>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? [sessionRoute];

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getSession>>> = ({
    signal,
  }) => getSession(requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getSession>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export const useGetSession = <
  TData = Awaited<ReturnType<typeof getSession>>,
  TError = void,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getSession>>, TError, TData>
  >;
  request?: SecondParameter<typeof fetcher>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetSessionQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};
