"use client";

import * as React from "react";
import Image from "next/image";
import { Upload, Film, CheckCircle, AlertTriangle, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUploadSession } from "../hooks/use-upload-session";
import { usePresignVideoUpload } from "../hooks/use-presign-video-upload";
import { useCompleteVideoUpload } from "../hooks/use-complete-video-upload";
import { mediaVideoApi } from "../api/media-video.api";
import { formatBytes } from "../utils/video-upload.utils";
import { toast } from "sonner";

interface MobileVideoUploadPageProps {
  uploadToken: string;
}

export function MobileVideoUploadPage({ uploadToken }: MobileVideoUploadPageProps) {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = React.useState<number | null>(null);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  // 1. Fetch Session
  const { data: session, isLoading, isError } = useUploadSession(uploadToken);

  // 2. Mutations
  const presignMutation = usePresignVideoUpload(uploadToken);
  const completeMutation = useCompleteVideoUpload(uploadToken);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);

    // Validate MIME type
    const allowedMimeTypes = session?.allowedMimeTypes || ["video/mp4", "video/quicktime", "video/x-matroska", "video/webm"];
    const isVideo = file.type.startsWith("video/") || allowedMimeTypes.includes(file.type);
    if (!isVideo) {
      setErrorMsg("Tập tin chọn phải là định dạng Video (mp4, mov, webm...)");
      setSelectedFile(null);
      return;
    }

    // Validate Size
    const maxMb = session?.maxFileSizeMb || 100;
    const fileMb = file.size / (1024 * 1024);
    if (fileMb > maxMb) {
      setErrorMsg(`Dung lượng video vượt quá giới hạn cho phép (${maxMb}MB). Vui lòng nén video hoặc chọn tập tin khác.`);
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const handleTriggerSelect = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!selectedFile || !session) return;

    setErrorMsg(null);
    setUploadProgress(0);

    try {
      // Step A: Request Presigned URL
      const presigned = await presignMutation.mutateAsync({
        fileName: selectedFile.name,
        mimeType: selectedFile.type || "video/mp4",
        fileSizeBytes: selectedFile.size,
      });

      // Step B: Upload file directly to object storage via presigned url
      await mediaVideoApi.uploadFileToPresignedUrl(
        presigned.uploadUrl,
        selectedFile,
        presigned.headers,
        (percent) => {
          setUploadProgress(percent);
        }
      );

      // Step C: Complete Session
      await completeMutation.mutateAsync({
        storageBucket: presigned.storageBucket,
        storageKey: presigned.storageKey,
        originalFileName: selectedFile.name,
        mimeType: selectedFile.type || "video/mp4",
        fileSizeBytes: selectedFile.size,
      });

      setIsSuccess(true);
      setSelectedFile(null);
      setUploadProgress(null);
    } catch (err: unknown) {
      setUploadProgress(null);
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || "Đã xảy ra lỗi trong quá trình tải lên. Vui lòng kiểm tra kết nối mạng.";
      setErrorMsg(msg);
      toast.error(msg);
    }
  };

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
        <RefreshCw className="h-8 w-8 text-[#FF161A] animate-spin mb-3" />
        <p className="text-sm font-semibold text-slate-400">Đang tải thông tin phiên...</p>
      </div>
    );
  }

  // Session Not Found / Error Screen
  if (isError || !session) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="h-14 w-14 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 border border-rose-500/20 mb-4">
          <AlertCircle className="h-7 w-7" />
        </div>
        <h2 className="text-base font-bold">Liên kết không hợp lệ</h2>
        <p className="text-xs text-slate-400 max-w-[280px] mt-1.5 leading-relaxed">
          Đường dẫn tải video không hợp lệ hoặc đã bị xóa. Vui lòng kiểm tra lại.
        </p>
      </div>
    );
  }

  // Session Expired Screen
  const isExpired = session.status === "EXPIRED" || new Date(session.expiresAt) < new Date();
  if (isExpired && !isSuccess) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="h-14 w-14 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20 mb-4">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h2 className="text-base font-bold">Phiên tải lên đã hết hạn</h2>
        <p className="text-xs text-slate-400 max-w-[280px] mt-1.5 leading-relaxed">
          Phiên làm việc QR này đã hết hiệu lực bảo mật. Vui lòng quay lại máy tính và tạo một mã QR mới để tải lên.
        </p>
      </div>
    );
  }

  // Success Screen
  if (isSuccess) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-6">
        {/* Header Branding */}
        <header className="flex w-full justify-center pt-8">
          <Image
            src="/branding/apix-english-logo-transparent.png"
            alt="APIX English Logo"
            width={1812}
            height={1376}
            className="w-20 h-auto object-contain"
          />
        </header>

        {/* Content Box */}
        <section className="flex flex-col items-center text-center gap-4 my-auto">
          <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20 mb-2 scale-110">
            <CheckCircle className="h-9 w-9" />
          </div>
          <h2 className="text-lg font-bold text-slate-100">Upload thành công!</h2>
          <p className="text-xs text-slate-400 max-w-[280px] leading-relaxed">
            Video hoạt động của học viên đã được ghi nhận. Bạn có thể quay lại máy tính để tiến hành phê duyệt và gửi tin nhắn.
          </p>
        </section>

        {/* Footer info */}
        <footer className="text-center pb-6 text-[10px] text-slate-600 font-medium uppercase tracking-wider">
          APIX English Management System
        </footer>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-6">
      {/* Header Branding */}
      <header className="flex w-full justify-center pt-6">
        <Image
          src="/branding/apix-english-logo-transparent.png"
          alt="APIX English Logo"
          width={1812}
          height={1376}
          className="w-20 h-auto object-contain"
        />
      </header>

      {/* Main Upload Box */}
      <section className="my-auto flex flex-col gap-6">
        {/* Metadata info */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-2">
          <span className="text-[10px] font-bold tracking-wider text-[#FF161A] uppercase">
            {session.videoType === "CLASS_ACTIVITY"
              ? "Hoạt động lớp học"
              : session.videoType === "MONTHLY_REVIEW"
              ? "Đánh giá tháng học viên"
              : "Cuối khóa"}
          </span>

          <div className="space-y-1">
            <h2 className="text-sm font-bold text-slate-100 line-clamp-2">
              {session.title || "Tải lên Video hoạt động học viên"}
            </h2>
            {session.description && (
              <p className="text-[11px] text-slate-400 line-clamp-2 italic">Ghi chú: &ldquo;{session.description}&rdquo;</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-medium">
            <div>
              Học viên: <span className="font-bold text-slate-200">{session.studentName}</span>
            </div>
            <div>
              Lớp: <span className="font-bold text-slate-200">{session.className}</span>
            </div>
            <div className="col-span-2">
              Tháng áp dụng: <span className="font-bold text-slate-200">Tháng {session.targetMonth?.split("-").reverse().join("/")}</span>
            </div>
          </div>
        </div>

        {/* Input file selection trigger */}
        <input
          type="file"
          accept="video/*"
          capture="environment" // Auto open camera on mobile if supported
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          disabled={uploadProgress !== null}
        />

        {!selectedFile && uploadProgress === null ? (
          <button
            onClick={handleTriggerSelect}
            className="border-2 border-dashed border-slate-700 hover:border-[#FF161A] rounded-2xl aspect-video w-full flex flex-col items-center justify-center p-6 cursor-pointer bg-slate-900/40 text-center gap-2.5 transition-colors"
          >
            <div className="h-12 w-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
              <Upload className="h-6 w-6" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-slate-200">Chọn video từ thiết bị hoặc quay trực tiếp</p>
              <p className="text-[10px] text-slate-500">Giới hạn dung lượng tối đa: {session.maxFileSizeMb || 100}MB</p>
            </div>
          </button>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-[#FF161A]/10 border border-[#FF161A]/20 rounded-xl flex items-center justify-center text-[#FF161A]">
                <Film className="h-5 w-5" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold text-slate-200 truncate">{selectedFile?.name}</p>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                  {selectedFile && formatBytes(selectedFile.size)}
                </p>
              </div>
              {uploadProgress === null && (
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-slate-500 hover:text-slate-300 text-xs font-bold px-2 py-1 cursor-pointer"
                >
                  Xóa
                </button>
              )}
            </div>

            {/* Upload Progress Loader */}
            {uploadProgress !== null && (
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                  <span>{uploadProgress < 100 ? "Đang tải tệp tin lên..." : "Đang xử lý trên máy chủ..."}</span>
                  <span className="font-mono">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#FF161A] to-[#C90012] h-full rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {uploadProgress === null && (
              <Button
                type="button"
                onClick={handleUpload}
                disabled={presignMutation.isPending || completeMutation.isPending}
                className="w-full bg-[#FF161A] hover:bg-[#C90012] text-white font-bold rounded-xl h-11 text-xs cursor-pointer shadow-md shadow-[#FF161A]/10"
              >
                {presignMutation.isPending ? "Đang xử lý link..." : "Bắt đầu tải lên"}
              </Button>
            )}
          </div>
        )}

        {/* Warning messages */}
        {errorMsg && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl p-3 flex items-start gap-2 text-xs leading-relaxed text-left">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}
      </section>

      {/* Footer info */}
      <footer className="text-center pb-4 text-[10px] text-slate-600 font-medium">
        APIX English System · Bảo mật phiên kết nối QR
      </footer>
    </main>
  );
}
