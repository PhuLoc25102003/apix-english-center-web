"use client";

import { useQuery } from "@tanstack/react-query";

import { classKeys } from "@/lib/api/query-keys";
import { tuitionApi } from "../api/tuition.api";

export function useClassTuition(classId: string) {
  return useQuery({
    queryKey: classKeys.tuition(classId),
    queryFn: () => tuitionApi.getInvoicesByClass(classId),
    enabled: Boolean(classId),
  });
}
