import type { ListParams } from "@/lib/api";

export const courseStatuses = ["DRAFT", "ACTIVE", "INACTIVE"] as const;

export type CourseStatus = (typeof courseStatuses)[number];

export interface Course {
  id: string;
  levelId: string;
  levelName: string | null;
  code: string;
  name: string;
  description: string | null;
  totalLessons: number;
  durationMinutes: number;
  defaultMonthlyTuitionFee: number;
  status: CourseStatus;
}

export interface CreateCourseDto {
  levelId: string;
  code: string;
  name: string;
  description: string | null;
  totalLessons: number;
  durationMinutes: number;
  defaultMonthlyTuitionFee: number;
  status: CourseStatus;
}

export type UpdateCourseDto = CreateCourseDto;

export type CourseListParams = ListParams & {
  levelId?: string;
  status?: CourseStatus;
};
