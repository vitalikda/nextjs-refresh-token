import type {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { SecondParameter } from "src/hooks/types";
import { fetcher } from "src/utils/fetcher";

type SalesResponse = {
  avatarSrc: string;
  name: string;
  email: string;
  amount: number;
}[];

const salesRoute = `/api/sales`;

const getSales = (
  options?: SecondParameter<typeof fetcher>,
  signal?: AbortSignal,
) => {
  return fetcher<SalesResponse>(
    { url: salesRoute, method: "GET", signal },
    options,
  );
};

export const getGetSalesQueryOptions = <
  TData = Awaited<ReturnType<typeof getSales>>,
  TError = void,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getSales>>, TError, TData>
  >;
  request?: SecondParameter<typeof fetcher>;
}) => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? [salesRoute];

  const queryFn: QueryFunction<Awaited<ReturnType<typeof getSales>>> = ({
    signal,
  }) => getSales(requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof getSales>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export const useGetSales = <
  TData = Awaited<ReturnType<typeof getSales>>,
  TError = void,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof getSales>>, TError, TData>
  >;
  request?: SecondParameter<typeof fetcher>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getGetSalesQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};
