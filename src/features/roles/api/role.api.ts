/**
 * src/features/roles/api/role.api.ts
 *
 * API functions for role management.
 */

import { createCrudApi } from "@/lib/api/crud-api-factory";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { apiClient } from "@/lib/api/api-client";
import { parseApiError } from "@/lib/api/api-error";
import type { ApiResponse } from "@/lib/api/api-response";
import type { Role, CreateRoleDto, UpdateRoleDto } from "../types/role.type";
import type { Permission } from "@/features/permissions/types/permission.type";

const baseRoleApi = createCrudApi<Role, CreateRoleDto, UpdateRoleDto>(
  API_ENDPOINTS.roles.list,
);

export const roleApi = {
  ...baseRoleApi,

  /**
   * Fetch roles lookup list for dropdown options.
   * GET /roles/lookup
   */
  async getLookup(): Promise<ApiResponse<Role[]>> {
    try {
      const { data } = await apiClient.get<ApiResponse<Role[]>>(
        API_ENDPOINTS.roles.lookup
      );
      return data;
    } catch (err) {
      // Fallback if missing on backend
      try {
        const fallbackData = await baseRoleApi.getAll({ page: 1, limit: 1000 });
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

  /**
   * Fetch current assigned permissions for a role.
   * GET /roles/{id}/permissions
   */
  async getRolePermissions(roleId: string): Promise<ApiResponse<Permission[]>> {
    try {
      const { data } = await apiClient.get<ApiResponse<Permission[]>>(
        API_ENDPOINTS.roles.permissions(roleId)
      );
      return data;
    } catch (err) {
      throw parseApiError(err);
    }
  },

  /**
   * Assign permissions to a role.
   * POST /roles/{id}/permissions
   */
  async assignPermissions(roleId: string, permissionIds: string[]): Promise<ApiResponse<null>> {
    try {
      const { data } = await apiClient.post<ApiResponse<null>>(
        API_ENDPOINTS.roles.permissions(roleId),
        { permissionIds }
      );
      return data;
    } catch (err) {
      throw parseApiError(err);
    }
  },

  /**
   * Remove a single permission from a role.
   * DELETE /roles/{id}/permissions/{permissionId}
   */
  async removePermission(roleId: string, permissionId: string): Promise<ApiResponse<null>> {
    try {
      const { data } = await apiClient.delete<ApiResponse<null>>(
        API_ENDPOINTS.roles.removePermission(roleId, permissionId)
      );
      return data;
    } catch (err) {
      throw parseApiError(err);
    }
  },
};
