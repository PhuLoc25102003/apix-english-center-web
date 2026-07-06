export type ScoreItemStatus = "DRAFT" | "PUBLISHED" | "LOCKED";

export interface ScoreItem {
  id: string;
  classId: string;
  classCode?: string;
  className?: string;
  title: string;
  scoreDate: string | null;
  maxScore: number;
  description: string | null;
  status: ScoreItemStatus;
  publishedAt: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ScoreRecord {
  id: string;
  scoreItemId: string;
  studentId: string;
  studentCode: string;
  studentName: string;
  scoreValue: number;
  note: string | null;
  gradedBy: string | null;
  gradedAt: string | null;
  savedStatus?: "saved" | "dirty" | "not_marked";
}

export interface ScoreDetails {
  item: ScoreItem;
  records: ScoreRecord[];
}

export interface CreateScoreItemDto {
  classId: string;
  title: string;
  scoreDate?: string | null;
  maxScore?: number;
  description?: string | null;
}

export interface SaveScoreRecordItem {
  studentId: string;
  scoreValue: number;
  note: string | null;
}
export interface SaveScoreRecordsRequest {
  records: SaveScoreRecordItem[];
}
