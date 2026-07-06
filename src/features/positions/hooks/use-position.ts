import { useQuery } from "@tanstack/react-query";
import { positionApi } from "../api/position.api";
import { positionKeys } from "@/lib/api/query-keys";

export function usePosition(id: string) {
  return useQuery({
    queryKey: positionKeys.detail(id),
    queryFn: () => positionApi.getById(id),
    enabled: Boolean(id),
  });
}
