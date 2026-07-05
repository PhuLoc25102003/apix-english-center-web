"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, MessageSquare, MapPin, ExternalLink } from "lucide-react";

import { contactInfo, landingNavigation } from "@/constants/landing-content";
import { ApixGlassCard } from "@/components/brand/ApixGlassCard";

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

export function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-red-100/70 bg-[#FFF8F8] px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr_1fr]">
          {/* Brand Col */}
          <div className="flex flex-col items-start gap-4">
            <Image
              src="/branding/apix-english-logo-transparent.png"
              alt="APIX English Logo"
              width={160}
              height={120}
              sizes="112px"
              className="h-auto w-28"
            />
            <p className="text-sm leading-6 text-[#5B6472] max-w-sm">
              {contactInfo.brandDescription}
            </p>
            {/* Social media shortcuts */}
            <div className="flex items-center gap-2.5 mt-2">
              <a
                href={contactInfo.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="APIX Facebook Fanpage"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#C90012] border border-red-100/80 shadow-sm transition-transform hover:-translate-y-1 hover:bg-[#FFE7E8] focus-visible:outline-2 focus-visible:outline-[#FF161A]"
              >
                <Facebook className="h-4.5 w-4.5" />
              </a>
              <a
                href={contactInfo.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="APIX Zalo"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#C90012] border border-red-100/80 shadow-sm transition-transform hover:-translate-y-1 hover:bg-[#FFE7E8] focus-visible:outline-2 focus-visible:outline-[#FF161A]"
              >
                <MessageSquare className="h-4.5 w-4.5" />
              </a>
              <a
                href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`}
                aria-label="Gọi APIX English"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#C90012] border border-red-100/80 shadow-sm transition-transform hover:-translate-y-1 hover:bg-[#FFE7E8] focus-visible:outline-2 focus-visible:outline-[#FF161A]"
              >
                <Phone className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-sm font-extrabold tracking-wider uppercase text-[#111318]">
              Liên Kết Nhanh
            </h3>
            <ul className="mt-4 space-y-2.5">
              {landingNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-semibold text-[#5B6472] hover:text-[#C90012] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/login"
                  className="text-sm font-bold text-[#C90012] hover:underline"
                >
                  Đăng nhập học sinh
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-display text-sm font-extrabold tracking-wider uppercase text-[#111318]">
              Thông Tin Liên Hệ
            </h3>
            <div className="mt-4 space-y-4 text-sm text-[#5B6472] font-medium">
              <p className="flex items-start gap-2.5 leading-6">
                <MapPin className="h-5 w-5 shrink-0 text-[#FF161A] mt-0.5" />
                <span>
                  <strong>Địa chỉ:</strong>
                  <br />
                  {contactInfo.address}
                </span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="h-5 w-5 shrink-0 text-[#FF161A]" />
                <span>
                  <strong>Hotline:</strong> {contactInfo.phoneDisplay}
                </span>
              </p>
              <p className="flex items-center gap-2.5">
                <MessageSquare className="h-5 w-5 shrink-0 text-[#FF161A]" />
                <span>
                  <strong>Zalo:</strong>{" "}
                  <a
                    href={contactInfo.zaloUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#C90012] hover:underline"
                  >
                    Chat ngay
                  </a>
                </span>
              </p>
            </div>
          </div>

          {/* Map Embed */}
          <div className="lg:col-span-1">
            <h3 className="font-display text-sm font-extrabold tracking-wider uppercase text-[#111318] mb-4">
              Bản Đồ Chỉ Đường
            </h3>
            <ApixGlassCard
              hoverEffect={false}
              className="p-1 border border-white bg-white/40 shadow-md h-[180px]"
            >
              <iframe
                title="Bản đồ chỉ đường đến APIX English"
                src={contactInfo.googleMapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-[24px]"
              />
            </ApixGlassCard>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-2 text-xs font-bold text-[#C90012] hover:underline"
            >
              Xem bản đồ lớn <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-red-100/50 pt-8 text-xs text-[#9CA3AF] sm:flex-row">
          <span>
            © {currentYear} Trung tâm Anh ngữ APIX English. Mọi quyền được bảo
            lưu.
          </span>
          <div className="flex items-center gap-2 font-bold text-[#C90012]/80">
            <span>Học thật</span>
            <span className="h-1 w-1 rounded-full bg-red-300" />
            <span>Nói thật</span>
            <span className="h-1 w-1 rounded-full bg-red-300" />
            <span>Tiến bộ thật</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
