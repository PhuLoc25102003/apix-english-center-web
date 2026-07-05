"use client";

import * as React from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface MoneyInputProps {
  id?: string;
  value?: number | string | null;
  onChange: (value: number | null) => void;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  className?: string;
}

const vndNumberFormatter = new Intl.NumberFormat("vi-VN", {
  maximumFractionDigits: 0,
});

const vndCurrencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
});

export function formatVnd(value: number): string {
  return vndCurrencyFormatter.format(value);
}

function toNumericValue(value: number | string | null | undefined): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string" || value.trim() === "") return null;

  const digits = value.replace(/\D/g, "");
  return digits ? Number(digits) : null;
}

export function MoneyInput({
  id,
  value,
  onChange,
  placeholder = "0",
  disabled = false,
  invalid = false,
  className,
}: MoneyInputProps) {
  const numericValue = toNumericValue(value);

  return (
    <div className="relative">
      <Input
        id={id}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={numericValue === null ? "" : vndNumberFormatter.format(numericValue)}
        onChange={(event) => onChange(toNumericValue(event.target.value))}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={invalid}
        className={cn(
          "h-10 border-border/60 bg-white/60 pr-12 tabular-nums focus:bg-white",
          className,
        )}
      />
      <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm font-semibold text-slate-500">
        ₫
      </span>
    </div>
  );
}
