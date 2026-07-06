export type WeeklyUpdateStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "APPROVED"
  | "REJECTED"
  | "PUBLISHED";

export interface WeeklyUpdate {
  id: string;
  classId: string;
  classCode?: string;
  className?: string;
  weekStartDate: string;
  weekEndDate: string;
  title: string;
  overallSummary: string | null;
  status: WeeklyUpdateStatus;
  submittedBy: string | null;
  submittedAt: string | null;
  approvedBy: string | null;
  approvedAt: string | null;
  rejectionReason: string | null;
  publishedAt: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface WeeklyUpdateSessionItem {
  id: string;
  weeklyUpdateId: string;
  sessionDate: string;
  lessonNo: number | null;
  learningContent: string;
  homeworkContent: string | null;
  note: string | null;
}

export interface WeeklyUpdateDetails {
  update: WeeklyUpdate;
  sessionItems: WeeklyUpdateSessionItem[];
  images: Array<{ id: string; url: string; caption?: string }>;
}

export interface CreateWeeklyUpdateDto {
  classId: string;
  weekStartDate: string;
  weekEndDate: string;
  title: string;
  overallSummary?: string | null;
}

export interface UpdateWeeklyUpdateDto extends Partial<CreateWeeklyUpdateDto> {}
