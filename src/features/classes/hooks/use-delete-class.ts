"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { ApiError, ApiResponse } from "@/lib/api";
import { classKeys } from "@/lib/api/query-keys";
import { classApi } from "../api/class.api";

export function useDeleteClass() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, ApiError, string>({
    mutationFn: (id) => classApi.remove(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: classKeys.lists() });
      toast.success(response.message || "Xóa lớp học thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Không thể xóa lớp học.");
    },
  });
}
