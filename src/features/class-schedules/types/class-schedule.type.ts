export interface ClassSchedule {
  id: string;
  classId: string;
  classCode?: string | null;
  className?: string | null;
  roomId: string;
  roomCode?: string | null;
  roomName?: string | null;
  campusName?: string | null;
  dayOfWeek: number; // 1-7
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
  effectiveFrom: string; // "YYYY-MM-DD"
  effectiveTo: string | null; // "YYYY-MM-DD"
  status: "ACTIVE" | "INACTIVE";
  patternCode: string | null; // "MWF" | "TTS" | "WEEKEND"
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateClassScheduleDto {
  classId: string;
  roomId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  effectiveFrom: string;
  effectiveTo?: string | null;
  status: "ACTIVE" | "INACTIVE";
  patternCode?: string | null;
}

export type UpdateClassScheduleDto = CreateClassScheduleDto;
