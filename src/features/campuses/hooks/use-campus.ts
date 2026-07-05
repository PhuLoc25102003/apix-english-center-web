"use client";

/**
 * src/features/campuses/hooks/use-campus.ts
 *
 * Query hook for retrieving details of a single campus.
 */

import { useQuery } from "@tanstack/react-query";
import { campusApi } from "../api/campus.api";
import { campusKeys } from "@/lib/api/query-keys";

export function useCampus(id: string) {
  return useQuery({
    queryKey: campusKeys.detail(id),
    queryFn: () => campusApi.getById(id),
    enabled: !!id,
  });
}
