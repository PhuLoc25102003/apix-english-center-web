import { createCrudApi } from "@/lib/api/crud-api-factory";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type {
  ClassSchedule,
  CreateClassScheduleDto,
  UpdateClassScheduleDto,
} from "../types/class-schedule.type";

export const classScheduleApi = createCrudApi<
  ClassSchedule,
  CreateClassScheduleDto,
  UpdateClassScheduleDto
>(API_ENDPOINTS.schedules.list);
