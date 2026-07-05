import type { Metadata } from "next";

import { LandingHeader } from "@/components/layout/LandingHeader";
import { HeroSection } from "@/components/landing/HeroSection";
import { TrustBar } from "@/components/landing/TrustBar";
import { ProgramSection } from "@/components/landing/ProgramSection";
import { LearningMethodSection } from "@/components/landing/LearningMethodSection";
import { ParentProgressSection } from "@/components/landing/ParentProgressSection";
import { TeacherSection } from "@/components/landing/TeacherSection";
import { CareerSection } from "@/components/landing/CareerSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { TrialClassSection } from "@/components/landing/TrialClassSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { LandingFooter } from "@/components/layout/LandingFooter";
import { FloatingContactActions } from "@/components/layout/FloatingContactActions";
import { GoToTopButton } from "@/components/layout/GoToTopButton";

export const metadata: Metadata = {
  title: "APIX English - Học tiếng Anh để tự tin nói thật",
  description: "APIX English giúp học sinh xây dựng năng lực giao tiếp thực tế qua lớp học quy mô nhỏ, luyện tập có hướng dẫn, giáo viên tận tâm và báo cáo tiến bộ rõ ràng.",
};

export default function HomePage() {
  return (
    <main className="apix-landing min-h-screen text-[#111318] relative">
      {/* Main Glass Header Navigation */}
      <LandingHeader />

      {/* Landing Sections */}
      <HeroSection />
      <TrustBar />
      <ProgramSection />
      <LearningMethodSection />
      <ParentProgressSection />
      <TeacherSection />
      <ContactSection />
      <CareerSection />
      <TrialClassSection />
      <FAQSection />

      {/* Main Footer Block */}
      <LandingFooter />

      {/* Floating Utilities */}
      <GoToTopButton />
      <FloatingContactActions />
    </main>
  );
}
