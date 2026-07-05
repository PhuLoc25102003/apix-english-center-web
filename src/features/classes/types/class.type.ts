import type { ListParams } from "@/lib/api";

export const classStatuses = [
  "PLANNING",
  "OPEN",
  "ACTIVE",
  "CLOSED",
  "CANCELLED",
] as const;

export type ClassStatus = (typeof classStatuses)[number];

export interface ClassRecord {
  id: string;
  courseId: string;
  courseName: string | null;
  campusId: string;
  campusName: string | null;
  classCode: string;
  name: string;
  capacity: number;
  startDate: string;
  expectedEndDate: string;
  status: ClassStatus;
  note: string | null;
}

export interface CreateClassDto {
  courseId: string;
  campusId: string;
  name: string;
  capacity: number;
  startDate: string;
  expectedEndDate: string;
  status: ClassStatus;
  note: string | null;
}

export type UpdateClassDto = CreateClassDto;

export type ClassListParams = ListParams & {
  courseId?: string;
  campusId?: string;
  status?: ClassStatus;
};

export interface ClassEnrollment {
  id: string;
  classId: string;
  className: string;
  classCode: string;
  studentId: string;
  studentName: string;
  studentCode: string;
  enrollmentCode: string;
  enrolledDate: string;
  startDate: string;
  endDate: string | null;
  status: string;
  source: string | null;
  note: string | null;
}
