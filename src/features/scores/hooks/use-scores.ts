import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { scoreApi } from "../api/score.api";
import type { ScoreItem, ScoreDetails } from "../types/score.type";

const QUERY_KEY = "scores";

export function useScoreItems(params?: any) {
  return useQuery({
    queryKey: [QUERY_KEY, "list", params],
    queryFn: () => scoreApi.getAll(params),
    initialData: {
      success: true,
      message: "Success",
      data: [
        {
          id: "s-item-1",
          classId: "c-1",
          classCode: "STA1-26",
          className: "Starters A1",
          title: "Kiểm tra giữa kỳ Unit 3",
          scoreDate: "2026-06-15",
          maxScore: 10,
          description: "Speaking & Writing checks",
          status: "DRAFT",
          publishedAt: null,
        },
        {
          id: "s-item-2",
          classId: "c-2",
          classCode: "FLB2-12",
          className: "Flyers B2",
          title: "Kiểm tra cuối khóa Flyers",
          scoreDate: "2026-06-20",
          maxScore: 15,
          description: "Full Cambridge Mock Test",
          status: "PUBLISHED",
          publishedAt: "2026-06-21T09:00:00Z",
        },
      ] as ScoreItem[],
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

export function useScoreDetails(id: string) {
  return useQuery<ScoreDetails>({
    queryKey: [QUERY_KEY, "detail", id],
    queryFn: () => scoreApi.getDetails(id),
    enabled: !!id,
    initialData: {
      item: {
        id,
        classId: "c-1",
        classCode: "STA1-26",
        className: "Starters A1",
        title: "Kiểm tra giữa kỳ Unit 3",
        scoreDate: "2026-06-15",
        maxScore: 10,
        description: "Speaking & Writing checks",
        status: "DRAFT",
        publishedAt: null,
      },
      records: [
        {
          id: "rec-1",
          scoreItemId: id,
          studentId: "stud-1",
          studentCode: "ST001",
          studentName: "Nguyễn Văn A",
          scoreValue: 8.5,
          note: "Phát âm tốt, cần luyện thêm viết.",
          gradedBy: "Mr. John Doe",
          gradedAt: "2026-06-15T15:00:00Z",
          savedStatus: "saved",
        },
        {
          id: "rec-2",
          scoreItemId: id,
          studentId: "stud-2",
          studentCode: "ST002",
          studentName: "Trần Thị B",
          scoreValue: 9.0,
          note: "Ngữ pháp xuất sắc.",
          gradedBy: "Mr. John Doe",
          gradedAt: "2026-06-15T15:05:00Z",
          savedStatus: "saved",
        },
      ],
    },
    retry: false,
  });
}

export function useCreateScoreItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: scoreApi.create,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

export function useSaveScoreRecords(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: any) => scoreApi.saveRecords(id, body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY, "detail", id] });
    },
  });
}

export function usePublishScoreItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: scoreApi.publish,
    onSuccess: (_, id) => {
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [QUERY_KEY, "detail", id] });
    },
  });
}
