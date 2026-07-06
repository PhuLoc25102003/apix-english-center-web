"use client";

import { useMutation } from "@tanstack/react-query";
import { mediaVideoApi } from "../api/media-video.api";
import type { PresignUploadDto } from "../types/media-video.type";

export function usePresignVideoUpload(uploadToken: string) {
  return useMutation({
    mutationFn: (dto: PresignUploadDto) =>
      mediaVideoApi.presignVideoUpload(uploadToken, dto),
  });
}
