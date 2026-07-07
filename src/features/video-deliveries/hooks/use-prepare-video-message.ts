"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { videoDeliveryApi } from "../api/video-delivery.api";
import { invalidateVideoDeliveryQueries } from "./video-delivery-mutation";
export function usePrepareVideoMessage() { const client = useQueryClient(); return useMutation({ mutationFn: videoDeliveryApi.prepareMessage, onSuccess: (_, id) => invalidateVideoDeliveryQueries(client, id) }); }

