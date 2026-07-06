import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { positionApi } from "../api/position.api";
import { positionKeys } from "@/lib/api/query-keys";
import type { UpdatePositionDto, Position } from "../types/position.type";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useUpdatePosition() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<Position>,
    ApiError,
    { id: string; data: UpdatePositionDto }
  >({
    mutationFn: ({ id, data }) => positionApi.update(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: positionKeys.lists() });
      toast.success(response.message || "Cập nhật chức vụ thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi cập nhật chức vụ.");
    },
  });
}
