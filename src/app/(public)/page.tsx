import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "APIX English Center",
  description:
    "Welcome to APIX English Center — a modern management system for students, classes, attendance, tuition, and more.",
};

export default function HomePage() {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[#F8FAFC]">
      {/* ── Background gradient accent ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 learning-arc"
      />

      {/* ── Learning Arc SVG — top decorative element ── */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 opacity-[0.07]"
        width="900"
        height="400"
        viewBox="0 0 900 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="450" cy="0" rx="450" ry="280" fill="#FF161A" />
      </svg>

      {/* ── Glass card ── */}
      <div className="glass-card relative z-10 mx-4 flex w-full max-w-md flex-col items-center gap-8 px-10 py-12 shadow-2xl shadow-black/5">
        {/* Logo mark */}
        <div className="flex flex-col items-center gap-4">
          <div
            className="flex h-20 w-20 items-center justify-center rounded-2xl bg-apix-gradient shadow-lg shadow-[#FF161A]/30"
            aria-label="APIX logo"
          >
            {/* Stylised "A" mark */}
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M22 4L40 38H4L22 4Z"
                fill="white"
                fillOpacity="0.95"
              />
              <path
                d="M14 28H30"
                stroke="#FF161A"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Brand name */}
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="font-display text-3xl font-bold tracking-tight text-[#111827]">
              APIX
            </span>
            <span className="text-sm font-medium tracking-widest text-[#6B7280] uppercase">
              English Center
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#FF161A]/20 to-transparent" />

        {/* Tagline */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="font-display text-xl font-semibold text-[#111827]">
            Management System
          </h1>
          <p className="text-sm leading-relaxed text-[#6B7280]">
            A modern operating platform for students, classes,
            <br />
            attendance, tuition, and learning reports.
          </p>
        </div>

        {/* Status chip */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#FF161A]/20 bg-[#FFE8EA] px-4 py-1.5">
          <span
            className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF161A]"
            aria-hidden="true"
          />
          <span className="text-xs font-medium text-[#C90012]">
            Foundation ready — building in progress
          </span>
        </div>
      </div>

      {/* ── Bottom attribution ── */}
      <p className="relative z-10 mt-8 text-xs text-[#9CA3AF]">
        © {new Date().getFullYear()} APIX English Center. All rights reserved.
      </p>
    </main>
  );
}
