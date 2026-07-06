import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { enrollmentApi } from "../api/enrollment.api";
import { enrollmentKeys } from "@/lib/api/query-keys";
import type { Enrollment } from "../types/enrollment.type";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useCancelEnrollment() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Enrollment>, ApiError, string>({
    mutationFn: (id) => enrollmentApi.cancel(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: enrollmentKeys.lists() });
      toast.success(response.message || "Đã hủy ghi danh học viên thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi hủy ghi danh.");
    },
  });
}
