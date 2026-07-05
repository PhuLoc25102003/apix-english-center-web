"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { UsersRound, CheckCircle } from "lucide-react";

import { teacherSupport } from "@/constants/landing-content";

export function TeacherSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="doi-ngu" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="rounded-[36px] bg-[#111318] p-8 text-white shadow-[0_24px_80px_rgba(17,19,24,0.12)] sm:p-12 relative overflow-hidden"
        >
          {/* Subtle Red Ambient Glow behind dark card */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#FF161A]/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-rose-500/5 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            {/* Left Block: Description */}
            <div className="flex flex-col items-start">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF161A] text-white shadow-lg shadow-red-500/25">
                <UsersRound className="h-6 w-6" />
              </span>
              <p className="mt-8 text-xs font-extrabold tracking-[0.2em] text-red-300 uppercase">
                {teacherSupport.eyebrow}
              </p>
              <h2 className="mt-3.5 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                {teacherSupport.title}
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/70 sm:text-base sm:leading-8">
                {teacherSupport.description}
              </p>
            </div>

            {/* Right Block: Pills Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {teacherSupport.pills.map((pill) => (
                <div
                  key={pill}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:bg-white/10"
                >
                  <CheckCircle className="h-5 w-5 text-[#FF161A]" />
                  <p className="mt-3.5 text-sm font-bold text-white/90">{pill}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
