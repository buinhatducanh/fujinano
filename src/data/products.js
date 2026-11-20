// Danh mục sản phẩm thùng sơn FUJINANO chuẩn e-commerce
export const categories = [
  {
    id: "epoxy",
    name: "Sơn Epoxy Sàn",
    icon: "Layers",
    img: "/images/products/fn-epoxy-18l.jpg",
    count: 24,
  },
  {
    id: "chong-tham",
    name: "Sơn Chống Thấm",
    icon: "Droplets",
    img: "/images/products/fn-waterproof-18l.jpg",
    count: 18,
  },
  {
    id: "chong-chay",
    name: "Sơn Chống Cháy",
    icon: "ShieldAlert",
    img: "/images/products/fn-fireproof-20kg.jpg",
    count: 12,
  },
  {
    id: "the-thao",
    name: "Sân Thể Thao",
    icon: "Award",
    img: "/images/products/fn-sports-18l.jpg",
    count: 15,
  },
  {
    id: "giao-thong",
    name: "Sơn Giao Thông",
    icon: "Construction",
    img: "/images/products/fn-traffic-20kg.jpg",
    count: 9,
  },
  {
    id: "son-lot",
    name: "Sơn Lót Kháng Kiềm",
    icon: "Paintbrush",
    img: "/images/products/fn-primer-18l.jpg",
    count: 16,
  },
  {
    id: "chong-ri",
    name: "Sơn Chống Rỉ Kim Loại",
    icon: "ShieldCheck",
    img: "/images/products/fn-rustproof-18l.jpg",
    count: 11,
  },
  {
    id: "dung-cu",
    name: "Tăng Cứng Bê Tông",
    icon: "Wrench",
    img: "/images/products/fn-hardener-20l.jpg",
    count: 30,
  },
];

// Danh sách thùng sơn chi tiết với thông số Shopee
export const products = [
  {
    id: "fn-01",
    slug: "thung-son-epoxy-tu-phang-fuji-nano-18l",
    name: "Thùng Sơn Epoxy Tự San Phẳng FUJINANO Cao Cấp 18L (Kháng Hóa Chất, Chịu Tải Trọng 30 Tấn, Siêu Bóng)",
    shortName: "Sơn Epoxy Tự Phẳng 18L",
    category: "epoxy",
    categoryName: "Sơn Epoxy Sàn",
    price: 1850000,
    originalPrice: 2450000,
    discount: 24,
    rating: 4.9,
    reviewsCount: 186,
    soldCount: "1.8k",
    stock: 240,
    isMall: true,
    isFavorite: true,
    flashSale: true,
    location: "TP. Cần Thơ",
    images: [
      "/images/products/fn-epoxy-18l.jpg",
      "/images/slider/epoxy_floor.png",
      "/assets/iso_9001.png",
      "/assets/kcc_auth.png"
    ],
    volumes: [
      { name: "Lon 5 Lít", price: 620000, originalPrice: 790000 },
      { name: "Thùng 18 Lít", price: 1850000, originalPrice: 2450000 },
      { name: "Phuy 200 Lít", price: 18900000, originalPrice: 23500000 },
    ],
    colors: [
      { name: "Xanh Lá Cây (#6018)", code: "#1e824c" },
      { name: "Xám Ghi Nhạt (#7035)", code: "#95a5a6" },
      { name: "Xám Đậm (#7040)", code: "#5d6d7e" },
      { name: "Xanh Dương (#5015)", code: "#2980b9" },
      { name: "Vàng Cảnh Báo (#1021)", code: "#f39c12" },
    ],
    vouchers: ["Giảm ₫50k đơn từ ₫1.5tr", "Giảm ₫120k đơn từ ₫3tr", "Freeship Xtra"],
    specs: {
      "Thương hiệu": "FUJINANO JAPAN",
      "Xuất xứ": "Việt Nam (Công nghệ Nhật Bản)",
      "Loại sơn": "Epoxy 2 thành phần tự san phẳng (Gốc nhựa Bisphenol-A)",
      "Độ dày khuyến nghị": "1.0mm - 3.0mm",
      "Độ phủ lý thuyết": "0.8 - 1.2 kg/m²/mm",
      "Thời gian khô chạm": "4 - 6 giờ (ở 30°C)",
      "Thời gian đi lại nhẹ": "Sau 24 giờ",
      "Thời gian chịu tải xe nâng": "Sau 72 giờ",
      "Hạn sử dụng": "24 tháng kể từ ngày sản xuất",
      "Quy cách đóng gói": "Bộ 2 thành phần (Sơn A + Đóng rắn B)",
    },
    description: `
      <h3>GIỚI THIỆU SẢN PHẨM SƠN EPOXY TỰ PHẲNG FUJINANO</h3>
      <p>Sơn sàn Epoxy tự phẳng <strong>FUJINANO</strong> là hệ thống sơn phủ 2 thành phần gốc nhựa epoxy cao cấp kết hợp phụ gia nano gia cường từ Nhật Bản. Sơn có khả năng tự dàn phẳng bề mặt, tạo màng sơn dày, liền mạch không mối nối, sáng bóng như gương và chịu lực nén cực đại.</p>
      
      <h4>ƯU ĐIỂM VƯỢT TRỘI:</h4>
      <ul>
        <li><strong>Bề mặt bóng gương tuyệt đối:</strong> Thẩm mỹ đẳng cấp cho nhà xưởng GMP, phòng sạch dược phẩm, showroom.</li>
        <li><strong>Chịu tải trọng siêu hạng:</strong> Chịu được xe nâng hàng di chuyển liên tục lên đến 30 tấn không nứt vỡ.</li>
        <li><strong>Kháng hóa chất & dầu mỡ:</strong> Chống lại axit loãng, bazo, dung môi hữu cơ, chống thấm nước 100%.</li>
        <li><strong>Kháng khuẩn, dễ vệ sinh:</strong> Bề mặt liền mạch, chống bám bụi và ngăn chặn nấm mốc triệt để.</li>
      </ul>

      <h4>HƯỚNG DẪN THI CÔNG:</h4>
      <ol>
        <li>Mài tạo nhám sàn bê tông bằng máy mài đĩa kim cương, hút bụi sạch sẽ.</li>
        <li>Thi công 1 lớp sơn lót kháng kiềm FUJINANO Primer để tạo liên kết sâu.</li>
        <li>Khuấy đều thành phần A, sau đó đổ thành phần B vào theo đúng tỷ lệ 4:1, dùng máy khuấy tốc độ chậm 3-5 phút.</li>
        <li>Đổ hỗn hợp ra sàn, dùng bàn cào răng cưa gạt đều theo độ dày mong muốn (1mm - 3mm), sau đó dùng rulo gai lăn phá bọt khí ngay lập tức.</li>
      </ol>
    `,
    reviews: [
      {
        user: "tran_hoang_cons",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop",
        rating: 5,
        date: "2026-10-14 15:30",
        variant: "Thùng 18 Lít | Xanh Lá Cây (#6018)",
        comment: "Sơn tự phẳng cực kỳ ưng ý! Mình thi công cho xưởng chế biến thủy sản 1.200m2 ở Cần Thơ, sơn chảy đều, bóng loáng, khô nhanh và độ bám dính rất chắc. Chủ xưởng khen nức nở. Đóng gói thùng thiếc rất chắc chắn.",
        images: ["/images/slider/epoxy_floor.png"]
      },
      {
        user: "viet_duc_group",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=60&h=60&fit=crop",
        rating: 5,
        date: "2026-10-02 09:12",
        variant: "Thùng 18 Lít | Xám Ghi Nhạt (#7035)",
        comment: "Giao hàng từ kho Cần Thơ lên Sài Gòn chỉ mất 1 ngày. Đầy đủ CO/CQ và hóa đơn VAT. Sơn bóng và chịu xe nâng rất tốt. Sẽ tiếp tục hợp tác lâu dài với Fuji Nano.",
      }
    ]
  },
  {
    id: "fn-02",
    slug: "thung-son-chong-tham-polyurethane-pu-fuji-nano-20kg",
    name: "Thùng Sơn Chống Thấm Polyurethane (PU) Đa Năng FUJINANO 20kg (Độ Giãn Dài 600%, Kháng Tia UV, Sân Thượng Hồ Bơi)",
    shortName: "Sơn Chống Thấm PU 20kg",
    category: "chong-tham",
    categoryName: "Sơn Chống Thấm",
    price: 2150000,
    originalPrice: 2800000,
    discount: 23,
    rating: 5.0,
    reviewsCount: 142,
    soldCount: "2.3k",
    stock: 180,
    isMall: true,
    isFavorite: true,
    flashSale: true,
    location: "TP. Cần Thơ",
    images: [
      "/images/products/fn-waterproof-18l.jpg",
      "/images/slider/sports_court.png",
      "/assets/iso_9001.png"
    ],
    volumes: [
      { name: "Lon 5 Kg", price: 590000, originalPrice: 750000 },
      { name: "Thùng 20 Kg", price: 2150000, originalPrice: 2800000 },
    ],
    colors: [
      { name: "Xám Xi Măng", code: "#7f8c8d" },
      { name: "Xanh Lá Cây", code: "#27ae60" },
      { name: "Trắng Sứ", code: "#ecf0f1" },
    ],
    vouchers: ["Giảm ₫50k đơn từ ₫1.5tr", "Giảm ₫100k đơn từ ₫2tr", "Freeship Xtra"],
    specs: {
      "Thương hiệu": "FUJINANO JAPAN",
      "Xuất xứ": "Việt Nam (Công nghệ Nhật Bản)",
      "Gốc vật liệu": "Polyurethane nguyên chất 1 thành phần lộ thiên",
      "Độ giãn dài khi đứt": "> 600%",
      "Cường độ bám dính": "> 2.0 MPa",
      "Độ phủ tiêu chuẩn": "1.4 - 1.6 kg/m² cho 2-3 lớp",
      "Kháng thời tiết": "Kháng tia cực tím UV, chống rêu mốc 10 năm",
      "Bảo hành": "Bảo hành chống thấm 5 năm chính hãng",
    },
    description: `
      <h3>SƠN CHỐNG THẤM PU LỘ THIÊN CAO CẤP FUJINANO</h3>
      <p>Giải pháp chống thấm số 1 cho sàn mái sân thượng, ban công, máng xối sê-nô và hồ bơi. Màng sơn có độ đàn hồi siêu dẻo lên đến 600%, tự bắc cầu qua các vết nứt chân chim của bê tông ngay cả khi thời tiết giãn nở khắc nghiệt.</p>
    `,
    reviews: [
      {
        user: "nguyen_quoc_bao",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop",
        rating: 5,
        date: "2026-11-01 11:20",
        variant: "Thùng 20 Kg | Xám Xi Măng",
        comment: "Đã lăn 2 lớp cho sân thượng 200m2 trước mùa mưa bão miền Tây. Bề mặt dai dẻo như cao su, nước mưa dội xuống trôi tuột, không còn ngấm trần tí nào. Chất lượng tuyệt đối 10 sao!",
      }
    ]
  },
  {
    id: "fn-03",
    slug: "thung-son-chong-chay-ket-cau-thep-fuji-nano-20kg",
    name: "Thùng Sơn Chống Cháy Kết Cấu Thép FUJINANO 20kg (Chứng Nhận PCCC, Chịu Lửa 120 Phút 1200°C)",
    shortName: "Sơn Chống Cháy 120 Phút 20kg",
    category: "chong-chay",
    categoryName: "Sơn Chống Cháy",
    price: 2450000,
    originalPrice: 3100000,
    discount: 21,
    rating: 4.8,
    reviewsCount: 95,
    soldCount: "920",
    stock: 120,
    isMall: true,
    isFavorite: false,
    flashSale: false,
    location: "TP. Cần Thơ",
    images: [
      "/images/products/fn-fireproof-20kg.jpg",
      "/images/slider/fireproof_steel.png",
      "/assets/fire_safety.png",
      "/assets/iso_9001.png"
    ],
    volumes: [
      { name: "Thùng 20 Kg", price: 2450000, originalPrice: 3100000 },
      { name: "Phuy 200 Kg", price: 22800000, originalPrice: 28500000 },
    ],
    colors: [
      { name: "Trắng Sữa", code: "#f5f6fa" },
      { name: "Xám Lót", code: "#bdc3c7" },
    ],
    vouchers: ["Giảm ₫100k đơn từ ₫2tr", "Freeship Xtra"],
    specs: {
      "Thương hiệu": "FUJINANO FIRE-GUARD",
      "Tiêu chuẩn PCCC": "TCVN 9383:2012 / BS 476",
      "Thời gian chống cháy": "60 phút, 90 phút, 120 phút",
      "Nhiệt độ phồng nở": "Bắt đầu phồng xốp ở 200°C tạo lớp xốp cách nhiệt",
      "Quy chuẩn kiểm định": "Cục Cảnh sát PCCC & CNCH cấp phép",
    },
    description: `
      <h3>SƠN CHỐNG CHÁY PHỒNG NỞ BẢO VỆ KẾT CẤU THÉP</h3>
      <p>Khi gặp nhiệt độ cao từ 200°C trở lên, màng sơn tự động phồng nở gấp 50-80 lần tạo lớp than xốp cách nhiệt vững chắc, ngăn ngọn lửa tiếp xúc trực tiếp với cốt thép, duy trì độ chịu lực của khung kèo nhà xưởng lên đến 120 phút.</p>
    `,
    reviews: []
  },
  {
    id: "fn-04",
    slug: "thung-son-san-the-thao-tennis-cau-long-fuji-nano-18l",
    name: "Thùng Sơn Sân Thể Thao Cao Cấp FUJINANO 18L (Chuẩn ITF Sân Tennis, Kháng Mài Mòn, Chống Trơn Trượt)",
    shortName: "Sơn Sân Tennis/Thể Thao 18L",
    category: "the-thao",
    categoryName: "Sân Thể Thao",
    price: 1650000,
    originalPrice: 2100000,
    discount: 21,
    rating: 4.9,
    reviewsCount: 110,
    soldCount: "1.1k",
    stock: 190,
    isMall: true,
    isFavorite: true,
    flashSale: true,
    location: "TP. Cần Thơ",
    images: [
      "/images/products/fn-sports-18l.jpg",
      "/images/slider/sports_court.png",
      "/assets/iso_9001.png"
    ],
    volumes: [
      { name: "Lon 5 Lít", price: 540000, originalPrice: 680000 },
      { name: "Thùng 18 Lít", price: 1650000, originalPrice: 2100000 },
    ],
    colors: [
      { name: "Xanh Navy Tennis", code: "#1a365d" },
      { name: "Xanh Lá Cây Sân Đấu", code: "#2e7d32" },
      { name: "Đỏ Đất Nện", code: "#c0392b" },
      { name: "Tím Đẳng Cấp", code: "#6c5ce7" },
    ],
    vouchers: ["Giảm ₫50k", "Freeship Xtra"],
    specs: {
      "Thương hiệu": "FUJINANO COURT",
      "Chất liệu": "Acrylic Silicon cải tiến chống trượt",
      "Độ bám sân": "Đạt chuẩn nảy bóng ITF quốc tế",
      "Độ bền màu": "Kháng tia UV không phai dưới nắng mưa",
    },
    description: `
      <h3>SƠN PHỦ SÂN THỂ THAO ĐA NĂNG FUJINANO</h3>
      <p>Dành riêng cho sân tennis, sân bóng rổ, cầu lông, pickleball và đường chạy điền kinh. Bề mặt nhám mịn chuẩn thể thao, triệt tiêu nguy cơ trượt ngã của vận động viên.</p>
    `,
    reviews: []
  },
  {
    id: "fn-05",
    slug: "thung-son-epoxy-he-lan-goc-dau-fuji-nano-18l",
    name: "Thùng Sơn Epoxy Hệ Lăn Gốc Dầu FUJINANO 18L (Phủ Sàn Nhà Xưởng, Chống Bám Bụi, Tiết Kiệm Chi Phí)",
    shortName: "Sơn Epoxy Hệ Lăn 18L",
    category: "epoxy",
    categoryName: "Sơn Epoxy Sàn",
    price: 1350000,
    originalPrice: 1750000,
    discount: 23,
    rating: 4.8,
    reviewsCount: 310,
    soldCount: "4.2k",
    stock: 500,
    isMall: true,
    isFavorite: true,
    flashSale: true,
    location: "TP. Cần Thơ",
    images: [
      "/images/products/fn-rustproof-18l.jpg",
      "/images/slider/epoxy_floor.png",
      "/assets/kcc_auth.png"
    ],
    volumes: [
      { name: "Lon 5 Lít", price: 450000, originalPrice: 580000 },
      { name: "Thùng 18 Lít", price: 1350000, originalPrice: 1750000 },
    ],
    colors: [
      { name: "Xanh Lá Cây (#6018)", code: "#1e824c" },
      { name: "Xám Ghi (#7035)", code: "#95a5a6" },
      { name: "Xanh Dương (#5015)", code: "#2980b9" },
    ],
    vouchers: ["Giảm ₫50k", "Freeship Xtra"],
    specs: {
      "Loại sơn": "Epoxy 2 thành phần hệ lăn (1 lót + 2 phủ)",
      "Độ dày": "0.3mm - 0.5mm",
      "Định mức phủ": "8 - 10 m²/Lít/Lớp",
      "Ứng dụng": "Kho bãi, nhà xưởng cơ khí, hầm giữ xe",
    },
    description: `
      <h3>SƠN EPOXY HỆ LĂN TIÊU CHUẨN CÔNG NGHIỆP</h3>
      <p>Lựa chọn kinh tế và hiệu quả cao nhất để chống bụi bẩn, tạo bề mặt sạch sẽ, dễ lau chùi cho sàn bê tông kho hàng và khu vực sản xuất.</p>
    `,
    reviews: []
  },
  {
    id: "fn-06",
    slug: "thung-son-giao-thong-nhiet-deo-phan-quang-25kg",
    name: "Bao Sơn Giao Thông Dẻo Nhiệt Phản Quang FUJINANO 25kg (Kẻ Vạch Đường, Khô Nhanh 2 Phút, Độ Bền 5 Năm)",
    shortName: "Sơn Kẻ Vạch Nhiệt Dẻo 25kg",
    category: "giao-thong",
    categoryName: "Sơn Giao Thông",
    price: 680000,
    originalPrice: 850000,
    discount: 20,
    rating: 4.7,
    reviewsCount: 88,
    soldCount: "1.5k",
    stock: 350,
    isMall: true,
    isFavorite: false,
    flashSale: false,
    location: "TP. Cần Thơ",
    images: [
      "/images/products/fn-traffic-20kg.jpg",
      "/images/slider/polished_concrete.png",
      "/assets/iso_9001.png"
    ],
    volumes: [
      { name: "Bao 25 Kg", price: 680000, originalPrice: 850000 },
    ],
    colors: [
      { name: "Trắng Phản Quang", code: "#ffffff" },
      { name: "Vàng Phản Quang", code: "#f1c40f" },
    ],
    vouchers: ["Freeship Xtra"],
    specs: {
      "Nhiệt độ thi công": "180°C - 200°C",
      "Hạt phản quang": "Chứa hạt bi thủy tinh phản quang cao cấp",
      "Tiêu chuẩn": "AASHTO M249",
    },
    description: `
      <h3>SƠN NHIỆT DẺO KẺ VẠCH GIAO THÔNG FUJINANO</h3>
      <p>Ứng dụng kẻ vạch phân làn cao tốc, bãi đỗ xe tầng hầm, vạch chỉ dẫn phân luồng khu công nghiệp. Chịu mài mòn cực tốt từ bánh xe tải nặng.</p>
    `,
    reviews: []
  },
  {
    id: "fn-07",
    slug: "thung-son-lot-epoxy-khang-kiem-sau-fuji-nano-18l",
    name: "Thùng Sơn Lót Epoxy Thẩm Thấu Sâu Kháng Kiềm FUJINANO Primer 18L (Khóa Bụi, Tăng Bám Dính Sàn Bê Tông)",
    shortName: "Sơn Lót Epoxy Primer 18L",
    category: "son-lot",
    categoryName: "Sơn Lót Kháng Kiềm",
    price: 1250000,
    originalPrice: 1550000,
    discount: 19,
    rating: 4.9,
    reviewsCount: 165,
    soldCount: "3.1k",
    stock: 420,
    isMall: true,
    isFavorite: true,
    flashSale: false,
    location: "TP. Cần Thơ",
    images: [
      "/images/products/fn-primer-18l.jpg",
      "/images/slider/epoxy_floor.png",
      "/assets/iso_9001.png"
    ],
    volumes: [
      { name: "Lon 5 Lít", price: 420000, originalPrice: 520000 },
      { name: "Thùng 18 Lít", price: 1250000, originalPrice: 1550000 },
    ],
    colors: [
      { name: "Trong Suốt Hổ Phách", code: "#d35400" },
    ],
    vouchers: ["Giảm ₫50k", "Freeship Xtra"],
    specs: {
      "Độ nhớt": "Độ nhớt thấp, thâm nhập sâu vào mao dẫn bê tông",
      "Kháng kiềm": "Chống kiềm hóa và hơi ẩm ngược hiệu quả",
    },
    description: `
      <h3>SƠN LÓT EPOXY THẨM THẤU SÂU CHUYÊN DỤNG</h3>
      <p>Lớp sơn lót bắt buộc trước khi thi công sơn Epoxy hệ lăn hoặc tự san phẳng. Thẩm thấu sâu vào cốt bê tông, gia cố độ cứng bề mặt và tạo cầu nối liên kết bền vững.</p>
    `,
    reviews: []
  },
  {
    id: "fn-08",
    slug: "thung-son-mai-tang-cung-danh-bong-be-tong-liquid-hardener-20l",
    name: "Can Hóa Chất Tăng Cứng Mài Bóng Bê Tông FUJINANO Liquid Hardener 20L (Gốc Lithium Silicate Siêu Mịn)",
    shortName: "Tăng Cứng Đánh Bóng 20L",
    category: "dung-cu",
    categoryName: "Mài Sàn & Đánh Bóng",
    price: 1450000,
    originalPrice: 1850000,
    discount: 22,
    rating: 5.0,
    reviewsCount: 74,
    soldCount: "860",
    stock: 150,
    isMall: true,
    isFavorite: false,
    flashSale: true,
    location: "TP. Cần Thơ",
    images: [
      "/images/products/fn-hardener-20l.jpg",
      "/images/slider/polished_concrete.png",
      "/assets/iso_9001.png"
    ],
    volumes: [
      { name: "Can 20 Lít", price: 1450000, originalPrice: 1850000 },
    ],
    colors: [
      { name: "Dung Dịch Trong Suốt", code: "#3498db" },
    ],
    vouchers: ["Freeship Xtra"],
    specs: {
      "Gốc hóa chất": "Lithium Silicate hoạt tính cao",
      "Độ tăng cứng": "Tăng độ cứng sàn lên 40 - 50%",
      "Khả năng chống sinh bụi": "100%",
    },
    description: `
      <h3>HÓA CHẤT TĂNG CỨNG VÀ ĐÁNH BÓNG SÀN BÊ TÔNG</h3>
      <p>Phản ứng với Canxi Hydroxit tự do trong bê tông để tạo thành tinh thể C-S-H lấp đầy các mao dẫn rỗng, biến sàn bê tông thành bề mặt bóng loáng vĩnh cửu như đá hoa cương.</p>
    `,
    reviews: []
  }
];
