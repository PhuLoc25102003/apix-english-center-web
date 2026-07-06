import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { userApi } from "../api/user.api";
import { userKeys } from "@/lib/api/query-keys";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useDeactivateUser() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, ApiError, string>({
    mutationFn: (id) => userApi.deactivate(id),
    onSuccess: (response, id) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      queryClient.invalidateQueries({ queryKey: userKeys.detail(id) });
      toast.success(response.message || "Vô hiệu hóa người dùng thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi vô hiệu hóa người dùng.");
    },
  });
}
