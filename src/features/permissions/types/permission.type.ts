/**
 * src/features/permissions/types/permission.type.ts
 *
 * Types for permission management.
 */

export interface Permission {
  id: string;
  code: string;
  module: string;
  action: string;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type PermissionListParams = {
  search?: string;
  module?: string;
  action?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
};
