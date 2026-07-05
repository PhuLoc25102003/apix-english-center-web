"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { faqs } from "@/constants/landing-content";
import { cn } from "@/lib/utils";

export function FAQSection() {
  return (
    <section id="hoi-dap" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center">
          <span className="text-xs font-extrabold tracking-[0.2em] text-[#C90012] uppercase">
            Phụ phụ huynh thường hỏi
          </span>
          <h2 className="mt-3.5 font-display text-3xl font-extrabold tracking-tight text-[#111318] sm:text-4xl lg:text-5xl">
            Thông tin cần biết trước khi bắt đầu
          </h2>
        </div>

        {/* Accordions List */}
        <div className="mt-12 grid gap-3.5">
          {faqs.map((faq) => (
            <FAQAccordionItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQAccordionItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "rounded-[24px] border border-red-100/50 bg-white/70 shadow-sm backdrop-blur-xl transition-all duration-300",
        isOpen && "border-red-200/60 shadow-[0_12px_45px_rgba(255,22,26,0.06)]"
      )}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display text-base font-extrabold text-[#111318] transition-colors hover:text-[#C90012] focus-visible:rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF161A] focus-visible:ring-offset-2"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-[#C90012] transition-transform duration-300",
            isOpen && "rotate-185"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="border-t border-red-50/50 px-6 pb-6 pt-4 text-sm leading-7 text-[#5B6472] font-medium">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
