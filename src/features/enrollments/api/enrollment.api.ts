import { apiClient } from "@/lib/api/api-client";
import { parseApiError } from "@/lib/api/api-error";
import { createCrudApi } from "@/lib/api/crud-api-factory";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse } from "@/lib/api/api-response";
import type {
  Enrollment,
  CreateEnrollmentDto,
  UpdateEnrollmentDto,
} from "../types/enrollment.type";

const baseEnrollmentApi = createCrudApi<
  Enrollment,
  CreateEnrollmentDto,
  UpdateEnrollmentDto
>(API_ENDPOINTS.enrollments.list);

export const enrollmentApi = {
  ...baseEnrollmentApi,

  async update(
    id: string,
    body: UpdateEnrollmentDto,
  ): Promise<ApiResponse<Enrollment>> {
    try {
      const { data } = await apiClient.put<ApiResponse<Enrollment>>(
        API_ENDPOINTS.enrollments.update(id),
        body,
      );
      return data;
    } catch (err) {
      throw parseApiError(err);
    }
  },

  async getByClass(classId: string): Promise<ApiResponse<Enrollment[]>> {
    try {
      const { data } = await apiClient.get<ApiResponse<Enrollment[]>>(
        API_ENDPOINTS.enrollments.byClass(classId)
      );
      return data;
    } catch (err) {
      throw parseApiError(err);
    }
  },

  async getByStudent(studentId: string): Promise<ApiResponse<Enrollment[]>> {
    try {
      const { data } = await apiClient.get<ApiResponse<Enrollment[]>>(
        `${API_ENDPOINTS.enrollments.list}/student/${studentId}`
      );
      return data;
    } catch (err) {
      throw parseApiError(err);
    }
  },

  async cancel(id: string): Promise<ApiResponse<Enrollment>> {
    try {
      const { data } = await apiClient.put<ApiResponse<Enrollment>>(
        `${API_ENDPOINTS.enrollments.list}/${id}/cancel`
      );
      return data;
    } catch (err) {
      throw parseApiError(err);
    }
  },

  async complete(id: string): Promise<ApiResponse<Enrollment>> {
    try {
      const { data } = await apiClient.put<ApiResponse<Enrollment>>(
        `${API_ENDPOINTS.enrollments.list}/${id}/complete`
      );
      return data;
    } catch (err) {
      throw parseApiError(err);
    }
  },

  // TODO: Transfer, freeze, unfreeze endpoints depend on backend implementation
};
