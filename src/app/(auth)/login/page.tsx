import type { Metadata } from "next";
import Image from "next/image";

import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = {
  title: "Login | APIX English Center",
  description: "Sign in to the APIX English Center Management System.",
};

export default function LoginPage() {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[#F8FAFC] p-4">
      {/* ── Background decoration ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 learning-arc"
      />

      {/* ── Learning Arc SVG decoration ── */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 opacity-[0.05]"
        width="900"
        height="400"
        viewBox="0 0 900 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="450" cy="0" rx="450" ry="280" fill="#FF161A" />
      </svg>

      {/* ── Login Glass Card ── */}
      <div className="glass-card relative z-10 w-full max-w-md px-8 py-10 shadow-2xl shadow-black/5">
        <div className="flex flex-col items-center gap-4 text-center mb-8">
          <Image
            src="/branding/apix-english-logo-transparent.png"
            alt="APIX English"
            width={1812}
            height={1376}
            priority
            sizes="160px"
            className="h-auto w-40 object-contain"
          />

          <div className="flex flex-col gap-1">
            <h1 className="font-display text-2xl font-bold tracking-tight text-[#111827]">
              Welcome back
            </h1>
            <p className="text-sm text-[#6B7280]">
              Sign in to manage your English center
            </p>
          </div>
        </div>

        {/* ── Login Form ── */}
        <LoginForm />

        {/* ── Form Hint / Help ── */}
        <div className="mt-8 rounded-lg border border-[#FF161A]/10 bg-[#FFE8EA]/40 p-3 text-center text-xs text-[#C90012]">
          <span className="font-semibold block mb-0.5">Demo Credentials</span>
          Email: <code className="font-mono bg-white px-1 py-0.5 rounded border border-[#FF161A]/10 select-all">owner@apixenglish.com</code>
          <br />
          Password: <code className="font-mono bg-white px-1 py-0.5 rounded border border-[#FF161A]/10 select-all">Admin@123456</code>
        </div>
      </div>

      {/* ── Footer ── */}
      <p className="relative z-10 mt-8 text-xs text-[#9CA3AF]">
        © {new Date().getFullYear()} APIX English Center. All rights reserved.
      </p>
    </main>
  );
}
