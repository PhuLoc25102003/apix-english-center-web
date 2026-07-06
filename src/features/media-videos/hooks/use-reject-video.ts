"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mediaVideoApi } from "../api/media-video.api";
import { mediaVideoKeys } from "@/lib/api/query-keys";

export function useRejectVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      mediaVideoApi.rejectVideo(id, reason),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: mediaVideoKeys.lists() });
      void queryClient.invalidateQueries({
        queryKey: mediaVideoKeys.detail(variables.id),
      });
    },
  });
}
