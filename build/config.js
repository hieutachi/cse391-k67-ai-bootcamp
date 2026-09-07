'use strict';
/**
 * config.js — dữ liệu khoá học cho bộ sinh site.
 * Muốn mở thêm chương nào: chuyển `published: false -> true` rồi chạy `node build/build.js`.
 */

const COURSE = {
  title: 'AI-Accelerated Frontend Developer Bootcamp',
  tagline: 'Học làm frontend hiện đại cùng AI — từ HTML5 tới dự án thật',
  subtitle: 'HTML5 • CSS3 • JavaScript ES6+ • Bootstrap 5',
  school: 'CSE391 — Nền tảng phát triển Web',
  cohort: 'K67',
  repo: 'https://github.com/ktzung/working-with-ai-course-for-frontend-dev',
  chapters: 13,
  lessons: 64,
  weeks: 8,
  project: 'Highland Hospital Web Portal',
};

/** 13 chương — tiêu đề & tóm tắt khớp PLAN.md của repo. */
const CHAPTERS = [
  {
    n: 1,
    dir: '01-welcome-and-ai-workflow',
    title: 'Chào mừng & AI-Accelerated Workflow',
    en: 'Welcome & the AI-Accelerated Workflow',
    summary: 'Bản đồ công cụ AI, quy trình 4 bước Define → Draft → Analyze → Refine, thiết lập môi trường và giới thiệu dự án Highland Hospital.',
    outcome: 'Môi trường chạy được bằng Live Server; viết được prompt có cấu trúc.',
    week: 1,
    lessons: 5,
    published: true,
    icon: 'compass',
  },
  {
    n: 2,
    dir: '02-prompt-engineering',
    title: 'Prompt Engineering cho Frontend',
    en: 'Prompt Engineering for Frontend',
    summary: 'Giải phẫu một prompt tốt, prompt cho HTML/CSS, cho JavaScript, cho debug và buổi workshop cắt giao diện bằng prompt.',
    outcome: 'Viết prompt đủ 5 thành phần, sửa lỗi theo vòng lặp nhỏ có kiểm soát.',
    week: 1,
    lessons: 5,
    published: false,
    icon: 'chat',
  },
  {
    n: 3,
    dir: '03-html5-semantic',
    title: 'HTML5 — Chuẩn ngữ nghĩa & Cấu trúc trang',
    en: 'HTML5 Semantic & Document Structure',
    summary: 'Cấu trúc tài liệu chuẩn, thẻ semantic & SEO, Forms và input hiện đại, bảng biểu, hình ảnh và SVG.',
    outcome: 'Dựng được Landing Page semantic: Hero + Services dàn layout thô.',
    week: 2,
    lessons: 5,
    published: false,
    icon: 'code',
  },
  {
    n: 4,
    dir: '04-css3-foundations',
    title: 'CSS3 — Nền tảng & Tư duy dàn trang',
    en: 'CSS3 Foundations',
    summary: 'Selectors và Specificity, Box Model, màu sắc — typography — CSS Variables, đơn vị đo tương đối.',
    outcome: 'Dựng Hero section chuẩn box model, dùng CSS Variables thay cho giá trị lặp lại.',
    week: 3,
    lessons: 5,
    published: false,
    icon: 'palette',
  },
  {
    n: 5,
    dir: '05-css-layout',
    title: 'CSS Layout — Flexbox & Grid',
    en: 'CSS Layout — Flexbox & Grid',
    summary: 'Flexbox căn bản và nâng cao, CSS Grid, cách chọn đúng công cụ cho từng loại layout.',
    outcome: 'Lưới Doctor Cards hoàn chỉnh; thanh nav dàn bằng flex trong vài dòng CSS.',
    week: 3,
    lessons: 5,
    published: false,
    icon: 'layout',
  },
  {
    n: 6,
    dir: '06-responsive-and-animation',
    title: 'Responsive Web Design & Animation',
    en: 'Responsive Design & Animation',
    summary: 'Media Queries và breakpoints, Mobile-First workflow, hình ảnh — typography linh hoạt, Transitions & Keyframes.',
    outcome: 'Trang chủ responsive tốt trên mobile / tablet / desktop, có chuyển động tinh tế.',
    week: 4,
    lessons: 5,
    published: false,
    icon: 'device',
  },
  {
    n: 7,
    dir: '07-bootstrap-grid-and-utilities',
    title: 'Bootstrap 5 — Grid & Utilities',
    en: 'Bootstrap 5 — Grid & Utilities',
    summary: 'Cài đặt Bootstrap qua CDN, hệ thống 12 cột, utility Spacing/Colors/Typography, Buttons/Badges/Alerts.',
    outcome: 'Dựng lại Services section bằng Bootstrap, không viết CSS thừa.',
    week: 5,
    lessons: 5,
    published: false,
    icon: 'grid',
  },
  {
    n: 8,
    dir: '08-bootstrap-components',
    title: 'Bootstrap 5 — Components',
    en: 'Bootstrap 5 — Components',
    summary: 'Navbar responsive có hamburger, Cards & List group, Forms & Validation, Modal/Offcanvas/Accordion.',
    outcome: 'FAQ + form đặt lịch tĩnh hoàn chỉnh bằng component có sẵn.',
    week: 5,
    lessons: 5,
    published: false,
    icon: 'blocks',
  },
  {
    n: 9,
    dir: '09-javascript-basics',
    title: 'JavaScript ES6+ — Cú pháp & Dữ liệu',
    en: 'JavaScript ES6+ Syntax & Data',
    summary: 'let/const, Template Literals, Arrow functions, Destructuring, Array Methods cốt lõi, Object & JSON.',
    outcome: 'Render danh sách bác sĩ từ mảng dữ liệu bằng map/filter.',
    week: 6,
    lessons: 5,
    published: false,
    icon: 'brackets',
  },
  {
    n: 10,
    dir: '10-dom-and-events',
    title: 'DOM & Event Handling',
    en: 'DOM & Event Handling',
    summary: 'Truy vấn và thao tác DOM, sự kiện & delegation, form validation phía client, localStorage.',
    outcome: 'Bộ lọc bác sĩ theo chuyên khoa chạy được, lưu lịch hẹn vào localStorage.',
    week: 6,
    lessons: 5,
    published: false,
    icon: 'cursor',
  },
  {
    n: 11,
    dir: '11-async-javascript',
    title: 'Async JavaScript & API',
    en: 'Async JavaScript & Fetch API',
    summary: 'Fetch API / Async-Await, mock REST API, trạng thái Loading & Error, luồng đặt lịch đa bước.',
    outcome: 'Luồng đặt lịch đa bước hoàn chỉnh có validate và gọi API giả lập.',
    week: 7,
    lessons: 5,
    published: false,
    icon: 'cloud',
  },
  {
    n: 12,
    dir: '12-highland-hospital-project',
    title: 'Dự án Highland Hospital & Component Thinking',
    en: 'The Highland Hospital Project',
    summary: 'Tổng quan dự án và đọc Figma, dựng Landing Page, tương tác JavaScript, Admin Dashboard, tối ưu hiệu năng và deploy.',
    outcome: 'Ship Highland Hospital lên GitHub Pages / Vercel và trình bày được mọi quyết định kỹ thuật.',
    week: 8,
    lessons: 6,
    published: false,
    icon: 'rocket',
  },
  {
    n: 13,
    dir: '13-bonus-prompt-engineering-frontend',
    title: 'Module bổ trợ — Prompt Engineering cho Frontend',
    en: 'Bonus — Prompt Engineering for Frontend Devs',
    summary: 'Bộ prompt mẫu chuẩn: phân tích thiết kế Figma, sinh code Bootstrap 5 từ đặc tả, lab Figma → Bootstrap.',
    outcome: 'Chạy trọn một phiên cắt giao diện Figma → Bootstrap bằng prompt chuẩn.',
    week: 0,
    lessons: 3,
    published: false,
    icon: 'sparkle',
  },
];

/** Quy trình 4 bước — hiển thị ở trang chủ và trong mỗi bài học. */
const WORKFLOW = [
  { key: 'define', vi: 'Phân tích yêu cầu', en: 'Define', text: 'Đọc thiết kế Figma hoặc mô tả, bóc tách cấu trúc khối, liệt kê component và trạng thái tương tác. Viết ra 3–5 câu đặc tả trước khi đụng đến AI.' },
  { key: 'draft', vi: 'Soạn thảo với AI', en: 'Draft', text: 'Viết prompt chính xác từ đặc tả: bối cảnh dự án, ràng buộc công nghệ, giá trị thiết kế và định dạng đầu ra. Nhận bản nháp HTML/CSS/JS.' },
  { key: 'analyze', vi: 'Phân tích & thấu hiểu', en: 'Analyze', text: 'Đọc từng dòng code và trả lời: vì sao dùng thẻ/class này, layout vận hành thế nào, luồng dữ liệu và sự kiện ra sao. Không giải thích được thì không giữ.' },
  { key: 'refine', vi: 'Tinh chỉnh & tối ưu', en: 'Refine', text: 'Chỉnh breakpoint, sửa lỗi hiển thị, chuẩn hoá class theo Bootstrap utilities, tách hàm tái sử dụng. Kiểm tra nhiều cỡ màn hình rồi mới coi là xong.' },
];

const AUDIENCE = [
  { title: 'Người mới bắt đầu', text: 'Chưa từng lập trình hoặc muốn học bài bản từ nền tảng cốt lõi của Web (HTML/CSS/JS), có AI kèm cặp từng bước.' },
  { title: 'Sinh viên CNTT', text: 'Củng cố tư duy dàn trang, DOM, Event Loop, Async/Await và Responsive trước khi bước lên framework.' },
  { title: 'Dev muốn tăng tốc với AI', text: 'Rèn kỹ năng giao tiếp với AI để cắt giao diện Figma thành mã nguồn thật nhanh gấp 3–5 lần.' },
];

const TIPS = [
  { title: 'Gõ lại code, đừng chỉ đọc', text: 'Mỗi bài có prompt mẫu và phần thực hành — chạy thử ngay trên máy của bạn, đó mới là phần tạo ra kỹ năng.' },
  { title: 'Tự làm trước 10 phút rồi mới hỏi AI', text: 'Khoảng cách giữa bản bạn viết và bản AI sinh ra là bài học nhanh nhất bạn nhận được.' },
  { title: 'Đọc từng dòng AI sinh ra', text: 'Nếu không giải thích được một dòng, đừng commit dòng đó. Bước Analyze quyết định chất lượng.' },
  { title: 'Lưu lại prompt tốt', text: 'Prompt nào cho kết quả dùng được ngay thì ghi lại và tái sử dụng — đó là tài sản nghề nghiệp của bạn.' },
];

const ROADMAP = [
  { week: 1, label: 'Tuần 1', chapters: [1, 2], text: 'Môi trường chạy được (Live Server), viết được prompt có cấu trúc.' },
  { week: 2, label: 'Tuần 2', chapters: [3], text: 'Trang HTML semantic đầu tiên: Hero + Services dàn layout thô.' },
  { week: 3, label: 'Tuần 3', chapters: [4, 5], text: 'Hero dùng Flexbox/Grid, lưới Doctor Cards hoàn chỉnh.' },
  { week: 4, label: 'Tuần 4', chapters: [6], text: 'Trang chủ responsive trên mobile / tablet / desktop.' },
  { week: 5, label: 'Tuần 5', chapters: [7, 8], text: 'Dựng lại toàn bộ Landing Page bằng Bootstrap 5.' },
  { week: 6, label: 'Tuần 6', chapters: [9, 10], text: 'Render bác sĩ từ dữ liệu, bộ lọc chuyên khoa chạy được.' },
  { week: 7, label: 'Tuần 7', chapters: [11], text: 'Luồng đặt lịch đa bước + validate hoàn chỉnh.' },
  { week: 8, label: 'Tuần 8', chapters: [12], text: 'Admin Dashboard + deploy Highland Hospital lên GitHub Pages / Vercel.' },
];

/**
 * 5 BUỔI HỌC ĐẦU TIÊN (Chương 1) — metadata, thuật ngữ và quiz tự chấm.
 * Nội dung từng buổi được đọc trực tiếp từ file markdown tương ứng trong repo.
 */
const SESSIONS = [
  {
    n: 1,
    chapter: 1,
    file: 'course-lessons/vi/01-welcome-and-ai-workflow/01-introduction.md',
    url: 'lessons/buoi-01.html',
    en: 'Welcome — why Frontend needs AI',
    minutes: 45,
    readMinutes: 8,
    kind: 'Lý thuyết + định hướng',
    summary:
      'Nghề frontend gồm hai việc rất khác nhau: phán đoán và sản xuất. AI đang cực giỏi ở việc thứ hai. Bài mở màn xác lập ranh giới "bạn giữ — AI làm" và cho bạn thấy mình sẽ xây gì.',
    highlight: 'Bạn giữ phần phán đoán, giao đi càng nhiều phần sản xuất càng tốt — miễn là kiểm tra lại được nhanh.',
    terms: [
      { en: 'Frontend', vi: 'Giao diện phía client', def: 'Phần website chạy trong trình duyệt mà người dùng trực tiếp tương tác: HTML, CSS, JavaScript.' },
      { en: 'Semantic HTML', vi: 'HTML ngữ nghĩa', def: 'Dùng đúng thẻ theo ý nghĩa nội dung (<nav>, <article>) thay vì đổ mọi thứ vào <div>.' },
      { en: 'Accessibility (a11y)', vi: 'Khả năng tiếp cận', def: 'Để người dùng bàn phím và trình đọc màn hình vẫn dùng được trang web.' },
      { en: 'Technical debt', vi: 'Nợ kỹ thuật', def: 'Code bạn giữ mà không giải thích được — thứ phải trả giá ở lần sửa sau.' },
      { en: 'Responsive', vi: 'Thiết kế thích ứng', def: 'Giao diện tự sắp xếp đẹp ở mọi cỡ màn hình, từ 320px tới desktop.' },
    ],
    quiz: [
      {
        q: 'Theo bài học, hai hoạt động cốt lõi của nghề frontend là gì?',
        options: [
          'Lập trình và thiết kế đồ hoạ',
          'Phán đoán (quyết định trải nghiệm) và sản xuất (gõ ra markup, class, hàm xử lý sự kiện)',
          'Viết HTML và viết CSS',
          'Họp với khách hàng và commit code',
        ],
        a: 1,
        why: 'AI rất giỏi phần sản xuất, còn phần phán đoán chỉ ở mức tư vấn. Ranh giới đó chính là ý tưởng của cả khoá học.',
      },
      {
        q: 'Đâu là việc AI KHÔNG làm thay bạn?',
        options: [
          'Sinh khung HTML cho một tấm card dịch vụ',
          'Đưa ra vài nguyên nhân khả dĩ khi bạn dán đoạn CSS bị lỗi',
          'Biết người dùng thật sự cần gì và nhìn thấy trang đã render trong trình duyệt',
          'Viết lại hàm xử lý sự kiện theo yêu cầu',
        ],
        a: 2,
        why: 'AI suy luận trên code chứ không suy luận trên kết quả hiển thị. Người mở trình duyệt vẫn là bạn.',
      },
      {
        q: 'Dự án xuyên suốt của khoá học là gì?',
        options: [
          'Blog cá nhân viết bằng React',
          'Highland Hospital Web Portal: Landing Page, luồng đặt lịch đa bước, Admin Dashboard',
          'Trang quản lý bán hàng dùng PHP + MySQL',
          'Ứng dụng di động React Native',
        ],
        a: 1,
        why: 'Dự án cố ý chỉ có frontend — không server, không database — nhưng vẫn đủ phức tạp thật để dùng hết những gì đã học.',
      },
      {
        q: 'Thói quen học nào được bài này khuyến nghị?',
        options: [
          'Đọc hết lý thuyết rồi mới bật máy',
          'Copy toàn bộ code AI sinh ra rồi commit cho nhanh',
          'Tự làm trước khoảng 10 phút rồi mới hỏi AI, và đọc hiểu từng dòng code',
          'Học thuộc toàn bộ thẻ HTML trước khi thực hành',
        ],
        a: 2,
        why: 'Khoảng cách giữa bản bạn tự làm và bản AI sinh ra là bài học nhanh nhất bạn nhận được.',
      },
    ],
  },
  {
    n: 2,
    chapter: 1,
    file: 'course-lessons/vi/01-welcome-and-ai-workflow/02-ai-tools-for-frontend.md',
    url: 'lessons/buoi-02.html',
    en: 'The AI tool landscape for Frontend',
    minutes: 40,
    readMinutes: 7,
    kind: 'Lý thuyết + chọn công cụ',
    summary:
      'Bốn nhóm công cụ AI mà frontend developer dùng hằng ngày — chat tổng quát, AI trong editor, design-to-code và AI tìm kiếm — cùng bộ công cụ tối thiểu cho cả khoá.',
    highlight: 'Coi output design-to-code là bản phác thảo để phân tích, không bao giờ là code cuối cùng.',
    terms: [
      { en: 'LLM (Large Language Model)', vi: 'Mô hình ngôn ngữ lớn', def: 'Nền tảng của Gemini, Claude, ChatGPT — sinh văn bản và code theo ngữ cảnh bạn đưa.' },
      { en: 'In-editor AI', vi: 'AI trong editor', def: 'Công cụ gợi ý code ngay trong file bạn đang mở: GitHub Copilot, Cursor.' },
      { en: 'Design-to-code', vi: 'Chuyển thiết kế thành code', def: 'Nhận một frame Figma và trả về HTML/CSS tương ứng.' },
      { en: 'DevTools', vi: 'Công cụ nhà phát triển', def: 'Bảng điều khiển của trình duyệt: Elements, Console, Network, Device Toolbar.' },
      { en: 'Code completion', vi: 'Gợi ý code', def: 'AI đoán và chèn phần code tiếp theo khi bạn gõ hoặc viết chú thích.' },
    ],
    quiz: [
      {
        q: 'Bốn nhóm công cụ AI được nêu trong bài là?',
        options: [
          'Gemini, Claude, ChatGPT, Copilot',
          'HTML, CSS, JavaScript, Bootstrap',
          'Chat tổng quát; AI trong editor; Design-to-code; AI tìm kiếm / đọc tài liệu',
          'Figma, Sketch, Adobe XD, Canva',
        ],
        a: 2,
        why: 'Bốn nhóm tương ứng bốn loại việc: bàn phương án, tăng tốc sản xuất, phác thảo từ thiết kế, và tra cứu có nguồn.',
      },
      {
        q: 'Theo quy tắc của khoá học, output từ công cụ design-to-code nên được coi là gì?',
        options: [
          'Code cuối cùng, chỉ cần thay ảnh',
          'Bản phác thảo để phân tích — gần như luôn cần sửa tên class, token màu, trạng thái hover/focus',
          'Một bản thiết kế mới',
          'Tài liệu SEO',
        ],
        a: 1,
        why: 'Bản nháp thường lệch chuẩn đặt tên của bạn, lấy sai màu và thiếu trạng thái tương tác.',
      },
      {
        q: 'Bộ công cụ TỐI THIỂU của khoá học gồm những gì?',
        options: [
          'GitHub Copilot + Cursor + Figma trả phí',
          'Một máy chủ riêng và một database',
          'Visual Studio, IIS và SQL Server',
          'Một chat AI (bản miễn phí là đủ), VS Code kèm Live Server, và Chrome DevTools',
        ],
        a: 3,
        why: 'Bạn không cần mua gì. Copilot hay Cursor là điểm cộng, không bắt buộc — mọi bài làm được với chat + trình duyệt.',
      },
      {
        q: 'Vì sao nên ưu tiên câu trả lời AI có trích nguồn (MDN, caniuse, tài liệu chính thức)?',
        options: [
          'Để câu trả lời dài và đáng tin hơn về mặt hình thức',
          'Để tránh bẫy "trả lời tự tin nhưng sai" với API mới hoặc chi tiết hỗ trợ trình duyệt',
          'Vì chat tổng quát không thể trích nguồn',
          'Vì nguồn giúp câu trả lời ngắn hơn',
        ],
        a: 1,
        why: 'AI chat có lúc sai mà vẫn rất tự tin — đặc biệt với API mới và mức hỗ trợ trình duyệt. Nguồn giúp bạn kiểm chứng.',
      },
    ],
  },
  {
    n: 3,
    chapter: 1,
    file: 'course-lessons/vi/01-welcome-and-ai-workflow/03-ai-accelerated-workflow.md',
    url: 'lessons/buoi-03.html',
    en: 'The 4-step AI-Accelerated Workflow',
    minutes: 50,
    readMinutes: 7,
    kind: 'Lý thuyết + áp dụng thử',
    summary:
      'Vòng lặp Define → Draft → Analyze → Refine được dùng cho mọi bài của khoá học. Bài này chỉ rõ vì sao bước 3 mới là bước quyết định chất lượng.',
    highlight: 'Nếu bạn không giải thích được một dòng code, đừng giữ dòng đó.',
    terms: [
      { en: 'Prompt', vi: 'Câu lệnh gửi cho AI', def: 'Mô tả bằng lời nhiệm vụ bạn đưa cho AI, kèm bối cảnh và ràng buộc.' },
      { en: 'Spec', vi: 'Đặc tả', def: 'Bản mô tả yêu cầu (layout, component, trạng thái) viết ra trước khi đụng đến AI.' },
      { en: 'Draft', vi: 'Bản nháp', def: 'Kết quả AI trả về ở bước Draft — chưa phải code cuối cùng.' },
      { en: 'Refactor', vi: 'Tái cấu trúc', def: 'Sửa code cho dễ đọc, dễ bảo trì mà không đổi hành vi.' },
      { en: 'Breakpoint', vi: 'Điểm dừng responsive', def: 'Bề rộng màn hình tại đó layout đổi (576 / 768 / 992 / 1200 / 1400px trong Bootstrap).' },
    ],
    quiz: [
      {
        q: 'Thứ tự đúng của AI-Accelerated Workflow là?',
        options: [
          'Draft → Define → Refine → Analyze',
          'Analyze → Define → Draft → Refine',
          'Define → Draft → Analyze → Refine',
          'Define → Analyze → Draft → Refine',
        ],
        a: 2,
        why: 'Đặc tả trước, dựng nháp bằng AI, đọc hiểu từng dòng, rồi tinh chỉnh — vòng lặp này lặp lại ở mọi bài.',
      },
      {
        q: 'Vì sao bước Analyze (phân tích & thấu hiểu) được coi là quan trọng nhất?',
        options: [
          'Vì nó là bước nhanh nhất',
          'Vì người phải bảo trì code là bạn: đoạn code bạn không hiểu là nợ kỹ thuật ngay ngày hôm sau',
          'Vì AI không thể viết code',
          'Vì bước này cho phép bỏ qua bước Refine',
        ],
        a: 1,
        why: 'Hiểu từng dòng còn khiến prompt lần sau sắc hơn, vì bạn biết chính xác mình cần gì.',
      },
      {
        q: 'Bản nháp HTML/CSS/JS mà AI trả về ở bước Draft là gì?',
        options: [
          'Code hoàn chỉnh, commit được ngay',
          'Tài liệu thiết kế Figma',
          'Báo cáo lỗi của trình duyệt',
          'Chưa phải code — là tài liệu để bạn học và sửa',
        ],
        a: 3,
        why: 'Bài học nói rất thẳng: bản nháp chưa phải code, nó là material để bạn hiểu rồi chỉnh.',
      },
      {
        q: 'Ở bước Define, bài học khuyên bạn làm gì trước khi dùng AI?',
        options: [
          'Viết ra 3–5 câu đặc tả: vùng nào là Box Model gì, hàng nào Flexbox, khu nào Grid',
          'Gõ lại toàn bộ thiết kế bằng HTML',
          'Chờ AI hỏi lại bạn cần gì',
          'Chọn màu và font cho đẹp trước',
        ],
        a: 0,
        why: 'Đặc tả ngắn và cụ thể là nguyên liệu của một prompt tốt — thiếu nó, AI sẽ tự bịa.',
      },
    ],
  },
  {
    n: 4,
    chapter: 1,
    file: 'course-lessons/vi/01-welcome-and-ai-workflow/04-setting-up-your-workspace.md',
    url: 'lessons/buoi-04.html',
    en: 'Setting up your workspace',
    minutes: 45,
    readMinutes: 6,
    kind: 'Thực hành cài đặt',
    summary:
      'Cài VS Code cùng Live Server, tạo cấu trúc thư mục chuẩn cho Highland Hospital và làm quen bốn tab Chrome DevTools bạn sẽ dùng trong mọi bài sau.',
    highlight: 'Đừng mở file HTML bằng double-click khi học tới Fetch API — giao thức file:// sẽ chặn gọi API.',
    terms: [
      { en: 'Live Server', vi: 'Máy chủ cục bộ khi dev', def: 'Extension VS Code chạy HTTP server tại chỗ và tự tải lại trình duyệt khi bạn lưu file.' },
      { en: 'localhost', vi: 'Máy chủ cục bộ', def: 'Địa chỉ ngay trên máy bạn, ví dụ http://127.0.0.1:5500.' },
      { en: 'file:// protocol', vi: 'Giao thức file', def: 'Cách mở thẳng file trên đĩa; bị trình duyệt chặn khi gọi API.' },
      { en: 'Viewport', vi: 'Vùng hiển thị', def: 'Phần trang web nhìn thấy được trên màn hình; khai báo bằng <meta name="viewport">.' },
      { en: 'Console', vi: 'Bảng điều khiển', def: 'Nơi in lỗi JavaScript và kết quả console.log để thử lệnh trực tiếp.' },
    ],
    quiz: [
      {
        q: 'Vì sao KHÔNG nên mở file HTML bằng double-click (file://) khi học tới Fetch API?',
        options: [
          'Vì trình duyệt không hiển thị được CSS khi mở bằng file://',
          'Vì giao thức file:// chặn gọi API; Live Server chạy HTTP cục bộ nên gọi API mới hoạt động',
          'Vì cách đó làm hỏng file HTML',
          'Vì VS Code không hỗ trợ mở file bằng double-click',
        ],
        a: 1,
        why: 'Bài 04 nói rõ: Live Server giải quyết vấn đề này ngay từ đầu, tới chương 11 bạn sẽ thấy rõ lý do.',
      },
      {
        q: 'Live Server làm một việc rất quan trọng là gì?',
        options: [
          'Tự động commit code lên GitHub',
          'Tối ưu dung lượng ảnh',
          'Chạy một máy chủ nhỏ trên máy bạn và tự tải lại trình duyệt mỗi khi bạn lưu file',
          'Biên dịch Sass thành CSS',
        ],
        a: 2,
        why: 'Vòng lặp "sửa — lưu — thấy kết quả" nhanh chính là thứ khiến bạn học được nhiều hơn mỗi buổi.',
      },
      {
        q: 'Tab DevTools nào cho biết trình duyệt đang chạy request API nào?',
        options: ['Elements', 'Console', 'Sources', 'Network'],
        a: 3,
        why: 'Network liệt kê mọi file và request API — bạn sẽ mở tab này rất thường xuyên ở chương 11.',
      },
      {
        q: 'Trong cấu trúc thư mục chuẩn của dự án, dữ liệu mẫu bác sĩ nằm ở đâu?',
        options: ['css/data.css', 'js/data.js', 'assets/data.json', 'docs/data.md'],
        a: 1,
        why: 'js/data.js chứa mảng bác sĩ, dịch vụ; js/main.js và js/admin.js giữ logic của từng trang.',
      },
    ],
  },
  {
    n: 5,
    chapter: 1,
    file: 'course-lessons/vi/01-welcome-and-ai-workflow/05-the-main-project-highland-hospital.md',
    url: 'lessons/buoi-05.html',
    en: 'The main project: Highland Hospital',
    minutes: 50,
    readMinutes: 7,
    kind: 'Tổng quan dự án + khởi động',
    summary:
      'Ba trang bạn sẽ xây (Landing Page, đặt lịch, Admin Dashboard), bộ dữ liệu dùng chung và bảng phân công "chương nào làm phần nào" của dự án Highland Hospital.',
    highlight: 'Mọi chương đều góp phần vào một ứng dụng duy nhất — đó là lý do bạn không học lý thuyết rời rạc.',
    terms: [
      { en: 'Landing page', vi: 'Trang chủ giới thiệu', def: 'Trang chính của website: hero, dịch vụ, bác sĩ, đánh giá, footer.' },
      { en: 'Dashboard', vi: 'Bảng điều khiển', def: 'Trang quản trị có thẻ số liệu (metrics) và bảng dữ liệu để tìm kiếm, lọc, cập nhật.' },
      { en: 'JSON', vi: 'Định dạng dữ liệu', def: 'Cách mô tả object/mảng để trao đổi dữ liệu giữa code và API.' },
      { en: 'Mock API', vi: 'API giả lập', def: 'Nguồn dữ liệu giả để thử luồng gọi API như hệ thống thật.' },
      { en: 'localStorage', vi: 'Lưu trữ cục bộ', def: 'Lưu dữ liệu ngay trong trình duyệt theo từng origin, không cần server.' },
    ],
    quiz: [
      {
        q: 'Ba trang của dự án tương ứng với ba file nào?',
        options: [
          'index.html, booking.html, admin.html',
          'home.html, form.html, dashboard.html',
          'index.php, booking.php, admin.php',
          'main.html, doctors.html, login.html',
        ],
        a: 0,
        why: 'Landing Page ở index.html, luồng đặt lịch ở booking.html, bảng quản lý lịch hẹn ở admin.html.',
      },
      {
        q: 'Bốn trạng thái lịch hẹn dùng xuyên suốt dự án là?',
        options: [
          'open / pending / closed / archived',
          'chờ xác nhận, đã xác nhận, đã hoàn thành, đã huỷ',
          'mới, đang khám, xong, huỷ',
          '1 / 2 / 3 / 4',
        ],
        a: 1,
        why: 'Trạng thái này quyết định badge màu trên Admin Dashboard và nội dung email xác nhận ở luồng đặt lịch.',
      },
      {
        q: 'Chương 9–10 đóng góp phần nào cho dự án?',
        options: [
          'Dựng lại Landing Page bằng Bootstrap',
          'Deploy website lên GitHub Pages',
          'Render danh sách bác sĩ từ dữ liệu, bộ lọc chuyên khoa, lưu lịch hẹn',
          'Phân tích thiết kế Figma',
        ],
        a: 2,
        why: 'Chương 9–10 biến trang tĩnh thành trang động: dữ liệu → DOM → sự kiện → localStorage.',
      },
      {
        q: 'Ở chương 10–11, mảng appointments chuyển từ bộ nhớ sang đâu?',
        options: [
          'Cookie và sessionStorage',
          'localStorage và mock API',
          'Database MySQL trên server',
          'Một file Excel chia sẻ',
        ],
        a: 1,
        why: 'Đó là cách mô phỏng vòng đời dữ liệu thật mà vẫn không cần backend.',
      },
    ],
  },
];

/** Bộ công cụ khuyến nghị (đều miễn phí hoặc có bản miễn phí). */
const TOOLS = [
  { name: 'VS Code + Live Server', role: 'Editor và máy chủ xem trước', note: 'Phím tắt: Ctrl+Shift+P → "Open with Live Server".' },
  { name: 'Chrome DevTools', role: 'Kiểm tra DOM, Console, Network', note: 'F12 · Ctrl+Shift+C để chọn nhanh một phần tử.' },
  { name: 'Gemini / Claude / ChatGPT', role: 'Chat tổng quát: bàn phương án, giải thích code', note: 'Bản miễn phí đủ dùng cho toàn bộ chương 1–6.' },
  { name: 'Bootstrap 5 (CDN)', role: 'Grid, component, utility', note: 'Không phải tải file — nhúng trực tiếp qua CDN.' },
  { name: 'Figma (Design-to-code)', role: 'Đọc thiết kế, bóc cấu trúc và design token', note: 'Dùng ở chương 7 để phân tích một layout thật.' },
  { name: 'Netlify Drop / Vercel', role: 'Deploy thử nhận xét trực quan', note: 'Kéo thả thư mục dự án lên là có URL chia sẻ.' },
];

/** Câu hỏi thường gặp hiển thị ở trang Giới thiệu. */
const FAQ = [
  {
    q: 'Tôi chưa biết gì về lập trình, học được không?',
    a: 'Được. Điều kiện tiên quyết duy nhất là biết dùng máy tính và gõ phím. Chương 1 và 2 xây nền trước, HTML bắt đầu từ số không ở chương 3.',
  },
  {
    q: 'Có bắt buộc phải trả phí công cụ AI không?',
    a: 'Không. Bản miễn phí của Gemini, ChatGPT hoặc Claude đủ cho 5 buổi đầu và phần lớn khoá. Copilot hay Cursor là điểm cộng, không bắt buộc.',
  },
  {
    q: 'Tôi có cần biết React hay framework không?',
    a: 'Không. Mọi thứ được xây bằng HTML, CSS, JavaScript thuần và Bootstrap 5. Phải tới chương 12 bạn mới làm quen tư duy component và lý do tồn tại của framework.',
  },
  {
    q: 'Vì sao trang này chỉ có 5 buổi học?',
    a: 'Website phát hành theo tiến độ lớp. Năm buổi đầu (toàn bộ Chương 1) đã đầy đủ; chương trình 12 chương / 64 bài được hiển thị trong trang Lộ trình và sẽ mở dần.',
  },
  {
    q: 'Mỗi buổi mất bao lâu?',
    a: 'Khoảng 45–60 phút đọc và làm theo trong buổi, cộng 30–60 phút thực hành ở nhà. Bài nào cũng có checklist để bạn tự kiểm tra.',
  },
  {
    q: 'Tiến độ học của tôi được lưu ở đâu?',
    a: 'Ngay trên trình duyệt của bạn (localStorage). Không có tài khoản, không có server, không có dữ liệu nào được gửi đi.',
  },
];

/** Thuật ngữ bổ sung cho trang Từ điển (vượt ra ngoài 5 buổi đầu). */
const EXTRA_TERMS = [
  { en: 'Box model', vi: 'Mô hình hộp', def: 'Cách trình duyệt đóng gói mọi phần tử: content → padding → border → margin.', chapter: 4 },
  { en: 'Flexbox', vi: 'Layout một trục', def: 'Model dàn xếp phần tử theo một hàng hoặc một cột, căn chỉnh và chia khoảng cách.', chapter: 5 },
  { en: 'CSS Grid', vi: 'Layout hai trục', def: 'Hệ thống hàng và cột cho layout phức tạp của cả trang.', chapter: 5 },
  { en: 'Media query', vi: 'Truy vấn phương tiện', def: 'Áp dụng CSS theo điều kiện màn hình, ví dụ (max-width: 767.98px).', chapter: 6 },
  { en: 'Specificity', vi: 'Độ đặc hiệu', def: 'Quy tắc quyết định selector nào thắng khi hai luật xung đột.', chapter: 4 },
  { en: 'CSS custom property', vi: 'Biến CSS', def: 'Giá trị đặt tên kiểu --color-mint-500, nền tảng của design token.', chapter: 4 },
  { en: 'rem / em', vi: 'Đơn vị tương đối', def: 'rem neo theo cỡ gốc, em neo theo cỡ chữ của phần tử — ưu tiên hơn px.', chapter: 4 },
  { en: 'Pseudo-class', vi: 'Lớp giả', def: ':hover, :focus, :active, :first-child — chọn trạng thái của phần tử.', chapter: 4 },
  { en: 'Transition / Keyframes', vi: 'Chuyển động', def: 'transition cho phản hồi nhỏ, @keyframes cho chuyển động có chủ ý.', chapter: 6 },
  { en: 'Navbar / Offcanvas', vi: 'Thanh điều hướng', def: 'Component điều hướng của Bootstrap; Offcanvas là menu trượt trên mobile.', chapter: 7 },
  { en: 'Modal', vi: 'Hộp thoại', def: 'Lớp phủ chiếm sự chú ý, đóng bằng Escape và aria-label theo bài 08.', chapter: 8 },
  { en: 'Accordion', vi: 'Bảng xếp tầng', def: 'Nội dung đóng/mở theo từng mục, dùng cho FAQ.', chapter: 8 },
  { en: 'Bootstrap grid', vi: 'Hệ thống cột Bootstrap', def: '12 cột với breakpoint sm / md / lg / xl / xxl.', chapter: 7 },
  { en: 'Arrow function', vi: 'Hàm mũi tên', def: 'Cú pháp rút gọn (a, b) => a + b, phổ biến trong callback.', chapter: 10 },
  { en: 'Template literal', vi: 'Chuỗi mẫu', def: 'Chuỗi trong cặp backtick cho phép nhúng biến và xuống dòng.', chapter: 10 },
  { en: 'Array methods', vi: 'Hàm mảng', def: 'map / filter / reduce — cách hiện đại thay cho vòng for thủ công.', chapter: 10 },
  { en: 'Event delegation', vi: 'Ủy quyền sự kiện', def: 'Gắn một listener trên phần tử cha để xử lý nhiều phần tử con.', chapter: 10 },
  { en: 'preventDefault', vi: 'Chặn hành vi mặc định', def: 'Ngăn form tự submit hoặc link tự điều hướng.', chapter: 10 },
  { en: 'Fetch API', vi: 'Gọi API', def: 'Cách chuẩn để trình duyệt xin dữ liệu: fetch(url).then(r => r.json()).', chapter: 11 },
  { en: 'Async / await', vi: 'Bất đồng bộ', def: 'Cú pháp giúp code gọi API đọc như code tuần tự.', chapter: 11 },
  { en: 'Loading state', vi: 'Trạng thái đang tải', def: 'Skeleton hoặc spinner cho người dùng biết dữ liệu chưa về.', chapter: 11 },
  { en: 'CRUD', vi: 'Create / Read / Update / Delete', def: 'Bốn thao tác dữ liệu cơ bản — Admin Dashboard làm Read + Update.', chapter: 12 },
  { en: 'Deployment', vi: 'Phát hành', def: 'Đưa website lên internet: GitHub Pages, Netlify, Vercel.', chapter: 12 },
  { en: 'Design token', vi: 'Token thiết kế', def: 'Bảng biến màu, font, khoảng cách trích từ thiết kế để code đồng nhất.', chapter: 7 },
];

module.exports = {
  COURSE,
  CHAPTERS,
  SESSIONS,
  WORKFLOW,
  AUDIENCE,
  TIPS,
  ROADMAP,
  TOOLS,
  FAQ,
  EXTRA_TERMS,
};






