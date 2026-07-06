import { getCurrentUser } from "@/lib/auth/current-user-storage";

/**
 * Checks if the current logged-in user has the required permission(s).
 * Always returns true for users with role "SUPER_ADMIN" or "OWNER".
 *
 * @param permission - A single permission string or an array of permissions.
 *                     If an array, returns true if the user has AT LEAST ONE of the permissions.
 */
export function hasPermission(permission: string | string[]): boolean {
  const user = getCurrentUser();
  if (!user) return false;

  // Super Admin & Owner bypass
  const roles = user.roles || [];
  if (roles.includes("SUPER_ADMIN") || roles.includes("OWNER")) {
    return true;
  }

  const userPerms = user.permissions || [];

  if (Array.isArray(permission)) {
    return permission.some((p) => userPerms.includes(p));
  }

  return userPerms.includes(permission);
}
