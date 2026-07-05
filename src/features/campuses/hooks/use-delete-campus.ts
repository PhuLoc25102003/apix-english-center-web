"use client";

/**
 * src/features/campuses/hooks/use-delete-campus.ts
 *
 * Mutation hook for deleting a campus.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { campusApi } from "../api/campus.api";
import { campusKeys } from "@/lib/api/query-keys";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useDeleteCampus() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, ApiError, string>({
    mutationFn: (id) => campusApi.remove(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: campusKeys.lists() });
      toast.success(response.message || "Xóa cơ sở thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi xóa cơ sở.");
    },
  });
}
