"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mediaVideoApi } from "../api/media-video.api";
import { mediaVideoKeys } from "@/lib/api/query-keys";

export function useApproveVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => mediaVideoApi.approveVideo(id),
    onSuccess: (_, id) => {
      void queryClient.invalidateQueries({ queryKey: mediaVideoKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: mediaVideoKeys.detail(id) });
    },
  });
}
