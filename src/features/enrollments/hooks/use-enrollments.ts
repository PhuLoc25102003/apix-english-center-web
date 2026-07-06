import { useQuery } from "@tanstack/react-query";
import { enrollmentApi } from "../api/enrollment.api";
import { enrollmentKeys } from "@/lib/api/query-keys";
import type { ListParams } from "@/lib/api";

export function useEnrollments(params?: ListParams & { classId?: string }) {
  return useQuery({
    queryKey: enrollmentKeys.list(params ?? {}),
    queryFn: async () => {
      return enrollmentApi.getAll(params);
    },
  });
}
