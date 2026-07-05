/**
 * src/features/campuses/api/campus.api.ts
 *
 * API functions for campus management.
 * Leverages generic CRUD factory and standard endpoints.
 */

import { createCrudApi } from "@/lib/api/crud-api-factory";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type { Campus, CreateCampusDto, UpdateCampusDto } from "../types/campus.type";

export const campusApi = createCrudApi<Campus, CreateCampusDto, UpdateCampusDto>(
  API_ENDPOINTS.campuses.list,
);
