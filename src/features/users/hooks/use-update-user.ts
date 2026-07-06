import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { userApi } from "../api/user.api";
import { userKeys } from "@/lib/api/query-keys";
import type { UpdateUserDto, User } from "../types/user.type";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<User>, ApiError, { id: string; data: UpdateUserDto }>({
    mutationFn: ({ id, data }) => userApi.update(id, data),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) });
      toast.success(response.message || "Cập nhật người dùng thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi cập nhật người dùng.");
    },
  });
}
