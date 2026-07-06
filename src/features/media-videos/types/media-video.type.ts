export type VideoStatus =
  | "UPLOADED"
  | "PROCESSING"
  | "READY"
  | "APPROVED"
  | "REJECTED"
  | "DELIVERED"
  | "ARCHIVED";

export interface MediaVideo {
  id: string;
  title: string;
  description?: string;
  videoType: string;
  targetMonth: string;
  status: VideoStatus;
  fileSizeBytes: number;
  durationSeconds?: number;
  storageBucket?: string;
  storageKey?: string;
  originalFileName?: string;
  mimeType?: string;
  uploadedBy?: string;
  uploadedByName?: string;
  approvedBy?: string;
  approvedByName?: string;
  approvedAt?: string;
  deliveredAt?: string;
  playbackUrl?: string;
  classId: string;
  className: string;
  studentId: string;
  studentName: string;
  createdAt: string;
  updatedAt: string;
}

export interface VideoUploadSession {
  uploadSessionId: string;
  uploadToken: string;
  uploadPageUrl: string;
  qrPayload: string;
  expiresAt: string;
  status: "PENDING" | "COMPLETED" | "EXPIRED" | "CANCELLED";
  className?: string;
  studentName?: string;
  videoType?: string;
  targetMonth?: string;
  title?: string;
  description?: string;
  maxFileSizeMb?: number;
  allowedMimeTypes?: string[];
}

export interface CreateVideoUploadSessionDto {
  classId: string;
  studentId: string;
  sessionId?: string; // Optional reference to class session if any
  videoType: string;
  targetMonth: string;
  title: string;
  description?: string;
}

export interface PresignUploadDto {
  fileName: string;
  mimeType: string;
  fileSizeBytes: number;
}

export interface PresignUploadResponse {
  uploadUrl: string;
  method: string;
  headers: Record<string, string>;
  storageBucket: string;
  storageKey: string;
  expiresAt: string;
}

export interface CompleteUploadDto {
  storageBucket: string;
  storageKey: string;
  originalFileName: string;
  mimeType: string;
  fileSizeBytes: number;
  durationSeconds?: number;
  checksum?: string;
}

export interface ZaloMessageResponse {
  deliveryId: string;
  parentName: string;
  parentPhone: string;
  zaloOpenUrl: string;
  messageContent: string;
  shareUrl: string;
  status: "PREPARED" | "COPIED" | "OPENED_ZALO" | "SENT_MANUALLY" | "FAILED";
}
