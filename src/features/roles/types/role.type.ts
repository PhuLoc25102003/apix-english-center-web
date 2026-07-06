/**
 * src/features/roles/types/role.type.ts
 *
 * Types for role management.
 */

export interface Role {
  id: string;
  code: string;
  name: string;
  description: string | null;
  isSystem: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  permissionCount?: number;
}

export interface CreateRoleDto {
  code: string;
  name: string;
  description?: string | null;
  isActive?: boolean;
}

export interface UpdateRoleDto {
  name: string;
  description?: string | null;
  isActive?: boolean;
}

export type RoleListParams = {
  search?: string;
  isActive?: boolean;
  isSystem?: boolean;
  page?: number;
  limit?: number;
};
