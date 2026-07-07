"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { videoDeliveryApi } from "../api/video-delivery.api";
import { invalidateVideoDeliveryQueries } from "./video-delivery-mutation";
export function useMarkVideoMessageCopied() { const client = useQueryClient(); return useMutation({ mutationFn: videoDeliveryApi.markCopied, onSuccess: (_, id) => invalidateVideoDeliveryQueries(client, id) }); }

