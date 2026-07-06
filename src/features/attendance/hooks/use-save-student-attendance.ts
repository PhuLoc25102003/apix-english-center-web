"use client";

/**
 * src/features/attendance/hooks/use-save-student-attendance.ts
 *
 * Mutation hook for saving class session student attendance in batch.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { attendanceApi } from "../api/attendance.api";
import { attendanceKeys } from "@/lib/api/query-keys";
import type { SaveStudentAttendanceRequest, SaveStudentAttendanceResponse } from "../types/attendance.type";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useSaveStudentAttendance(sessionId: string) {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, ApiError, SaveStudentAttendanceRequest>({
    mutationFn: (payload) => attendanceApi.saveStudentAttendance(sessionId, payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: attendanceKeys.sessionStudents(sessionId) });
      queryClient.invalidateQueries({ queryKey: attendanceKeys.bySession(sessionId) });
      queryClient.invalidateQueries({ queryKey: attendanceKeys.lists() });
      toast.success(response.message || "Lưu điểm danh thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi lưu điểm danh.");
    },
  });
}
