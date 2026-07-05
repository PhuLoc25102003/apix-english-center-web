/**
 * APIX API Response types — standard §9
 *
 * All backend responses must conform to these shapes.
 * Feature API files and hooks should use these types to
 * ensure consistent error handling and data access patterns.
 */

/**
 * Pagination metadata returned by list endpoints.
 */
export type PageMeta = {
  /** Current page number (1-based) */
  page: number;
  /** Number of items per page */
  limit: number;
  /** Total number of items across all pages */
  total: number;
  /** Total number of pages */
  totalPages: number;
};

/**
 * Standard successful API response envelope.
 *
 * @example
 * const res: ApiResponse<Student[]> = await apiClient.get('/students')
 */
export type ApiResponse<T> = {
  success: true;
  message: string;
  data: T;
  meta?: PageMeta;
};

/**
 * Standard error API response envelope.
 * Returned by the backend on 4xx / 5xx.
 */
export type ApiError = {
  success: false;
  errorCode: string;
  message: string;
  details?: Array<{
    field?: string;
    message: string;
  }>;
};

/**
 * Union of success and error shapes — useful for discriminated unions
 * before unwrapping data.
 */
export type ApiResult<T> = ApiResponse<T> | ApiError;
