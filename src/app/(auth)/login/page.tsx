import type { Metadata } from "next";

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
          {/* Logo mark */}
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-apix-gradient shadow-lg shadow-[#FF161A]/20">
            <svg
              width="30"
              height="30"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M22 4L40 38H4L22 4Z" fill="white" fillOpacity="0.95" />
              <path
                d="M14 28H30"
                stroke="#FF161A"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

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
          Email: <code className="font-mono bg-white px-1 py-0.5 rounded border border-[#FF161A]/10 select-all">admin@apix.edu.vn</code>
          <br />
          Password: <code className="font-mono bg-white px-1 py-0.5 rounded border border-[#FF161A]/10 select-all">apix1234</code>
        </div>
      </div>

      {/* ── Footer ── */}
      <p className="relative z-10 mt-8 text-xs text-[#9CA3AF]">
        © {new Date().getFullYear()} APIX English Center. All rights reserved.
      </p>
    </main>
  );
}
