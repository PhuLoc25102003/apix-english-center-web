import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { faqs, landingNavigation } from "@/constants/landing-content";
import { TrialClassForm } from "./trial-form";

export function TrialSection() {
  return (
    <section id="dang-ky" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="relative mx-auto grid max-w-7xl gap-10 overflow-hidden rounded-[40px] bg-[#B80012] p-6 text-white shadow-[0_35px_100px_rgba(184,0,18,0.28)] sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:p-14">
        <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="relative self-center">
          <p className="text-sm font-extrabold tracking-[0.18em] text-red-200 uppercase">Bắt đầu cùng APIX</p>
          <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight sm:text-5xl">Sẵn sàng tìm lớp phù hợp cho con?</h2>
          <p className="mt-6 text-lg leading-8 text-white/75">Đăng ký kiểm tra đầu vào hoặc học thử. Đội ngũ APIX sẽ tư vấn trình độ, lịch học và lộ trình phù hợp.</p>
          <div className="mt-8 space-y-3 text-sm font-semibold text-white/85"><p>✓ Tư vấn theo năng lực thực tế</p><p>✓ Không ép đăng ký ngay</p><p>✓ Phụ huynh được giải thích rõ lộ trình</p></div>
        </div>
        <div className="relative rounded-[34px] bg-[#FFF8F8] p-5 text-[#111318] shadow-2xl sm:p-8"><TrialClassForm /></div>
      </div>
    </section>
  );
}

export function FAQSection() {
  return (
    <section id="hoi-dap" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="text-center"><p className="text-sm font-extrabold tracking-[0.18em] text-[#C90012] uppercase">Phụ huynh thường hỏi</p><h2 className="mt-3 font-display text-3xl font-extrabold text-[#111318] sm:text-5xl">Thông tin cần biết trước khi bắt đầu</h2></div>
        <div className="mt-10 grid gap-3">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-[22px] border border-red-100 bg-white/75 px-5 py-1 shadow-sm backdrop-blur-xl open:shadow-lg">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-lg font-bold text-[#111318] focus-visible:outline-2 focus-visible:outline-[#FF161A]">{faq.question}<ChevronDown className="h-5 w-5 shrink-0 text-[#C90012] transition-transform group-open:rotate-180" /></summary>
              <p className="border-t border-red-50 pb-5 pt-4 leading-7 text-[#5B6472]">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LandingFooter() {
  return (
    <footer className="border-t border-red-100 bg-white/70 px-4 py-12 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div><Image src="/branding/apix-english-logo-transparent.png" alt="APIX English" width={1812} height={1376} sizes="112px" className="h-auto w-28" /><p className="mt-4 max-w-md text-sm leading-6 text-[#6B7280]">Trung tâm tiếng Anh dành cho trẻ em và thanh thiếu niên, tập trung vào giao tiếp thực tế và tiến bộ rõ ràng.</p></div>
        <div className="flex flex-wrap gap-x-5 gap-y-3 md:justify-end">{landingNavigation.map((item) => <Link key={item.href} href={item.href} className="text-sm font-semibold text-[#4B5563] hover:text-[#C90012]">{item.label}</Link>)}<Link href="/login" className="text-sm font-bold text-[#C90012]">Đăng nhập</Link></div>
      </div>
      <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-2 border-t border-red-100 pt-6 text-xs text-[#9CA3AF] sm:flex-row sm:justify-between"><span>© {new Date().getFullYear()} APIX English. Mọi quyền được bảo lưu.</span><span>Học thật · Nói thật · Tiến bộ thật</span></div>
    </footer>
  );
}
