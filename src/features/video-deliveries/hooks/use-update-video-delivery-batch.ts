"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { videoDeliveryApi } from "../api/video-delivery.api";
import { invalidateVideoDeliveryQueries } from "./video-delivery-mutation";
import type { UpdateVideoDeliveryBatchDto } from "../types/video-delivery.type";
export function useUpdateVideoDeliveryBatch() { const client = useQueryClient(); return useMutation({ mutationFn: ({ id, body }: { id: string; body: UpdateVideoDeliveryBatchDto }) => videoDeliveryApi.updateBatch(id, body), onSuccess: () => invalidateVideoDeliveryQueries(client) }); }

