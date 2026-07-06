import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { classScheduleApi } from "../api/class-schedule.api";
import { scheduleKeys } from "@/lib/api/query-keys";
import type { UpdateClassScheduleDto, ClassSchedule } from "../types/class-schedule.type";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useUpdateClassSchedule() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<ClassSchedule>,
    ApiError,
    { id: string; data: UpdateClassScheduleDto }
  >({
    mutationFn: ({ id, data }) => classScheduleApi.update(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: scheduleKeys.lists() });
      toast.success(response.message || "Cập nhật lịch học thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi cập nhật lịch học.");
    },
  });
}
