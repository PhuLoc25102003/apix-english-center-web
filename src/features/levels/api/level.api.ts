import { createCrudApi } from "@/lib/api/crud-api-factory";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type { Level } from "../types/level.type";

export const levelApi = createCrudApi<Level>(API_ENDPOINTS.levels.list);
