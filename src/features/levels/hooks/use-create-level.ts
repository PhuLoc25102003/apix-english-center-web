"use client";

/**
 * src/features/levels/hooks/use-create-level.ts
 *
 * Mutation hook for creating a new level.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { levelApi } from "../api/level.api";
import { levelKeys } from "@/lib/api/query-keys";
import type { CreateLevelDto, Level } from "../types/level.type";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useCreateLevel() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Level>, ApiError, CreateLevelDto>({
    mutationFn: (data) => levelApi.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: levelKeys.lists() });
      toast.success(response.message || "Tạo cấp độ thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi tạo cấp độ.");
    },
  });
}
