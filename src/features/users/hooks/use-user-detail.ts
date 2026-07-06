import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/user.api";
import { userKeys } from "@/lib/api/query-keys";

export function useUserDetail(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userApi.getById(id),
    enabled: !!id,
  });
}

export function useUserRoles(userId: string) {
  return useQuery({
    queryKey: userKeys.roles(userId),
    queryFn: () => userApi.getUserRoles(userId),
    enabled: !!userId,
  });
}
