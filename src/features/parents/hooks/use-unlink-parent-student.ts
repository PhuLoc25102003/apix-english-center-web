"use client";

/**
 * src/features/parents/hooks/use-unlink-parent-student.ts
 *
 * Mutation hook for unlinking a student from a parent.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { studentParentApi } from "@/features/students/api/student-parent.api";
import { parentKeys } from "@/lib/api/query-keys";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useUnlinkParentStudent(parentId: string) {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, ApiError, string>({
    mutationFn: (studentId) => studentParentApi.unlinkParent(studentId, parentId),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: parentKeys.children(parentId) });
      toast.success(response.message || "Gỡ liên kết học viên thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi gỡ liên kết học viên.");
    },
  });
}
