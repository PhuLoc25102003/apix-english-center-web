export const landingNavigation = [
  { label: "Chương trình", href: "#chuong-trinh" },
  { label: "Phương pháp", href: "#phuong-phap" },
  { label: "Tiến bộ", href: "#tien-bo" },
  { label: "Đội ngũ", href: "#doi-ngu" },
  { label: "Cơ sở", href: "#co-so" },
  { label: "Tuyển dụng", href: "#tuyen-dung" },
  { label: "Hỏi đáp", href: "#hoi-dap" },
] as const;

export const trustItems = [
  "Lớp học quy mô nhỏ",
  "Luyện nói trong mỗi buổi học",
  "Báo cáo rõ ràng cho phụ huynh",
  "Giáo viên và trợ giảng đồng hành",
  "Kiểm tra đầu vào trước khi xếp lớp",
] as const;

export const heroContent = {
  badge: "Tiếng Anh cho trẻ em & thanh thiếu niên",
  title: "Học tiếng Anh để",
  titleHighlight: "tự tin nói thật.",
  description:
    "APIX English giúp học sinh xây dựng năng lực giao tiếp thực tế qua lớp học quy mô nhỏ, luyện tập có hướng dẫn, giáo viên tận tâm và báo cáo tiến bộ rõ ràng cho phụ huynh.",
  ctas: {
    trial: "Đăng ký học thử",
    programs: "Xem chương trình học",
    consult: "Gọi tư vấn",
  },
} as const;

export const programs = [
  {
    title: "Tiếng Anh Mầm non",
    ageRange: "Dành cho trẻ 4–6 tuổi",
    description:
      "Xây dựng phản xạ nghe nói tự nhiên qua các bài hát, câu chuyện, trò chơi vận động và tương tác trực quan sinh động.",
    highlights: ["Học qua trải nghiệm trực quan", "Kích thích tư duy ngôn ngữ", "Theo sát tiến độ chuyên cần"],
  },
  {
    title: "Tiếng Anh Tiểu học",
    ageRange: "Dành cho học sinh lớp 1–5",
    description:
      "Phát triển vốn từ vựng, chỉnh chuẩn ngữ âm, phản xạ câu hỏi nhanh và củng cố vững vàng kiến thức trên lớp.",
    highlights: ["Luyện nói thực hành mỗi buổi", "Hệ thống bài tập online nhẹ nhàng", "Báo cáo tiến bộ định kỳ"],
  },
  {
    title: "Tiếng Anh THCS",
    ageRange: "Dành cho học sinh lớp 6–9",
    description:
      "Củng cố hệ thống ngữ pháp học thuật, rèn luyện 4 kỹ năng giúp tự tin giao tiếp và làm chủ các bài thi ở trường.",
    highlights: ["Nền tảng ngữ pháp thực hành", "Giao tiếp thuyết trình tự tin", "Kiểm tra định kỳ 4 kỹ năng"],
  },
  {
    title: "Tăng cường Giao tiếp",
    ageRange: "Theo trình độ thực tế",
    description:
      "Chuyên sâu phản xạ nghe nói, cải thiện ngữ điệu, phát âm chuẩn tự nhiên và tự tin thảo luận nhóm bằng tiếng Anh.",
    highlights: ["Phát âm chuẩn IPA", "Tập trung phản xạ nói 100%", "Môi trường năng động, cởi mở"],
  },
  {
    title: "Ngữ pháp & Hỗ trợ ở trường",
    ageRange: "Học sinh Tiểu học & THCS",
    description:
      "Hệ thống hóa toàn bộ kiến thức ngữ pháp trọng tâm, tháo gỡ khó khăn trên lớp và định hình phương pháp tự học khoa học.",
    highlights: ["Bám sát chương trình của Bộ", "Ôn tập chuyên đề hiệu quả", "Cải thiện điểm số rõ ràng"],
  },
  {
    title: "Nền tảng Luyện thi",
    ageRange: "Chuẩn bị chứng chỉ quốc tế",
    description:
      "Làm quen phương pháp làm bài thi chuẩn hóa, tích lũy từ vựng học thuật nâng cao và rèn luyện tâm lý phòng thi vững vàng.",
    highlights: ["Tiếp cận format đề thi thật", "Rèn luyện tư duy phân tích", "Lộ trình cam kết tiến bộ"],
  },
] as const;

export const learningSteps = [
  { number: "01", title: "Kiểm tra trình độ", description: "Đánh giá đúng năng lực thực tế để xếp vào lớp phù hợp nhất." },
  { number: "02", title: "Học theo bước nhỏ", description: "Bài học thiết kế tinh gọn, nâng cao dần không gây áp lực." },
  { number: "03", title: "Luyện nói mỗi buổi", description: "Tập trung tối đa thời lượng thực hành giao tiếp trực tiếp tại lớp." },
  { number: "04", title: "Ôn tập nhẹ nhàng", description: "Hoàn thiện bài tập về nhà ngắn gọn để củng cố kiến thức đã học." },
  { number: "05", title: "Báo cáo rõ ràng", description: "Phụ huynh nắm bắt kết quả học tập định kỳ chi tiết và minh bạch." },
] as const;

export const progressItems = [
  "Điểm danh từng buổi học",
  "Tình trạng hoàn thành bài tập",
  "Điểm đánh giá kỹ năng nói",
  "Nhận xét chi tiết từ giáo viên",
  "Lịch học & giáo trình tiếp theo",
  "Nhắc học phí & hoạt động ngoại khóa",
] as const;

export const teacherSupport = {
  eyebrow: "Đội ngũ chuyên nghiệp",
  title: "Giáo viên tận tâm chuyên môn - Văn phòng sát cánh đồng hành",
  description:
    "Tại APIX English, các thầy cô tập trung 100% thời gian cho chất lượng bài giảng và hỗ trợ học sinh ngay trên lớp. Bộ phận văn phòng chuyên trách xử lý kết nối, phản hồi và cập nhật tiến độ đều đặn đến phụ huynh.",
  pills: [
    "Theo dõi tiến độ sát sao",
    "Sửa lỗi phát âm tại chỗ",
    "Hỗ trợ học tập ngoài giờ",
    "Báo cáo kết quả trực quan",
  ],
} as const;

export const careerContent = {
  eyebrow: "Cơ hội nghề nghiệp",
  title: "Đồng hành cùng APIX English",
  description:
    "APIX English luôn chào đón những giáo viên tâm huyết, yêu thích giảng dạy và mong muốn phát triển trong môi trường giáo dục chuyên nghiệp, thân thiện.",
  ctaText: "Xem vị trí tuyển dụng",
} as const;

export const contactInfo = {
  phone: "0900 000 000",
  phoneDisplay: "0900.000.000",
  zaloUrl: "https://zalo.me/0900000000",
  facebookUrl: "https://www.facebook.com/AnhNguAPIX",
  address: "Phòng 101, Tòa nhà APIX, Khu đô thị mới, TP. Hà Nội",
  googleMapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0968141434947!2d105.79975767597148!3d21.028810787777176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab5b706c9e0d%3A0xe54e60ac0ccfb05c!2zSGFub2ksIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s",
  brandDescription:
    "Trung tâm Anh ngữ chất lượng cao dành cho trẻ em và thanh thiếu niên. Chúng tôi cam kết mang lại môi trường học tập tự nhiên, thực hành giao tiếp tối đa và sự đồng hành chặt chẽ cùng phụ huynh học sinh.",
  campuses: [
    {
      name: "Cơ sở A (Trung tâm chính)",
      rooms: "Phòng 101 · Phòng 102",
      address: "Tầng 1, Tòa nhà A, Phân khu Nam",
    },
    {
      name: "Cơ sở B (Lớp tăng cường)",
      rooms: "Phòng 201 · Phòng 202",
      address: "Tầng 2, Tòa nhà B, Phân khu Bắc",
    },
  ],
} as const;

export const faqs = [
  {
    question: "APIX xếp học sinh vào lớp phù hợp như thế nào?",
    answer: "Học sinh sẽ tham gia một bài kiểm tra năng lực ngắn (nói và viết nhẹ nhàng) kèm trao đổi nguyện vọng học tập. APIX sẽ tư vấn lớp học tối ưu theo độ tuổi, trình độ thực tế và lịch học phù hợp nhất của gia đình.",
  },
  {
    question: "Học sinh nhỏ tuổi có cần điện thoại hoặc tài khoản riêng không?",
    answer: "Không cần thiết. Toàn bộ thông tin học tập, bài tập, nhận xét và thông báo chuyên cần sẽ được gửi trực tiếp đến số điện thoại/Zalo của phụ huynh. Các con chỉ cần chuẩn bị bài và đi học đúng giờ.",
  },
  {
    question: "Phụ huynh nhận thông tin tiến bộ của con bằng cách nào?",
    answer: "Hệ thống quản lý học tập của APIX tự động cập nhật kết quả điểm danh, điểm nói trên lớp, kết quả làm bài tập về nhà và nhận xét từ giáo viên chủ nhiệm. Báo cáo định kỳ sẽ được gửi qua Zalo/văn phòng định kỳ hàng tháng.",
  },
  {
    question: "Mỗi lớp học tại APIX English có tối đa bao nhiêu học sinh?",
    answer: "APIX duy trì quy mô lớp học nhỏ (thường từ 8 - 12 học sinh) để đảm bảo giáo viên có đủ thời gian chỉnh sửa phát âm, khuyến khích phản xạ giao tiếp cho từng bé trong suốt buổi học.",
  },
  {
    question: "Nếu con nghỉ học một buổi thì có được hỗ trợ gì không?",
    answer: "Nếu học sinh nghỉ học có phép, giáo viên và trợ giảng sẽ tổng hợp nội dung bài học, bài tập về nhà và gửi tài liệu hướng dẫn cụ thể để phụ huynh giúp con ôn tập tại nhà, tránh hổng kiến thức.",
  },
] as const;
