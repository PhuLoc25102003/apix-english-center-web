"use client";

/**
 * src/features/students/hooks/use-student.ts
 *
 * Query hook for retrieving details of a single student.
 */

import { useQuery } from "@tanstack/react-query";
import { studentApi } from "../api/student.api";
import { studentKeys } from "@/lib/api/query-keys";

export function useStudent(id: string) {
  return useQuery({
    queryKey: studentKeys.detail(id),
    queryFn: () => studentApi.getById(id),
    enabled: !!id,
  });
}
