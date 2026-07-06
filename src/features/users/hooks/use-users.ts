import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/user.api";
import { userKeys } from "@/lib/api/query-keys";
import type { ListParams } from "@/lib/api/crud-api-factory";

export function useUsers(params?: ListParams) {
  return useQuery({
    queryKey: userKeys.list(params ?? {}),
    queryFn: () => userApi.getAll(params),
  });
}

export function useUserLookup() {
  return useQuery({
    queryKey: [...userKeys.all, "lookup"] as const,
    queryFn: () => userApi.getLookup(),
  });
}
