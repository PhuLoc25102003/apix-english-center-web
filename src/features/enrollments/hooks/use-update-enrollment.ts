import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { enrollmentApi } from "../api/enrollment.api";
import { enrollmentKeys } from "@/lib/api/query-keys";
import type { UpdateEnrollmentDto, Enrollment } from "../types/enrollment.type";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useUpdateEnrollment() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<Enrollment>,
    ApiError,
    { id: string; data: UpdateEnrollmentDto }
  >({
    mutationFn: ({ id, data }) => enrollmentApi.update(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: enrollmentKeys.lists() });
      toast.success(response.message || "Cập nhật ghi danh thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi cập nhật ghi danh.");
    },
  });
}
