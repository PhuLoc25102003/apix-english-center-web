import { createCrudApi } from "@/lib/api/crud-api-factory";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { apiClient } from "@/lib/api/api-client";
import { parseApiError } from "@/lib/api/api-error";
import type { ApiResponse } from "@/lib/api";
import type {
  ClassSchedule,
  CreateClassScheduleDto,
  UpdateClassScheduleDto,
} from "../types/class-schedule.type";

const baseClassScheduleApi = createCrudApi<
  ClassSchedule,
  CreateClassScheduleDto,
  UpdateClassScheduleDto
>(API_ENDPOINTS.schedules.list);

export const classScheduleApi = {
  ...baseClassScheduleApi,

  async createPattern(body: {
    classId: string;
    roomId: string;
    schedulePattern: string;
    effectiveFrom: string;
    effectiveTo?: string | null;
    generateMonths?: number;
    status: "ACTIVE" | "INACTIVE";
  }): Promise<ApiResponse<{
    generatedSessionsCount: number;
    generatedAttendanceRecordsCount: number;
    firstSessionDate: string;
    lastSessionDate: string;
  }>> {
    try {
      const { data } = await apiClient.post<ApiResponse<any>>(
        `${API_ENDPOINTS.schedules.list}/pattern`,
        body
      );
      return data;
    } catch (err) {
      throw parseApiError(err);
    }
  }
};
