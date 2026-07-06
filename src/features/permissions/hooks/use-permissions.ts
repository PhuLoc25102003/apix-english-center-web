/**
 * src/features/permissions/hooks/use-permissions.ts
 *
 * Hooks for permission data fetching.
 */

import { useQuery } from "@tanstack/react-query";
import { permissionApi } from "../api/permission.api";
import { permissionKeys } from "@/lib/api/query-keys";
import type { ListParams } from "@/lib/api/crud-api-factory";

export function usePermissions(params?: ListParams) {
  return useQuery({
    queryKey: permissionKeys.list(params ?? {}),
    queryFn: () => permissionApi.getAll(params),
  });
}

export function usePermissionLookup() {
  return useQuery({
    queryKey: [...permissionKeys.all, "lookup"] as const,
    queryFn: () => permissionApi.getLookup(),
  });
}

export function usePermissionDetail(id: string) {
  return useQuery({
    queryKey: [...permissionKeys.all, "detail", id] as const,
    queryFn: () => permissionApi.getById(id),
    enabled: !!id,
  });
}
