export type EnrollmentStatus =
  | "TRIAL"
  | "ACTIVE"
  | "FROZEN"
  | "TRANSFERRED"
  | "COMPLETED"
  | "CANCELLED";

export type EnrollmentSource = "WALK_IN" | "REFERRAL" | "ONLINE" | "OTHER";

export interface Enrollment {
  id: string;
  classId: string;
  className: string;
  classCode: string;
  studentId: string;
  studentFullName: string;
  studentCode: string;
  enrollmentCode: string;
  enrolledDate: string;
  startDate: string;
  endDate: string | null;
  status: EnrollmentStatus;
  source: EnrollmentSource;
  note: string | null;
  cancellationReason: string | null;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface CreateEnrollmentDto {
  studentId: string;
  classId: string;
  enrolledDate: string;
  startDate: string;
  status: EnrollmentStatus;
  source: EnrollmentSource;
  note?: string | null;
}

export interface UpdateEnrollmentDto {
  enrolledDate: string;
  startDate: string;
  endDate?: string | null;
  status: EnrollmentStatus;
  source: EnrollmentSource;
  note?: string | null;
}
