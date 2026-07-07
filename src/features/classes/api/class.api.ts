import { apiClient } from "@/lib/api/api-client";
import { parseApiError } from "@/lib/api/api-error";
import { createCrudApi } from "@/lib/api/crud-api-factory";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse, PageResponse } from "@/lib/api";
import type {
  ClassEnrollment,
  ClassListParams,
  ClassRecord,
  CreateClassDto,
  UpdateClassDto,
} from "../types/class.type";

const baseClassApi = createCrudApi<
  ClassRecord,
  CreateClassDto,
  UpdateClassDto
>(API_ENDPOINTS.classes.list);

async function getAll(
  params: ClassListParams = {},
): Promise<PageResponse<ClassRecord>> {
  const { courseId, campusId, status, ...listParams } = params;

  if (!courseId && !campusId && !status) {
    return baseClassApi.getAll(listParams);
  }

  const batchSize = 1000;
  const firstPage = await baseClassApi.getAll({
    ...listParams,
    page: 1,
    limit: batchSize,
  });
  const remainingPages = await Promise.all(
    Array.from({ length: Math.max(0, firstPage.meta.totalPages - 1) }, (_, index) =>
      baseClassApi.getAll({
        ...listParams,
        page: index + 2,
        limit: batchSize,
      }),
    ),
  );
  const matchingClasses = [firstPage, ...remainingPages]
    .flatMap((response) => response.data)
    .filter(
      (classItem) =>
        (!courseId || classItem.courseId === courseId) &&
        (!campusId || classItem.campusId === campusId) &&
        (!status || classItem.status === status),
    );
  const page = Math.max(1, params.page ?? 1);
  const limit = Math.max(1, params.limit ?? 10);
  const total = matchingClasses.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * limit;

  return {
    success: true,
    message: firstPage.message,
    data: matchingClasses.slice(start, start + limit),
    meta: {
      page: currentPage,
      limit,
      total,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    },
  };
}

async function update(
  id: string,
  body: UpdateClassDto,
): Promise<ApiResponse<ClassRecord>> {
  try {
    const { data } = await apiClient.put<ApiResponse<ClassRecord>>(
      API_ENDPOINTS.classes.update(id),
      body,
    );
    return data;
  } catch (error) {
    throw parseApiError(error);
  }
}

async function getEnrollments(
  classId: string,
): Promise<ApiResponse<ClassEnrollment[]>> {
  try {
    const { data } = await apiClient.get<ApiResponse<ClassEnrollment[]>>(
      API_ENDPOINTS.enrollments.byClass(classId),
    );
    return data;
  } catch (error) {
    throw parseApiError(error);
  }
}

async function getMyClasses(): Promise<ApiResponse<ClassRecord[]>> {
  try {
    const { data } = await apiClient.get<ApiResponse<ClassRecord[]>>(
      `${API_ENDPOINTS.classes.list}/my-classes`
    );
    return data;
  } catch (error) {
    throw parseApiError(error);
  }
}

export const classApi = {
  ...baseClassApi,
  getAll,
  update,
  getEnrollments,
  getMyClasses,
};
