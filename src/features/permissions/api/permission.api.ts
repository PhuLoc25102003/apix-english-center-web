/**
 * src/features/permissions/api/permission.api.ts
 *
 * API functions for permissions.
 */

import { createCrudApi } from "@/lib/api/crud-api-factory";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { apiClient } from "@/lib/api/api-client";
import { parseApiError } from "@/lib/api/api-error";
import type { ApiResponse } from "@/lib/api/api-response";
import type { Permission } from "../types/permission.type";

const basePermissionApi = createCrudApi<Permission>(
  API_ENDPOINTS.permissions.list,
);

export const permissionApi = {
  ...basePermissionApi,

  /**
   * Fetch permission lookup list for assigning dropdowns.
   * GET /permissions/lookup
   * Note: If missing on backend, we fall back to a paginated or unpaginated list query.
   */
  async getLookup(): Promise<ApiResponse<Permission[]>> {
    try {
      const { data } = await apiClient.get<ApiResponse<Permission[]>>(
        API_ENDPOINTS.permissions.lookup
      );
      return data;
    } catch (err) {
      // Add TODO comment check for backend missing lookup API
      // Fallback: fetch list with page=0, size=1000
      try {
        const fallbackData = await basePermissionApi.getAll({ page: 1, limit: 1000 });
        return {
          success: true,
          message: "Fallback from listing query",
          data: fallbackData.data,
        };
      } catch {
        throw parseApiError(err);
      }
    }
  },
};
