"use client";

import { useQuery } from "@tanstack/react-query";
import { mediaVideoApi } from "../api/media-video.api";
import { mediaVideoKeys } from "@/lib/api/query-keys";

export function useUploadSession(uploadToken: string, options?: { refetchInterval?: number; enabled?: boolean }) {
  return useQuery({
    queryKey: mediaVideoKeys.uploadSession(uploadToken),
    queryFn: () => mediaVideoApi.getUploadSession(uploadToken),
    enabled: !!uploadToken && (options?.enabled ?? true),
    refetchInterval: options?.refetchInterval,
  });
}
