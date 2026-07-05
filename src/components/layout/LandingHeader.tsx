"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { landingNavigation } from "@/constants/landing-content";
import { ApixButton } from "@/components/brand/ApixButton";

export function LandingHeader() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll helper
  const handleScrollTo = (e: React.MouseEvent<any>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6">
      <div
        className={cn(
          "mx-auto max-w-7xl rounded-[24px] border px-4 transition-all duration-300 sm:px-6",
          scrolled
            ? "border-white/80 bg-white/90 shadow-[0_12px_40px_rgba(255,22,26,0.06)] backdrop-blur-xl"
            : "border-white/50 bg-white/55 backdrop-blur-md"
        )}
      >
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="#trang-chu"
            onClick={(e) => handleScrollTo(e, "#trang-chu")}
            aria-label="Về trang chủ APIX English"
            className="shrink-0 transition-transform active:scale-98"
          >
            <Image
              src="/branding/apix-english-logo-transparent.png"
              alt="APIX English Logo"
              width={200}
              height={150}
              priority
              sizes="88px"
              className="h-auto w-[88px]"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Điều hướng chính">
            {landingNavigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleScrollTo(e, item.href)}
                className="text-sm font-semibold text-[#4B5563] transition-colors hover:text-[#C90012] focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF161A]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTAs / Mobile Toggle */}
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden rounded-full px-4 py-2 text-sm font-bold text-[#C90012] transition-all hover:bg-[#FFE7E8] sm:inline-flex focus-visible:outline-2 focus-visible:outline-[#FF161A]"
            >
              Đăng nhập
            </Link>
            <ApixButton
              href="#dang-ky"
              variant="primary"
              className="hidden px-5 py-2 text-sm sm:inline-flex"
              onClick={(e) => handleScrollTo(e, "#dang-ky")}
            >
              Đăng ký học thử <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </ApixButton>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-red-100 bg-white text-[#C90012] transition-colors hover:bg-red-50 lg:hidden focus-visible:outline-2 focus-visible:outline-[#FF161A]"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? "Đóng menu" : "Mở menu"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobile-navigation"
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden border-t border-red-100/50 py-4 lg:hidden"
              aria-label="Điều hướng di động"
            >
              <div className="grid gap-1">
                {landingNavigation.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    className="rounded-xl px-3 py-2.5 text-sm font-semibold text-[#374151] hover:bg-[#FFF1F2] hover:text-[#C90012] transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="rounded-full border border-red-200 px-4 py-2.5 text-center text-sm font-bold text-[#C90012] hover:bg-[#FFE7E8]/40"
                  >
                    Đăng nhập
                  </Link>
                  <a
                    href="#dang-ky"
                    onClick={(e) => handleScrollTo(e, "#dang-ky")}
                    className="rounded-full bg-[#FF161A] hover:bg-[#B80012] px-4 py-2.5 text-center text-sm font-bold text-white transition-all shadow-md shadow-red-500/10"
                  >
                    Học thử
                  </a>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
