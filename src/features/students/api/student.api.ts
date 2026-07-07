/**
 * src/features/students/api/student.api.ts
 *
 * API functions for student management.
 * Leverages generic CRUD factory and standard endpoints.
 */

import { createCrudApi } from "@/lib/api/crud-api-factory";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { apiClient } from "@/lib/api/api-client";
import { parseApiError } from "@/lib/api/api-error";
import type { ApiResponse } from "@/lib/api/api-response";
import type { Student, CreateStudentDto, UpdateStudentDto } from "../types/student.type";

const baseStudentApi = createCrudApi<Student, CreateStudentDto, UpdateStudentDto>(
  API_ENDPOINTS.students.list,
);

export const studentApi = {
  ...baseStudentApi,

  async getStudentClasses(studentId: string): Promise<ApiResponse<any[]>> {
    try {
      const { data } = await apiClient.get<ApiResponse<any[]>>(
        `${API_ENDPOINTS.students.list}/${studentId}/classes`
      );
      return data;
    } catch (err) {
      throw parseApiError(err);
    }
  }
};
