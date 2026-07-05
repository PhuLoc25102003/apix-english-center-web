"use client";

/**
 * src/features/students/hooks/use-link-student-parent.ts
 *
 * Mutation hook for linking a parent to a student.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { studentParentApi } from "../api/student-parent.api";
import { studentKeys } from "@/lib/api/query-keys";
import type { LinkParentPayload, StudentParentRelation } from "../types/student-parent.type";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useLinkStudentParent(studentId: string) {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<StudentParentRelation>, ApiError, LinkParentPayload>({
    mutationFn: (payload) => studentParentApi.linkParent(studentId, payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: studentKeys.parents(studentId) });
      toast.success(response.message || "Liên kết phụ huynh thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi liên kết phụ huynh.");
    },
  });
}
