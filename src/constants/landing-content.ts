export const landingNavigation = [
  { label: "Chương trình", href: "#chuong-trinh" },
  { label: "Phương pháp", href: "#phuong-phap" },
  { label: "Tiến bộ", href: "#tien-bo" },
  { label: "Đội ngũ", href: "#doi-ngu" },
  { label: "Cơ sở", href: "#co-so" },
  { label: "Hỏi đáp", href: "#hoi-dap" },
] as const;

export const trustItems = [
  "Lớp học quy mô nhỏ",
  "Luyện nói trong mỗi buổi học",
  "Báo cáo rõ ràng cho phụ huynh",
  "Giáo viên và trợ giảng đồng hành",
  "Kiểm tra đầu vào trước khi xếp lớp",
] as const;

export const programs = [
  {
    title: "Tiếng Anh Mầm non",
    ageRange: "Dành cho trẻ 4–6 tuổi",
    description:
      "Xây nền tảng nghe, nói và phản xạ lớp học qua bài hát, câu chuyện, trò chơi và tương tác có hướng dẫn.",
    highlights: ["Học qua trải nghiệm", "Từ vựng trực quan", "Theo dõi tiến bộ"],
  },
  {
    title: "Tiếng Anh Tiểu học",
    ageRange: "Dành cho học sinh lớp 1–5",
    description:
      "Phát triển từ vựng, ngữ âm, mẫu câu và sự tự tin giao tiếp song song với kiến thức trên trường.",
    highlights: ["Luyện nói mỗi buổi", "Theo dõi bài tập", "Báo cáo định kỳ"],
  },
  {
    title: "Tiếng Anh THCS",
    ageRange: "Dành cho học sinh lớp 6–9",
    description:
      "Củng cố ngữ pháp và bốn kỹ năng để học sinh học tốt ở trường, đồng thời giao tiếp tự nhiên hơn.",
    highlights: ["Nền tảng ngữ pháp", "Giao tiếp thực tế", "Đánh giá kỹ năng"],
  },
  {
    title: "Tăng cường Giao tiếp",
    ageRange: "Theo trình độ thực tế",
    description:
      "Tập trung phản xạ nghe nói, phát âm và khả năng trình bày ý tưởng trong các tình huống gần gũi.",
    highlights: ["Phản xạ tự nhiên", "Sửa phát âm", "Hoạt động nhóm"],
  },
  {
    title: "Ngữ pháp & Hỗ trợ ở trường",
    ageRange: "Dành cho học sinh tiểu học và THCS",
    description:
      "Hệ thống lại kiến thức, tháo gỡ phần còn yếu và hình thành phương pháp tự học hiệu quả.",
    highlights: ["Bám sát năng lực", "Ôn tập có lộ trình", "Bài tập vừa sức"],
  },
  {
    title: "Nền tảng Luyện thi",
    ageRange: "Dành cho học sinh cần mục tiêu dài hạn",
    description:
      "Chuẩn bị nền tảng từ vựng, ngữ pháp và kỹ năng làm bài trước khi bước vào giai đoạn luyện thi chuyên sâu.",
    highlights: ["Đánh giá đầu vào", "Mục tiêu theo giai đoạn", "Theo dõi kết quả"],
  },
] as const;

export const learningSteps = [
  { number: "01", title: "Kiểm tra trình độ", description: "Xác định đúng điểm mạnh, phần cần cải thiện và lớp học phù hợp." },
  { number: "02", title: "Học theo từng bước", description: "Kiến thức được chia nhỏ, liên kết và nâng dần theo năng lực của học sinh." },
  { number: "03", title: "Luyện nói mỗi buổi", description: "Học sinh được dùng tiếng Anh thật thay vì chỉ ghi nhớ lý thuyết." },
  { number: "04", title: "Ôn tập tại nhà", description: "Bài tập vừa đủ giúp củng cố bài học và tạo thói quen tự học." },
  { number: "05", title: "Báo cáo tiến bộ", description: "Phụ huynh nắm được kết quả, nhận xét và bước học tiếp theo của con." },
] as const;

export const progressItems = [
  "Điểm danh từng buổi",
  "Tình trạng bài tập",
  "Điểm kỹ năng nói",
  "Nhận xét của giáo viên",
  "Lịch học tiếp theo",
  "Nhắc học phí đúng hạn",
] as const;

export const faqs = [
  {
    question: "APIX xếp học sinh vào lớp phù hợp như thế nào?",
    answer: "Học sinh được kiểm tra đầu vào và trao đổi về mục tiêu học tập. Đội ngũ APIX dựa trên độ tuổi, năng lực hiện tại và lịch học để tư vấn lớp phù hợp.",
  },
  {
    question: "Học sinh nhỏ tuổi có cần điện thoại hoặc tài khoản riêng không?",
    answer: "Không. Phụ huynh là người nhận thông tin học tập, lịch học và báo cáo tiến bộ. Học sinh chỉ cần tập trung vào lớp học và bài tập được giao.",
  },
  {
    question: "Phụ huynh nhận thông tin tiến bộ bằng cách nào?",
    answer: "APIX tổng hợp điểm danh, bài tập, đánh giá kỹ năng và nhận xét của giáo viên để phụ huynh dễ dàng theo dõi theo từng giai đoạn.",
  },
  {
    question: "Một lớp học có bao nhiêu học sinh?",
    answer: "APIX ưu tiên lớp học quy mô nhỏ để giáo viên có đủ thời gian quan sát, sửa lỗi và tạo cơ hội luyện nói cho từng học sinh.",
  },
  {
    question: "Nếu học sinh nghỉ một buổi thì sao?",
    answer: "Trung tâm ghi nhận tình trạng chuyên cần, thông báo nội dung cần ôn và hỗ trợ phụ huynh nắm được phần bài học mà học sinh đã bỏ lỡ.",
  },
] as const;

