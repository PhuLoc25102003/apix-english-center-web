/**
 * src/features/users/types/user.type.ts
 *
 * TypeScript definitions for user management.
 */

import type { Role } from "@/features/roles/types/role.type";

export type UserStatus = "ACTIVE" | "INACTIVE" | "LOCKED" | "PENDING";

export interface User {
  id: string;
  email: string | null;
  phone: string | null;
  username: string | null;
  fullName: string;
  avatarUrl: string | null;
  status: UserStatus;
  emailVerified: boolean;
  phoneVerified: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
  roles: Role[];
}

export interface CreateUserDto {
  fullName: string;
  email?: string | null;
  phone?: string | null;
  username?: string | null;
  temporaryPassword?: string | null;
  status: UserStatus;
}

export interface UpdateUserDto {
  fullName: string;
  email?: string | null;
  phone?: string | null;
  username?: string | null;
  status: UserStatus;
}

export type UserListParams = {
  search?: string;
  status?: UserStatus;
  roleId?: string;
  campusId?: string;
  page?: number;
  limit?: number;
};
