import { BellRing, Building2, CalendarDays, ClipboardCheck, HeartHandshake, UsersRound } from "lucide-react";

import { learningSteps, progressItems } from "@/constants/landing-content";
import { SectionHeading } from "./program-section";

export function LearningMethodSection() {
  return (
    <section id="phuong-phap" className="scroll-mt-28 bg-white/55 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Phương pháp APIX" title="Một chu trình học có mục tiêu rõ ràng" description="Không học dàn trải. Mỗi bước đều giúp học sinh hiểu bài, thực hành, được phản hồi và biết mình cần cải thiện điều gì." />
        <div className="relative mt-14 grid gap-4 lg:grid-cols-5">
          <div className="absolute left-[10%] right-[10%] top-8 hidden h-px bg-gradient-to-r from-transparent via-[#FF161A]/35 to-transparent lg:block" />
          {learningSteps.map((step) => (
            <article key={step.number} className="relative rounded-[26px] border border-white bg-white/80 p-5 shadow-lg shadow-red-950/5 backdrop-blur-xl">
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#FF161A] font-display text-sm font-extrabold text-white shadow-lg shadow-red-500/25">{step.number}</span>
              <h3 className="mt-5 font-display text-lg font-bold text-[#111318]">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#6B7280]">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ParentProgressSection() {
  const icons = [ClipboardCheck, CalendarDays, BellRing, HeartHandshake, CalendarDays, BellRing];
  return (
    <section id="tien-bo" className="scroll-mt-28 px-4 py-24 sm:px-6">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <SectionHeading align="left" eyebrow="Phụ huynh luôn nắm rõ" title="Không cần đoán con đang học đến đâu" description="Thông tin học tập được ghi nhận nhất quán để phụ huynh biết con đi học đều không, hoàn thành bài tập thế nào và đang tiến bộ ở kỹ năng nào." />
        <div className="relative rounded-[36px] border border-white/90 bg-white/70 p-5 shadow-[0_30px_90px_rgba(255,22,26,0.13)] backdrop-blur-2xl sm:p-7">
          <div className="flex items-center justify-between border-b border-red-100 pb-5">
            <div><p className="text-xs font-bold tracking-wider text-[#C90012] uppercase">Báo cáo học tập</p><h3 className="mt-1 font-display text-xl font-bold">Tổng quan của học sinh</h3></div>
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">Đang tiến bộ</span>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {progressItems.map((item, index) => {
              const Icon = icons[index];
              return <div key={item} className="flex items-center gap-3 rounded-2xl border border-red-50 bg-white/80 p-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFE7E8] text-[#C90012]"><Icon className="h-4 w-4" /></span><span className="text-sm font-bold text-[#374151]">{item}</span></div>;
            })}
          </div>
          <div className="mt-5 rounded-2xl bg-[#FFF1F2] p-4"><p className="text-xs font-bold text-[#C90012]">Nhận xét gần nhất</p><p className="mt-1 text-sm leading-6 text-[#4B5563]">Giáo viên cập nhật nhận xét cụ thể, dễ hiểu và đề xuất nội dung cần luyện thêm.</p></div>
        </div>
      </div>
    </section>
  );
}

export function TeacherCampusSection() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
        <article id="doi-ngu" className="scroll-mt-28 rounded-[36px] bg-[#111318] p-8 text-white shadow-2xl sm:p-10">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF161A]"><UsersRound className="h-6 w-6" /></span>
          <p className="mt-8 text-sm font-extrabold tracking-[0.18em] text-red-300 uppercase">Đội ngũ đồng hành</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">Giáo viên tập trung vào lớp học</h2>
          <p className="mt-5 text-lg leading-8 text-white/70">Giáo viên theo sát điểm danh, bài tập, kỹ năng và báo cáo học tập. Đội ngũ văn phòng giữ liên lạc với phụ huynh rõ ràng, đều đặn.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2"><InfoPill text="Phản hồi theo năng lực" /><InfoPill text="Hỗ trợ trong từng buổi" /><InfoPill text="Theo dõi bài tập" /><InfoPill text="Phối hợp với phụ huynh" /></div>
        </article>

        <article id="co-so" className="scroll-mt-28 rounded-[36px] border border-white bg-white/70 p-8 shadow-xl shadow-red-950/5 backdrop-blur-xl sm:p-10">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFE7E8] text-[#C90012]"><Building2 className="h-6 w-6" /></span>
          <p className="mt-8 text-sm font-extrabold tracking-[0.18em] text-[#C90012] uppercase">Không gian học tập</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-[#111318] sm:text-4xl">Cơ sở gần gũi, lớp học thuận tiện</h2>
          <p className="mt-5 text-lg leading-8 text-[#5B6472]">Các phòng học trong cùng khu dân cư giúp phụ huynh thuận tiện đưa đón và trung tâm dễ dàng tổ chức lớp theo độ tuổi, trình độ.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2"><CampusCard name="Cơ sở A" rooms="Phòng 101 · Phòng 102" /><CampusCard name="Cơ sở B" rooms="Phòng 201 · Phòng 202" /></div>
        </article>
      </div>
    </section>
  );
}

function InfoPill({ text }: { text: string }) { return <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm font-semibold text-white/85">{text}</div>; }
function CampusCard({ name, rooms }: { name: string; rooms: string }) { return <div className="rounded-2xl border border-red-100 bg-white/80 p-5"><strong className="font-display text-lg text-[#111318]">{name}</strong><p className="mt-2 text-sm text-[#6B7280]">{rooms}</p></div>; }

export function ResultSection() {
  return (
    <section className="px-4 pb-24 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-[40px] border border-red-100 bg-gradient-to-br from-[#FFF1F2] to-white p-8 sm:p-12">
        <SectionHeading eyebrow="Kết quả có thể nhìn thấy" title="Tiến bộ không chỉ nằm ở điểm số" description="APIX hướng đến những thay đổi phụ huynh và học sinh có thể cảm nhận trong quá trình học hằng ngày." />
        <div className="mt-10 grid gap-4 md:grid-cols-3"><ResultCard title="Dám nói hơn" text="Chủ động trả lời, đặt câu hỏi và trình bày ý tưởng bằng tiếng Anh." /><ResultCard title="Học đều hơn" text="Có thói quen làm bài, ôn tập và chuẩn bị trước mỗi buổi học." /><ResultCard title="Biết mình cần cải thiện gì" text="Nhận phản hồi cụ thể thay vì chỉ nhìn vào một con số tổng quát." /></div>
      </div>
    </section>
  );
}

function ResultCard({ title, text }: { title: string; text: string }) { return <article className="rounded-[24px] bg-white p-6 shadow-sm"><h3 className="font-display text-xl font-bold text-[#C90012]">{title}</h3><p className="mt-3 leading-7 text-[#5B6472]">{text}</p></article>; }
