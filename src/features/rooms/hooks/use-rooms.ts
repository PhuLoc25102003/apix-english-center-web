"use client";

import { useQuery } from "@tanstack/react-query";

import { roomKeys } from "@/lib/api/query-keys";
import { roomApi } from "../api/room.api";
import type { RoomListParams } from "../types/room.type";

export function useRooms(params: RoomListParams = {}) {
  return useQuery({
    queryKey: roomKeys.list(params),
    queryFn: () => roomApi.getAll(params),
  });
}
