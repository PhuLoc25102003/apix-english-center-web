import { API_ENDPOINTS, apiClient, parseApiError } from "@/lib/api";
import type { ApiResponse, PageResponse } from "@/lib/api";
import type {
  CreateVideoDeliveryBatchDto,
  PreparedVideoMessage,
  UpdateVideoDeliveryBatchDto,
  VideoDelivery,
  VideoDeliveryBatch,
  VideoDeliveryFilters,
  VideoDeliveryStats,
} from "../types/video-delivery.type";

type BackendPageEnvelope<T> = ApiResponse<T[]> & {
  meta: { page: number; size: number; totalElements: number; totalPages: number };
};

type BackendVideoDeliveryStats = {
  totalDeliveries: number;
  pendingCount: number;
  preparedCount: number;
  openedZaloCount: number;
  sentCount: number;
  failedCount: number;
  skippedCount: number;
  completionRate: number;
};

const toApiMonth = (month?: string | null) =>
  month && /^\d{4}-\d{2}$/.test(month) ? `${month}-01` : month;

function toApiListParams(params: VideoDeliveryFilters) {
  const { limit, page, targetMonth, ...filters } = params;
  return {
    ...filters,
    page: Math.max(0, Number(page ?? 1) - 1),
    size: limit ?? 20,
    targetMonth: toApiMonth(targetMonth),
  };
}

function toApiStatsParams(params: VideoDeliveryFilters) {
  return {
    classId: params.classId,
    videoType: params.videoType,
    targetMonth: toApiMonth(params.targetMonth),
  };
}

function toPageResponse<T>(response: BackendPageEnvelope<T>): PageResponse<T> {
  const page = response.meta.page + 1;
  const limit = response.meta.size;
  const total = response.meta.totalElements;
  const totalPages = response.meta.totalPages;
  return {
    success: true,
    message: response.message,
    data: response.data,
    meta: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
}

async function request<T>(operation: () => Promise<{ data: T }>): Promise<T> {
  try {
    return (await operation()).data;
  } catch (error) {
    throw parseApiError(error);
  }
}

export const videoDeliveryApi = {
  getBatches: (params: VideoDeliveryFilters = {}) =>
    request<BackendPageEnvelope<VideoDeliveryBatch>>(() => apiClient.get(API_ENDPOINTS.videoDeliveryBatches.list, { params: toApiListParams(params) })).then(toPageResponse),
  getBatch: (id: string) =>
    request<ApiResponse<VideoDeliveryBatch>>(() => apiClient.get(API_ENDPOINTS.videoDeliveryBatches.detail(id))),
  createBatch: (body: CreateVideoDeliveryBatchDto) =>
    request<ApiResponse<VideoDeliveryBatch>>(() => apiClient.post(API_ENDPOINTS.videoDeliveryBatches.create, { ...body, targetMonth: toApiMonth(body.targetMonth) })),
  updateBatch: (id: string, body: UpdateVideoDeliveryBatchDto) =>
    request<ApiResponse<VideoDeliveryBatch>>(() => apiClient.put(API_ENDPOINTS.videoDeliveryBatches.update(id), body)),
  cancelBatch: (id: string) =>
    request<ApiResponse<VideoDeliveryBatch>>(() => apiClient.patch(API_ENDPOINTS.videoDeliveryBatches.cancel(id))),
  getDeliveries: (params: VideoDeliveryFilters = {}) =>
    request<BackendPageEnvelope<VideoDelivery>>(() => apiClient.get(API_ENDPOINTS.videoDeliveries.list, { params: toApiListParams(params) })).then(toPageResponse),
  getDelivery: (id: string) =>
    request<ApiResponse<VideoDelivery>>(() => apiClient.get(API_ENDPOINTS.videoDeliveries.detail(id))),
  getStats: (params: VideoDeliveryFilters = {}) =>
    request<ApiResponse<BackendVideoDeliveryStats>>(() => apiClient.get(API_ENDPOINTS.videoDeliveries.stats, { params: toApiStatsParams(params) })).then((response): ApiResponse<VideoDeliveryStats> => ({
      ...response,
      data: {
        total: response.data.totalDeliveries,
        pending: response.data.pendingCount,
        prepared: response.data.preparedCount,
        openedZalo: response.data.openedZaloCount,
        sent: response.data.sentCount,
        failed: response.data.failedCount,
        skipped: response.data.skippedCount,
        completionRate: response.data.completionRate,
      },
    })),
  prepareMessage: (id: string) =>
    request<ApiResponse<PreparedVideoMessage>>(() => apiClient.post(API_ENDPOINTS.videoDeliveries.prepareMessage(id))),
  markCopied: (id: string) => request<ApiResponse<VideoDelivery>>(() => apiClient.patch(API_ENDPOINTS.videoDeliveries.copied(id))),
  markOpenedZalo: (id: string) => request<ApiResponse<VideoDelivery>>(() => apiClient.patch(API_ENDPOINTS.videoDeliveries.openedZalo(id))),
  markSent: (id: string) => request<ApiResponse<VideoDelivery>>(() => apiClient.patch(API_ENDPOINTS.videoDeliveries.sent(id))),
  markFailed: (id: string, failedReason: string) => request<ApiResponse<VideoDelivery>>(() => apiClient.patch(API_ENDPOINTS.videoDeliveries.failed(id), { failedReason })),
  markSkipped: (id: string, skippedReason: string) => request<ApiResponse<VideoDelivery>>(() => apiClient.patch(API_ENDPOINTS.videoDeliveries.skipped(id), { skippedReason })),
  reopen: (id: string) => request<ApiResponse<VideoDelivery>>(() => apiClient.patch(API_ENDPOINTS.videoDeliveries.reopen(id))),
};
