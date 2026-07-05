"use client";

/**
 * src/features/campuses/hooks/use-campuses.ts
 *
 * Query hook for listing campuses with optional filters/pagination.
 */

import { useQuery } from "@tanstack/react-query";
import { campusApi } from "../api/campus.api";
import { campusKeys } from "@/lib/api/query-keys";
import type { ListParams } from "@/lib/api";

export function useCampuses(params?: ListParams) {
  return useQuery({
    queryKey: campusKeys.list(params ?? {}),
    queryFn: () => campusApi.getAll(params),
  });
}
