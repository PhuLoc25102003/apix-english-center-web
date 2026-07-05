"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ApixGlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowColor?: "red" | "dark" | "none";
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  id?: string;
  style?: React.CSSProperties;
}

export function ApixGlassCard({
  children,
  className,
  hoverEffect = true,
  glowColor = "red",
  onClick,
  id,
  style,
}: ApixGlassCardProps) {
  const shouldReduceMotion = useReducedMotion();

  // Glass card classes
  const glassClasses = cn(
    "relative overflow-hidden rounded-[32px] border border-white/60 bg-white/70 p-6 shadow-[0_24px_80px_rgba(255,22,26,0.06)] backdrop-blur-xl transition-all duration-300 md:backdrop-blur-2xl",
    glowColor === "red" && "hover:shadow-[0_32px_100px_rgba(255,22,26,0.14)] hover:border-red-200/50",
    glowColor === "dark" && "bg-[#111318]/95 border-white/10 text-white shadow-2xl",
    className
  );

  if (shouldReduceMotion || !hoverEffect) {
    return (
      <div className={glassClasses} onClick={onClick} id={id} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={glassClasses}
      onClick={onClick}
      id={id}
      style={style}
    >
      {children}
    </motion.div>
  );
}
