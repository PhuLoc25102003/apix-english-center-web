import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { roleApi } from "../api/role.api";
import { roleKeys } from "@/lib/api/query-keys";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useDeleteRole() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, ApiError, string>({
    mutationFn: (id) => roleApi.remove(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
      toast.success(response.message || "Xóa vai trò thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Không thể xóa vai trò. Có thể vai trò này đã được gán hoặc là vai trò hệ thống.");
    },
  });
}
