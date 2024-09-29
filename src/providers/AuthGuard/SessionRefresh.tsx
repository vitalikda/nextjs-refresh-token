"use client";

import { useGetSession } from "src/hooks/useGetSession";

export const SessionRefresh = () => {
  useGetSession();

  return null;
};
