import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | APIX English Center",
  description: "Sign in to the APIX English Center Management System.",
};

export default function LoginPage() {
  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[#F8FAFC]">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 learning-arc"
      />

      {/* Login glass card */}
      <div className="glass-card relative z-10 w-full max-w-md p-8 shadow-2xl shadow-black/5">
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Logo mark */}
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-apix-gradient shadow-md shadow-[#FF161A]/20">
            <svg
              width="24"
              height="24"
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

          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-[#111827]">
              Welcome Back
            </h1>
            <p className="mt-1 text-sm text-[#6B7280]">
              Sign in to manage your English center
            </p>
          </div>
        </div>

        {/* Form placeholder */}
        <div className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="username"
              className="text-xs font-semibold uppercase tracking-wider text-[#4B5563]"
            >
              Email or Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="name@apix.edu.vn"
              disabled
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:border-[#FF161A] focus:outline-none focus:ring-2 focus:ring-[#FF161A]/20 disabled:cursor-not-allowed disabled:bg-[#F3F4F6] disabled:text-[#9CA3AF]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-xs font-semibold uppercase tracking-wider text-[#4B5563]"
              >
                Password
              </label>
              <span className="text-xs text-[#C90012] hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              disabled
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:border-[#FF161A] focus:outline-none focus:ring-2 focus:ring-[#FF161A]/20 disabled:cursor-not-allowed disabled:bg-[#F3F4F6] disabled:text-[#9CA3AF]"
            />
          </div>

          <button
            type="button"
            disabled
            className="mt-2 w-full rounded-lg bg-[#FF161A] py-2.5 text-sm font-semibold text-white shadow-sm shadow-[#FF161A]/20 hover:bg-[#C90012] disabled:cursor-not-allowed disabled:bg-[#9CA3AF]"
          >
            Sign In
          </button>
        </div>

        <div className="mt-6 text-center text-xs text-[#6B7280]">
          Auth flow implementation is coming in Phase 2
        </div>
      </div>
    </main>
  );
}
