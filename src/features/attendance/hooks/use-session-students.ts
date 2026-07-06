"use client";

/**
 * src/features/attendance/hooks/use-session-students.ts
 *
 * Query hook for fetching enrolled students and their attendance status for a session.
 */

import { useQuery } from "@tanstack/react-query";
import { attendanceApi } from "../api/attendance.api";
import { attendanceKeys } from "@/lib/api/query-keys";

export function useSessionStudents(sessionId: string) {
  return useQuery({
    queryKey: attendanceKeys.sessionStudents(sessionId),
    queryFn: () => attendanceApi.getSessionStudents(sessionId),
    enabled: !!sessionId,
  });
}
