"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { ApiError, ApiResponse } from "@/lib/api";
import { courseKeys } from "@/lib/api/query-keys";
import { courseApi } from "../api/course.api";

export function useDeleteCourse() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, ApiError, string>({
    mutationFn: (id) => courseApi.remove(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: courseKeys.lists() });
      toast.success(response.message || "Xóa khóa học thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Không thể xóa khóa học.");
    },
  });
}
