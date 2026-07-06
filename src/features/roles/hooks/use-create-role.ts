import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { roleApi } from "../api/role.api";
import { roleKeys } from "@/lib/api/query-keys";
import type { CreateRoleDto, Role } from "../types/role.type";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Role>, ApiError, CreateRoleDto>({
    mutationFn: (data) => roleApi.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: roleKeys.lists() });
      toast.success(response.message || "Tạo vai trò thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi tạo vai trò.");
    },
  });
}
