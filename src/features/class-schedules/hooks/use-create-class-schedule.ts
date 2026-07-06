import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { classScheduleApi } from "../api/class-schedule.api";
import { scheduleKeys } from "@/lib/api/query-keys";
import type { CreateClassScheduleDto, ClassSchedule } from "../types/class-schedule.type";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useCreateClassSchedule() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<ClassSchedule>, ApiError, CreateClassScheduleDto>({
    mutationFn: (data) => classScheduleApi.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: scheduleKeys.lists() });
      toast.success(response.message || "Tạo lịch học thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi tạo lịch học.");
    },
  });
}
