"use client";

/**
 * src/features/attendance/hooks/use-class-sessions.ts
 *
 * Query hook for listing class sessions with optional filters.
 */

import { useQuery } from "@tanstack/react-query";
import { attendanceApi } from "../api/attendance.api";
import { attendanceKeys } from "@/lib/api/query-keys";
import type { ClassSessionFilters } from "../types/attendance.type";

export function useClassSessions(params?: ClassSessionFilters) {
  return useQuery({
    queryKey: attendanceKeys.list(params ?? {}),
    queryFn: () => attendanceApi.getAll(params),
  });
}
