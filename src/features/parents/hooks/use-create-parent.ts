"use client";

/**
 * src/features/parents/hooks/use-create-parent.ts
 *
 * Mutation hook for creating a new parent.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { parentApi } from "../api/parent.api";
import { parentKeys } from "@/lib/api/query-keys";
import type { CreateParentDto, Parent } from "../types/parent.type";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useCreateParent() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Parent>, ApiError, CreateParentDto>({
    mutationFn: (data) => parentApi.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: parentKeys.lists() });
      toast.success(response.message || "Tạo phụ huynh thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi tạo phụ huynh.");
    },
  });
}
