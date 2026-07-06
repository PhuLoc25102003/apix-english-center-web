import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { weeklyUpdateApi } from "../api/weekly-update.api";
import type { WeeklyUpdate, WeeklyUpdateDetails } from "../types/weekly-update.type";

const QUERY_KEY = "weekly-updates";

export function useWeeklyUpdates(params?: any) {
  return useQuery({
    queryKey: [QUERY_KEY, "list", params],
    queryFn: () => weeklyUpdateApi.getAll(params),
    initialData: {
      success: true,
      message: "Success",
      data: [
        {
          id: "w-1",
          classId: "c-1",
          classCode: "STA1-26",
          className: "Starters A1",
          weekStartDate: "2026-06-01",
          weekEndDate: "2026-06-07",
          title: "Báo cáo học tập Tuần 1",
          overallSummary: "Lớp học đầy đủ, các con tiếp thu bài tốt.",
          status: "DRAFT",
          submittedBy: null,
          submittedAt: null,
          approvedBy: null,
          approvedAt: null,
          rejectionReason: null,
          publishedAt: null,
        },
        {
          id: "w-2",
          classId: "c-2",
          classCode: "FLB2-12",
          className: "Flyers B2",
          weekStartDate: "2026-06-01",
          weekEndDate: "2026-06-07",
          title: "Báo cáo học tập Tuần 1",
          overallSummary: "Lớp ôn tập bài thi Flyers, kết quả tốt.",
          status: "SUBMITTED",
          submittedBy: "Mr. John Doe",
          submittedAt: "2026-06-07T12:00:00Z",
          approvedBy: null,
          approvedAt: null,
          rejectionReason: null,
          publishedAt: null,
        },
      ] as WeeklyUpdate[],
      meta: {
        page: 1,
        limit: 10,
        total: 2,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    },
    retry: false,
  });
}

export function useWeeklyUpdateDetails(id: string) {
  return useQuery<WeeklyUpdateDetails>({
    queryKey: [QUERY_KEY, "detail", id],
    queryFn: () => weeklyUpdateApi.getDetails(id),
    enabled: !!id,
    initialData: {
      update: {
        id,
        classId: "c-1",
        classCode: "STA1-26",
        className: "Starters A1",
        weekStartDate: "2026-06-01",
        weekEndDate: "2026-06-07",
        title: "Báo cáo học tập Tuần 1",
        overallSummary: "Lớp học đầy đủ, các con học từ vựng về màu sắc.",
        status: "DRAFT",
        submittedBy: null,
        submittedAt: null,
        approvedBy: null,
        approvedAt: null,
        rejectionReason: null,
        publishedAt: null,
      },
      sessionItems: [
        {
          id: "s-item-1",
          weeklyUpdateId: id,
          sessionDate: "2026-06-02",
          lessonNo: 1,
          learningContent: "Học từ vựng: Red, Blue, Yellow. Cấu trúc: What color is it?",
          homeworkContent: "Làm bài tập trang 10-11 sách bài tập Starters.",
          note: "Học viên A cần ôn tập nhiều hơn.",
        },
      ],
      images: [],
    },
    retry: false,
  });
}

export function useCreateWeeklyUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: weeklyUpdateApi.create,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

export function useUpdateWeeklyUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => weeklyUpdateApi.update(id, data),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY, "detail", variables.id] });
    },
  });
}

export function useSubmitWeeklyUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: weeklyUpdateApi.submit,
    onSuccess: (_, id) => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY, "detail", id] });
    },
  });
}

export function useApproveWeeklyUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: weeklyUpdateApi.approve,
    onSuccess: (_, id) => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY, "detail", id] });
    },
  });
}

export function useRejectWeeklyUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) => weeklyUpdateApi.reject(id, reason),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY, "detail", variables.id] });
    },
  });
}

export function usePublishWeeklyUpdate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: weeklyUpdateApi.publish,
    onSuccess: (_, id) => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY, "detail", id] });
    },
  });
}
