import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { positionApi } from "../api/position.api";
import { positionKeys } from "@/lib/api/query-keys";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useDeletePosition() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, ApiError, string>({
    mutationFn: (id) => positionApi.remove(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: positionKeys.lists() });
      toast.success(response.message || "Xóa chức vụ thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi xóa chức vụ.");
    },
  });
}
