import { useQuery } from "@tanstack/react-query";
import { curriculumApi } from "../api/curriculum.api";
import { curriculumKeys } from "@/lib/api/query-keys";
import type { ListParams } from "@/lib/api";

export function useCurriculums(params?: ListParams) {
  return useQuery({
    queryKey: curriculumKeys.list(params ?? {}),
    queryFn: () => curriculumApi.getAll(params),
  });
}
