"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { classStaffApi, type AssignClassStaffDto } from "../api/class-staff.api";
import { classKeys } from "@/lib/api/query-keys";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useAssignClassStaff(classId: string) {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<any>, ApiError, AssignClassStaffDto>({
    mutationFn: (dto) => classStaffApi.assignStaff(classId, dto),
    onSuccess: (resp) => {
      queryClient.invalidateQueries({ queryKey: [...classKeys.detail(classId), "staff"] });
      toast.success(resp.message || "Phân công nhân sự thành công!");
    },
    onError: (err) => {
      toast.error(err.message || "Lỗi phân công nhân sự.");
    },
  });
}
