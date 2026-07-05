"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Phone, MessageSquare, Copy, Check, X, Contact } from "lucide-react";
import { toast } from "sonner";

import { contactInfo } from "@/constants/landing-content";

function Facebook(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function FloatingContactActions() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleCopyPhone = async () => {
    try {
      const cleanPhone = contactInfo.phone.replace(/\s+/g, "");
      await navigator.clipboard.writeText(cleanPhone);
      setCopied(true);
      toast.success("Đã sao chép số điện thoại hotline!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Không thể sao chép số điện thoại.");
    }
  };

  const cleanPhone = contactInfo.phone.replace(/\s+/g, "");

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 font-sans">
      {/* Contact Quick Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.85, y: 15 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.85, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="w-72 overflow-hidden rounded-[24px] border border-white bg-white/95 p-5 shadow-[0_24px_60px_rgba(255,22,26,0.18)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-red-50 pb-3">
              <strong className="font-display text-sm font-extrabold text-[#111318]">
                Liên hệ APIX English
              </strong>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Đóng bảng liên hệ"
                className="rounded-full p-1 text-[#6B7280] hover:bg-red-50 hover:text-[#C90012] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF161A]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {/* Call Hotline */}
              <div className="flex flex-col gap-1.5 rounded-2xl bg-[#FFE7E8]/40 p-3 border border-red-100/40">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C90012]">
                  Hotline Hỗ Trợ
                </span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`tel:${cleanPhone}`}
                    className="flex items-center gap-2 font-display text-base font-extrabold text-[#C90012] hover:underline"
                    aria-label={`Gọi hotline ${contactInfo.phoneDisplay}`}
                  >
                    <Phone className="h-4 w-4 shrink-0" />
                    {contactInfo.phoneDisplay}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    aria-label="Sao chép số điện thoại"
                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-red-200 text-[#C90012] hover:bg-[#FFE7E8] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF161A]"
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-green-600" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Zalo Chat */}
              <a
                href={contactInfo.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-red-50 bg-white p-3 font-semibold text-[#374151] shadow-sm transition-all hover:bg-[#FFF1F2] hover:border-red-100 hover:text-[#C90012] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF161A]"
                aria-label="Nhắn tin Zalo hỗ trợ"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <MessageSquare className="h-4 w-4" />
                </span>
                <div className="text-left">
                  <p className="text-xs font-bold text-[#111318]">Chat Zalo</p>
                  <p className="text-[11px] text-[#6B7280] font-normal">Hỗ trợ nhanh trong 5 phút</p>
                </div>
              </a>

              {/* Fanpage FB */}
              <a
                href={contactInfo.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-red-50 bg-white p-3 font-semibold text-[#374151] shadow-sm transition-all hover:bg-[#FFF1F2] hover:border-red-100 hover:text-[#C90012] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF161A]"
                aria-label="Truy cập Fanpage Facebook"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-[#1877F2]">
                  <Facebook className="h-4 w-4" />
                </span>
                <div className="text-left">
                  <p className="text-xs font-bold text-[#111318]">Fanpage Facebook</p>
                  <p className="text-[11px] text-[#6B7280] font-normal">Anh Ngữ APIX</p>
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating bubble */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Liên hệ trực tuyến"
        aria-expanded={isOpen}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#FF161A] to-[#B80012] text-white shadow-[0_16px_40px_rgba(255,22,26,0.28)] hover:scale-105 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF161A]"
      >
        {isOpen ? (
          <X className="h-6 w-6 animate-spin-once" />
        ) : (
          <Contact className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}
