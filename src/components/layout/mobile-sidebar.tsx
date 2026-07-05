"use client";

import * as React from "react";
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
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-apix-gradient shadow-md shadow-[#FF161A]/10">
              <svg
                width="18"
                height="18"
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
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold tracking-tight text-[#111827]">
                APIX
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-[#6B7280] uppercase">
                English Center
              </span>
            </div>
          </div>

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
