import { useQuery } from "@tanstack/react-query";
import { classScheduleApi } from "../api/class-schedule.api";
import { scheduleKeys } from "@/lib/api/query-keys";
import type { ListParams } from "@/lib/api";

export function useClassSchedules(params?: ListParams) {
  return useQuery({
    queryKey: scheduleKeys.list(params ?? {}),
    queryFn: () => classScheduleApi.getAll(params),
  });
}
