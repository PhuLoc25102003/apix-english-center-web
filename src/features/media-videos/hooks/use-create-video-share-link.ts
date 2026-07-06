"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mediaVideoApi } from "../api/media-video.api";
import { mediaVideoKeys } from "@/lib/api/query-keys";

export function useCreateVideoShareLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => mediaVideoApi.createShareLink(id),
    onSuccess: (_, id) => {
      void queryClient.invalidateQueries({ queryKey: mediaVideoKeys.detail(id) });
      void queryClient.invalidateQueries({ queryKey: mediaVideoKeys.shareLinks(id) });
    },
  });
}
export function useRevokeVideoShareLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => mediaVideoApi.revokeShareLink(id),
    onSuccess: (_, id) => {
      void queryClient.invalidateQueries({ queryKey: mediaVideoKeys.detail(id) });
      void queryClient.invalidateQueries({ queryKey: mediaVideoKeys.shareLinks(id) });
    },
  });
}
