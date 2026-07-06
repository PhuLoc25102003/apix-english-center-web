"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Video } from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { useMediaVideos } from "../hooks/use-media-videos";
import { VideoFilters } from "./video-filters";
import { VideoTable } from "./video-table";
import { CreateVideoUploadSessionModal } from "./create-video-upload-session-modal";
import { VideoUploadQrDialog } from "./video-upload-qr-dialog";
import { VideoReviewPanel } from "./video-review-panel";
import { VideoShareLinkPanel } from "./video-share-link-panel";
import { ManualZaloVideoDeliveryPanel } from "./manual-zalo-video-delivery-panel";
import type { MediaVideo, VideoUploadSession } from "../types/media-video.type";

interface VideoListContainerProps {
  initialClassId?: string;
  initialStudentId?: string;
  title?: string;
  description?: string;
}

export function VideoListContainer({
  initialClassId = "",
  initialStudentId = "",
  title = "Quản lý Video Học Tập (Media Library)",
  description = "Tạo phiên tải lên qua điện thoại bằng mã QR, phê duyệt video hoạt động và gửi tin nhắn cập nhật cho phụ huynh học viên.",
}: VideoListContainerProps) {
  // Query filters state
  const [search, setSearch] = React.useState("");
  const [classId, setClassId] = React.useState(initialClassId);
  const [studentId, setStudentId] = React.useState(initialStudentId);
  const [videoType, setVideoType] = React.useState("");
  const [targetMonth, setTargetMonth] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [parentVisible, setParentVisible] = React.useState("");
  const [page, setPage] = React.useState(1);
  const limit = 10;

  // Modals & Dialogs state
  const [isCreateSessionOpen, setIsCreateSessionOpen] = React.useState(false);
  const [createdSession, setCreatedSession] = React.useState<VideoUploadSession | null>(null);
  const [isQrOpen, setIsQrOpen] = React.useState(false);

  // Auto-open modal on redirect from /media/videos/upload
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("openUpload") === "true") {
        const timer = setTimeout(() => {
          setIsCreateSessionOpen(true);
        }, 0);
        // Clear query parameters to avoid reopen on reload
        const newUrl = window.location.pathname;
        window.history.replaceState({}, "", newUrl);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Active video overlay panel state
  const [activeVideo, setActiveVideo] = React.useState<MediaVideo | null>(null);
  const [panelType, setPanelType] = React.useState<"review" | "share" | "zalo" | null>(null);

  // Synchronous filter update handlers that reset the page to 1
  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };
  const handleClassIdChange = (val: string) => {
    setClassId(val);
    setPage(1);
  };
  const handleStudentIdChange = (val: string) => {
    setStudentId(val);
    setPage(1);
  };
  const handleVideoTypeChange = (val: string) => {
    setVideoType(val);
    setPage(1);
  };
  const handleTargetMonthChange = (val: string) => {
    setTargetMonth(val);
    setPage(1);
  };
  const handleStatusChange = (val: string) => {
    setStatus(val);
    setPage(1);
  };
  const handleParentVisibleChange = (val: string) => {
    setParentVisible(val);
    setPage(1);
  };

  // Fetch videos list
  const { data, isLoading, isError, error, refetch } = useMediaVideos({
    page,
    limit,
    search: search || undefined,
    classId: classId || undefined,
    studentId: studentId || undefined,
    videoType: videoType || undefined,
    targetMonth: targetMonth || undefined,
    status: status || undefined,
    parentVisible: parentVisible ? (parentVisible === "VISIBLE") : undefined,
  });

  const handleClearFilters = () => {
    setSearch("");
    setClassId(initialClassId);
    setStudentId(initialStudentId);
    setVideoType("");
    setTargetMonth("");
    setStatus("");
    setParentVisible("");
    setPage(1);
  };

  const handleCreateSessionSuccess = (session: VideoUploadSession) => {
    setCreatedSession(session);
    setIsQrOpen(true);
  };

  const handleQrUploadCompleted = () => {
    void refetch();
  };

  const handleReviewAction = (video: MediaVideo) => {
    setActiveVideo(video);
    setPanelType("review");
  };

  const handleShareAction = (video: MediaVideo) => {
    setActiveVideo(video);
    setPanelType("share");
  };

  const handleZaloAction = (video: MediaVideo) => {
    setActiveVideo(video);
    setPanelType("zalo");
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={title}
        description={description}
        action={
          <Button
            onClick={() => setIsCreateSessionOpen(true)}
            className="font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] px-4 py-2 rounded-xl shadow-md shadow-[#FF161A]/15 transition-all inline-flex items-center gap-2 cursor-pointer h-10 text-xs"
          >
            <Video className="h-4 w-4" />
            Upload bằng điện thoại (QR)
          </Button>
        }
      />

      {/* Hide class/student filters if initialized contextually */}
      <VideoFilters
        search={search}
        onSearchChange={handleSearchChange}
        classId={initialClassId ? "" : classId}
        onClassIdChange={handleClassIdChange}
        studentId={initialStudentId ? "" : studentId}
        onStudentIdChange={handleStudentIdChange}
        videoType={videoType}
        onVideoTypeChange={handleVideoTypeChange}
        targetMonth={targetMonth}
        onTargetMonthChange={handleTargetMonthChange}
        status={status}
        onStatusChange={handleStatusChange}
        parentVisible={parentVisible}
        onParentVisibleChange={handleParentVisibleChange}
      />

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full rounded-xl bg-white/40" />
          <Skeleton className="h-32 w-full rounded-xl bg-white/40" />
        </div>
      ) : isError ? (
        <div className="glass-card border border-white/60 bg-white/40 p-8 rounded-2xl text-center">
          <h3 className="text-sm font-bold text-slate-800">Không thể tải danh sách video</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            {error?.message || "Đã xảy ra lỗi trong quá trình kết nối đến máy chủ."}
          </p>
          <Button onClick={() => void refetch()} className="bg-slate-900 text-white rounded-xl h-9 text-xs">
            Thử lại
          </Button>
        </div>
      ) : !data || data.data.length === 0 ? (
        <div className="glass-card border border-white/60 bg-white/40 p-8 rounded-2xl text-center flex flex-col items-center justify-center min-h-[220px]">
          <Video className="h-8 w-8 text-slate-400 mb-2" />
          <h3 className="text-sm font-bold text-slate-700">Chưa có video nào</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-[320px]">
            Hệ thống chưa tìm thấy video nào. Hãy bắt đầu bằng cách tải lên một video mới thông qua mã QR điện thoại.
          </p>
          {(search || classId || studentId || videoType || targetMonth || status) && (
            <Button
              variant="outline"
              onClick={handleClearFilters}
              className="mt-4 rounded-xl border border-slate-200 text-slate-700 text-xs h-9 hover:bg-slate-50 cursor-pointer"
            >
              Xóa bộ lọc
            </Button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <VideoTable
            videos={data.data}
            onReview={handleReviewAction}
            onShare={handleShareAction}
            onZalo={handleZaloAction}
          />

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4 px-2">
            <p className="text-sm text-slate-500">
              Hiển thị {data.data.length > 0 ? (page - 1) * limit + 1 : 0} -{" "}
              {Math.min(page * limit, data.meta.total)} trong tổng số {data.meta.total} video
            </p>
            {data.meta.totalPages > 1 && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!data.meta.hasPreviousPage}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  className="h-8 rounded-lg bg-white/60 hover:bg-white text-slate-700"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Trước
                </Button>
                <span className="text-sm font-semibold text-slate-700 select-none">
                  Trang {data.meta.page} / {data.meta.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!data.meta.hasNextPage}
                  onClick={() => setPage((prev) => Math.min(prev + 1, data.meta.totalPages))}
                  className="h-8 rounded-lg bg-white/60 hover:bg-white text-slate-700"
                >
                  Sau
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* QR upload flow modal */}
      <CreateVideoUploadSessionModal
        open={isCreateSessionOpen}
        onOpenChange={setIsCreateSessionOpen}
        onSuccess={handleCreateSessionSuccess}
      />

      <VideoUploadQrDialog
        session={createdSession}
        open={isQrOpen}
        onOpenChange={setIsQrOpen}
        onUploadSuccess={handleQrUploadCompleted}
      />

      {/* Review, Share, Zalo Action Dialog */}
      <Dialog
        open={!!activeVideo && !!panelType}
        onOpenChange={(open) => {
          if (!open) {
            setActiveVideo(null);
            setPanelType(null);
            void refetch();
          }
        }}
      >
        <DialogContent className="max-w-md bg-white/95 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-slate-900 text-base font-bold">
              {panelType === "review" && "Duyệt và Phê duyệt Video"}
              {panelType === "share" && "Liên kết Chia sẻ Video"}
              {panelType === "zalo" && "Gửi tin nhắn Zalo"}
            </DialogTitle>
          </DialogHeader>

          {activeVideo && (
            <div className="mt-2">
              {panelType === "review" && (
                <VideoReviewPanel
                  video={activeVideo}
                  onSuccess={() => {
                    void refetch();
                  }}
                />
              )}
              {panelType === "share" && <VideoShareLinkPanel video={activeVideo} />}
              {panelType === "zalo" && (
                <ManualZaloVideoDeliveryPanel
                  video={activeVideo}
                  onClose={() => {
                    setActiveVideo(null);
                    setPanelType(null);
                    void refetch();
                  }}
                />
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
