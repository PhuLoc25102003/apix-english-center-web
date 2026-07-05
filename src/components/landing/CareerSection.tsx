"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap, Briefcase } from "lucide-react";

import { careerContent, contactInfo } from "@/constants/landing-content";
import { ApixGlassCard } from "@/components/brand/ApixGlassCard";
import { ApixButton } from "@/components/brand/ApixButton";

export function CareerSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="tuyen-dung" className="scroll-mt-24 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.98 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <ApixGlassCard className="relative overflow-hidden p-8 sm:p-12 border-red-100/50 bg-[#FFF8F8]/50">
            {/* Subtle red glow blob */}
            <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-[#FF161A]/5 blur-2xl" />

            <div className="relative flex flex-col items-center text-center max-w-3xl mx-auto">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFE7E8] text-[#C90012]">
                <Briefcase className="h-6 w-6" />
              </span>

              <p className="mt-6 text-xs font-extrabold tracking-[0.2em] text-[#C90012] uppercase">
                {careerContent.eyebrow}
              </p>

              <h2 className="mt-3.5 font-display text-3xl font-extrabold text-[#111318] sm:text-4xl">
                {careerContent.title}
              </h2>

              <p className="mt-5 text-sm leading-7 text-[#5B6472] sm:text-base sm:leading-8">
                {careerContent.description}
              </p>

              <div className="mt-8">
                <ApixButton
                  href={contactInfo.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  className="px-8 py-3 text-sm font-bold"
                  ariaLabel="Xem các vị trí tuyển dụng giáo viên tại Fanpage Facebook"
                >
                  <GraduationCap className="mr-2 h-4 w-4" />
                  {careerContent.ctaText}
                </ApixButton>
              </div>
            </div>
          </ApixGlassCard>
        </motion.div>
      </div>
    </section>
  );
}
