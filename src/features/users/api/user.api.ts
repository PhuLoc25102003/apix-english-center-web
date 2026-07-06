/**
 * src/features/users/api/user.api.ts
 *
 * API functions for user management.
 */

import { createCrudApi } from "@/lib/api/crud-api-factory";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { apiClient } from "@/lib/api/api-client";
import { parseApiError } from "@/lib/api/api-error";
import type { ApiResponse } from "@/lib/api/api-response";
import type { User, CreateUserDto, UpdateUserDto } from "../types/user.type";
import type { Role } from "@/features/roles/types/role.type";

const baseUserApi = createCrudApi<User, CreateUserDto, UpdateUserDto>(
  API_ENDPOINTS.users.list,
);

export const userApi = {
  ...baseUserApi,

  /**
   * Fetch users lookup list.
   * GET /users/lookup
   */
  async getLookup(): Promise<ApiResponse<User[]>> {
    try {
      const { data } = await apiClient.get<ApiResponse<User[]>>(
        API_ENDPOINTS.users.lookup
      );
      return data;
    } catch (err) {
      try {
        const fallbackData = await baseUserApi.getAll({ page: 1, limit: 1000 });
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
   * Deactivate a user.
   * PATCH /users/{id}/deactivate
   */
  async deactivate(id: string): Promise<ApiResponse<null>> {
    try {
      const { data } = await apiClient.patch<ApiResponse<null>>(
        API_ENDPOINTS.users.deactivate(id)
      );
      return data;
    } catch (err) {
      throw parseApiError(err);
    }
  },

  /**
   * Lock user account.
   * PATCH /users/{id}/lock
   */
  async lock(id: string): Promise<ApiResponse<null>> {
    try {
      const { data } = await apiClient.patch<ApiResponse<null>>(
        API_ENDPOINTS.users.lock(id)
      );
      return data;
    } catch (err) {
      throw parseApiError(err);
    }
  },

  /**
   * Unlock user account.
   * PATCH /users/{id}/unlock
   */
  async unlock(id: string): Promise<ApiResponse<null>> {
    try {
      const { data } = await apiClient.patch<ApiResponse<null>>(
        API_ENDPOINTS.users.unlock(id)
      );
      return data;
    } catch (err) {
      throw parseApiError(err);
    }
  },

  /**
   * Fetch user assigned roles.
   * GET /users/{id}/roles
   */
  async getUserRoles(userId: string): Promise<ApiResponse<Role[]>> {
    try {
      const { data } = await apiClient.get<ApiResponse<Role[]>>(
        API_ENDPOINTS.users.roles(userId)
      );
      return data;
    } catch (err) {
      throw parseApiError(err);
    }
  },

  /**
   * Assign roles to user.
   * POST /users/{id}/roles
   */
  async assignRoles(userId: string, roleIds: string[]): Promise<ApiResponse<null>> {
    try {
      const { data } = await apiClient.post<ApiResponse<null>>(
        API_ENDPOINTS.users.roles(userId),
        { roleIds }
      );
      return data;
    } catch (err) {
      throw parseApiError(err);
    }
  },

  /**
   * Remove a role from user.
   * DELETE /users/{id}/roles/{roleId}
   */
  async removeRole(userId: string, roleId: string): Promise<ApiResponse<null>> {
    try {
      const { data } = await apiClient.delete<ApiResponse<null>>(
        API_ENDPOINTS.users.removeRole(userId, roleId)
      );
      return data;
    } catch (err) {
      throw parseApiError(err);
    }
  },

  /**
   * Reset user password.
   * PATCH /users/{id}/reset-password
   */
  async resetPassword(userId: string): Promise<ApiResponse<{ temporaryPassword?: string }>> {
    try {
      const { data } = await apiClient.patch<ApiResponse<{ temporaryPassword?: string }>>(
        API_ENDPOINTS.users.resetPassword(userId)
      );
      return data;
    } catch (err) {
      throw parseApiError(err);
    }
  },
};
