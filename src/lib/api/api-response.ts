/**
 * src/lib/api/api-response.ts
 *
 * Standard response envelope types used across all APIX API calls.
 * Feature API files and hooks must use these types — never raw Axios types.
 *
 * Standard §9 contract shapes.
 */

// ── Pagination ────────────────────────────────────────────────────────────────

/**
 * Pagination metadata returned alongside list responses.
 */
export type PageMeta = {
  /** Current page number (1-based) */
  page: number;
  /** Number of items per page */
  limit: number;
  /** Total items across all pages */
  total: number;
  /** Total number of pages */
  totalPages: number;
  /** Whether a next page exists */
  hasNextPage: boolean;
  /** Whether a previous page exists */
  hasPreviousPage: boolean;
};

// ── Success responses ─────────────────────────────────────────────────────────

/**
 * Standard single-item or action success response.
 *
 * @example
 * // GET /students/:id
 * const res: ApiResponse<Student> = await apiClient.get(...)
 * res.data.fullName
 */
export type ApiResponse<T> = {
  success: true;
  message: string;
  data: T;
};

/**
 * Paginated list response — wraps an array with pagination metadata.
 *
 * @example
 * // GET /students?page=1&limit=20
 * const res: PageResponse<Student> = await apiClient.get(...)
 * res.data          // Student[]
 * res.meta.total    // total count
 */
export type PageResponse<T> = {
  success: true;
  message: string;
  data: T[];
  meta: PageMeta;
};
