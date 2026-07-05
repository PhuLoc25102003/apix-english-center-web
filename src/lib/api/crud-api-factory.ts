/**
 * src/lib/api/crud-api-factory.ts
 *
 * Generic CRUD API factory.
 *
 * Eliminates boilerplate in feature API files by generating standard
 * CRUD operations from a single endpoint string.
 *
 * Rules:
 *  - Feature API files call createCrudApi() and extend the result.
 *  - Components never call this factory or apiClient directly.
 *  - All methods throw ApiError on failure (via parseApiError).
 *
 * Usage:
 *   // features/campuses/api/campus.api.ts
 *   import { createCrudApi } from '@/lib/api/crud-api-factory'
 *   import { API_ENDPOINTS } from '@/lib/api/endpoints'
 *   import type { Campus, CreateCampusDto } from '../types/campus.type'
 *
 *   export const campusApi = createCrudApi<Campus, CreateCampusDto>(
 *     API_ENDPOINTS.campuses.list,
 *   )
 *
 *   // Then use:
 *   campusApi.getAll({ page: 1, limit: 20 })
 *   campusApi.getById(id)
 *   campusApi.create(data)
 *   campusApi.update(id, data)
 *   campusApi.remove(id)
 */

import { apiClient } from "./api-client";
import { parseApiError } from "./api-error";
import type { ApiResponse, PageResponse } from "./api-response";

// ── Shared param types ────────────────────────────────────────────────────────

export type ListParams = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  [key: string]: unknown;
};

// ── Factory ───────────────────────────────────────────────────────────────────

/**
 * Creates standard CRUD API methods for a resource.
 *
 * @param endpoint - Base REST endpoint (e.g. '/students')
 *
 * Type parameters:
 *  TEntity  — the full entity type returned by the API
 *  TCreate  — DTO for create operations (defaults to Partial<TEntity>)
 *  TUpdate  — DTO for update operations (defaults to TCreate)
 */
export function createCrudApi<
  TEntity,
  TCreate = Partial<TEntity>,
  TUpdate = TCreate,
>(endpoint: string) {
  return {
    /**
     * Fetch a paginated list of entities.
     * GET {endpoint}?page=...&limit=...
     */
    async getAll(params?: ListParams): Promise<PageResponse<TEntity>> {
      try {
        const apiParams: Record<string, any> = { ...params };
        if (params?.page !== undefined) {
          apiParams.page = Math.max(0, params.page - 1);
        }
        if (params?.limit !== undefined) {
          apiParams.size = params.limit;
          delete apiParams.limit;
        }

        const { data } = await apiClient.get<any>(endpoint, {
          params: apiParams,
        });

        if (data && data.meta) {
          const backendMeta = data.meta;
          const page = (backendMeta.page !== undefined ? backendMeta.page : 0) + 1;
          const limit = backendMeta.size !== undefined ? backendMeta.size : (params?.limit ?? 10);
          const total = backendMeta.totalElements !== undefined ? backendMeta.totalElements : 0;
          const totalPages = backendMeta.totalPages !== undefined ? backendMeta.totalPages : 1;

          data.meta = {
            page,
            limit,
            total,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
          };
        }

        return data;
      } catch (err) {
        throw parseApiError(err);
      }
    },    /**
     * Fetch a single entity by ID.
     * GET {endpoint}/{id}
     */
    async getById(id: string): Promise<ApiResponse<TEntity>> {
      try {
        const { data } = await apiClient.get<ApiResponse<TEntity>>(
          `${endpoint}/${id}`,
        );
        return data;
      } catch (err) {
        throw parseApiError(err);
      }
    },

    /**
     * Create a new entity.
     * POST {endpoint}
     */
    async create(body: TCreate): Promise<ApiResponse<TEntity>> {
      try {
        const { data } = await apiClient.post<ApiResponse<TEntity>>(
          endpoint,
          body,
        );
        return data;
      } catch (err) {
        throw parseApiError(err);
      }
    },

    /**
     * Update an existing entity.
     * PATCH {endpoint}/{id}
     */
    async update(id: string, body: TUpdate): Promise<ApiResponse<TEntity>> {
      try {
        const { data } = await apiClient.patch<ApiResponse<TEntity>>(
          `${endpoint}/${id}`,
          body,
        );
        return data;
      } catch (err) {
        throw parseApiError(err);
      }
    },

    /**
     * Delete an entity by ID.
     * DELETE {endpoint}/{id}
     */
    async remove(id: string): Promise<ApiResponse<null>> {
      try {
        const { data } = await apiClient.delete<ApiResponse<null>>(
          `${endpoint}/${id}`,
        );
        return data;
      } catch (err) {
        throw parseApiError(err);
      }
    },
  };
}

/**
 * Infer the CRUD API type for a given entity.
 * Useful for typing function parameters that accept a CRUD api object.
 *
 * @example
 * type CampusCrudApi = CrudApi<Campus, CreateCampusDto>
 */
export type CrudApi<
  TEntity,
  TCreate = Partial<TEntity>,
  TUpdate = TCreate,
> = ReturnType<typeof createCrudApi<TEntity, TCreate, TUpdate>>;
