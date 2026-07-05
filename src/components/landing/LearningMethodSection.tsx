"use client";

import * as React from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";

import { learningSteps } from "@/constants/landing-content";
import { ApixGlassCard } from "@/components/brand/ApixGlassCard";

export function LearningMethodSection() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 180,
        damping: 18,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1.2, ease: "easeInOut", delay: 0.2 },
    },
  };

  return (
    <section
      id="phuong-phap"
      className="scroll-mt-24 bg-white/40 px-4 py-24 sm:px-6"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-extrabold tracking-[0.2em] text-[#C90012] uppercase">
            Phương pháp APIX
          </span>
          <h2 className="mt-3.5 font-display text-3xl font-extrabold tracking-tight text-[#111318] sm:text-4xl lg:text-5xl">
            Chu trình học mục tiêu rõ ràng
          </h2>
          <p className="mt-5 text-base leading-8 text-[#5B6472] sm:text-lg">
            Không dạy nhồi nhét lý thuyết. Mỗi bước trong chu trình tại APIX English đều hướng đến việc kích hoạt phản xạ tự nhiên của con.
          </p>
        </div>

        {/* Timeline container */}
        <div className="relative mt-16">
          {/* Horizontal Line on Desktop */}
          {!shouldReduceMotion && (
            <motion.div
              variants={lineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="absolute left-[8%] right-[8%] top-11 hidden h-0.5 origin-left bg-gradient-to-r from-red-100 via-[#FF161A]/35 to-red-100 lg:block"
            />
          )}

          {/* Cards list */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5"
          >
            {learningSteps.map((step) => (
              <motion.div key={step.number} variants={itemVariants}>
                <ApixGlassCard className="relative flex h-full flex-col items-start p-6 bg-white/80 hover:bg-white border-white/65">
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#FF161A] font-display text-sm font-extrabold text-white shadow-lg shadow-red-500/25">
                    {step.number}
                  </span>
                  <h3 className="mt-5 font-display text-lg font-extrabold text-[#111318]">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-xs leading-6 text-[#6B7280] font-medium">
                    {step.description}
                  </p>
                </ApixGlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
