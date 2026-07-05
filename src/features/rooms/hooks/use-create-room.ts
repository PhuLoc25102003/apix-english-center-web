"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { ApiError, ApiResponse } from "@/lib/api";
import { roomKeys } from "@/lib/api/query-keys";
import { roomApi } from "../api/room.api";
import type { CreateRoomDto, Room } from "../types/room.type";

export function useCreateRoom() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Room>, ApiError, CreateRoomDto>({
    mutationFn: (data) => roomApi.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: roomKeys.lists() });
      toast.success(response.message || "Tạo phòng học thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Không thể tạo phòng học.");
    },
  });
}
