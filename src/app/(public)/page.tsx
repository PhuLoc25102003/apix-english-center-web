import type { Metadata } from "next";

import { FAQSection, LandingFooter, TrialSection } from "@/components/landing/final-sections";
import { HeroSection, TrustBar } from "@/components/landing/hero-section";
import { LandingHeader } from "@/components/landing/landing-header";
import { LearningMethodSection, ParentProgressSection, ResultSection, TeacherCampusSection } from "@/components/landing/learning-sections";
import { ProgramSection } from "@/components/landing/program-section";

export const metadata: Metadata = {
  title: "Trung tâm tiếng Anh cho trẻ em và thanh thiếu niên",
  description: "APIX English giúp học sinh tự tin giao tiếp qua lớp học quy mô nhỏ, luyện tập thực tế và báo cáo tiến bộ rõ ràng cho phụ huynh.",
};

export default function HomePage() {
  return (
    <main className="apix-landing min-h-screen text-[#111318]">
      <LandingHeader />
      <HeroSection />
      <TrustBar />
      <ProgramSection />
      <LearningMethodSection />
      <ParentProgressSection />
      <TeacherCampusSection />
      <ResultSection />
      <TrialSection />
      <FAQSection />
      <LandingFooter />
    </main>
  );
}
