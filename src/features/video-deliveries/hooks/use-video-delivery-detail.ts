"use client";
import { useQuery } from "@tanstack/react-query";
import { videoDeliveryKeys } from "@/lib/api/query-keys";
import { videoDeliveryApi } from "../api/video-delivery.api";
export function useVideoDeliveryDetail(id: string) { return useQuery({ queryKey: videoDeliveryKeys.deliveryDetail(id), queryFn: () => videoDeliveryApi.getDelivery(id), enabled: Boolean(id) }); }

