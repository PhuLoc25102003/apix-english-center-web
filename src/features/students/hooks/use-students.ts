"use client";

/**
 * src/features/students/hooks/use-students.ts
 *
 * Query hook for listing students with optional filters/pagination.
 */

import { useQuery } from "@tanstack/react-query";
import { studentApi } from "../api/student.api";
import { studentKeys } from "@/lib/api/query-keys";
import type { ListParams } from "@/lib/api";

export function useStudents(params?: ListParams) {
  return useQuery({
    queryKey: studentKeys.list(params ?? {}),
    queryFn: () => studentApi.getAll(params),
  });
}
