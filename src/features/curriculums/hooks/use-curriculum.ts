import { useQuery } from "@tanstack/react-query";
import { curriculumApi } from "../api/curriculum.api";
import { curriculumKeys } from "@/lib/api/query-keys";

export function useCurriculum(id: string) {
  return useQuery({
    queryKey: curriculumKeys.detail(id),
    queryFn: () => curriculumApi.getById(id),
    enabled: Boolean(id),
  });
}
