"use client";

/**
 * src/features/attendance/hooks/use-create-class-session.ts
 *
 * Mutation hook for creating a new class session.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { attendanceApi } from "../api/attendance.api";
import { attendanceKeys } from "@/lib/api/query-keys";
import type { CreateClassSessionRequest, ClassSession } from "../types/attendance.type";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useCreateClassSession() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<ClassSession>, ApiError, CreateClassSessionRequest>({
    mutationFn: (data) => attendanceApi.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: attendanceKeys.lists() });
      toast.success(response.message || "Tạo buổi học thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi tạo buổi học.");
    },
  });
}
