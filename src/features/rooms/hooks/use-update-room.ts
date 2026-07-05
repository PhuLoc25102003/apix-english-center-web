"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { ApiError, ApiResponse } from "@/lib/api";
import { roomKeys } from "@/lib/api/query-keys";
import { roomApi } from "../api/room.api";
import type { Room, UpdateRoomDto } from "../types/room.type";

export function useUpdateRoom() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<Room>,
    ApiError,
    { id: string; data: UpdateRoomDto }
  >({
    mutationFn: ({ id, data }) => roomApi.update(id, data),
    onSuccess: (response, { id }) => {
      queryClient.invalidateQueries({ queryKey: roomKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: roomKeys.lists() });
      toast.success(response.message || "Cập nhật phòng học thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Không thể cập nhật phòng học.");
    },
  });
}
