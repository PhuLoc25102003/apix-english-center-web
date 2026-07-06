import { createCrudApi } from "@/lib/api/crud-api-factory";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type {
  Position,
  CreatePositionDto,
  UpdatePositionDto,
} from "../types/position.type";

export const positionApi = createCrudApi<
  Position,
  CreatePositionDto,
  UpdatePositionDto
>(API_ENDPOINTS.positions.list);
