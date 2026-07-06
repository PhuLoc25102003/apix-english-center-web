import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { curriculumApi } from "../api/curriculum.api";
import { curriculumKeys } from "@/lib/api/query-keys";
import type { CreateCurriculumDto, Curriculum } from "../types/curriculum.type";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useCreateCurriculum() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Curriculum>, ApiError, CreateCurriculumDto>({
    mutationFn: (data) => curriculumApi.create(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: curriculumKeys.lists() });
      toast.success(response.message || "Tạo giáo trình thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi tạo giáo trình.");
    },
  });
}
