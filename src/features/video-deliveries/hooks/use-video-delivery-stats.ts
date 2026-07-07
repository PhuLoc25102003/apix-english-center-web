"use client";
import { useQuery } from "@tanstack/react-query";
import { videoDeliveryKeys } from "@/lib/api/query-keys";
import { videoDeliveryApi } from "../api/video-delivery.api";
import type { VideoDeliveryFilters } from "../types/video-delivery.type";
export function useVideoDeliveryStats(filters: VideoDeliveryFilters = {}) { return useQuery({ queryKey: videoDeliveryKeys.stats(filters), queryFn: () => videoDeliveryApi.getStats(filters) }); }

