import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { userApi } from "../api/user.api";
import { userKeys } from "@/lib/api/query-keys";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useRemoveUserRole() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, ApiError, { userId: string; roleId: string }>({
    mutationFn: ({ userId, roleId }) => userApi.removeRole(userId, roleId),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.userId) });
      queryClient.invalidateQueries({ queryKey: userKeys.roles(variables.userId) });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toast.success(response.message || "Gỡ vai trò thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi gỡ vai trò.");
    },
  });
}
