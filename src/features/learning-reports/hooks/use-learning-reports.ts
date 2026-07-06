import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { learningReportApi } from "../api/learning-report.api";
import type { LearningReportCycle, LearningReport } from "../types/learning-report.type";

const CYCLES_KEY = "learning-report-cycles";
const REPORTS_KEY = "learning-reports";

export function useReportCycles(params?: any) {
  return useQuery({
    queryKey: [CYCLES_KEY, "list", params],
    queryFn: () => learningReportApi.cycles.getAll(params),
    initialData: {
      success: true,
      message: "Success",
      data: [
        {
          id: "cycle-1",
          classId: "c-1",
          classCode: "STA1-26",
          className: "Starters A1",
          reportType: "TWO_MONTH",
          periodStart: "2026-05-01",
          periodEnd: "2026-06-30",
          teacherDeadlineAt: "2026-07-10T23:59:59Z",
          officePublishDeadlineAt: "2026-07-15T23:59:59Z",
          status: "OPEN",
        },
      ] as LearningReportCycle[],
      meta: {
        page: 1,
        limit: 10,
        total: 1,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    },
    retry: false,
  });
}

export function useCreateReportCycle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: learningReportApi.cycles.create,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [CYCLES_KEY] });
    },
  });
}

export function useReports(params?: any) {
  return useQuery({
    queryKey: [REPORTS_KEY, "list", params],
    queryFn: () => learningReportApi.reports.getAll(params),
    initialData: {
      success: true,
      message: "Success",
      data: [
        {
          id: "rep-1",
          reportCycleId: "cycle-1",
          studentId: "stud-1",
          studentCode: "ST001",
          studentName: "Nguyễn Văn A",
          classId: "c-1",
          learningSummary: "Học viên A tiếp thu từ vựng rất tốt, phát âm chuẩn.",
          attitudeSummary: "Hăng hái phát biểu xây dựng bài, chăm chỉ.",
          improvementNotes: "Cần luyện viết các cấu trúc câu dài hơn.",
          recommendation: "Tiếp tục phát huy và tăng cường đọc sách tiếng Anh.",
          internalNote: "Học viên xuất sắc của lớp.",
          status: "DRAFT",
          preparedBy: "Mr. John Doe",
          submittedAt: null,
          approvedBy: null,
          approvedAt: null,
          rejectionReason: null,
          publishedAt: null,
        },
        {
          id: "rep-2",
          reportCycleId: "cycle-1",
          studentId: "stud-2",
          studentCode: "ST002",
          studentName: "Trần Thị B",
          classId: "c-1",
          learningSummary: "Kỹ năng nghe nói tiến bộ vượt bậc.",
          attitudeSummary: "Tập trung chú ý nghe giảng.",
          improvementNotes: "Cần tự tin hơn khi giao tiếp trước lớp.",
          recommendation: "Nên tham gia nhiều hoạt động nhóm.",
          internalNote: "",
          status: "SUBMITTED",
          preparedBy: "Mr. John Doe",
          submittedAt: "2026-06-30T10:00:00Z",
          approvedBy: null,
          approvedAt: null,
          rejectionReason: null,
          publishedAt: null,
        },
      ] as LearningReport[],
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

export function useReportDetails(id: string) {
  return useQuery<LearningReport>({
    queryKey: [REPORTS_KEY, "detail", id],
    queryFn: () => learningReportApi.reports.getById(id).then((r) => r.data),
    enabled: !!id,
    initialData: {
      id,
      reportCycleId: "cycle-1",
      studentId: "stud-1",
      studentCode: "ST001",
      studentName: "Nguyễn Văn A",
      classId: "c-1",
      learningSummary: "Học viên A tiếp thu từ vựng rất tốt, phát âm chuẩn.",
      attitudeSummary: "Hăng hái phát biểu xây dựng bài, chăm chỉ.",
      improvementNotes: "Cần luyện viết các cấu trúc câu dài hơn.",
      recommendation: "Tiếp tục phát huy và tăng cường đọc sách tiếng Anh.",
      internalNote: "Học viên xuất sắc của lớp.",
      status: "DRAFT",
      preparedBy: "Mr. John Doe",
      submittedAt: null,
      approvedBy: null,
      approvedAt: null,
      rejectionReason: null,
      publishedAt: null,
    },
    retry: false,
  });
}

export function useUpdateReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<LearningReport> }) =>
      learningReportApi.reports.update(id, data),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: [REPORTS_KEY] });
      void queryClient.invalidateQueries({ queryKey: [REPORTS_KEY, "detail", variables.id] });
    },
  });
}

export function useSubmitReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: learningReportApi.reports.submit,
    onSuccess: (_, id) => {
      void queryClient.invalidateQueries({ queryKey: [REPORTS_KEY] });
      void queryClient.invalidateQueries({ queryKey: [REPORTS_KEY, "detail", id] });
    },
  });
}

export function useApproveReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: learningReportApi.reports.approve,
    onSuccess: (_, id) => {
      void queryClient.invalidateQueries({ queryKey: [REPORTS_KEY] });
      void queryClient.invalidateQueries({ queryKey: [REPORTS_KEY, "detail", id] });
    },
  });
}

export function useRejectReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      learningReportApi.reports.reject(id, reason),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: [REPORTS_KEY] });
      void queryClient.invalidateQueries({ queryKey: [REPORTS_KEY, "detail", variables.id] });
    },
  });
}

export function usePublishReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: learningReportApi.reports.publish,
    onSuccess: (_, id) => {
      void queryClient.invalidateQueries({ queryKey: [REPORTS_KEY] });
      void queryClient.invalidateQueries({ queryKey: [REPORTS_KEY, "detail", id] });
    },
  });
}
