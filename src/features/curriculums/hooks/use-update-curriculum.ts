import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { curriculumApi } from "../api/curriculum.api";
import { curriculumKeys } from "@/lib/api/query-keys";
import type { UpdateCurriculumDto, Curriculum } from "../types/curriculum.type";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useUpdateCurriculum() {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<Curriculum>,
    ApiError,
    { id: string; data: UpdateCurriculumDto }
  >({
    mutationFn: ({ id, data }) => curriculumApi.update(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: curriculumKeys.lists() });
      toast.success(response.message || "Cập nhật giáo trình thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi cập nhật giáo trình.");
    },
  });
}
