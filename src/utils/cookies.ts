/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Note: `require` is used to avoid runtime error when importing `next/headers`
 * @see https://github.com/vercel/next.js/issues/49757
 *
 * Note: next.js throws when you attempt to set/delete cookie when rendering page (RSC)
 * @see https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options
 */

import { deleteCookie, getCookie, setCookie } from "cookies-next";

export const getCookieValue = (key: string) => {
  let value: string | undefined;

  if (typeof window === "undefined") {
    value = require("next/headers").cookies().get(key)?.value;
  } else {
    value = getCookie(key);
  }

  return value;
};

export const setCookieValue = (key: string, value: string) => {
  try {
    if (typeof window === "undefined") {
      require("next/headers").cookies().set(key, value);
    } else {
      setCookie(key, value);
    }
  } catch {}
};

export const deleteCookieValue = (key: string) => {
  try {
    if (typeof window === "undefined") {
      require("next/headers").cookies().delete(key);
    } else {
      deleteCookie(key);
    }
  } catch {}
};
