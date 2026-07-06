"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mediaVideoApi } from "../api/media-video.api";
import { mediaVideoKeys } from "@/lib/api/query-keys";

export function usePrepareManualZaloVideoMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, parentId }: { id: string; parentId: string }) =>
      mediaVideoApi.prepareManualZaloMessage(id, parentId),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: mediaVideoKeys.detail(variables.id) });
      void queryClient.invalidateQueries({ queryKey: mediaVideoKeys.deliveries(variables.id) });
    },
  });
}
