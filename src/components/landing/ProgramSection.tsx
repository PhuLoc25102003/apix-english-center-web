"use client";

import * as React from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { Sparkles, BookOpen, GraduationCap, MessageSquare, BookOpenCheck, Trophy, Check } from "lucide-react";

import { programs } from "@/constants/landing-content";
import { ApixGlassCard } from "@/components/brand/ApixGlassCard";

const icons = [Sparkles, BookOpen, GraduationCap, MessageSquare, BookOpenCheck, Trophy];

export function ProgramSection() {
  const shouldReduceMotion = useReducedMotion();

  // Scroll reveal container settings
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 18,
      },
    },
  };

  return (
    <section id="chuong-trinh" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-extrabold tracking-[0.2em] text-[#C90012] uppercase">
            Lộ trình phù hợp
          </span>
          <h2 className="mt-3.5 font-display text-3xl font-extrabold tracking-tight text-[#111318] sm:text-4xl lg:text-5xl">
            Mỗi độ tuổi, một cách học đúng
          </h2>
          <p className="mt-5 text-base leading-8 text-[#5B6472] sm:text-lg">
            Chương trình tại APIX English được xây dựng tinh gọn, bám sát năng lực và hỗ trợ tối đa sự tự tin giao tiếp cùng sự tiến bộ học tập rõ ràng.
          </p>
        </div>

        {/* Staggered Program Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {programs.map((program, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div key={program.title} variants={cardVariants}>
                <ApixGlassCard className="flex h-full flex-col p-7 bg-white/70 hover:bg-white/80 border-white/60">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFE7E8] text-[#C90012]">
                      <Icon className="h-5.5 w-5.5" />
                    </div>
                    <span className="rounded-full border border-red-100 bg-white/85 px-3 py-1 text-xs font-extrabold text-[#C90012]">
                      {program.ageRange}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-xl font-extrabold text-[#111318]">
                    {program.title}
                  </h3>

                  <p className="mt-3.5 flex-grow text-sm leading-6 text-[#5B6472]">
                    {program.description}
                  </p>

                  <ul className="mt-6 space-y-3.5 border-t border-red-100/50 pt-6">
                    {program.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2 text-xs font-bold text-[#374151]"
                      >
                        <Check className="h-4 w-4 shrink-0 text-[#FF161A]" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </ApixGlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
