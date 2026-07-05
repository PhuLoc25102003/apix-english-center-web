"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { sidebarNavItems } from "./sidebar";

export function MobileSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white/60 p-2 text-[#4B5563] shadow-xs backdrop-blur-xs transition-colors hover:bg-white lg:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open navigation menu</span>
          </button>
        }
      />

      <SheetContent side="left" className="w-72 glass-sidebar p-6 border-r border-[#FF161A]/10">
        <div className="flex flex-col h-full">
          {/* Header */}
          <Link
            href="/dashboard"
            aria-label="Go to dashboard"
            className="flex w-full justify-center"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/branding/apix-english-logo-transparent.png"
              alt="APIX English"
              width={1812}
              height={1376}
              sizes="112px"
              className="h-auto w-28 object-contain"
            />
          </Link>

          {/* Divider */}
          <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-[#FF161A]/10 to-transparent" />

          {/* Nav Links */}
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto pr-2">
            {sidebarNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-[#FFE8EA] text-[#C90012] font-semibold"
                      : "text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827]"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0 transition-colors",
                      isActive ? "text-[#FF161A]" : "text-[#9CA3AF]"
                    )}
                  />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
