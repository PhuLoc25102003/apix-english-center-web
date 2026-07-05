"use client";

import { useQuery } from "@tanstack/react-query";

import { classKeys } from "@/lib/api/query-keys";
import { classApi } from "../api/class.api";

export function useClassEnrollments(classId: string) {
  return useQuery({
    queryKey: classKeys.students(classId),
    queryFn: () => classApi.getEnrollments(classId),
    enabled: Boolean(classId),
  });
}
