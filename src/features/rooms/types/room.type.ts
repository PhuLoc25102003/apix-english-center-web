import type { ListParams } from "@/lib/api";

export interface Room {
  id: string;
  campusId: string;
  campusName: string | null;
  code: string;
  name: string;
  capacity: number;
  roomType: string | null;
  facilitiesNote: string | null;
  isActive: boolean;
}

export interface CreateRoomDto {
  campusId: string;
  code: string;
  name: string;
  capacity: number;
  roomType: string | null;
  facilitiesNote: string | null;
  isActive: boolean;
}

export type UpdateRoomDto = CreateRoomDto;

export type RoomListParams = ListParams & {
  campusId?: string;
};
