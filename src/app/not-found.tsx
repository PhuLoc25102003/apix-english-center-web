import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-[#F8FAFC] px-4">
      <div className="glass flex w-full max-w-sm flex-col items-center gap-6 rounded-3xl px-8 py-10 text-center shadow-xl shadow-black/5">
        {/* Error code with APIX red */}
        <span className="font-display text-8xl font-bold text-[#FF161A]">
          404
        </span>
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-lg font-semibold text-[#111827]">
            Page Not Found
          </h1>
          <p className="text-sm text-[#6B7280]">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-[#FF161A] px-5 py-2.5 text-sm font-medium text-white shadow-sm shadow-[#FF161A]/30 transition-all hover:bg-[#C90012] hover:shadow-md hover:shadow-[#C90012]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF161A]"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
