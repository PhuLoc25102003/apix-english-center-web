"use client";

/**
 * src/features/students/hooks/use-update-student.ts
 *
 * Mutation hook for updating an existing student's details.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { studentApi } from "../api/student.api";
import { studentKeys } from "@/lib/api/query-keys";
import type { UpdateStudentDto, Student } from "../types/student.type";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useUpdateStudent() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<Student>,
    ApiError,
    { id: string; data: UpdateStudentDto }
  >({
    mutationFn: ({ id, data }) => studentApi.update(id, data),
    onSuccess: (response, { id }) => {
      queryClient.invalidateQueries({ queryKey: studentKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: studentKeys.lists() });
      toast.success(response.message || "Cập nhật thông tin học viên thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi cập nhật thông tin học viên.");
    },
  });
}
