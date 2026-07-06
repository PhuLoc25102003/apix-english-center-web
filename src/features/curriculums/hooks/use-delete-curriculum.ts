import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { curriculumApi } from "../api/curriculum.api";
import { curriculumKeys } from "@/lib/api/query-keys";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useDeleteCurriculum() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, ApiError, string>({
    mutationFn: (id) => curriculumApi.remove(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: curriculumKeys.lists() });
      toast.success(response.message || "Xóa giáo trình thành công!");
    },
    onError: (error) => {
      toast.error(error.message || "Đã xảy ra lỗi khi xóa giáo trình.");
    },
  });
}
