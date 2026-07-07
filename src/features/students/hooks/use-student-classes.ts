"use client";

import { useQuery } from "@tanstack/react-query";
import { studentApi } from "../api/student.api";
import { studentKeys } from "@/lib/api/query-keys";

export function useStudentClasses(studentId: string) {
  return useQuery({
    queryKey: [...studentKeys.detail(studentId), "classes"],
    queryFn: () => studentApi.getStudentClasses(studentId),
    enabled: !!studentId,
  });
}
