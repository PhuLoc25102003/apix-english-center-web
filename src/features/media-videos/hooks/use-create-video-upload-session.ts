"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mediaVideoApi } from "../api/media-video.api";
import { mediaVideoKeys } from "@/lib/api/query-keys";
import type { CreateVideoUploadSessionDto } from "../types/media-video.type";

export function useCreateVideoUploadSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateVideoUploadSessionDto) =>
      mediaVideoApi.createUploadSession(dto),
    onSuccess: (data) => {
      // Invalidate active lists
      void queryClient.invalidateQueries({ queryKey: mediaVideoKeys.lists() });
      // Invalidate this session key specifically if queried
      void queryClient.invalidateQueries({
        queryKey: mediaVideoKeys.uploadSession(data.uploadToken),
      });
    },
  });
}
