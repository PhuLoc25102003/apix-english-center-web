"use client";

import { useQuery } from "@tanstack/react-query";

import { classKeys } from "@/lib/api/query-keys";
import { classApi } from "../api/class.api";

export function useClass(id: string) {
  return useQuery({
    queryKey: classKeys.detail(id),
    queryFn: () => classApi.getById(id),
    enabled: Boolean(id),
  });
}
