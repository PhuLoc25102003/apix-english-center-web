"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormInputConfig, FormInputRenderer } from "../forms/form-input-renderer";
import { LoadingState } from "@/components/feedback/loading-state";
import { ErrorState } from "@/components/feedback/error-state";

interface CrudFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  submitLabel?: string;
  configs: FormInputConfig[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationSchema: any; // Zod schema
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: any) => Promise<void> | void;
  isLoadingDetails?: boolean; // When the detail API is fetching data
  detailsError?: string;
  onRetryDetails?: () => void;
}

export function CrudFormModal({
  open,
  onOpenChange,
  title,
  description,
  submitLabel = "Lưu thông tin",
  configs,
  validationSchema,
  initialValues,
  onSubmit,
  isLoadingDetails = false,
  detailsError,
  onRetryDetails,
}: CrudFormModalProps) {
  // Construct dynamic default values based on configs
  const defaultValues = React.useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const defaults: Record<string, any> = {};
    configs.forEach((cfg) => {
      if (cfg.type === "section-header") return;
      
      if (cfg.defaultValue !== undefined) {
        defaults[cfg.name] = cfg.defaultValue;
      } else if (cfg.type === "multi-select") {
        defaults[cfg.name] = [];
      } else {
        defaults[cfg.name] = "";
      }
    });
    return defaults;
  }, [configs]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues,
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Sync form values on modal open/close or initial values load
  React.useEffect(() => {
    if (open) {
      if (initialValues) {
        // Map null fields to appropriate form values
        const mappedValues = { ...defaultValues };
        Object.keys(defaultValues).forEach((key) => {
          if (initialValues[key] !== undefined && initialValues[key] !== null) {
            mappedValues[key] = initialValues[key];
          }
        });
        reset(mappedValues);
      } else {
        reset(defaultValues);
      }
    } else {
      reset(defaultValues);
    }
  }, [open, initialValues, reset, defaultValues]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
    } catch (err) {
      console.error("Form submit error", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card max-w-lg md:max-w-2xl p-6 border border-[#FF161A]/10 gap-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="gap-2 text-left">
          <DialogTitle className="font-display text-lg font-bold text-[#111827]">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-sm text-[#6B7280]">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {isLoadingDetails ? (
          <div className="py-12">
            <LoadingState variant="spinner" className="min-h-[150px]" />
          </div>
        ) : detailsError ? (
          <ErrorState
            title="Không thể tải dữ liệu"
            message={detailsError}
            onRetry={onRetryDetails}
          />
        ) : (
          <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-6" noValidate>
            <div className="glass-card p-6 border border-white/40 shadow-xs rounded-2xl">
              <FormInputRenderer
                configs={configs}
                control={control}
                errors={errors}
                isSubmitting={isSubmitting}
              />
            </div>

            <DialogFooter className="gap-2 sm:justify-end border-t border-[#FF161A]/10 pt-4 -mx-6 -mb-6 px-6">
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                onClick={() => onOpenChange(false)}
                className="w-full sm:w-auto cursor-pointer"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto font-semibold bg-[#FF161A] text-white hover:bg-[#C90012] shadow-md shadow-[#FF161A]/15 transition-all inline-flex items-center gap-2 cursor-pointer disabled:bg-[#9CA3AF]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    {submitLabel}
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
