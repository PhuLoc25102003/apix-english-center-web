"use client";

/**
 * src/features/attendance/hooks/use-update-class-session.ts
 *
 * Mutation hook for updating an existing class session.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { attendanceApi } from "../api/attendance.api";
import { attendanceKeys } from "@/lib/api/query-keys";
import type { UpdateClassSessionRequest, ClassSession } from "../types/attendance.type";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useUpdateClassSession() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<ClassSession>,
    ApiError,
    { id: string; data: UpdateClassSessionRequest }
  >({
    mutationFn: ({ id, data }) => attendanceApi.update(id, data),
    onSuccess: (response, { id }) => {
      queryClient.invalidateQueries({ queryKey: attendanceKeys.bySession(id) });
      queryClient.invalidateQueries({ queryKey: attendanceKeys.lists() });
      toast.success(response.message || "Cập nhật buổi học thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi cập nhật buổi học.");
    },
  });
}
