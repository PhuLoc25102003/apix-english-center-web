"use client";

/**
 * src/features/parents/hooks/use-parents.ts
 *
 * Query hook for listing parents with optional filters/pagination.
 */

import { useQuery } from "@tanstack/react-query";
import { parentApi } from "../api/parent.api";
import { parentKeys } from "@/lib/api/query-keys";
import type { ListParams } from "@/lib/api";

export function useParents(params?: ListParams) {
  return useQuery({
    queryKey: parentKeys.list(params ?? {}),
    queryFn: () => parentApi.getAll(params),
  });
}
