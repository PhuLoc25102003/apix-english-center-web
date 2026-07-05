"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ClipboardCheck, CalendarDays, BellRing, HeartHandshake, Award, ShieldCheck } from "lucide-react";

import { progressItems } from "@/constants/landing-content";
import { ApixGlassCard } from "@/components/brand/ApixGlassCard";

const icons = [ClipboardCheck, ShieldCheck, Award, HeartHandshake, CalendarDays, BellRing];

export function ParentProgressSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="tien-bo" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-8">
        {/* Text Content */}
        <div className="flex flex-col items-start text-left">
          <span className="text-xs font-extrabold tracking-[0.2em] text-[#C90012] uppercase">
            Phụ huynh luôn nắm rõ
          </span>
          <h2 className="mt-3.5 font-display text-3xl font-extrabold tracking-tight text-[#111318] sm:text-4xl lg:text-5xl">
            Không cần phỏng đoán con đang học đến đâu
          </h2>
          <p className="mt-5 text-base leading-8 text-[#5B6472] sm:text-lg">
            Hệ thống báo cáo của APIX English cập nhật tức thì. Phụ huynh dễ dàng xem chuyên cần, điểm nói trên lớp, nhận xét bài tập và lịch học kế tiếp của con mà không tốn thời gian trao đổi phức tạp.
          </p>

          <div className="mt-8 space-y-3.5 text-sm font-bold text-[#374151]">
            <div className="flex items-center gap-2.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FFE7E8] text-[#C90012] text-xs">
                ✓
              </span>
              <span>Minh bạch, trực quan 100% qua thông báo định kỳ</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FFE7E8] text-[#C90012] text-xs">
                ✓
              </span>
              <span>Theo sát sự tự tin nói tiếng Anh qua từng bài giảng</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FFE7E8] text-[#C90012] text-xs">
                ✓
              </span>
              <span>Tương tác nhanh chóng với trung tâm bất cứ lúc nào</span>
            </div>
          </div>
        </div>

        {/* Visual Mock Report App */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, x: 30 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="relative rounded-[36px] border border-white/95 bg-white/70 p-6 shadow-[0_30px_90px_rgba(255,22,26,0.11)] backdrop-blur-2xl sm:p-8"
        >
          {/* Mock App Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-red-100/50 pb-5">
            <div>
              <p className="text-[10px] font-extrabold tracking-wider text-[#C90012] uppercase">
                Báo cáo học tập
              </p>
              <h3 className="mt-1 font-display text-lg font-extrabold text-[#111318]">
                Phạm Minh Quân <span className="text-xs font-bold text-[#6B7280]">(Lớp Primary 2A)</span>
              </h3>
            </div>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
              Đang tiến bộ
            </span>
          </div>

          {/* Grid of Report Metrics */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {progressItems.map((item, index) => {
              const Icon = icons[index % icons.length];
              return (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-red-50/50 bg-white/80 p-4 transition-transform hover:scale-102"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFE7E8] text-[#C90012]">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="text-xs font-bold text-[#374151]">{item}</span>
                </div>
              );
            })}
          </div>

          {/* Recent Comment */}
          <div className="mt-6 rounded-2xl bg-[#FFF1F2] p-4.5 border border-red-100/30">
            <p className="text-xs font-extrabold text-[#C90012]">
              Nhận xét gần nhất từ Giáo viên
            </p>
            <p className="mt-2 text-xs leading-5.5 text-[#4B5563] font-medium">
              &quot;Quân tham gia thảo luận nhóm rất sôi nổi, cải thiện rõ rệt phát âm đuôi (-s, -ed). Con cần luyện tập thêm từ vựng chủ đề School Objects tại nhà để đạt điểm tối đa bài kiểm tra tới.&quot;
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
