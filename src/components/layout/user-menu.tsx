"use client";

import * as React from "react";
import Link from "next/link";
import { LogOut, Settings, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserMenu() {
  const handleLogout = () => {
    // Basic sign out redirect for now
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 outline-none select-none cursor-pointer">
        <div className="h-9 w-9 rounded-full bg-apix-gradient flex items-center justify-center font-bold text-xs text-white shadow-md shadow-[#FF161A]/10">
          AD
        </div>
        <div className="hidden flex-col text-left sm:flex">
          <span className="text-xs font-semibold text-[#111827]">
            Admin User
          </span>
          <span className="text-[10px] text-[#6B7280]">
            System Owner
          </span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 glass-card p-1">
        <DropdownMenuLabel className="px-2 py-1.5 flex flex-col">
          <span className="text-xs font-semibold text-[#111827]">
            Admin User
          </span>
          <span className="text-[10px] text-[#6B7280]">
            admin@apix.edu.vn
          </span>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-[#FF161A]/10" />
        
        <DropdownMenuItem
          render={
            <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
              <User className="h-4 w-4 text-[#6B7280]" />
              Profile
            </Link>
          }
        />
        
        <DropdownMenuItem
          render={
            <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
              <Settings className="h-4 w-4 text-[#6B7280]" />
              Account Settings
            </Link>
          }
        />

        <DropdownMenuSeparator className="bg-[#FF161A]/10" />

        <DropdownMenuItem
          variant="destructive"
          onClick={handleLogout}
          className="flex items-center gap-2 cursor-pointer text-[#C90012] focus:bg-red-50 focus:text-[#C90012]"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
