/**
 * src/features/levels/api/level.api.ts
 *
 * API functions for level management.
 * Leverages generic CRUD factory and standard endpoints.
 */

import { createCrudApi } from "@/lib/api/crud-api-factory";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type { Level, CreateLevelDto, UpdateLevelDto } from "../types/level.type";

export const levelApi = createCrudApi<Level, CreateLevelDto, UpdateLevelDto>(
  API_ENDPOINTS.levels.list,
);
