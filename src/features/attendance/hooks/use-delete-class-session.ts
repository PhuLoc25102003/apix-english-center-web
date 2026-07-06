"use client";

/**
 * src/features/attendance/hooks/use-delete-class-session.ts
 *
 * Mutation hook for deleting a class session.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { attendanceApi } from "../api/attendance.api";
import { attendanceKeys } from "@/lib/api/query-keys";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useDeleteClassSession() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, ApiError, string>({
    mutationFn: (id) => attendanceApi.remove(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: attendanceKeys.lists() });
      toast.success(response.message || "Xóa buổi học thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi xóa buổi học.");
    },
  });
}
