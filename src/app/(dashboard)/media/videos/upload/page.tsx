"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UploadPageRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/media/videos?openUpload=true");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[400px] bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-xs">
      <p className="text-sm font-semibold text-slate-500">Đang chuyển hướng...</p>
    </div>
  );
}
