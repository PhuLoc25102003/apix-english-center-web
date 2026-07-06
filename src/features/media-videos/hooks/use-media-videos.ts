"use client";

import { useQuery } from "@tanstack/react-query";
import { mediaVideoApi } from "../api/media-video.api";
import { mediaVideoKeys } from "@/lib/api/query-keys";

export function useMediaVideos(filters?: Record<string, unknown>) {
  return useQuery({
    queryKey: mediaVideoKeys.list(filters ?? {}),
    queryFn: () => mediaVideoApi.listVideos(filters),
  });
}
