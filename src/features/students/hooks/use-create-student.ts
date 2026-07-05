"use client";

/**
 * src/features/students/hooks/use-create-student.ts
 *
 * Mutation hook for creating a new student.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { studentApi } from "../api/student.api";
import { studentKeys } from "@/lib/api/query-keys";
import type { CreateStudentDto, Student } from "../types/student.type";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Student>, ApiError, CreateStudentDto>({
    mutationFn: (data) => studentApi.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: studentKeys.lists() });
      toast.success(response.message || "Tạo học viên thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi tạo học viên.");
    },
  });
}
