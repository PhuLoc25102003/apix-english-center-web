"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { ApiError, ApiResponse } from "@/lib/api";
import { courseKeys } from "@/lib/api/query-keys";
import { courseApi } from "../api/course.api";
import type { Course, CreateCourseDto } from "../types/course.type";

export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Course>, ApiError, CreateCourseDto>({
    mutationFn: (data) => courseApi.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: courseKeys.lists() });
      toast.success(response.message || "Tạo khóa học thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Không thể tạo khóa học.");
    },
  });
}
