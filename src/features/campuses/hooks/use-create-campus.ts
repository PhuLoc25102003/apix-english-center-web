"use client";

/**
 * src/features/campuses/hooks/use-create-campus.ts
 *
 * Mutation hook for creating a new campus.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { campusApi } from "../api/campus.api";
import { campusKeys } from "@/lib/api/query-keys";
import type { CreateCampusDto, Campus } from "../types/campus.type";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useCreateCampus() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Campus>, ApiError, CreateCampusDto>({
    mutationFn: (data) => campusApi.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: campusKeys.lists() });
      toast.success(response.message || "Tạo cơ sở thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi tạo cơ sở.");
    },
  });
}
