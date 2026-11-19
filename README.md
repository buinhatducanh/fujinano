# FUJINANO - Premium Landing Page (Clone Repo)

Website giới thiệu giải pháp sơn sàn công nghiệp, sơn chống cháy kết cấu thép, sơn sân thể thao và chống thấm cao cấp ứng dụng công nghệ Nhật Bản của thương hiệu **FUJINANO**.

Clone & Reverse-Engineered từ: [https://fujinanc-landing-page.vercel.app/](https://fujinanc-landing-page.vercel.app/)

---

## 🚀 Công Nghệ Sử Dụng

- **Vite 6 / 8** (Build tool siêu nhanh)
- **React 19**
- **React Router 7** (SPA Routing với hỗ trợ Hash Navigation mượt mà)
- **Lucide React** (Bộ icon hiện đại)
- **Tailwind CSS + Custom CSS 3D Transforms** (Hiệu ứng Metallic Border, 3D Tilt Card, Parallax mouse tracking, Floating particles, Infinite marquee)

---

## 📁 Cấu Trúc Thư Mục

```text
├── public/                 # Tài nguyên tĩnh (ảnh slider, chứng nhận, logo SVG...)
│   ├── assets/             # Chứng nhận ISO, PCCC, giấy ủy quyền Jotun, KCC
│   ├── images/slider/      # Ảnh slider độ phân giải cao
│   └── favicon.svg         # Favicon thương hiệu FUJINANO
├── src/
│   ├── components/         # Các thành phần giao diện
│   │   ├── Logo.jsx                # Vector SVG logo chuẩn nhận diện thương hiệu
│   │   ├── Navbar.jsx              # Thanh điều hướng đa cấp, Mega menu dịch vụ, Mobile drawer
│   │   ├── HeroSlider.jsx          # Slider tương tác 3D Parallax, Mouse tracking, Progress bar
│   │   ├── AboutSection.jsx        # Giới thiệu công nghệ Nhật Bản & Thống kê
│   │   ├── ServicesSection.jsx     # Danh mục 6 dịch vụ chủ lực & Thẻ 3D tilt
│   │   ├── ServiceModal.jsx        # Modal chi tiết từng gói dịch vụ & hình ảnh thực tế
│   │   ├── ProjectsSection.jsx     # Công trình tiêu biểu đã hoàn thành
│   │   ├── BrandsSection.jsx       # Đối tác ủy quyền & Thống kê số lượng công trình
│   │   ├── ClientsSection.jsx      # Marquee khách hàng lớn (Samsung, LG, VinGroup...)
│   │   ├── CertificatesSection.jsx # Hồ sơ năng lực pháp lý & Lightbox zoom chứng nhận
│   │   ├── QuoteSection.jsx        # Form đăng ký báo giá 2h & Hệ thống chi nhánh 3 miền
│   │   ├── ScrollToTop.jsx         # Tự động cuộn theo anchor hash (#services, #quote...)
│   │   └── Footer.jsx              # Chân trang, thông tin doanh nghiệp, QR Code
│   ├── data/               # Dữ liệu tĩnh được module hóa sạch sẽ
│   │   ├── navigation.js           # Menu chính & Submenu
│   │   ├── heroSlider.js           # Nội dung 4 slide chính
│   │   ├── services.js             # Dữ liệu dịch vụ, highlights, gói thi công
│   │   ├── projects.js             # Dữ liệu các dự án lớn (Nội Bài, Vietjet,...)
│   │   ├── brands.js               # Hãng sơn đối tác & Chỉ số năng lực
│   │   ├── certificates.js         # Danh sách chứng chỉ ISO, PCCC, Jotun, KCC
│   │   ├── clients.js              # Logo khách hàng tiêu biểu
│   │   ├── branches.js             # Văn phòng đại diện Hà Nội, Đà Nẵng, TP.HCM
│   │   ├── news.js                 # Danh sách bài viết & nội dung cẩm nang
│   │   └── videos.js               # Video thực tế công trình
│   ├── pages/              # Các trang theo Routes
│   │   ├── Home.jsx                # Trang chủ (kết hợp các Section)
│   │   ├── ProjectDetail.jsx       # Chi tiết công trình (/du-an/:slug)
│   │   ├── NewsList.jsx            # Danh sách tin tức (/tin-tuc)
│   │   ├── NewsDetail.jsx          # Chi tiết bài viết (/tin-tuc/:slug)
│   │   ├── VideoList.jsx           # Danh sách video (/video)
│   │   └── VideoDetail.jsx         # Xem video chi tiết (/video/:slug)
│   ├── App.jsx             # Root layout, Routing & Global styles
│   ├── main.jsx            # Entry point
│   └── index.css           # Toàn bộ CSS Tailwind v4 + Custom Keyframes
├── dist/                   # Bản build production tối ưu (sẵn sàng deploy)
├── package.json
└── vite.config.js
```

---

## 🛠️ Hướng Dẫn Cài Đặt & Khởi Chạy

### 1. Cài đặt thư viện:
```bash
npm install
```

### 2. Chạy môi trường phát triển (Development):
```bash
npm run dev
```
Trình duyệt sẽ tự động mở trang web tại `http://localhost:3000`.

### 3. Build sản phẩm (Production):
```bash
npm run build
```
File hoàn thiện được sinh ra trong thư mục `dist/`.

### 4. Xem trước bản build:
```bash
npm run preview
```

---

## 📌 Các tính năng đã hoàn thiện 100%

1. **Header & Mega Menu**: Top bar thông tin liên hệ, Logo SVG tùy biến, Mega menu dịch vụ chuyên nghiệp với icon và màu nhận diện riêng biệt, Hotline nhấp nháy chuyển màu và Zalo quick-chat.
2. **Hero Slider 3D**: Theo dõi chuyển động chuột (Mouse Tracking 3D Tilt), hiệu ứng hạt nổi (Floating particles), thanh tiến trình hình tròn đếm giây, chuyển slide tự động sau 7 giây và chế độ xem trước thumbnail.
3. **Modal & Lightbox**:
   - Modal xem chi tiết dịch vụ khi click vào bất kỳ thẻ dịch vụ nào.
   - Lightbox phóng to các chứng chỉ kiểm định ISO 9001:2015, chứng nhận PCCC, ủy quyền Jotun, KCC.
4. **Trang chi tiết đầy đủ**:
   - `/du-an/:slug`: Banner lớn, phân tích thách thức, giải pháp, kết quả và ảnh thực tế.
   - `/tin-tuc/:slug`: Bài viết hướng dẫn kỹ thuật chi tiết với sidebar bài viết liên quan và danh mục.
   - `/video/:slug`: Giao diện trình phát video, thông số thời lượng và liên kết video liên quan.
5. **Form Báo Giá & Chi Nhánh**: Form nhập thông tin khách hàng kèm xác nhận tức thì, hiển thị địa chỉ chi nhánh tại TP.HCM, Đà Nẵng, Hà Nội, Cần Thơ.
