"use client";

/**
 * src/features/parents/hooks/use-delete-parent.ts
 *
 * Mutation hook for deleting a parent.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { parentApi } from "../api/parent.api";
import { parentKeys } from "@/lib/api/query-keys";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useDeleteParent() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, ApiError, string>({
    mutationFn: (id) => parentApi.remove(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: parentKeys.lists() });
      toast.success(response.message || "Xóa phụ huynh thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi xóa phụ huynh.");
    },
  });
}
