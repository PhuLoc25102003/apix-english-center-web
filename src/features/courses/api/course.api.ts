import { apiClient } from "@/lib/api/api-client";
import { parseApiError } from "@/lib/api/api-error";
import { createCrudApi } from "@/lib/api/crud-api-factory";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse, PageResponse } from "@/lib/api";
import type {
  Course,
  CourseListParams,
  CreateCourseDto,
  UpdateCourseDto,
} from "../types/course.type";

const baseCourseApi = createCrudApi<Course, CreateCourseDto, UpdateCourseDto>(
  API_ENDPOINTS.courses.list,
);

async function getAll(
  params: CourseListParams = {},
): Promise<PageResponse<Course>> {
  const { levelId, status, ...listParams } = params;

  if (!levelId && !status) {
    return baseCourseApi.getAll(listParams);
  }

  const batchSize = 1000;
  const firstPage = await baseCourseApi.getAll({
    ...listParams,
    page: 1,
    limit: batchSize,
  });
  const remainingPages = await Promise.all(
    Array.from({ length: Math.max(0, firstPage.meta.totalPages - 1) }, (_, index) =>
      baseCourseApi.getAll({
        ...listParams,
        page: index + 2,
        limit: batchSize,
      }),
    ),
  );
  const matchingCourses = [firstPage, ...remainingPages]
    .flatMap((response) => response.data)
    .filter(
      (course) =>
        (!levelId || course.levelId === levelId) &&
        (!status || course.status === status),
    );
  const page = Math.max(1, params.page ?? 1);
  const limit = Math.max(1, params.limit ?? 10);
  const total = matchingCourses.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * limit;

  return {
    success: true,
    message: firstPage.message,
    data: matchingCourses.slice(start, start + limit),
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
  body: UpdateCourseDto,
): Promise<ApiResponse<Course>> {
  try {
    const { data } = await apiClient.put<ApiResponse<Course>>(
      API_ENDPOINTS.courses.update(id),
      body,
    );
    return data;
  } catch (error) {
    throw parseApiError(error);
  }
}

export const courseApi = {
  ...baseCourseApi,
  getAll,
  update,
};
