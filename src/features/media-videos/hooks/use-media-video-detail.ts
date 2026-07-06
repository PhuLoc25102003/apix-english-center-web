"use client";

import { useQuery } from "@tanstack/react-query";
import { mediaVideoApi } from "../api/media-video.api";
import { mediaVideoKeys } from "@/lib/api/query-keys";

export function useMediaVideoDetail(id: string) {
  return useQuery({
    queryKey: mediaVideoKeys.detail(id),
    queryFn: () => mediaVideoApi.getVideoDetail(id),
    enabled: !!id,
  });
}
