"use client";

import { useQuery } from "@tanstack/react-query";
import { classApi } from "../api/class.api";
import { classKeys } from "@/lib/api/query-keys";

export function useMyClasses() {
  return useQuery({
    queryKey: [...classKeys.lists(), "my-classes"],
    queryFn: () => classApi.getMyClasses(),
  });
}
