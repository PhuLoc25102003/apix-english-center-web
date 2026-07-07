"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { classStaffApi } from "../api/class-staff.api";
import { classKeys } from "@/lib/api/query-keys";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useRemoveClassStaff(classId: string) {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<null>, ApiError, string>({
    mutationFn: (assignmentId) => classStaffApi.removeStaff(classId, assignmentId),
    onSuccess: (resp) => {
      queryClient.invalidateQueries({ queryKey: [...classKeys.detail(classId), "staff"] });
      toast.success(resp.message || "Gỡ phân công nhân sự thành công!");
    },
    onError: (err) => {
      toast.error(err.message || "Lỗi gỡ phân công nhân sự.");
    },
  });
}
