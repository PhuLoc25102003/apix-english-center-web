import { useQuery } from "@tanstack/react-query";
import { roleApi } from "../api/role.api";
import { roleKeys } from "@/lib/api/query-keys";

export function useRoleDetail(id: string) {
  return useQuery({
    queryKey: roleKeys.detail(id),
    queryFn: () => roleApi.getById(id),
    enabled: !!id,
  });
}

export function useRolePermissions(roleId: string) {
  return useQuery({
    queryKey: roleKeys.permissions(roleId),
    queryFn: () => roleApi.getRolePermissions(roleId),
    enabled: !!roleId,
  });
}
