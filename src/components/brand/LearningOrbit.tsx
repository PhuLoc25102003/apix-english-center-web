"use client";

import * as React from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const orbitSteps = [
  { num: 1, label: "Kiểm tra", angle: -90 },
  { num: 2, label: "Vào lớp", angle: -18 },
  { num: 3, label: "Luyện tập", angle: 54 },
  { num: 4, label: "Báo cáo", angle: 126 },
  { num: 5, label: "Cải thiện", angle: 198 },
];

export function LearningOrbit() {
  const shouldReduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = React.useState(0);

  // Cycle through active steps for a pulsing preview effect
  React.useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % orbitSteps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  // Center glass panel animation
  const centerVariants: Variants = {
    animate: {
      y: shouldReduceMotion ? 0 : [0, -6, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[480px] md:max-w-[520px]">
      {/* Outer Rotating Dashed Ring */}
      {!shouldReduceMotion && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[6%] rounded-full border-2 border-dashed border-[#FF161A]/10 pointer-events-none"
        />
      )}

      {/* Main Learning Circle SVG */}
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full pointer-events-none"
      >
        <defs>
          <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF161A" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#B80012" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#FF161A" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Orbit Path Circle */}
        <motion.circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke="url(#orbitGradient)"
          strokeWidth="2.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />
      </svg>

      {/* Central Glass Card Core */}
      <motion.div
        variants={centerVariants}
        animate="animate"
        className="absolute inset-[26%] flex flex-col items-center justify-center rounded-full border border-white/80 bg-white/70 text-center shadow-[0_32px_100px_rgba(255,22,26,0.14)] backdrop-blur-2xl"
      >
        <span className="text-[10px] font-extrabold tracking-[0.25em] uppercase text-[#C90012]">
          Chu trình APIX
        </span>
        <strong className="mt-2 font-display text-xl font-extrabold leading-tight text-[#111318] sm:text-2xl">
          Học thật
          <br />
          <span className="text-[#FF161A]">Tiến bộ thật</span>
        </strong>
      </motion.div>

      {/* Interactive Orbit Nodes */}
      {orbitSteps.map((step, index) => {
        // Calculate placement based on angles:
        // x = 50% + r * cos(angle), y = 50% + r * sin(angle)
        // r = 37.5% (approx 150px on 400px viewBox)
        const rad = (step.angle * Math.PI) / 180;
        const x = 50 + 37.5 * Math.cos(rad);
        const y = 50 + 37.5 * Math.sin(rad);

        const isActive = activeStep === index;

        return (
          <motion.button
            key={step.num}
            onClick={() => setActiveStep(index)}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-4 py-2 text-xs font-bold transition-all duration-300 shadow-md",
              isActive
                ? "border-red-300 bg-white text-[#C90012] scale-110 shadow-lg shadow-red-500/15 ring-2 ring-[#FF161A]/20"
                : "border-white bg-white/95 text-[#4B5563] hover:border-red-100 hover:text-[#C90012]"
            )}
            style={{
              left: `${x}%`,
              top: `${y}%`,
            }}
            whileHover={shouldReduceMotion ? {} : { scale: 1.15 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
          >
            <span className="flex items-center gap-1.5">
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  isActive ? "bg-[#FF161A] animate-ping" : "bg-[#FFE7E8]"
                )}
              />
              <span
                className={cn(
                  "absolute h-2 w-2 rounded-full bg-[#FF161A] opacity-0 transition-opacity duration-300",
                  isActive && "opacity-100"
                )}
              />
              {step.num}. {step.label}
            </span>
          </motion.button>
        );
      })}

      {/* Speaking Progress Floating Preview Card */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        animate={
          shouldReduceMotion
            ? { opacity: 1 }
            : { opacity: 1, y: [0, -4, 0] }
        }
        transition={{
          y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 },
          opacity: { duration: 0.6 },
        }}
        className="absolute bottom-[2%] left-1/2 w-[72%] -translate-x-1/2 rounded-2xl border border-white/80 bg-white/85 p-3.5 shadow-xl shadow-red-950/5 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between text-[11px] font-bold text-[#6B7280]">
          <span>Tiến bộ kỹ năng nói</span>
          <span className="text-[#16A34A] flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#16A34A] animate-pulse" />
            Đang cải thiện
          </span>
        </div>
        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-red-100/50">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "82%" }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="h-full rounded-full bg-gradient-to-r from-[#FF161A] to-[#B80012]"
          />
        </div>
      </motion.div>
    </div>
  );
}
