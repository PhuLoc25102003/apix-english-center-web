/**
 * lib/api barrel export
 *
 * Import all API utilities from this entry point:
 *   import { apiClient } from '@/lib/api'
 *   import type { ApiResponse, ApiError } from '@/lib/api'
 */

export { apiClient, getAccessToken, setAccessToken } from "./api-client";
export type { ApiResponse, ApiError, ApiResult, PageMeta } from "./api-response";
export * as endpoints from "./endpoints";
