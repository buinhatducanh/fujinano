// Menu tinh gọn chuẩn Product Owner (PO) cho doanh nghiệp SME / Startup
// Tập trung 100% vào: Sản Phẩm -> Báo Giá Chiết Khấu -> Dự Án Chứng Thực -> 2 Cách Bán Hàng

export const productSubMenu = [
  {
    title: "Sơn Sàn Epoxy 18L",
    desc: "Tự phẳng & hệ lăn chịu tải 30 tấn",
    icon: "Layers",
    href: "/#products",
    badge: "Bán chạy",
    color: "#3b82f6",
  },
  {
    title: "Sơn Chống Thấm PU 18L",
    desc: "Độ dẻo 600%, sân thượng mái sàn",
    icon: "Droplets",
    href: "/#products",
    badge: "Hot",
    color: "#0ea5e9",
  },
  {
    title: "Sơn Chống Cháy Thép 20KG",
    desc: "Đạt chuẩn Cục PCCC chịu lửa 120P",
    icon: "ShieldCheck",
    href: "/#products",
    badge: "PCCC",
    color: "#ef4444",
  },
  {
    title: "Sơn Sân Thể Thao 18L",
    desc: "Chuẩn ITF sân tennis & pickleball",
    icon: "Award",
    href: "/#products",
    color: "#10b981",
  },
  {
    title: "Sơn Kẻ Vạch Giao Thông 20KG",
    desc: "Nhiệt dẻo phản quang khô 2 phút",
    icon: "Construction",
    href: "/#products",
    color: "#f59e0b",
  },
  {
    title: "Sơn Lót & Tăng Cứng Mài Sàn",
    desc: "Kháng kiềm Nano & Liquid Hardener",
    icon: "Paintbrush",
    href: "/#products",
    color: "#8b5cf6",
  },
];

export const navItems = [
  {
    label: "Sản Phẩm",
    href: "/#products",
    sub: productSubMenu,
  },
  {
    label: "Bảng Giá & Chiết Khấu",
    href: "#quote",
    isActionModal: true,
  },
  {
    label: "Dự Án Thực Tế",
    href: "/#projects",
  },
];
