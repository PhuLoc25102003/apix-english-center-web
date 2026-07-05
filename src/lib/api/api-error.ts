/**
 * src/lib/api/api-error.ts
 *
 * Error types and utilities for handling APIX API errors.
 *
 * Design:
 *  - ApiErrorResponse — the shape returned by the backend on 4xx/5xx.
 *  - ApiError — an Error subclass used in hooks and mutations.
 *  - parseApiError — converts an Axios error into a typed ApiError.
 *  - getFieldError — extracts a per-field validation error message.
 */

import { isAxiosError } from "axios";

// ── Backend error shape ───────────────────────────────────────────────────────

/**
 * Validation error detail for a single field.
 */
export type FieldError = {
  field?: string;
  message: string;
};

/**
 * Standard error envelope returned by the APIX backend on 4xx / 5xx.
 */
export type ApiErrorResponse = {
  success: false;
  errorCode: string;
  message: string;
  details?: FieldError[];
};

// ── Error class ───────────────────────────────────────────────────────────────

/**
 * Typed error thrown by feature API functions.
 * Wraps the parsed backend error so hooks can access structured data.
 *
 * @example
 * try {
 *   await createStudent(data)
 * } catch (err) {
 *   if (err instanceof ApiError) {
 *     toast.error(err.message)
 *     const nameError = err.getFieldError('fullName')
 *   }
 * }
 */
export class ApiError extends Error {
  public readonly errorCode: string;
  public readonly details: FieldError[];
  public readonly statusCode: number;

  constructor(
    message: string,
    errorCode: string,
    statusCode: number,
    details: FieldError[] = [],
  ) {
    super(message);
    this.name = "ApiError";
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.details = details;
  }

  /**
   * Returns the error message for a specific field, if present.
   * Returns undefined when no field-level error exists for that field.
   */
  getFieldError(field: string): string | undefined {
    return this.details.find((d) => d.field === field)?.message;
  }

  /**
   * Returns all field-level errors as a Record<fieldName, message>.
   * Useful for feeding into React Hook Form's setError.
   */
  toFieldErrors(): Record<string, string> {
    return this.details.reduce<Record<string, string>>((acc, d) => {
      if (d.field) {
        acc[d.field] = d.message;
      }
      return acc;
    }, {});
  }
}

// ── Parser ────────────────────────────────────────────────────────────────────

/**
 * Converts any thrown value into a typed ApiError.
 *
 * Use in feature API functions to normalise errors before they reach hooks:
 *
 * @example
 * export async function getStudents() {
 *   try {
 *     const { data } = await apiClient.get(...)
 *     return data
 *   } catch (err) {
 *     throw parseApiError(err)
 *   }
 * }
 */
export function parseApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  }

  if (isAxiosError<ApiErrorResponse>(error)) {
    const status = error.response?.status ?? 0;
    const body = error.response?.data;

    if (body && !body.success) {
      return new ApiError(
        body.message,
        body.errorCode,
        status,
        body.details ?? [],
      );
    }

    // Network / timeout error (no response body)
    const networkMessage =
      error.code === "ECONNABORTED"
        ? "Request timed out. Please check your connection and try again."
        : "Network error. Please check your connection and try again.";

    return new ApiError(networkMessage, "NETWORK_ERROR", status);
  }

  // Unknown error
  return new ApiError(
    "An unexpected error occurred. Please try again.",
    "UNKNOWN_ERROR",
    0,
  );
}

// ── Guard ─────────────────────────────────────────────────────────────────────

/**
 * Type guard — true when err is an ApiError instance.
 */
export function isApiError(err: unknown): err is ApiError {
  return err instanceof ApiError;
}
