/**
 * src/features/students/api/student.api.ts
 *
 * API functions for student management.
 * Leverages generic CRUD factory and standard endpoints.
 */

import { createCrudApi } from "@/lib/api/crud-api-factory";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type { Student, CreateStudentDto, UpdateStudentDto } from "../types/student.type";

export const studentApi = createCrudApi<Student, CreateStudentDto, UpdateStudentDto>(
  API_ENDPOINTS.students.list,
);
