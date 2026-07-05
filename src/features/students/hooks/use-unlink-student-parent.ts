"use client";

/**
 * src/features/students/hooks/use-unlink-student-parent.ts
 *
 * Mutation hook for unlinking a parent from a student.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { studentParentApi } from "../api/student-parent.api";
import { studentKeys } from "@/lib/api/query-keys";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useUnlinkStudentParent(studentId: string) {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, ApiError, string>({
    mutationFn: (parentId) => studentParentApi.unlinkParent(studentId, parentId),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: studentKeys.parents(studentId) });
      toast.success(response.message || "Hủy liên kết phụ huynh thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi hủy liên kết phụ huynh.");
    },
  });
}
