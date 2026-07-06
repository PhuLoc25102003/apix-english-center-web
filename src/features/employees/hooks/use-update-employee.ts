import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { employeeApi } from "../api/employee.api";
import { employeeKeys } from "@/lib/api/query-keys";
import type { UpdateEmployeeDto, Employee } from "../types/employee.type";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useUpdateEmployee() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<Employee>,
    ApiError,
    { id: string; data: UpdateEmployeeDto }
  >({
    mutationFn: ({ id, data }) => employeeApi.update(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
      toast.success(response.message || "Cập nhật nhân viên thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi cập nhật nhân viên.");
    },
  });
}
