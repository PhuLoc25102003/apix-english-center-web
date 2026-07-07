"use client";

import type { QueryClient } from "@tanstack/react-query";
import { videoDeliveryKeys } from "@/lib/api/query-keys";

export function invalidateVideoDeliveryQueries(queryClient: QueryClient, id?: string) {
  void queryClient.invalidateQueries({ queryKey: videoDeliveryKeys.batches() });
  void queryClient.invalidateQueries({ queryKey: videoDeliveryKeys.deliveries() });
  void queryClient.invalidateQueries({ queryKey: [...videoDeliveryKeys.all, "stats"] });
  if (id) void queryClient.invalidateQueries({ queryKey: videoDeliveryKeys.deliveryDetail(id) });
}

