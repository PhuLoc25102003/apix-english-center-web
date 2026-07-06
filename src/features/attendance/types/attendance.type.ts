import type { ListParams } from "@/lib/api";

/**
 * src/features/attendance/types/attendance.type.ts
 *
 * Type definitions and DTOs for Class Sessions and Attendance.
 */

export type ClassSessionStatus = "PLANNED" | "COMPLETED" | "CANCELLED" | "RESCHEDULED";

export interface ClassSession {
  id: string;
  classId: string;
  scheduleId: string | null;
  roomId: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
  lessonNo: number | null;
  status: ClassSessionStatus;
  note: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateClassSessionRequest = Omit<
  ClassSession,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateClassSessionRequest = Partial<CreateClassSessionRequest>;

export type ClassSessionFilters = ListParams & {
  classId?: string;
  status?: ClassSessionStatus;
  sessionDate?: string;
};
