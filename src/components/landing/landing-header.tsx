"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { landingNavigation } from "@/constants/landing-content";

export function LandingHeader() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <div
        className={cn(
          "mx-auto max-w-7xl rounded-[24px] border px-4 transition-all duration-300 sm:px-6",
          scrolled
            ? "border-white/80 bg-white/90 shadow-lg shadow-red-950/5 backdrop-blur-xl"
            : "border-white/60 bg-white/65 backdrop-blur-md",
        )}
      >
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="#trang-chu" aria-label="Về đầu trang" className="shrink-0">
            <Image
              src="/branding/apix-english-logo-transparent.png"
              alt="APIX English"
              width={1812}
              height={1376}
              priority
              sizes="88px"
              className="h-auto w-[88px]"
            />
          </Link>

          <nav className="hidden items-center gap-5 lg:flex" aria-label="Điều hướng chính">
            {landingNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-[#4B5563] transition-colors hover:text-[#C90012] focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF161A]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden rounded-full px-4 py-2 text-sm font-bold text-[#C90012] transition-colors hover:bg-[#FFE7E8] sm:inline-flex"
            >
              Đăng nhập
            </Link>
            <Link
              href="#dang-ky"
              className="hidden rounded-full bg-gradient-to-br from-[#FF161A] to-[#B80012] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-500/25 transition-transform hover:-translate-y-0.5 sm:inline-flex"
            >
              Đăng ký học thử
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-red-100 bg-white text-[#C90012] lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? "Đóng menu" : "Mở menu"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav id="mobile-navigation" className="border-t border-red-100 py-4 lg:hidden" aria-label="Điều hướng di động">
            <div className="grid gap-1">
              {landingNavigation.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2.5 text-sm font-semibold text-[#374151] hover:bg-[#FFF1F2]">
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Link href="/login" onClick={() => setOpen(false)} className="rounded-full border border-red-200 px-4 py-2.5 text-center text-sm font-bold text-[#C90012]">Đăng nhập</Link>
                <Link href="#dang-ky" onClick={() => setOpen(false)} className="rounded-full bg-[#FF161A] px-4 py-2.5 text-center text-sm font-bold text-white">Học thử</Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
