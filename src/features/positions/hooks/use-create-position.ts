import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { positionApi } from "../api/position.api";
import { positionKeys } from "@/lib/api/query-keys";
import type { CreatePositionDto, Position } from "../types/position.type";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useCreatePosition() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Position>, ApiError, CreatePositionDto>({
    mutationFn: (data) => positionApi.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: positionKeys.lists() });
      toast.success(response.message || "Tạo chức vụ thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi tạo chức vụ.");
    },
  });
}
