"use client";

import { useQuery } from "@tanstack/react-query";

import { classKeys } from "@/lib/api/query-keys";
import { classApi } from "../api/class.api";
import type { ClassListParams } from "../types/class.type";

export function useClasses(params: ClassListParams = {}) {
  return useQuery({
    queryKey: classKeys.list(params),
    queryFn: () => classApi.getAll(params),
  });
}
