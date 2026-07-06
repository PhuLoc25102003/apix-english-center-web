"use client";

/**
 * src/features/levels/hooks/use-delete-level.ts
 *
 * Mutation hook for deleting a level.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { levelApi } from "../api/level.api";
import { levelKeys } from "@/lib/api/query-keys";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useDeleteLevel() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, ApiError, string>({
    mutationFn: (id) => levelApi.remove(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: levelKeys.lists() });
      toast.success(response.message || "Xóa cấp độ thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi xóa cấp độ.");
    },
  });
}
