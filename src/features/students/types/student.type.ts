/**
 * src/features/students/types/student.type.ts
 *
 * Type definitions and DTOs for the Student feature.
 * Matches the backend Student DTO structure and requirements.
 */

export type StudentType = "KINDERGARTEN" | "CHILD" | "TEENAGER" | "ADULT";
export type AccessMode = "NO_ACCOUNT" | "PARENT_MANAGED" | "OWN_ACCOUNT";
export type StudentStatus = "ACTIVE" | "INACTIVE";

export interface Student {
  id: string;
  studentCode: string;
  fullName: string;
  dateOfBirth: string; // YYYY-MM-DD format
  gender: string;
  schoolName: string | null;
  grade: string | null;
  studentType: StudentType;
  accessMode: AccessMode;
  status: StudentStatus;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateStudentDto = Omit<
  Student,
  "id" | "studentCode" | "createdAt" | "updatedAt"
>;

export type UpdateStudentDto = Partial<CreateStudentDto>;
