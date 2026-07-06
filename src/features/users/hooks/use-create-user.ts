import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { userApi } from "../api/user.api";
import { userKeys } from "@/lib/api/query-keys";
import type { CreateUserDto, User } from "../types/user.type";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<User>, ApiError, CreateUserDto>({
    mutationFn: (data) => userApi.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toast.success(response.message || "Tạo người dùng thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi tạo người dùng.");
    },
  });
}
