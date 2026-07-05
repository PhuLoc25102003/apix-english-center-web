"use client";

/**
 * src/features/parents/hooks/use-parent.ts
 *
 * Query hook for retrieving details of a single parent.
 */

import { useQuery } from "@tanstack/react-query";
import { parentApi } from "../api/parent.api";
import { parentKeys } from "@/lib/api/query-keys";

export function useParent(id: string) {
  return useQuery({
    queryKey: parentKeys.detail(id),
    queryFn: () => parentApi.getById(id),
    enabled: !!id,
  });
}
