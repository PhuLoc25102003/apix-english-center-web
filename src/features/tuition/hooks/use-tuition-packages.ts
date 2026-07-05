"use client";

import { useQuery } from "@tanstack/react-query";

import { tuitionKeys } from "@/lib/api/query-keys";
import { tuitionApi } from "../api/tuition.api";

export function useTuitionPackages() {
  return useQuery({
    queryKey: tuitionKeys.packages(),
    queryFn: tuitionApi.getPackages,
  });
}
