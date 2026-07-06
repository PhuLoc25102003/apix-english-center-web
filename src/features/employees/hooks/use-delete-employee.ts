import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { employeeApi } from "../api/employee.api";
import { employeeKeys } from "@/lib/api/query-keys";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, ApiError, string>({
    mutationFn: (id) => employeeApi.remove(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
      toast.success(response.message || "Xóa nhân viên thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi xóa nhân viên.");
    },
  });
}
