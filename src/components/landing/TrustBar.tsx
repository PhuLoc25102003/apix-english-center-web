"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { trustItems } from "@/constants/landing-content";

export function TrustBar() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section aria-label="Cam kết từ APIX English" className="px-4 sm:px-6">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-8 gap-y-4 rounded-[28px] border border-white/90 bg-white/70 px-6 py-5 shadow-[0_16px_50px_rgba(255,22,26,0.05)] backdrop-blur-xl"
      >
        {trustItems.map((item, index) => (
          <span
            key={item}
            className="flex items-center gap-2 text-sm font-bold text-[#374151]"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF161A]/60 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF161A]" />
            </span>
            {item}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
