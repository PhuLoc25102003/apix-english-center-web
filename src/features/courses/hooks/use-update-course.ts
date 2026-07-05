"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { ApiError, ApiResponse } from "@/lib/api";
import { courseKeys } from "@/lib/api/query-keys";
import { courseApi } from "../api/course.api";
import type { Course, UpdateCourseDto } from "../types/course.type";

export function useUpdateCourse() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<Course>,
    ApiError,
    { id: string; data: UpdateCourseDto }
  >({
    mutationFn: ({ id, data }) => courseApi.update(id, data),
    onSuccess: (response, { id }) => {
      queryClient.invalidateQueries({ queryKey: courseKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: courseKeys.lists() });
      toast.success(response.message || "Cập nhật khóa học thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Không thể cập nhật khóa học.");
    },
  });
}
