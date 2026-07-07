import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { classScheduleApi } from "../api/class-schedule.api";
import { scheduleKeys } from "@/lib/api/query-keys";
import type { ApiError, ApiResponse } from "@/lib/api";

export interface CreatePatternPayload {
  classId: string;
  roomId: string;
  schedulePattern: string;
  effectiveFrom: string;
  effectiveTo?: string | null;
  generateMonths?: number;
  status: "ACTIVE" | "INACTIVE";
}

export function useCreateClassSchedulePattern() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<{
      generatedSessionsCount: number;
      generatedAttendanceRecordsCount: number;
      firstSessionDate: string;
      lastSessionDate: string;
    }>,
    ApiError,
    CreatePatternPayload
  >({
    mutationFn: (data) => classScheduleApi.createPattern(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: scheduleKeys.lists() });
      toast.success(response.message || "Tạo lịch học theo khung thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi tạo lịch học theo khung.");
    },
  });
}
