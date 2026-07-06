"use client";

/**
 * src/features/attendance/hooks/use-class-session-detail.ts
 *
 * Query hook for fetching detail of a single class session.
 */

import { useQuery } from "@tanstack/react-query";
import { attendanceApi } from "../api/attendance.api";
import { attendanceKeys } from "@/lib/api/query-keys";

export function useClassSessionDetail(id: string) {
  return useQuery({
    queryKey: attendanceKeys.bySession(id),
    queryFn: () => attendanceApi.getById(id),
    enabled: !!id,
  });
}
