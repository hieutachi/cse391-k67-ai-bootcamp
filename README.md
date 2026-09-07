# 🎓 AI-Accelerated Frontend Developer Bootcamp

> **Bản dựng site CSE391 K67 (tiếng Việt)** — nội dung giáo trình gốc lấy từ kho công khai
> [ktzung/working-with-ai-course-for-frontend-dev](https://github.com/ktzung/working-with-ai-course-for-frontend-dev).
> Bài giảng thuộc tác giả gốc; `build/` + `site/` là sản phẩm xây dựng cho lớp K67.
> Trang demo: <https://hieutachi.github.io/cse391-k67-ai-bootcamp/> · quy trình deploy: [DEPLOY-GITHUB-PAGES.md](DEPLOY-GITHUB-PAGES.md)



> **(HTML5 • CSS3 • JavaScript ES6+ • Bootstrap 5)** — Học Frontend theo phương pháp Just-in-Time Learning, dùng AI (Gemini / Claude / ChatGPT) làm trợ lý để cắt giao diện nhanh gấp 3–5 lần mà vẫn hiểu từng dòng code.

## 📖 Giới thiệu

Bạn muốn tự tay xây dựng các giao diện website hiện đại, chuẩn Responsive và có độ tương tác cao nhưng chưa biết bắt đầu từ đâu? Bạn muốn tối ưu hoá tốc độ cắt giao diện và code Frontend bằng sức mạnh của AI?

Khoá học này trang bị nền tảng Frontend vững chắc từ cốt lõi với **HTML5, CSS3, JavaScript hiện đại (ES6+)** và thư viện UI hàng đầu **Bootstrap 5**. Không học lý thuyết rời rạc — bạn đi thẳng vào xây dựng **Highland Hospital Web Portal**, hệ thống website y tế & đặt lịch khám trực tuyến hoàn chỉnh: Landing Page, luồng đặt lịch đa bước và Admin Dashboard.

**Thời lượng**: 12 chương + 1 module bổ trợ · 64 bài · song ngữ Việt–Anh · tự học, khuyến nghị 8 tuần.

## 🚀 Quy trình học (AI-Accelerated Workflow)

Khoá học KHÔNG dạy bạn copy-paste code mù quáng từ AI, mà rèn luyện tư duy làm chủ công cụ qua 4 bước:

1. **Phân tích yêu cầu** — đọc thiết kế Figma, bóc tách khối layout (Box Model, Flexbox/Grid)
2. **Soạn thảo với AI** — viết prompt chính xác để dựng HTML semantic, dàn trang Bootstrap 5
3. **Phân tích & thấu hiểu** — đọc hiểu từng dòng code, giải thích được vì sao
4. **Tinh chỉnh & tối ưu** — fix responsive, chuẩn hoá utilities, refactor code dễ bảo trì

## 📚 Chương trình học

| # | Chương | Trọng tâm |
|---|---|---|
| 1 | Chào mừng & AI-Accelerated Workflow | Bản đồ công cụ AI, quy trình 4 bước, thiết lập môi trường |
| 2 | Prompt Engineering cho Frontend | Prompt HTML/CSS, JavaScript, debug, workshop cắt giao diện |
| 3 | HTML5 chuẩn ngữ nghĩa | Cấu trúc tài liệu, Semantic & SEO, Forms, Table, SVG |
| 4 | CSS3 nền tảng | Selectors, Specificity, Box Model, CSS Variables |
| 5 | CSS Layout | Flexbox, Grid, chọn công cụ layout phù hợp |
| 6 | Responsive & Animation | Media Queries, Mobile-First, Transition, Keyframes |
| 7 | Bootstrap 5 — Grid & Utilities | 12-Column Grid, Spacing, Colors, Buttons, Badges |
| 8 | Bootstrap 5 — Components | Navbar, Cards, Forms, Modal, Offcanvas, Accordion |
| 9 | JavaScript ES6+ & dữ liệu | Arrow functions, Array Methods, Object, JSON |
| 10 | DOM & Event Handling | DOM Manipulation, sự kiện, validation, localStorage |
| 11 | Async & Fetch API | Fetch/Async-Await, Mock API, Loading/Error, đặt lịch đa bước |
| 12 | Dự án Highland Hospital | Landing Page, Admin Dashboard, tối ưu & deploy |
| 13 | Module bổ trợ: Prompt Engineering cho Frontend | Prompt chuẩn phân tích Figma, sinh code Bootstrap, lab Figma → Bootstrap |

Chi tiết từng bài nằm trong [PLAN.md](./PLAN.md). Bộ prompt mẫu chuẩn dùng trong module 13: [templates/prompt-kit-figma-to-bootstrap.md](./templates/prompt-kit-figma-to-bootstrap.md).

## 🧰 Module bổ trợ: Prompt Engineering cho Frontend Developer

Sau khi nắm nền tảng (khuyến nghị học sau chương 8, khi đã quen Bootstrap 5), module 3 bài này dạy bạn bộ prompt mẫu chuẩn để **cắt giao diện Figma thành code Bootstrap theo đúng quy trình Define → Draft → Analyze → Refine**:

1. **Phân tích Figma bằng prompt chuẩn** — bóc tách thiết kế thành 5 nhóm thông tin AI cần: layout, lưới/căn chỉnh, component, trạng thái, responsive.
2. **Sinh code Bootstrap từ đặc tả** — khung prompt kèm ràng buộc (design token, semantic, mobile-first, không CSS thừa) để code dùng được ngay.
3. **Lab Figma → Bootstrap** — chạy trọn một phiên cắt giao diện, kèm checklist tự đánh giá prompt lẫn code.

Bài học nằm trong `course-lessons/{vi,en}/13-bonus-prompt-engineering-frontend/`.

## 🏗️ Dự án xuyên suốt: Highland Hospital Web Portal

- **Nền tảng**: HTML semantic + CSS3 + JavaScript ES6+ thuần, không cần framework
- **Giao diện**: Bootstrap 5, chuẩn Responsive (mobile-first)
- **Dữ liệu**: mảng JSON mẫu ban đầu → Mock REST API → `localStorage`
- **Tính năng**: Landing Page (Hero, dịch vụ, bác sĩ, đánh giá, footer), luồng đặt lịch đa bước có validate, Admin Dashboard (metrics cards, data table tìm kiếm/lọc/cập nhật trạng thái)
- **Deploy**: GitHub Pages hoặc Vercel

Đặc tả đầy đủ nằm trong [docs/highland-hospital-spec.md](./docs/highland-hospital-spec.md).

## 📂 Cấu trúc thư mục

```
working-with/
├── GUIDE.md                 # Mô tả tổng quan khoá học (tiếng Anh)
├── PROJECT.md               # Curriculum chi tiết (tiếng Việt)
├── README.md                # File bạn đang đọc
├── PLAN.md                  # Kế hoạch & lộ trình chi tiết
├── course-lessons/
│   ├── en/                  # 64 bài học tiếng Anh (12 chương + module 13)
│   └── vi/                  # 64 bài học tiếng Việt (12 chương + module 13)
├── templates/               # Mẫu PROJECT_CONTEXT, prompt, component, prompt-kit Figma→Bootstrap
├── skills/                  # Quy trình tái sử dụng cho AI
├── agents/                  # Cấu hình agent review giao diện, logic
└── docs/                    # Coding standards, đặc tả Highland Hospital
```

## 🚀 Bắt đầu

1. Cài **VS Code** và extension **Live Server**.
2. Mở Chrome — dùng **DevTools** (Elements, Console, Network) làm bạn đồng hành.
3. Mở bài đầu tiên: [course-lessons/vi/01-welcome-and-ai-workflow/01-introduction.md](./course-lessons/vi/01-welcome-and-ai-workflow/01-introduction.md) — bản tiếng Anh nằm trong `course-lessons/en/`.
4. Mỗi bài: đọc mục tiêu → chạy prompt mẫu với AI → **đọc hiểu code** → làm bài thực hành.
5. Học theo thứ tự chương: mỗi chương giả định bạn đã làm chương trước.

## 💡 Cách học hiệu quả

- **Gõ lại code, đừng chỉ đọc** — mỗi bài có prompt mẫu và bài thực hành, hãy chạy thử ngay trên máy.
- **Tự làm trước 10 phút rồi mới hỏi AI** — khoảng cách giữa bản của bạn và bản AI sinh ra là bài học nhanh nhất.
- **Đọc từng dòng AI sinh ra** — nếu không giải thích được một dòng, đừng commit dòng đó.
- **Lưu prompt tốt** — bổ sung vào `templates/prompt-templates.md` để dùng lại.

## 🎓 Chuẩn đầu ra

- Viết HTML5 chuẩn ngữ nghĩa, CSS3 (Flexbox, Grid, Variables, Animations) và JavaScript ES6+ đúng quy chuẩn.
- Dựng giao diện Responsive chuyên nghiệp với Bootstrap 5 (Grid, Components, Utilities).
- Xử lý dữ liệu động: mảng/object, `localStorage`, Fetch API với Loading/Error state.
- Áp dụng AI-Accelerated Workflow để tăng tốc cắt giao diện 3–5 lần nhưng vẫn review được từng dòng code.
- Ship **Highland Hospital Web Portal** lên môi trường thật và trình bày được mọi quyết định kỹ thuật.

---

*Một phần trong bộ khoá học "Làm việc cùng AI" — các khoá chuyên biệt theo từng nghề.*
