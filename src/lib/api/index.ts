/**
 * src/lib/api/index.ts — barrel export
 *
 * Feature API files import from here:
 *   import { apiClient, API_ENDPOINTS, parseApiError } from '@/lib/api'
 *   import type { ApiResponse, PageResponse, ApiError } from '@/lib/api'
 */

// API client (Axios instance)
export { apiClient } from "./api-client";

// Response types
export type { ApiResponse, PageResponse, PageMeta } from "./api-response";

// Error types and utilities
export { ApiError, parseApiError, isApiError } from "./api-error";
export type { ApiErrorResponse, FieldError } from "./api-error";

// Endpoint registry
export { API_ENDPOINTS } from "./endpoints";

// Query key factories
export {
  studentKeys,
  parentKeys,
  campusKeys,
  roomKeys,
  levelKeys,
  courseKeys,
  classKeys,
  enrollmentKeys,
  attendanceKeys,
  tuitionKeys,
  authKeys,
  employeeKeys,
  roleKeys,
  permissionKeys,
  curriculumKeys,
  positionKeys,
  scheduleKeys,
} from "./query-keys";

// CRUD factory
export { createCrudApi } from "./crud-api-factory";
export type { CrudApi, ListParams } from "./crud-api-factory";
