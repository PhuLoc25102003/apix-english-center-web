"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mediaVideoApi } from "../api/media-video.api";
import { mediaVideoKeys } from "@/lib/api/query-keys";

export function useUpdateDeliveryStatus(videoId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      deliveryId,
      status,
      note,
    }: {
      deliveryId: string;
      status: string;
      note?: string;
    }) => mediaVideoApi.updateDeliveryStatus(deliveryId, status, note),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: mediaVideoKeys.detail(videoId) });
      void queryClient.invalidateQueries({ queryKey: mediaVideoKeys.deliveries(videoId) });
    },
  });
}
