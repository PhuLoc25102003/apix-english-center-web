import { createCrudApi } from "@/lib/api/crud-api-factory";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type {
  Curriculum,
  CreateCurriculumDto,
  UpdateCurriculumDto,
} from "../types/curriculum.type";

export const curriculumApi = createCrudApi<
  Curriculum,
  CreateCurriculumDto,
  UpdateCurriculumDto
>(API_ENDPOINTS.curriculums.list);
