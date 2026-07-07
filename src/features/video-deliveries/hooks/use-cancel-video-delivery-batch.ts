"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { videoDeliveryApi } from "../api/video-delivery.api";
import { invalidateVideoDeliveryQueries } from "./video-delivery-mutation";
export function useCancelVideoDeliveryBatch() { const client = useQueryClient(); return useMutation({ mutationFn: videoDeliveryApi.cancelBatch, onSuccess: () => invalidateVideoDeliveryQueries(client) }); }

