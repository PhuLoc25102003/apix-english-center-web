"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ApixButtonProps {
  href?: string;
  variant?: "primary" | "secondary" | "glass" | "outline";
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  onClick?: React.MouseEventHandler<any>;
  disabled?: boolean;
  form?: string;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
}

export function ApixButton({
  href,
  variant = "primary",
  children,
  className,
  ariaLabel,
  type = "button",
  onClick,
  disabled,
  form,
  target,
  rel,
}: ApixButtonProps) {
  const shouldReduceMotion = useReducedMotion();

  const baseStyles = "inline-flex items-center justify-center font-bold tracking-tight rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF161A]";

  const variants = {
    primary: "bg-gradient-to-br from-[#FF161A] to-[#B80012] text-white shadow-lg shadow-red-500/25 border border-transparent hover:brightness-110",
    secondary: "bg-[#FFE7E8] text-[#C90012] border border-transparent hover:bg-[#FFD6D8]",
    glass: "bg-white/60 border border-white/80 text-[#2A2D34] shadow-md shadow-red-950/5 backdrop-blur-md hover:bg-white/80 hover:text-[#111318]",
    outline: "border border-red-200 bg-transparent text-[#C90012] hover:bg-[#FFE7E8]/30",
  };

  const currentStyles = cn(baseStyles, variants[variant], className);

  const ButtonContent = () => <>{children}</>;

  if (href) {
    if (shouldReduceMotion) {
      return (
        <Link href={href} className={currentStyles} aria-label={ariaLabel} onClick={onClick} target={target} rel={rel}>
          <ButtonContent />
        </Link>
      );
    }

    return (
      <motion.span whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
        <Link href={href} className={currentStyles} aria-label={ariaLabel} onClick={onClick} target={target} rel={rel}>
          <ButtonContent />
        </Link>
      </motion.span>
    );
  }

  if (shouldReduceMotion) {
    return (
      <button
        type={type}
        disabled={disabled}
        form={form}
        className={currentStyles}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        <ButtonContent />
      </button>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      form={form}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={currentStyles}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <ButtonContent />
    </motion.button>
  );
}
