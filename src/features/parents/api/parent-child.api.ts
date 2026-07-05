/**
 * src/features/parents/api/parent-child.api.ts
 *
 * API functions for parent-child relationship management.
 */

import { apiClient, parseApiError, API_ENDPOINTS } from "@/lib/api";
import type { ApiResponse } from "@/lib/api";
import type { ParentChildRelation } from "../types/parent-child.type";

export const parentChildApi = {
  /**
   * Fetch all children relations linked to a parent.
   * GET /parents/{parentId}/children
   */
  async getChildren(parentId: string): Promise<ApiResponse<ParentChildRelation[]>> {
    try {
      const { data } = await apiClient.get<ApiResponse<ParentChildRelation[]>>(
        API_ENDPOINTS.parents.children(parentId)
      );
      return data;
    } catch (err) {
      throw parseApiError(err);
    }
  },
};
