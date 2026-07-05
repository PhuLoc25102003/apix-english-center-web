"use client";

/**
 * src/features/parents/hooks/use-update-parent.ts
 *
 * Mutation hook for updating an existing parent's details.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { parentApi } from "../api/parent.api";
import { parentKeys } from "@/lib/api/query-keys";
import type { UpdateParentDto, Parent } from "../types/parent.type";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useUpdateParent() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<Parent>,
    ApiError,
    { id: string; data: UpdateParentDto }
  >({
    mutationFn: ({ id, data }) => parentApi.update(id, data),
    onSuccess: (response, { id }) => {
      queryClient.invalidateQueries({ queryKey: parentKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: parentKeys.lists() });
      toast.success(response.message || "Cập nhật thông tin phụ huynh thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi cập nhật thông tin phụ huynh.");
    },
  });
}
