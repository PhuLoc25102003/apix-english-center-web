import type { ListParams } from "@/lib/api";

export const videoDeliveryTypes = [
  "MONTHLY_PERSONAL_VIDEO",
  "FINAL_COURSE_VIDEO",
  "FOREIGN_TEACHER_ACTIVITY",
  "CLASS_ACTIVITY_VIDEO",
  "CUSTOM",
] as const;

export const videoDeliveryStatuses = [
  "PENDING",
  "PREPARED",
  "OPENED_ZALO",
  "SENT_MANUALLY",
  "FAILED",
  "SKIPPED",
  "CANCELLED",
] as const;

export type VideoDeliveryType = (typeof videoDeliveryTypes)[number];
export type VideoDeliveryStatus = (typeof videoDeliveryStatuses)[number];

export interface VideoDeliveryBatch {
  id: string;
  classId: string;
  className: string;
  videoType: VideoDeliveryType;
  targetMonth: string | null;
  title: string;
  description: string | null;
  dueDate: string | null;
  status: string;
  totalDeliveries: number;
  sentDeliveries: number;
  createdAt: string;
}

export interface VideoDeliveryHistoryEntry {
  id: string;
  action: string;
  actorName: string | null;
  note: string | null;
  createdAt: string;
}

export interface PreparedVideoMessage {
  parentName: string;
  parentPhone: string;
  messageContent: string;
  zaloOpenUrl: string;
}

export interface VideoDelivery {
  id: string;
  batchId: string;
  studentId: string;
  studentFullName: string;
  classId: string;
  className: string;
  parentName: string | null;
  parentPhone: string | null;
  videoType: VideoDeliveryType;
  targetMonth: string | null;
  title: string;
  status: VideoDeliveryStatus;
  assignedToEmployeeId: string | null;
  assignedToEmployeeName: string | null;
  sentByEmployeeId: string | null;
  sentByEmployeeName: string | null;
  sentAt: string | null;
  failedReason: string | null;
  skippedReason: string | null;
  preparedMessage?: PreparedVideoMessage | null;
  history?: VideoDeliveryHistoryEntry[];
}

export interface VideoDeliveryStats {
  total: number;
  pending: number;
  prepared: number;
  openedZalo: number;
  sent: number;
  failed: number;
  skipped: number;
  completionRate: number;
}

export type VideoDeliveryFilters = ListParams & {
  search?: string;
  classId?: string;
  studentId?: string;
  batchId?: string;
  videoType?: VideoDeliveryType;
  targetMonth?: string;
  status?: VideoDeliveryStatus;
  assignedToEmployeeId?: string;
  sentByEmployeeId?: string;
};

export interface CreateVideoDeliveryBatchDto {
  classId: string;
  videoType: VideoDeliveryType;
  targetMonth?: string | null;
  title: string;
  description?: string | null;
  dueDate?: string | null;
  studentIds?: string[];
}

export type UpdateVideoDeliveryBatchDto = Partial<CreateVideoDeliveryBatchDto>;

