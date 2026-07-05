"use client";

import { useQuery } from "@tanstack/react-query";

import { courseKeys } from "@/lib/api/query-keys";
import { courseApi } from "../api/course.api";
import type { CourseListParams } from "../types/course.type";

export function useCourses(params: CourseListParams = {}) {
  return useQuery({
    queryKey: courseKeys.list(params),
    queryFn: () => courseApi.getAll(params),
  });
}
