import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { userApi } from "../api/user.api";
import { userKeys } from "@/lib/api/query-keys";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useAssignUserRoles() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, ApiError, { userId: string; roleIds: string[] }>({
    mutationFn: ({ userId, roleIds }) => userApi.assignRoles(userId, roleIds),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.userId) });
      queryClient.invalidateQueries({ queryKey: userKeys.roles(variables.userId) });
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toast.success(response.message || "Gán vai trò thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi gán vai trò.");
    },
  });
}
