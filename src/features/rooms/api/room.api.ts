import { apiClient } from "@/lib/api/api-client";
import { parseApiError } from "@/lib/api/api-error";
import { createCrudApi } from "@/lib/api/crud-api-factory";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type { ApiResponse, PageResponse } from "@/lib/api";
import type {
  CreateRoomDto,
  Room,
  RoomListParams,
  UpdateRoomDto,
} from "../types/room.type";

const baseRoomApi = createCrudApi<Room, CreateRoomDto, UpdateRoomDto>(
  API_ENDPOINTS.rooms.list,
);

async function getAll(params: RoomListParams = {}): Promise<PageResponse<Room>> {
  if (!params.campusId) {
    return baseRoomApi.getAll(params);
  }

  try {
    const { data: response } = await apiClient.get<ApiResponse<Room[]>>(
      API_ENDPOINTS.rooms.byCampus(params.campusId),
    );
    const search = params.search?.trim().toLocaleLowerCase("vi") ?? "";
    const filteredRooms = search
      ? response.data.filter((room) =>
          [room.code, room.name, room.roomType, room.facilitiesNote].some(
            (value) => value?.toLocaleLowerCase("vi").includes(search),
          ),
        )
      : response.data;
    const page = Math.max(1, params.page ?? 1);
    const limit = Math.max(1, params.limit ?? 10);
    const total = filteredRooms.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const currentPage = Math.min(page, totalPages);
    const start = (currentPage - 1) * limit;

    return {
      success: true,
      message: response.message,
      data: filteredRooms.slice(start, start + limit),
      meta: {
        page: currentPage,
        limit,
        total,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      },
    };
  } catch (error) {
    throw parseApiError(error);
  }
}

async function update(
  id: string,
  body: UpdateRoomDto,
): Promise<ApiResponse<Room>> {
  try {
    const { data } = await apiClient.put<ApiResponse<Room>>(
      API_ENDPOINTS.rooms.update(id),
      body,
    );
    return data;
  } catch (error) {
    throw parseApiError(error);
  }
}

export const roomApi = {
  ...baseRoomApi,
  getAll,
  update,
};
