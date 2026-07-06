"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { sidebarNavGroups } from "./sidebar";
import { hasPermission } from "@/lib/permissions/has-permission";

export function MobileSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  // Filter groups and items based on permissions
  const visibleGroups = React.useMemo(() => {
    return sidebarNavGroups
      .map((group) => {
        const visibleItems = group.items.filter((item) => {
          if (!item.permission) return true;
          return hasPermission(item.permission);
        });
        return { ...group, items: visibleItems };
      })
      .filter((group) => group.items.length > 0);
  }, [pathname, open]);

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

      <SheetContent side="left" className="w-72 glass-sidebar p-6 border-r border-[#FF161A]/10 overflow-y-auto">
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
              className="h-auto w-24 object-contain"
            />
          </Link>

          {/* Divider */}
          <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-[#FF161A]/10 to-transparent" />

          {/* Nav Links */}
          <nav className="flex flex-1 flex-col gap-4">
            {visibleGroups.map((group) => (
              <div key={group.title} className="flex flex-col gap-1">
                <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {group.title}
                </span>
                <div className="flex flex-col gap-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150",
                          isActive
                            ? "bg-[#FFE8EA] text-[#C90012] font-bold"
                            : "text-[#6B7280] hover:bg-slate-100 hover:text-[#111827]"
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
                </div>
              </div>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
