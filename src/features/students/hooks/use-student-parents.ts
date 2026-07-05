"use client";

/**
 * src/features/students/hooks/use-student-parents.ts
 *
 * Query hook for retrieving parents linked to a student.
 */

import { useQuery } from "@tanstack/react-query";
import { studentParentApi } from "../api/student-parent.api";
import { studentKeys } from "@/lib/api/query-keys";

export function useStudentParents(studentId: string) {
  return useQuery({
    queryKey: studentKeys.parents(studentId),
    queryFn: () => studentParentApi.getLinkedParents(studentId),
    enabled: !!studentId,
  });
}
