/**
 * src/features/attendance/api/attendance.api.ts
 *
 * Client API layer for class sessions and student attendance.
 * Connects directly to backend endpoints.
 */

import { apiClient } from "@/lib/api/api-client";
import { parseApiError } from "@/lib/api/api-error";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse, PageResponse } from "@/lib/api";
import type {
  ClassSession,
  ClassSessionFilters,
  CreateClassSessionRequest,
  UpdateClassSessionRequest,
  SessionAttendanceDetail,
  SaveStudentAttendanceRequest,
} from "../types/attendance.type";

export const attendanceApi = {
  async getAll(params?: ClassSessionFilters): Promise<PageResponse<ClassSession>> {
    try {
      let url = API_ENDPOINTS.attendance.list;
      if (params?.classId) {
        url = `${API_ENDPOINTS.classes.list}/${params.classId}/sessions`;
      }
      const { data } = await apiClient.get<PageResponse<ClassSession>>(url, { params });
      return data;
    } catch (err) {
      throw parseApiError(err);
    }
  },

  async getById(id: string): Promise<ApiResponse<ClassSession>> {
    try {
      const { data } = await apiClient.get<ApiResponse<ClassSession>>(
        `${API_ENDPOINTS.attendance.list}/sessions/${id}`
      );
      return data;
    } catch (err) {
      throw parseApiError(err);
    }
  },

  async create(body: CreateClassSessionRequest): Promise<ApiResponse<ClassSession>> {
    try {
      const { data } = await apiClient.post<ApiResponse<ClassSession>>(
        `${API_ENDPOINTS.attendance.list}/sessions`,
        body
      );
      return data;
    } catch (err) {
      throw parseApiError(err);
    }
  },

  async update(id: string, body: UpdateClassSessionRequest): Promise<ApiResponse<ClassSession>> {
    try {
      const { data } = await apiClient.put<ApiResponse<ClassSession>>(
        API_ENDPOINTS.attendance.update(id),
        body
      );
      return data;
    } catch (err) {
      throw parseApiError(err);
    }
  },

  async remove(id: string): Promise<ApiResponse<null>> {
    try {
      const { data } = await apiClient.delete<ApiResponse<null>>(
        `${API_ENDPOINTS.attendance.list}/sessions/${id}`
      );
      return data;
    } catch (err) {
      throw parseApiError(err);
    }
  },

  async seedInitialReferences(classId: string, roomId: string): Promise<void> {
    // No-op for real backend
  },

  async getSessionStudents(sessionId: string): Promise<SessionAttendanceDetail> {
    try {
      const { data } = await apiClient.get<ApiResponse<SessionAttendanceDetail>>(
        API_ENDPOINTS.attendance.bySession(sessionId)
      );
      return data.data;
    } catch (err) {
      throw parseApiError(err);
    }
  },

  async saveStudentAttendance(
    sessionId: string,
    payload: SaveStudentAttendanceRequest
  ): Promise<ApiResponse<null>> {
    try {
      const { data } = await apiClient.post<ApiResponse<null>>(
        API_ENDPOINTS.attendance.bulkMark,
        { sessionId, ...payload }
      );
      return data;
    } catch (err) {
      throw parseApiError(err);
    }
  },
};
