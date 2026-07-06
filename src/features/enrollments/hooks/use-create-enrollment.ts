import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { enrollmentApi } from "../api/enrollment.api";
import { enrollmentKeys } from "@/lib/api/query-keys";
import type { CreateEnrollmentDto, Enrollment } from "../types/enrollment.type";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useCreateEnrollment() {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<Enrollment>, ApiError, CreateEnrollmentDto>({
    mutationFn: (data) => enrollmentApi.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: enrollmentKeys.lists() });
      toast.success(response.message || "Ghi danh học viên thành công!");
    },
    onError: (error) => {
      const fieldMessage = error.details.find((detail) => detail.message)?.message;
      toast.error(fieldMessage || error.message || "Không thể ghi danh học viên.");
    },
  });
}
