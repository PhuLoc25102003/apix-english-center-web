"use client";

/**
 * src/features/students/hooks/use-delete-student.ts
 *
 * Mutation hook for deleting a student.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { studentApi } from "../api/student.api";
import { studentKeys } from "@/lib/api/query-keys";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useDeleteStudent() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, ApiError, string>({
    mutationFn: (id) => studentApi.remove(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: studentKeys.lists() });
      toast.success(response.message || "Xóa học viên thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi xóa học viên.");
    },
  });
}
