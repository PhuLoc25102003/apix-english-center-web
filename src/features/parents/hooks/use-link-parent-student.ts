"use client";

/**
 * src/features/parents/hooks/use-link-parent-student.ts
 *
 * Mutation hook for linking a student to a parent.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { studentParentApi } from "@/features/students/api/student-parent.api";
import { parentKeys } from "@/lib/api/query-keys";
import type { LinkParentPayload } from "@/features/students/types/student-parent.type";
import type { ApiError, ApiResponse } from "@/lib/api";
import type { StudentParentRelation } from "@/features/students/types/student-parent.type";

export function useLinkParentStudent(parentId: string) {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<StudentParentRelation>,
    ApiError,
    { studentId: string; payload: LinkParentPayload }
  >({
    mutationFn: ({ studentId, payload }) =>
      studentParentApi.linkParent(studentId, payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: parentKeys.children(parentId) });
      toast.success(response.message || "Liên kết học viên thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi liên kết học viên.");
    },
  });
}
