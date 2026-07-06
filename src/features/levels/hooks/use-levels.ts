"use client";

/**
 * src/features/levels/hooks/use-levels.ts
 *
 * Query hook for listing levels with optional filters/pagination.
 */

import { useQuery } from "@tanstack/react-query";
import { levelApi } from "../api/level.api";
import { levelKeys } from "@/lib/api/query-keys";
import type { ListParams } from "@/lib/api";

export function useLevels(params?: ListParams) {
  return useQuery({
    queryKey: levelKeys.list(params ?? {}),
    queryFn: () => levelApi.getAll(params),
  });
}
