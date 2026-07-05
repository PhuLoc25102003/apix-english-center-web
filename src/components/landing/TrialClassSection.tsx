"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { TrialClassForm } from "./trial-form";

export function TrialClassSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="dang-ky" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 35 }}
        whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto grid max-w-7xl gap-10 overflow-hidden rounded-[40px] bg-gradient-to-br from-[#B80012] to-[#8B000A] p-8 text-white shadow-[0_35px_100px_rgba(184,0,18,0.28)] sm:p-12 lg:grid-cols-[0.85fr_1.15fr] lg:p-16"
      >
        {/* Ambient background decoration */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white/5 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-red-500/10 blur-3xl" />

        {/* Content Block */}
        <div className="relative flex flex-col justify-center">
          <p className="text-xs font-extrabold tracking-[0.2em] text-red-200 uppercase">
            Bắt đầu cùng APIX English
          </p>
          <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            Sẵn sàng tìm lớp phù hợp cho con?
          </h2>
          <p className="mt-6 text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
            Đăng ký tham gia kiểm tra trình độ hoặc tham gia lớp học thử miễn phí. Đội ngũ giáo viên và chuyên viên tại APIX sẽ giải thích cụ thể lộ trình phù hợp với con.
          </p>

          <div className="mt-8 space-y-3.5 text-xs font-bold text-white/90">
            <div className="flex items-center gap-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-white text-xs">
                ✓
              </span>
              <span>Đánh giá khách quan theo năng lực thực tế</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-white text-xs">
                ✓
              </span>
              <span>Không gây áp lực đăng ký hoặc đóng phí sớm</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-white text-xs">
                ✓
              </span>
              <span>Lịch kiểm tra linh hoạt theo giờ rảnh của gia đình</span>
            </div>
          </div>
        </div>

        {/* Form Block */}
        <div className="relative rounded-[32px] bg-[#FFF8F8] p-6 text-[#111318] shadow-2xl sm:p-8">
          <TrialClassForm />
        </div>
      </motion.div>
    </section>
  );
}
