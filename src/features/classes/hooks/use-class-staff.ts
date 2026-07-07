"use client";

import { useQuery } from "@tanstack/react-query";
import { classStaffApi } from "../api/class-staff.api";
import { classKeys } from "@/lib/api/query-keys";

export function useClassStaff(classId: string) {
  return useQuery({
    queryKey: [...classKeys.detail(classId), "staff"],
    queryFn: () => classStaffApi.getStaff(classId),
    enabled: !!classId,
  });
}
