import { useQuery } from "@tanstack/react-query";
import { roleApi } from "../api/role.api";
import { roleKeys } from "@/lib/api/query-keys";
import type { ListParams } from "@/lib/api/crud-api-factory";

export function useRoles(params?: ListParams) {
  return useQuery({
    queryKey: roleKeys.list(params ?? {}),
    queryFn: () => roleApi.getAll(params),
  });
}

export function useRoleLookup() {
  return useQuery({
    queryKey: [...roleKeys.all, "lookup"] as const,
    queryFn: () => roleApi.getLookup(),
  });
}
