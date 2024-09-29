export type FetcherOptions = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  params?:
    | Record<string, string | number | boolean | null | undefined>
    | string[][];
  data?: unknown;
  next?: NextFetchRequestConfig;
  sent?: boolean;
} & RequestInit;

/** @source next/types/global.d.ts  */
interface NextFetchRequestConfig {
  /**
   * Set the revalidation period (in seconds).
   * Fresh data will be fetched, and components will be re-rendered on the server.
   * If set to `false`, the data will never be revalidated (equivalent to `Infinity`)
   * @see https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnextrevalidate
   */
  revalidate?: number | false;
  /**
   * Set the tags for the query.
   * You can use the `revalidateTag` server action to purge specific fetch data
   * @see https://nextjs.org/docs/app/building-your-application/caching#fetch-optionsnexttags-and-revalidatetag
   */
  tags?: string[];
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchClient = async (
  options: FetcherOptions,
): Promise<Response> => {
  const url = new URL(options.url, baseUrl);
  if (options.params) {
    url.search = new URLSearchParams(
      Object.fromEntries(
        Object.entries(options.params).filter(
          ([, p]) => p !== undefined && p !== null && p !== "",
        ),
      ),
    ).toString();
  }

  if (options.method === "GET") {
    // options.cache = 'no-store'
    options.next = {
      revalidate: 5,
      tags: [url.pathname],
      ...options.next,
    };
  }

  return fetch(url, {
    ...options,
    body: options.data ? JSON.stringify(options.data) : options.body,
  });
};
