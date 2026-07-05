"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { ApiError, ApiResponse } from "@/lib/api";
import { classKeys } from "@/lib/api/query-keys";
import { classApi } from "../api/class.api";
import type { ClassRecord, UpdateClassDto } from "../types/class.type";

export function useUpdateClass() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<ClassRecord>,
    ApiError,
    { id: string; data: UpdateClassDto }
  >({
    mutationFn: ({ id, data }) => classApi.update(id, data),
    onSuccess: (response, { id }) => {
      queryClient.invalidateQueries({ queryKey: classKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: classKeys.lists() });
      toast.success(response.message || "Cập nhật lớp học thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Không thể cập nhật lớp học.");
    },
  });
}
