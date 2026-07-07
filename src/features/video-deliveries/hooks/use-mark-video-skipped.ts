"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { videoDeliveryApi } from "../api/video-delivery.api";
import { invalidateVideoDeliveryQueries } from "./video-delivery-mutation";
export function useMarkVideoSkipped() { const client = useQueryClient(); return useMutation({ mutationFn: ({ id, reason }: { id: string; reason: string }) => videoDeliveryApi.markSkipped(id, reason), onSuccess: (_, value) => invalidateVideoDeliveryQueries(client, value.id) }); }

