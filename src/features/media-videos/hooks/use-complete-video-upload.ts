"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mediaVideoApi } from "../api/media-video.api";
import { mediaVideoKeys } from "@/lib/api/query-keys";
import type { CompleteUploadDto } from "../types/media-video.type";

export function useCompleteVideoUpload(uploadToken: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CompleteUploadDto) =>
      mediaVideoApi.completeVideoUpload(uploadToken, dto),
    onSuccess: () => {
      // Invalidate active video lists and session detail cache
      void queryClient.invalidateQueries({ queryKey: mediaVideoKeys.lists() });
      void queryClient.invalidateQueries({
        queryKey: mediaVideoKeys.uploadSession(uploadToken),
      });
    },
  });
}
