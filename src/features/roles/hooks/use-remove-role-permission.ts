import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { roleApi } from "../api/role.api";
import { roleKeys } from "@/lib/api/query-keys";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useRemoveRolePermission() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, ApiError, { roleId: string; permissionId: string }>({
    mutationFn: ({ roleId, permissionId }) => roleApi.removePermission(roleId, permissionId),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: roleKeys.detail(variables.roleId) });
      queryClient.invalidateQueries({ queryKey: roleKeys.permissions(variables.roleId) });
      queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
      toast.success(response.message || "Gỡ quyền khỏi vai trò thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi gỡ quyền.");
    },
  });
}
