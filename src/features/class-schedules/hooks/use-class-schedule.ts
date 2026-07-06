import { useQuery } from "@tanstack/react-query";
import { classScheduleApi } from "../api/class-schedule.api";
import { scheduleKeys } from "@/lib/api/query-keys";

export function useClassSchedule(id: string) {
  return useQuery({
    queryKey: scheduleKeys.detail(id),
    queryFn: () => classScheduleApi.getById(id),
    enabled: Boolean(id),
  });
}
