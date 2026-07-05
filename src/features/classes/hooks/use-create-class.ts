"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { ApiError, ApiResponse } from "@/lib/api";
import { classKeys } from "@/lib/api/query-keys";
import { classApi } from "../api/class.api";
import type { ClassRecord, CreateClassDto } from "../types/class.type";

export function useCreateClass() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<ClassRecord>, ApiError, CreateClassDto>({
    mutationFn: (data) => classApi.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: classKeys.lists() });
      toast.success(response.message || "Tạo lớp học thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Không thể tạo lớp học.");
    },
  });
}
