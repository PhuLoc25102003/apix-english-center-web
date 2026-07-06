import { useQuery } from "@tanstack/react-query";
import { positionApi } from "../api/position.api";
import { positionKeys } from "@/lib/api/query-keys";
import type { ListParams } from "@/lib/api";

export function usePositions(params?: ListParams) {
  return useQuery({
    queryKey: positionKeys.list(params ?? {}),
    queryFn: () => positionApi.getAll(params),
  });
}
