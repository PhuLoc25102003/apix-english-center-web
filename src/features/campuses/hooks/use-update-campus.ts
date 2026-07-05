"use client";

/**
 * src/features/campuses/hooks/use-update-campus.ts
 *
 * Mutation hook for updating an existing campus.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { campusApi } from "../api/campus.api";
import { campusKeys } from "@/lib/api/query-keys";
import type { UpdateCampusDto, Campus } from "../types/campus.type";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useUpdateCampus() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<Campus>,
    ApiError,
    { id: string; data: UpdateCampusDto }
  >({
    mutationFn: ({ id, data }) => campusApi.update(id, data),
    onSuccess: (response, { id }) => {
      queryClient.invalidateQueries({ queryKey: campusKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: campusKeys.lists() });
      toast.success(response.message || "Cập nhật cơ sở thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi cập nhật cơ sở.");
    },
  });
}
