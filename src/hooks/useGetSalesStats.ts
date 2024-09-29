import type {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { SecondParameter } from "src/hooks/types";
import { fetcher } from "src/utils/fetcher";

type SalesStatsResponse = {
  name: string;
  total: number;
}[];

const salesStatsRoute = `/api/sales/stats`;

const getSalesStats = (
  options?: SecondParameter<typeof fetcher>,
  signal?: AbortSignal,
) => {
  return fetcher<SalesStatsResponse>(
    { url: salesStatsRoute, method: "GET", signal },
    options,
  );
};

export const getGetSalesStatsQueryOptions = <
  TData = Awaited<ReturnType<typeof getSalesStats>>,
  TError = void,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getSalesStats>>, TError, TData>
  >;
  request?: SecondParameter<typeof fetcher>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? [salesStatsRoute];

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getSalesStats>>> = ({
    signal,
  }) => getSalesStats(requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getSalesStats>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export const useGetSalesStats = <
  TData = Awaited<ReturnType<typeof getSalesStats>>,
  TError = void,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getSalesStats>>, TError, TData>
  >;
  request?: SecondParameter<typeof fetcher>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetSalesStatsQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};
