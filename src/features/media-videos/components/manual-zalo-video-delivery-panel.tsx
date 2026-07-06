"use client";

import * as React from "react";
import { MessageSquare, Copy, Check, ExternalLink, RefreshCw, Send, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStudentParents } from "@/features/students/hooks/use-student-parents";
import { usePrepareManualZaloVideoMessage } from "../hooks/use-prepare-manual-zalo-video-message";
import { useUpdateDeliveryStatus } from "../hooks/use-update-delivery-status";
import type { MediaVideo, ZaloMessageResponse } from "../types/media-video.type";

interface ManualZaloVideoDeliveryPanelProps {
  video: MediaVideo;
  onClose?: () => void;
}

export function ManualZaloVideoDeliveryPanel({
  video,
  onClose,
}: ManualZaloVideoDeliveryPanelProps) {
  const [selectedParentIdState, setSelectedParentIdState] = React.useState<string>("");
  const [copied, setCopied] = React.useState(false);
  const [errorNote, setErrorNote] = React.useState("");
  const [showErrorInput, setShowErrorInput] = React.useState(false);
  const [preparedMsg, setPreparedMsg] = React.useState<ZaloMessageResponse | null>(null);

  // Fetch student parents
  const { data: parentsData, isLoading: isLoadingParents } = useStudentParents(video.studentId);
  const parentRelations = React.useMemo(() => parentsData?.data || [], [parentsData]);

  // Compute fallback parent ID reactively to avoid calling setState inside useEffect
  const defaultParentId = React.useMemo(() => {
    if (parentRelations.length === 0) return "";
    const primary = parentRelations.find((p) => p.isPrimaryContact);
    return primary ? primary.id : parentRelations[0].id;
  }, [parentRelations]);

  const selectedParentId = selectedParentIdState || defaultParentId;

  // Mutations
  const prepareMessageMutation = usePrepareManualZaloVideoMessage();
  const updateStatusMutation = useUpdateDeliveryStatus(video.id);

  const handlePrepareMessage = async () => {
    if (!selectedParentId) {
      toast.error("Vui lòng chọn phụ huynh nhận tin nhắn.");
      return;
    }

    try {
      const result = await prepareMessageMutation.mutateAsync({
        id: video.id,
        parentId: selectedParentId,
      });
      setPreparedMsg(result);
      toast.success("Đã khởi tạo nội dung tin nhắn gửi phụ huynh!");
    } catch (err: unknown) {
      toast.error(
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
          "Không thể chuẩn bị tin nhắn. Vui lòng thử lại."
      );
    }
  };

  const handleCopy = async () => {
    if (!preparedMsg) return;
    try {
      await navigator.clipboard.writeText(preparedMsg.messageContent);
      setCopied(true);
      toast.success("Đã sao chép nội dung tin nhắn!");
      setTimeout(() => setCopied(false), 2000);

      // Track COPIED state in backend
      await updateStatusMutation.mutateAsync({
        deliveryId: preparedMsg.deliveryId,
        status: "COPIED",
      });
      setPreparedMsg((prev) => prev ? { ...prev, status: "COPIED" } : null);
    } catch {
      toast.error("Không thể sao chép tin nhắn.");
    }
  };

  const handleOpenZalo = async () => {
    if (!preparedMsg) return;
    try {
      const phone = preparedMsg.parentPhone.replace(/^[+]/, "");
      const url = `https://zalo.me/${phone}`;
      window.open(url, "_blank");

      // Track OPENED_ZALO state in backend
      await updateStatusMutation.mutateAsync({
        deliveryId: preparedMsg.deliveryId,
        status: "OPENED_ZALO",
      });
      setPreparedMsg((prev) => prev ? { ...prev, status: "OPENED_ZALO" } : null);
    } catch {
      toast.error("Không thể mở Zalo.");
    }
  };

  const handleMarkSent = async () => {
    if (!preparedMsg) return;
    try {
      await updateStatusMutation.mutateAsync({
        deliveryId: preparedMsg.deliveryId,
        status: "SENT_MANUALLY",
      });
      setPreparedMsg((prev) => prev ? { ...prev, status: "SENT_MANUALLY" } : null);
      toast.success("Đã đánh dấu là ĐÃ GỬI phụ huynh thành công!");
      onClose?.();
    } catch {
      toast.error("Không thể cập nhật trạng thái.");
    }
  };

  const handleMarkFailed = async () => {
    if (!preparedMsg) return;
    try {
      await updateStatusMutation.mutateAsync({
        deliveryId: preparedMsg.deliveryId,
        status: "FAILED",
        note: errorNote || undefined,
      });
      setPreparedMsg((prev) => prev ? { ...prev, status: "FAILED" } : null);
      toast.success("Đã đánh dấu là GỬI THẤT BẠI.");
      setShowErrorInput(false);
      setErrorNote("");
      onClose?.();
    } catch {
      toast.error("Không thể cập nhật trạng thái.");
    }
  };

  return (
    <div className="glass-card border border-white/60 bg-white/40 p-5 rounded-2xl shadow-xs backdrop-blur-md flex flex-col gap-4">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-200/50">
        <MessageSquare className="h-5 w-5 text-[#FF161A]" />
        <h3 className="font-bold text-slate-800 text-sm">Gửi tin nhắn Zalo cho Phụ huynh</h3>
      </div>

      <div className="space-y-3">
        {/* Step 1: Select Parent */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700">Chọn người nhận (Phụ huynh học viên)</label>
          <div className="flex gap-2">
            <Select
              value={selectedParentId}
              onValueChange={(val) => setSelectedParentIdState(val || "")}
              disabled={isLoadingParents || !!preparedMsg}
            >
              <SelectTrigger className="flex-1 bg-white/50 border-slate-200 rounded-xl cursor-pointer">
                <SelectValue placeholder={isLoadingParents ? "Đang tải phụ huynh..." : "Chọn phụ huynh"} />
              </SelectTrigger>
              <SelectContent>
                {parentRelations.map((rel) => (
                  <SelectItem key={rel.id} value={rel.id}>
                    {rel.fullName} ({rel.relationship === "MOTHER" ? "Mẹ" : rel.relationship === "FATHER" ? "Bố" : "Người bảo hộ"} · {rel.phone})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {!preparedMsg && (
              <Button
                onClick={handlePrepareMessage}
                disabled={prepareMessageMutation.isPending || !selectedParentId}
                className="bg-[#FF161A] text-white hover:bg-[#C90012] px-4 rounded-xl font-bold text-xs h-9 cursor-pointer flex items-center gap-1 shrink-0"
              >
                {prepareMessageMutation.isPending ? (
                  <RefreshCw className="h-3 w-3 animate-spin" />
                ) : (
                  "Chuẩn bị tin nhắn"
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Step 2: Message Copy and Send Controls */}
        {preparedMsg && (
          <div className="mt-4 border-t border-slate-200/40 pt-4 space-y-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-slate-500 font-medium">Trạng thái gửi hiện tại:</span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C90012]">
                {preparedMsg.status === "PREPARED"
                  ? "ĐÃ TẠO BẢN DRAFT"
                  : preparedMsg.status === "COPIED"
                  ? "ĐÃ SAO CHÉP"
                  : preparedMsg.status === "OPENED_ZALO"
                  ? "ĐÃ MỞ TRANG ZALO"
                  : preparedMsg.status === "SENT_MANUALLY"
                  ? "ĐÃ GỬI THÀNH CÔNG"
                  : "GỬI THẤT BẠI"}
              </span>
            </div>

            {/* Message Preview */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700">Nội dung tin nhắn gửi Zalo</label>
              <Textarea
                readOnly
                value={preparedMsg.messageContent}
                className="h-28 text-xs font-medium font-sans border-slate-200 bg-slate-50/70 p-3 rounded-xl resize-none leading-relaxed text-slate-700"
              />
            </div>

            {/* Zalo actions */}
            <div className="grid grid-cols-2 gap-2.5">
              <Button
                variant="outline"
                onClick={handleCopy}
                className="rounded-xl h-10 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-500" /> Đã copy
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" /> Copy tin nhắn
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={handleOpenZalo}
                className="rounded-xl h-10 border border-[#0068FF] text-[#0068FF] hover:bg-[#0068FF]/5 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ExternalLink className="h-4 w-4" /> Mở Zalo Chat
              </Button>
            </div>

            <div className="bg-slate-50/70 p-3 border border-slate-100/60 rounded-xl text-[11px] text-slate-500 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
              <p>
                <b>Hướng dẫn:</b> Click <b>Copy tin nhắn</b>, sau đó click <b>Mở Zalo Chat</b>. Khi Zalo mở ra, tìm/chọn liên hệ và dán (Paste / Ctrl+V) tin nhắn để gửi thủ công cho phụ huynh.
              </p>
            </div>

            {/* Confirmation workflow */}
            <div className="flex justify-between items-center gap-2 border-t border-slate-200/40 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowErrorInput(!showErrorInput)}
                className="text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-xl text-xs h-9 cursor-pointer"
              >
                Báo gửi lỗi
              </Button>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setPreparedMsg(null)}
                  className="rounded-xl border border-slate-200 text-slate-700 text-xs h-9 hover:bg-slate-50 cursor-pointer"
                >
                  Chọn lại
                </Button>
                <Button
                  type="button"
                  onClick={handleMarkSent}
                  className="bg-emerald-600 text-white hover:bg-emerald-700 px-4 rounded-xl font-bold text-xs h-9 cursor-pointer flex items-center gap-1 shadow-md shadow-emerald-500/10"
                >
                  <Send className="h-3.5 w-3.5" /> Xác nhận đã gửi
                </Button>
              </div>
            </div>

            {showErrorInput && (
              <div className="space-y-2 mt-2 bg-rose-50/50 border border-rose-100/60 p-3 rounded-xl">
                <label className="text-[11px] font-bold text-rose-800">Lý do lỗi / Ghi chú</label>
                <Input
                  type="text"
                  placeholder="Nhập lý do gửi lỗi (ví dụ: Sai số điện thoại, Phụ huynh không online...)"
                  value={errorNote}
                  onChange={(e) => setErrorNote(e.target.value)}
                  className="bg-white border-slate-200 rounded-xl text-xs"
                />
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowErrorInput(false)}
                    className="text-slate-500 text-xs hover:bg-slate-100 rounded-lg h-7"
                  >
                    Đóng
                  </Button>
                  <Button
                    type="button"
                    onClick={handleMarkFailed}
                    className="bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs h-7 px-3 cursor-pointer font-semibold"
                  >
                    Lưu lỗi
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
