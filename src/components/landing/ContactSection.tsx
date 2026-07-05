"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Building2, MapPin, Navigation } from "lucide-react";

import { contactInfo } from "@/constants/landing-content";
import { ApixGlassCard } from "@/components/brand/ApixGlassCard";

export function ContactSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="co-so" className="scroll-mt-24 px-4 py-24 sm:px-6 bg-white/20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 lg:items-center">
          {/* Left Block: Campus list */}
          <div className="flex flex-col items-start text-left">
            <span className="text-xs font-extrabold tracking-[0.2em] text-[#C90012] uppercase">
              Không gian học tập
            </span>
            <h2 className="mt-3.5 font-display text-3xl font-extrabold tracking-tight text-[#111318] sm:text-4xl lg:text-5xl">
              Cơ sở khang trang, đưa đón thuận tiện
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#5B6472] sm:text-base sm:leading-8">
              Các phòng học của APIX English tọa lạc tại các khu dân cư trung tâm, thuận lợi cho việc đi lại của học sinh và giúp phụ huynh dễ dàng sắp xếp lịch đưa đón con.
            </p>

            <div className="mt-8 grid gap-4 w-full sm:grid-cols-2">
              {contactInfo.campuses.map((campus) => (
                <div
                  key={campus.name}
                  className="rounded-2xl border border-red-100 bg-white/80 p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <strong className="font-display text-base text-[#111318] flex items-center gap-2">
                    <Building2 className="h-4.5 w-4.5 text-[#C90012]" />
                    {campus.name}
                  </strong>
                  <p className="mt-2.5 text-xs text-[#FF161A] font-bold">
                    {campus.rooms}
                  </p>
                  <p className="mt-1 text-xs text-[#6B7280] font-medium leading-5">
                    {campus.address}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Block: Map Visual Frame */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.98 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <ApixGlassCard className="p-1 border border-white bg-white/70 shadow-lg h-[320px] sm:h-[380px]">
              <div className="relative w-full h-full rounded-[28px] overflow-hidden">
                <iframe
                  title="Bản đồ các cơ sở APIX English"
                  src={contactInfo.googleMapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />

                {/* Glass Floating Location Badge */}
                <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/60 bg-white/90 p-3 shadow-md backdrop-blur-md flex items-center justify-between gap-4 pointer-events-none">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFE7E8] text-[#C90012]">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <div className="text-left">
                      <p className="text-xs font-bold text-[#111318]">Địa chỉ trung tâm</p>
                      <p className="text-[10px] text-[#6B7280] truncate max-w-[160px] sm:max-w-[220px]">
                        {contactInfo.address}
                      </p>
                    </div>
                  </div>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FF161A] text-white">
                    <Navigation className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </ApixGlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
