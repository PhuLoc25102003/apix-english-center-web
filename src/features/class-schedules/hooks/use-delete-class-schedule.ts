import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { classScheduleApi } from "../api/class-schedule.api";
import { scheduleKeys } from "@/lib/api/query-keys";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useDeleteClassSchedule() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, ApiError, string>({
    mutationFn: (id) => classScheduleApi.remove(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: scheduleKeys.lists() });
      toast.success(response.message || "Xóa lịch học thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi xóa lịch học.");
    },
  });
}
