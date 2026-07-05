"use client";

import { useQuery } from "@tanstack/react-query";

import { studentKeys } from "@/lib/api/query-keys";
import { tuitionApi } from "../api/tuition.api";

export function useStudentTuition(studentId: string) {
  return useQuery({
    queryKey: studentKeys.tuition(studentId),
    queryFn: () => tuitionApi.getInvoicesByStudent(studentId),
    enabled: Boolean(studentId),
  });
}
