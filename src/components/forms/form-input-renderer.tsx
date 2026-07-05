"use client";

import * as React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type InputOption = {
  value: string;
  label: string;
};

export type InputType =
  | "text"
  | "textarea"
  | "number"
  | "email"
  | "password"
  | "select"
  | "multi-select"
  | "date"
  | "datetime"
  | "time"
  | "switch"
  | "checkbox"
  | "radio"
  | "custom"
  | "section-header";

export interface FormInputConfig {
  name: string;
  label: string;
  placeholder?: string;
  type: InputType;
  required?: boolean;
  options?: InputOption[];
  disabled?: boolean;
  hidden?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any;
  colSpan?: 1 | 2; // default is 1, can be 2 for full width
  customRender?: (props: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: any;
    error?: string;
    disabled?: boolean;
  }) => React.ReactNode;
  icon?: React.ReactNode;
}

interface FormInputRendererProps {
  configs: FormInputConfig[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: FieldErrors<any>;
  isSubmitting?: boolean;
}

export function FormInputRenderer({
  configs,
  control,
  errors,
  isSubmitting = false,
}: FormInputRendererProps) {
  return (
    <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
      {configs.map((config) => {
        if (config.hidden) return null;

        // If it's a section header, render it spans across full width
        if (config.type === "section-header") {
          return (
            <div
              key={config.name}
              className="md:col-span-2 border-b border-slate-100 pb-3 mt-4 first:mt-0"
            >
              <h3 className="font-display text-base font-bold text-slate-800 flex items-center gap-2">
                {config.icon}
                {config.label}
              </h3>
            </div>
          );
        }

        const gridSpan = config.colSpan === 2 ? "md:col-span-2" : "md:col-span-1";
        const hasError = !!errors[config.name];
        const errorMessage = errors[config.name]?.message as string | undefined;
        const isDisabled = isSubmitting || config.disabled;

        return (
          <div key={config.name} className={cn("flex flex-col gap-1.5", gridSpan)}>
            {config.type !== "checkbox" && config.type !== "switch" && (
              <label
                htmlFor={config.name}
                className="text-xs font-bold uppercase tracking-wider text-slate-600"
              >
                {config.label}{" "}
                {config.required && <span className="text-[#FF161A]">*</span>}
              </label>
            )}

            <Controller
              control={control}
              name={config.name}
              render={({ field }) => {
                // Custom Renderer
                if (config.type === "custom" && config.customRender) {
                  return <>{config.customRender({ field, error: errorMessage, disabled: isDisabled })}</>;
                }

                // Text / Email / Password / Number / Dates / Time
                if (
                  [
                    "text",
                    "email",
                    "password",
                    "number",
                    "date",
                    "datetime",
                    "time",
                  ].includes(config.type)
                ) {
                  const inputType =
                    config.type === "datetime" ? "datetime-local" : config.type;

                  return (
                    <div className="relative">
                      {config.icon && (
                        <div className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none">
                          {config.icon}
                        </div>
                      )}
                      <Input
                        id={config.name}
                        type={inputType}
                        placeholder={config.placeholder}
                        className={cn(
                          config.icon && "pl-9",
                          "h-10 bg-white/60 focus:bg-white border-border/60"
                        )}
                        disabled={isDisabled}
                        aria-invalid={hasError ? "true" : "false"}
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (config.type === "number") {
                            field.onChange(val === "" ? null : Number(val));
                          } else {
                            field.onChange(val === "" ? null : val);
                          }
                        }}
                      />
                    </div>
                  );
                }

                // Textarea
                if (config.type === "textarea") {
                  return (
                    <div className="relative">
                      {config.icon && (
                        <div className="absolute top-3 left-3 h-4 w-4 text-slate-400 pointer-events-none">
                          {config.icon}
                        </div>
                      )}
                      <Textarea
                        id={config.name}
                        placeholder={config.placeholder}
                        className={cn(
                          config.icon && "pl-9",
                          "min-h-24 bg-white/60 focus:bg-white border-border/60 resize-y pt-2"
                        )}
                        disabled={isDisabled}
                        aria-invalid={hasError ? "true" : "false"}
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) => field.onChange(e.target.value || null)}
                      />
                    </div>
                  );
                }

                // Select Dropdown
                if (config.type === "select") {
                  return (
                    <Select
                      value={field.value ?? ""}
                      onValueChange={(val: string | null) =>
                        field.onChange(val || "")
                      }
                      items={config.options}
                      disabled={isDisabled}
                    >
                      <SelectTrigger
                        id={config.name}
                        className="w-full h-10 bg-white/60 focus:bg-white border-border/60 text-sm"
                        aria-invalid={hasError ? "true" : "false"}
                      >
                        <SelectValue placeholder={config.placeholder || "Chọn..."} />
                      </SelectTrigger>
                      <SelectContent>
                        {config.options?.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  );
                }

                // Multi-select Pill Badges (visual tags selector)
                if (config.type === "multi-select") {
                  const selectedValues = (field.value as string[]) || [];

                  const toggleOption = (val: string) => {
                    if (selectedValues.includes(val)) {
                      field.onChange(selectedValues.filter((v) => v !== val));
                    } else {
                      field.onChange([...selectedValues, val]);
                    }
                  };

                  return (
                    <div className="flex flex-wrap gap-2 p-3 bg-white/50 border border-border/60 rounded-xl min-h-12">
                      {config.options?.map((opt) => {
                        const isSelected = selectedValues.includes(opt.value);
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            disabled={isDisabled}
                            onClick={() => toggleOption(opt.value)}
                            className={cn(
                              "px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer border",
                              isSelected
                                ? "bg-[#FF161A] text-white border-[#FF161A] shadow-xs"
                                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                            )}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                      {config.options?.length === 0 && (
                        <span className="text-xs text-slate-400">Không có lựa chọn</span>
                      )}
                    </div>
                  );
                }

                // Switch Toggle
                if (config.type === "switch") {
                  return (
                    <label className="relative inline-flex items-center cursor-pointer select-none mt-2">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={!!field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        disabled={isDisabled}
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF161A]"></div>
                      <span className="ml-3 text-sm font-semibold text-slate-700">
                        {config.label}
                        {config.required && <span className="text-[#FF161A] ml-0.5">*</span>}
                      </span>
                    </label>
                  );
                }

                // Checkbox
                if (config.type === "checkbox") {
                  return (
                    <label className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 cursor-pointer select-none mt-2">
                      <input
                        type="checkbox"
                        className="accent-[#FF161A] h-4 w-4"
                        checked={!!field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        disabled={isDisabled}
                      />
                      <span>
                        {config.label}
                        {config.required && <span className="text-[#FF161A] ml-0.5">*</span>}
                      </span>
                    </label>
                  );
                }

                // Radio options group
                if (config.type === "radio") {
                  return (
                    <div className="flex flex-wrap gap-4 mt-1">
                      {config.options?.map((opt) => (
                        <label
                          key={opt.value}
                          className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer select-none"
                        >
                          <input
                            type="radio"
                            name={config.name}
                            value={opt.value}
                            checked={field.value === opt.value}
                            onChange={() => field.onChange(opt.value)}
                            disabled={isDisabled}
                            className="accent-[#FF161A] h-4 w-4"
                          />
                          <span>{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  );
                }

                return <></>;
              }}
            />

            {/* Error Message Display */}
            {hasError && (
              <span className="text-xs font-semibold text-[#C90012] mt-0.5 animate-in fade-in slide-in-from-top-1 duration-150">
                {errorMessage}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
