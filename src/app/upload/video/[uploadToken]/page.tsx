"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { MobileVideoUploadPage } from "@/features/media-videos";

export default function MobileUploadRoutePage() {
  const params = useParams();
  const uploadToken = params.uploadToken as string;

  return <MobileVideoUploadPage uploadToken={uploadToken} />;
}
