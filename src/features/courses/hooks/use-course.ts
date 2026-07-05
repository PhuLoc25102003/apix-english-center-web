"use client";

import { useQuery } from "@tanstack/react-query";

import { courseKeys } from "@/lib/api/query-keys";
import { courseApi } from "../api/course.api";

export function useCourse(id: string) {
  return useQuery({
    queryKey: courseKeys.detail(id),
    queryFn: () => courseApi.getById(id),
    enabled: Boolean(id),
  });
}
