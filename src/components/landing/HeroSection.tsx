"use client";

import * as React from "react";
import { ArrowRight, PhoneCall, Sparkles } from "lucide-react";
import { motion, useReducedMotion, Variants } from "framer-motion";

import { heroContent, trustItems, contactInfo } from "@/constants/landing-content";
import { ApixButton } from "@/components/brand/ApixButton";
import { LearningOrbit } from "@/components/brand/LearningOrbit";

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  // Entrance animations config
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
        stiffness: 250,
        damping: 20,
      },
    },
  };

  const cleanPhone = contactInfo.phone.replace(/\s+/g, "");

  return (
    <section
      id="trang-chu"
      className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 sm:pt-40 lg:pb-32"
    >
      {/* Decorative Red Mesh Gradients and Blobs */}
      <div className="pointer-events-none absolute -left-20 top-24 h-96 w-96 rounded-full bg-[#FF161A]/12 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 top-12 h-[32rem] w-[32rem] rounded-full bg-rose-100/40 blur-[120px]" />
      {!shouldReduceMotion && (
        <>
          <div className="pointer-events-none absolute left-[40%] top-1/4 h-24 w-24 rounded-full bg-red-200/20 blur-3xl animate-pulse" />
          <div className="pointer-events-none absolute right-[10%] bottom-10 h-40 w-40 rounded-full bg-[#FF161A]/5 blur-2xl" />
        </>
      )}

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8"
        >
          {/* Text Content Block */}
          <div className="flex flex-col items-start text-left">
            {/* Glass Badge */}
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full border border-white/90 bg-white/70 px-4.5 py-2 text-sm font-extrabold text-[#C90012] shadow-sm backdrop-blur-md"
            >
              <Sparkles className="h-4 w-4 text-[#FF161A] animate-pulse" />
              {heroContent.badge}
            </motion.span>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-[-0.04em] text-[#111318] sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {heroContent.title}{" "}
              <span className="relative inline-block text-[#FF161A]">
                {heroContent.titleHighlight}
                {/* Decorative underline */}
                <span className="absolute bottom-1 left-0 h-1.5 w-full rounded-full bg-[#FFE7E8]/60 -z-10" />
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl text-base leading-7 text-[#4B5563] sm:text-lg sm:leading-8"
            >
              {heroContent.description}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
            >
              <ApixButton
                href="#dang-ky"
                variant="primary"
                className="w-full min-h-12 px-8 py-3 text-base sm:w-auto"
              >
                {heroContent.ctas.trial} <ArrowRight className="ml-2 h-4 w-4" />
              </ApixButton>

              <ApixButton
                href="#chuong-trinh"
                variant="glass"
                className="w-full min-h-12 px-8 py-3 text-base sm:w-auto"
              >
                {heroContent.ctas.programs}
              </ApixButton>

              <ApixButton
                href={`tel:${cleanPhone}`}
                variant="outline"
                className="w-full min-h-12 px-6 py-3 text-base sm:w-auto gap-2"
              >
                <PhoneCall className="h-4 w-4" /> {heroContent.ctas.consult}
              </ApixButton>
            </motion.div>

            {/* Mini Trust Highlights */}
            <motion.div
              variants={itemVariants}
              className="mt-10 grid gap-3.5 border-t border-red-100/50 pt-8 w-full grid-cols-2 sm:grid-cols-3"
            >
              {trustItems.slice(0, 3).map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-xs font-bold text-[#4B5563]"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFE7E8] text-[#C90012]">
                    ✓
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Interactive Visual Graphic Column */}
          <div className="relative flex items-center justify-center py-6">
            <LearningOrbit />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
