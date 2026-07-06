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

// ── Student Attendance Management Types ─────────────────────────────────────

export type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";

export interface SessionAttendanceStudent {
  studentId: string;
  studentCode: string;
  studentName: string;
  status: AttendanceStatus | null;
  note: string | null;
  savedStatus: "saved" | "dirty" | "not_marked";
  markedAt?: string | null;
  markedBy?: string | null;
  isLocked?: boolean;
  source?: "TEACHER" | "OFFICE_STAFF" | "SYSTEM";
  absentReason?: string | null;
}

export interface StudentAttendanceRecord {
  id: string;
  sessionId: string;
  studentId: string;
  status: AttendanceStatus;
  checkInTime: string | null;
  checkOutTime: string | null;
  note: string | null;
  markedBy: string | null;
  markedAt: string | null;
}

export interface SaveStudentAttendanceItem {
  studentId: string;
  status: AttendanceStatus;
  note: string | null;
}

export interface SaveStudentAttendanceRequest {
  records: SaveStudentAttendanceItem[];
}

export interface SaveStudentAttendanceResponse {
  success: boolean;
  message: string;
}

export interface SessionAttendanceDetail {
  session: ClassSession;
  students: SessionAttendanceStudent[];
}
