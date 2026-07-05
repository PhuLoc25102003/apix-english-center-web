"use client";

import { useQuery } from "@tanstack/react-query";

import type { ListParams } from "@/lib/api";
import { levelKeys } from "@/lib/api/query-keys";
import { levelApi } from "../api/level.api";

export function useLevels(params: ListParams = {}) {
  return useQuery({
    queryKey: levelKeys.list(params),
    queryFn: () => levelApi.getAll(params),
  });
}
