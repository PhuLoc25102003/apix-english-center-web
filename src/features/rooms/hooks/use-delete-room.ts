"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { ApiError, ApiResponse } from "@/lib/api";
import { roomKeys } from "@/lib/api/query-keys";
import { roomApi } from "../api/room.api";

export function useDeleteRoom() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, ApiError, string>({
    mutationFn: (id) => roomApi.remove(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: roomKeys.lists() });
      toast.success(response.message || "Xóa phòng học thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Không thể xóa phòng học.");
    },
  });
}
