"use client";

/**
 * src/features/levels/hooks/use-update-level.ts
 *
 * Mutation hook for updating an existing level.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { levelApi } from "../api/level.api";
import { levelKeys } from "@/lib/api/query-keys";
import type { UpdateLevelDto, Level } from "../types/level.type";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useUpdateLevel() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<Level>,
    ApiError,
    { id: string; data: UpdateLevelDto }
  >({
    mutationFn: ({ id, data }) => levelApi.update(id, data),
    onSuccess: (response, { id }) => {
      queryClient.invalidateQueries({ queryKey: levelKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: levelKeys.lists() });
      toast.success(response.message || "Cập nhật cấp độ thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi cập nhật cấp độ.");
    },
  });
}
