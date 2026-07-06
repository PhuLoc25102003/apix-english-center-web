import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { employeeApi } from "../api/employee.api";
import { employeeKeys } from "@/lib/api/query-keys";
import type { CreateEmployeeDto, Employee } from "../types/employee.type";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useCreateEmployee() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Employee>, ApiError, CreateEmployeeDto>({
    mutationFn: (data) => employeeApi.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.lists() });
      toast.success(response.message || "Thêm nhân viên thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi thêm nhân viên.");
    },
  });
}
