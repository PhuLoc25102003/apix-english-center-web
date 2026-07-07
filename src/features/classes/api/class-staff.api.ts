import { apiClient } from "@/lib/api/api-client";
import { parseApiError } from "@/lib/api/api-error";
import type { ApiResponse } from "@/lib/api";

export interface ClassStaffAssignment {
  id: string;
  classId: string;
  employeeId: string;
  employeeName: string;
  employeeCode: string;
  staffRole: "PRIMARY_TEACHER" | "TEACHING_ASSISTANT";
  startDate: string;
  endDate: string | null;
  status: "ACTIVE" | "INACTIVE";
}

export interface AssignClassStaffDto {
  employeeId: string;
  staffRole: "PRIMARY_TEACHER" | "TEACHING_ASSISTANT";
  startDate: string;
  note?: string | null;
}

export const classStaffApi = {
  async getStaff(classId: string): Promise<ApiResponse<ClassStaffAssignment[]>> {
    try {
      const { data } = await apiClient.get<ApiResponse<ClassStaffAssignment[]>>(
        `/classes/${classId}/staff`
      );
      return data;
    } catch (err) {
      throw parseApiError(err);
    }
  },

  async assignStaff(classId: string, body: AssignClassStaffDto): Promise<ApiResponse<ClassStaffAssignment>> {
    try {
      const { data } = await apiClient.post<ApiResponse<ClassStaffAssignment>>(
        `/classes/${classId}/staff`,
        body
      );
      return data;
    } catch (err) {
      throw parseApiError(err);
    }
  },

  async removeStaff(classId: string, assignmentId: string): Promise<ApiResponse<null>> {
    try {
      const { data } = await apiClient.delete<ApiResponse<null>>(
        `/classes/${classId}/staff/${assignmentId}`
      );
      return data;
    } catch (err) {
      throw parseApiError(err);
    }
  },
};
