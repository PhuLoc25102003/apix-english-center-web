import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { roleApi } from "../api/role.api";
import { roleKeys } from "@/lib/api/query-keys";
import type { UpdateRoleDto, Role } from "../types/role.type";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useUpdateRole() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Role>, ApiError, { id: string; data: UpdateRoleDto }>({
    mutationFn: ({ id, data }) => roleApi.update(id, data),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
      queryClient.invalidateQueries({ queryKey: roleKeys.detail(variables.id) });
      toast.success(response.message || "Cập nhật vai trò thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi cập nhật vai trò.");
    },
  });
}
