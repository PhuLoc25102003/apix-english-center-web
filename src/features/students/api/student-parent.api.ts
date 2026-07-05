/**
 * src/features/students/api/student-parent.api.ts
 *
 * API functions for student-parent relationship management.
 */

import { apiClient, parseApiError, API_ENDPOINTS } from "@/lib/api";
import type { ApiResponse } from "@/lib/api";
import type { StudentParentRelation, LinkParentPayload } from "../types/student-parent.type";

export const studentParentApi = {
  /**
   * Fetch all parent relations linked to a student.
   * GET /students/{studentId}/parents
   */
  async getLinkedParents(studentId: string): Promise<ApiResponse<StudentParentRelation[]>> {
    try {
      const { data } = await apiClient.get<ApiResponse<StudentParentRelation[]>>(
        API_ENDPOINTS.students.parents(studentId)
      );
      return data;
    } catch (err) {
      throw parseApiError(err);
    }
  },

  /**
   * Link an existing parent to a student with relationship configuration.
   * POST /students/{studentId}/parents
   */
  async linkParent(
    studentId: string,
    payload: LinkParentPayload
  ): Promise<ApiResponse<StudentParentRelation>> {
    try {
      const { data } = await apiClient.post<ApiResponse<StudentParentRelation>>(
        API_ENDPOINTS.students.parents(studentId),
        payload
      );
      return data;
    } catch (err) {
      throw parseApiError(err);
    }
  },

  /**
   * Unlink a parent relationship from a student.
   * DELETE /students/{studentId}/parents/{parentId}
   */
  async unlinkParent(studentId: string, parentId: string): Promise<ApiResponse<null>> {
    try {
      const { data } = await apiClient.delete<ApiResponse<null>>(
        `${API_ENDPOINTS.students.parents(studentId)}/${parentId}`
      );
      return data;
    } catch (err) {
      throw parseApiError(err);
    }
  },
};
