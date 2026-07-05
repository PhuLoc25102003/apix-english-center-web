"use client";

import { useQuery } from "@tanstack/react-query";

import { roomKeys } from "@/lib/api/query-keys";
import { roomApi } from "../api/room.api";

export function useRoom(id: string) {
  return useQuery({
    queryKey: roomKeys.detail(id),
    queryFn: () => roomApi.getById(id),
    enabled: Boolean(id),
  });
}
