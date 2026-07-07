"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { enrollmentApi } from "../api/enrollment.api";
import { classKeys, studentKeys, enrollmentKeys, attendanceKeys } from "@/lib/api/query-keys";
import type { CreateEnrollmentDto } from "../types/enrollment.type";
import type { ApiError, ApiResponse } from "@/lib/api";

export function useEnrollStudentToClass() {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<any>, ApiError, CreateEnrollmentDto>({
    mutationFn: (dto) => enrollmentApi.create(dto),
    onSuccess: (resp, variables) => {
      // Invalidate class students list
      queryClient.invalidateQueries({ queryKey: classKeys.students(variables.classId) });
      // Invalidate student class history
      queryClient.invalidateQueries({ queryKey: [...studentKeys.detail(variables.studentId), "classes"] });
      // Invalidate enrollment list
      queryClient.invalidateQueries({ queryKey: enrollmentKeys.lists() });
      // Invalidate generated attendance/session data if affected
      queryClient.invalidateQueries({ queryKey: attendanceKeys.lists() });

      toast.success(resp.message || "Ghi danh học viên thành công!");
    },
    onError: (err) => {
      toast.error(err.message || "Lỗi ghi danh học viên vào lớp.");
    },
  });
}
