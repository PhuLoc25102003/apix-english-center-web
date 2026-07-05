/**
 * src/features/parents/api/parent.api.ts
 *
 * API functions for parent management.
 * Leverages generic CRUD factory and standard endpoints.
 */

import { createCrudApi } from "@/lib/api/crud-api-factory";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type { Parent, CreateParentDto, UpdateParentDto } from "../types/parent.type";

export const parentApi = createCrudApi<Parent, CreateParentDto, UpdateParentDto>(
  API_ENDPOINTS.parents.list,
);
