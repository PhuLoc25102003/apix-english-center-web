export type ReportCycleStatus = "OPEN" | "SUBMITTED" | "APPROVED" | "PUBLISHED" | "CLOSED";
export type LearningReportStatus = "DRAFT" | "SUBMITTED" | "APPROVED" | "REJECTED" | "PUBLISHED";

export interface LearningReportCycle {
  id: string;
  classId: string;
  classCode?: string;
  className?: string;
  reportType: "TWO_MONTH" | "FINAL" | "CUSTOM";
  periodStart: string;
  periodEnd: string;
  teacherDeadlineAt: string;
  officePublishDeadlineAt: string | null;
  status: ReportCycleStatus;
}

export interface LearningReport {
  id: string;
  reportCycleId: string;
  studentId: string;
  studentCode: string;
  studentName: string;
  classId: string;
  learningSummary: string;
  attitudeSummary: string;
  improvementNotes: string;
  recommendation: string;
  internalNote: string | null;
  status: LearningReportStatus;
  preparedBy: string;
  submittedAt: string | null;
  approvedBy: string | null;
  approvedAt: string | null;
  rejectionReason: string | null;
  publishedAt: string | null;
}

export interface CreateReportCycleDto {
  classId: string;
  reportType: "TWO_MONTH" | "FINAL" | "CUSTOM";
  periodStart: string;
  periodEnd: string;
  teacherDeadlineAt: string;
}
