"use client";

/**
 * src/features/levels/hooks/use-level.ts
 *
 * Query hook for retrieving details of a single level.
 */

import { useQuery } from "@tanstack/react-query";
import { levelApi } from "../api/level.api";
import { levelKeys } from "@/lib/api/query-keys";

export function useLevel(id: string) {
  return useQuery({
    queryKey: levelKeys.detail(id),
    queryFn: () => levelApi.getById(id),
    enabled: !!id,
  });
}
