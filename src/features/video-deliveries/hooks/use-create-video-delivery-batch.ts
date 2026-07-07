"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { videoDeliveryApi } from "../api/video-delivery.api";
import { invalidateVideoDeliveryQueries } from "./video-delivery-mutation";
export function useCreateVideoDeliveryBatch() { const client = useQueryClient(); return useMutation({ mutationFn: videoDeliveryApi.createBatch, onSuccess: () => invalidateVideoDeliveryQueries(client) }); }

