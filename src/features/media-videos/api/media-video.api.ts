import axios from "axios";
import { apiClient } from "@/lib/api/api-client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import type {
  MediaVideo,
  VideoUploadSession,
  CreateVideoUploadSessionDto,
  PresignUploadDto,
  PresignUploadResponse,
  CompleteUploadDto,
  ZaloMessageResponse,
} from "../types/media-video.type";

export const mediaVideoApi = {
  // 1. Create upload session
  async createUploadSession(dto: CreateVideoUploadSessionDto): Promise<VideoUploadSession> {
    const { data } = await apiClient.post<VideoUploadSession>(
      API_ENDPOINTS.mediaVideos.uploadSessions,
      dto
    );
    return data;
  },

  // 2. Get upload session by token
  async getUploadSession(uploadToken: string): Promise<VideoUploadSession> {
    const { data } = await apiClient.get<VideoUploadSession>(
      API_ENDPOINTS.mediaVideos.uploadSessionDetail(uploadToken)
    );
    return data;
  },

  // 3. Presign upload
  async presignVideoUpload(
    uploadToken: string,
    dto: PresignUploadDto
  ): Promise<PresignUploadResponse> {
    const { data } = await apiClient.post<PresignUploadResponse>(
      API_ENDPOINTS.mediaVideos.presign(uploadToken),
      dto
    );
    return data;
  },

  // 4. Complete upload
  async completeVideoUpload(
    uploadToken: string,
    dto: CompleteUploadDto
  ): Promise<void> {
    await apiClient.post(
      API_ENDPOINTS.mediaVideos.complete(uploadToken),
      dto
    );
  },

  // 5. List videos
  async listVideos(filters?: Record<string, unknown>) {
    const { data } = await apiClient.get<{
      success: boolean;
      message: string;
      data: MediaVideo[];
      meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    }>(API_ENDPOINTS.mediaVideos.list, { params: filters });
    return data;
  },

  // 6. Get video detail
  async getVideoDetail(id: string): Promise<MediaVideo> {
    const { data } = await apiClient.get<MediaVideo>(
      API_ENDPOINTS.mediaVideos.detail(id)
    );
    return data;
  },

  // 7. Approve video
  async approveVideo(id: string): Promise<void> {
    await apiClient.patch(API_ENDPOINTS.mediaVideos.approve(id));
  },

  // 8. Reject video
  async rejectVideo(id: string, reason: string): Promise<void> {
    await apiClient.patch(API_ENDPOINTS.mediaVideos.reject(id), { reason });
  },

  // 9. Create share link
  async createShareLink(id: string): Promise<{ shareUrl: string }> {
    const { data } = await apiClient.post<{ shareUrl: string }>(
      API_ENDPOINTS.mediaVideos.shareLinks(id)
    );
    return data;
  },

  // 10. Revoke share link
  async revokeShareLink(id: string): Promise<void> {
    await apiClient.patch(API_ENDPOINTS.mediaVideos.revokeShareLink(id));
  },

  // 11. Prepare Manual Zalo message
  async prepareManualZaloMessage(
    id: string,
    parentId: string
  ): Promise<ZaloMessageResponse> {
    const { data } = await apiClient.post<ZaloMessageResponse>(
      API_ENDPOINTS.mediaVideos.manualZaloMessage(id),
      { parentId }
    );
    return data;
  },

  // 12. Update delivery status
  async updateDeliveryStatus(
    deliveryId: string,
    status: string,
    note?: string
  ): Promise<void> {
    await apiClient.patch(API_ENDPOINTS.mediaVideos.deliveryStatus(deliveryId), {
      status,
      note,
    });
  },

  // Helper function to upload video file directly to the storage bucket via presigned url
  async uploadFileToPresignedUrl(
    uploadUrl: string,
    file: File,
    headers: Record<string, string>,
    onProgress?: (percent: number) => void
  ): Promise<void> {
    // Note: Do not use the authenticated apiClient here because uploadUrl is external (S3, GCS, etc.)
    // and headers might conflict or cause CORS issues if they contain Authorization.
    await axios.put(uploadUrl, file, {
      headers: {
        ...headers,
        "Content-Type": file.type || "video/mp4",
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress?.(percent);
        }
      },
    });
  },
};
