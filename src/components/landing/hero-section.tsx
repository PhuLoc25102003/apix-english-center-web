import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircleMore } from "lucide-react";

import { trustItems } from "@/constants/landing-content";

const orbitSteps = ["Kiểm tra", "Vào lớp", "Luyện tập", "Báo cáo", "Cải thiện"];

export function HeroSection() {
  return (
    <section id="trang-chu" className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 sm:pt-40 lg:pb-28">
      <div className="pointer-events-none absolute left-[-12rem] top-24 h-96 w-96 rounded-full bg-[#FF161A]/15 blur-3xl" />
      <div className="pointer-events-none absolute right-[-8rem] top-12 h-[30rem] w-[30rem] rounded-full bg-rose-200/50 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="apix-reveal">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/70 px-4 py-2 text-sm font-bold text-[#C90012] shadow-sm backdrop-blur-xl">
            <MessageCircleMore className="h-4 w-4" />
            Tiếng Anh cho trẻ em và thanh thiếu niên
          </span>
          <h1 className="mt-7 max-w-4xl font-display text-5xl font-extrabold leading-[1.04] tracking-[-0.045em] text-[#111318] sm:text-6xl lg:text-7xl">
            Học tiếng Anh để <span className="text-[#FF161A]">tự tin nói thật.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4B5563]">
            APIX giúp học sinh xây dựng năng lực giao tiếp thực tế qua lớp học quy mô nhỏ, luyện tập có hướng dẫn và báo cáo tiến bộ rõ ràng cho phụ huynh.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#dang-ky" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#FF161A] to-[#B80012] px-7 py-3 font-bold text-white shadow-xl shadow-red-500/30 transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF161A]">
              Đăng ký học thử <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="#chuong-trinh" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white bg-white/65 px-7 py-3 font-bold text-[#2A2D34] shadow-lg shadow-red-950/5 backdrop-blur-xl transition-colors hover:bg-white">
              Xem chương trình học
            </Link>
          </div>

          <div className="mt-9 grid gap-3 sm:grid-cols-3">
            {trustItems.slice(0, 3).map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm font-semibold text-[#4B5563]">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#FF161A]" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="apix-float relative mx-auto aspect-square w-full max-w-[560px]">
          <div className="absolute inset-[7%] rounded-full border border-white/80 bg-white/45 shadow-[0_32px_100px_rgba(255,22,26,0.16)] backdrop-blur-2xl" />
          <div className="absolute inset-[16%] rounded-full border-2 border-dashed border-[#FF161A]/25" />
          <div className="absolute inset-[28%] flex flex-col items-center justify-center rounded-full bg-gradient-to-br from-[#FF161A] to-[#B80012] text-center text-white shadow-2xl shadow-red-500/35">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-white/75">Chu trình APIX</span>
            <strong className="mt-2 font-display text-2xl leading-tight sm:text-3xl">Học thật<br />Tiến bộ thật</strong>
          </div>
          {orbitSteps.map((step, index) => {
            const positions = ["left-1/2 top-[5%] -translate-x-1/2", "right-[0%] top-[31%]", "right-[12%] bottom-[5%]", "left-[7%] bottom-[10%]", "left-[-2%] top-[32%]"];
            return (
              <div key={step} className={`absolute ${positions[index]} rounded-full border border-white bg-white/90 px-3 py-2 text-xs font-bold text-[#C90012] shadow-lg shadow-red-950/10 sm:px-4 sm:text-sm`}>
                {index + 1}. {step}
              </div>
            );
          })}
          <div className="absolute bottom-[10%] left-1/2 w-[68%] -translate-x-1/2 rounded-[24px] border border-white/80 bg-white/80 p-4 shadow-xl backdrop-blur-xl sm:p-5">
            <div className="flex items-center justify-between text-xs font-semibold text-[#6B7280]"><span>Tiến bộ kỹ năng nói</span><span className="text-[#16A34A]">Đang cải thiện</span></div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-red-100"><div className="h-full w-[78%] rounded-full bg-gradient-to-r from-[#FF161A] to-[#B80012]" /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TrustBar() {
  return (
    <section aria-label="Cam kết của APIX" className="px-4 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-8 gap-y-4 rounded-[28px] border border-white/80 bg-white/70 px-6 py-5 shadow-lg shadow-red-950/5 backdrop-blur-xl">
        {trustItems.map((item) => <span key={item} className="flex items-center gap-2 text-sm font-bold text-[#374151]"><span className="h-2 w-2 rounded-full bg-[#FF161A]" />{item}</span>)}
      </div>
    </section>
  );
}
