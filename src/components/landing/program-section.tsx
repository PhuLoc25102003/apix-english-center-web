import { BookOpenCheck, Check, GraduationCap, Sparkles } from "lucide-react";

import { programs } from "@/constants/landing-content";

const icons = [Sparkles, BookOpenCheck, GraduationCap];

export function ProgramSection() {
  return (
    <section id="chuong-trinh" className="scroll-mt-28 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Lộ trình phù hợp" title="Mỗi độ tuổi, một cách học đúng" description="Chương trình được xây dựng theo năng lực thực tế, giúp học sinh vừa tiến bộ ở trường vừa tự tin sử dụng tiếng Anh trong đời sống." />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => {
            const Icon = icons[index % icons.length];
            return (
              <article key={program.title} className="group rounded-[28px] border border-white/80 bg-white/65 p-6 shadow-[0_18px_60px_rgba(184,0,18,0.07)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-red-200 hover:shadow-[0_24px_70px_rgba(255,22,26,0.14)]">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFE7E8] text-[#C90012]"><Icon className="h-5 w-5" /></div>
                  <span className="rounded-full border border-red-100 bg-white/80 px-3 py-1 text-xs font-bold text-[#C90012]">{program.ageRange}</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-[#111318]">{program.title}</h3>
                <p className="mt-3 min-h-20 leading-7 text-[#5B6472]">{program.description}</p>
                <ul className="mt-5 space-y-2 border-t border-red-100 pt-5">
                  {program.highlights.map((highlight) => <li key={highlight} className="flex items-center gap-2 text-sm font-semibold text-[#374151]"><Check className="h-4 w-4 text-[#FF161A]" />{highlight}</li>)}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, description, align = "center" }: { eyebrow: string; title: string; description: string; align?: "center" | "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <span className="text-sm font-extrabold tracking-[0.18em] text-[#C90012] uppercase">{eyebrow}</span>
      <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[#111318] sm:text-4xl lg:text-5xl">{title}</h2>
      <p className="mt-5 text-lg leading-8 text-[#5B6472]">{description}</p>
    </div>
  );
}
