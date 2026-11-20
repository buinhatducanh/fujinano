import React, { createContext, useContext, useState, useEffect } from "react";
import { products as initialProducts, categories } from "../data/products";
import { newsArticles as initialNews } from "../data/news";

const AppContext = createContext();

export const defaultSiteSettings = {
  companyName: "CÔNG TY TNHH FUJI NANO VIỆT NAM",
  shortName: "FUJINANO",
  taxId: "1801784735",
  representative: "Ngô Anh Tú",
  hotline: "0947.707.616",
  hotlineRaw: "0947707616",
  zalo: "0947.707.616",
  email: "info@fujinano.vn",
  emailBaoGia: "baogia@fujinano.com",
  address: "Số 45 đường Mậu Thân, Phường Cái Khế, Quận Ninh Kiều, TP. Cần Thơ",
  workingHours: "Thứ 2 - Thứ 7: 7:30 - 17:30 (Chủ nhật trực Hotline 24/7)",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.793466185671!2d105.7725488758832!3d10.033924372445885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0881f185d56ab%3A0xe54d3e098939b986!2zNDUgTeG6rXUgVGjDom4sIEPDoWkgS2jhur8sIE5pbmggS2nhu4F1LCBD4bqnbiBUaMah!5e0!3m2!1svi!2s!4v1716180000000!5m2!1svi!2s",
  website: "www.fujinano.vn",
  slogan: "Sơn Công Nghiệp & Chống Thấm Công Nghệ Nano Nhật Bản",
};

export const defaultPolicies = {
  warranty: {
    title: "Chính Sách Bảo Hành Chính Hãng",
    summary: "Bảo hành màng sơn lên đến 5 năm đối với sơn sàn Epoxy và 10 năm đối với hệ sơn chống thấm Polyurethane.",
    terms: [
      "Bảo hành 1 đổi 1 trong vòng 30 ngày nếu phát hiện sơn vón cục, sai màu hoặc lỗi do nhà sản xuất.",
      "Cam kết bảo hành màng sơn 5 năm không bong tróc khi thi công đúng quy trình chuẩn hãng của kỹ sư Fuji Nano.",
      "Hỗ trợ kỹ thuật viên kiểm tra công trình thực tế định kỳ 6 tháng/lần hoàn toàn miễn phí.",
      "Cung cấp tem bảo hành điện tử và chứng chỉ xuất xưởng CO/CQ có dấu đỏ nhà máy.",
    ],
  },
  returns: {
    title: "Chính Sách Đổi Trả Trong 7 Ngày",
    summary: "Đổi trả linh hoạt, hoàn tiền 100% trong vòng 7 ngày làm việc kể từ khi nhận hàng.",
    terms: [
      "Thùng sơn còn nguyên niêm phong tem chống hàng giả, vỏ thùng không bị rách thủng hay móp méo nặng.",
      "Đổi hàng hoàn toàn miễn phí nếu giao nhầm mã màu, sai quy cách dung tích hoặc lỗi rò rỉ khi vận chuyển.",
      "Hoàn tiền 100% trong 24 giờ sau khi tổng kho tiếp nhận và kiểm tra nguyên trạng hàng hoàn về.",
      "Không áp dụng đổi trả với dòng sơn đã pha màu riêng biệt theo đơn đặt hàng cá nhân hóa.",
    ],
  },
  shipping: {
    title: "Chính Sách Giao Nhận & Vận Chuyển",
    summary: "Giao hỏa tốc 2 giờ tại Cần Thơ, hỗ trợ chi phí chành xe đi khắp các tỉnh Tây Nam Bộ và toàn quốc.",
    terms: [
      "Miễn phí vận chuyển nội ô TP. Cần Thơ cho mọi đơn hàng từ 2 thùng trở lên.",
      "Giao hỏa tốc trong 2 giờ từ kho 45 Mậu Thân đối với các công trình đang thi công cần tiếp thêm sơn gấp.",
      "Hỗ trợ 50% - 100% cước chành xe bến bãi cho khách hàng tại Vĩnh Long, An Giang, Hậu Giang, Sóc Trăng, Kiên Giang.",
      "Đội xe tải chuyên dụng có dây chằng đệm chống va đập, đảm bảo nguyên vẹn thùng sơn khi giao.",
    ],
  },
  payment: {
    title: "Chính Sách Thanh Toán & Kiểm Hàng",
    summary: "Đồng kiểm niêm phong và chứng chỉ CO/CQ xuất xưởng trước khi thanh toán.",
    terms: [
      "Khách hàng được quyền kiểm tra niêm phong nắp thùng, hạn sử dụng và giấy chứng nhận CO/CQ trước khi nhận.",
      "Thanh toán linh hoạt: Tiền mặt khi nhận hàng (COD) hoặc chuyển khoản vào tài khoản công ty mở tại Vietcombank.",
      "Xuất hóa đơn GTGT (VAT) điện tử chuẩn xác trong ngày theo thông tin mã số thuế doanh nghiệp.",
      "Chính sách công nợ gối đầu 15–30 ngày cho các nhà thầu thi công ký hợp đồng cung ứng định kỳ.",
    ],
  },
};

export const defaultInquiries = [
  {
    id: "lead-1",
    name: "Trần Văn Hưng (Nhà Thầu KCN Trà Nóc)",
    phone: "0918.452.889",
    email: "hungtran.xd@gmail.com",
    product: "Sơn Epoxy Tự San Phẳng 18L",
    area: "1.200m²",
    quantity: 30,
    topic: "Báo giá sỉ dự án nhà xưởng",
    status: "pending",
    date: "20/11/2026 09:15",
    notes: "Cần gửi bảng màu xám ghi #7035 và mẫu test sơn tận xưởng.",
  },
  {
    id: "lead-2",
    name: "Nguyễn Thị Ngọc (Chủ Xưởng Chế Biến Thốt Nốt)",
    phone: "0939.812.345",
    email: "ngoc.seafood@gmail.com",
    product: "Sơn Chống Thấm Polyurethane PU 18L",
    area: "650m²",
    quantity: 12,
    topic: "Chống thấm sàn mái",
    status: "contacted",
    date: "19/11/2026 15:40",
    notes: "Đã tư vấn định mức 1.5kg/m². Đang làm tờ trình giám đốc duyệt ngân sách.",
  },
  {
    id: "lead-3",
    name: "Lê Minh Tuấn (Sân Thể Thao Bình Thủy)",
    phone: "0907.332.119",
    email: "tuansport@gmail.com",
    product: "Sơn Sân Thể Thao Đa Năng 18L",
    area: "800m²",
    quantity: 16,
    topic: "Tư vấn chọn thùng sơn",
    status: "completed",
    date: "18/11/2026 11:00",
    notes: "Đã chốt đơn 16 thùng xanh dương và đỏ gạch, giao ngày 21/11.",
  },
];

// Định dạng bài viết SEO ban đầu
const initialEnhancedArticles = initialNews.map((art, idx) => ({
  ...art,
  focusKeyword: idx === 0 ? "sơn epoxy kết cấu thép" : idx === 1 ? "mài sàn bê tông" : "sơn sàn công nghiệp",
  metaTitle: art.title.length > 55 ? art.title.slice(0, 55) + "..." : `${art.title} | FUJINANO`,
  metaDescription: art.excerpt.length > 155 ? art.excerpt.slice(0, 155) + "..." : art.excerpt,
  status: "published",
  views: 320 + idx * 140,
}));

export function AppProvider({ children }) {
  // 1. Quản lý Sản phẩm
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("fujinano_products");
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  // 2. Quản lý Bài viết SEO
  const [articles, setArticles] = useState(() => {
    try {
      const saved = localStorage.getItem("fujinano_articles");
      return saved ? JSON.parse(saved) : initialEnhancedArticles;
    } catch {
      return initialEnhancedArticles;
    }
  });

  // 3. Quản lý Thông tin Doanh Nghiệp & Liên Hệ
  const [siteSettings, setSiteSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("fujinano_site_settings");
      return saved ? JSON.parse(saved) : defaultSiteSettings;
    } catch {
      return defaultSiteSettings;
    }
  });

  // 4. Quản lý Chính Sách & Bảo Hành
  const [policies, setPolicies] = useState(() => {
    try {
      const saved = localStorage.getItem("fujinano_policies");
      return saved ? JSON.parse(saved) : defaultPolicies;
    } catch {
      return defaultPolicies;
    }
  });

  // 5. Quản lý Leads Yêu Cầu Báo Giá
  const [inquiries, setInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem("fujinano_inquiries");
      return saved ? JSON.parse(saved) : defaultInquiries;
    } catch {
      return defaultInquiries;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("fujinano_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("fujinano_articles", JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem("fujinano_site_settings", JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem("fujinano_policies", JSON.stringify(policies));
  }, [policies]);

  useEffect(() => {
    localStorage.setItem("fujinano_inquiries", JSON.stringify(inquiries));
  }, [inquiries]);

  // Product Actions
  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  const addProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  // Article Actions
  const updateArticle = (slug, updatedFields) => {
    setArticles((prev) =>
      prev.map((item) => (item.slug === slug ? { ...item, ...updatedFields } : item))
    );
  };

  const addArticle = (newArticle) => {
    setArticles((prev) => [newArticle, ...prev]);
  };

  const deleteArticle = (slug) => {
    setArticles((prev) => prev.filter((item) => item.slug !== slug));
  };

  // Settings Actions
  const updateSiteSettings = (newSettings) => {
    setSiteSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Policies Actions
  const updatePolicies = (newPolicies) => {
    setPolicies(newPolicies);
  };

  // Inquiry Actions
  const addInquiry = (newInquiry) => {
    const item = {
      id: `lead-${Date.now()}`,
      status: "pending",
      date: new Date().toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      ...newInquiry,
    };
    setInquiries((prev) => [item, ...prev]);
    return item;
  };

  const updateInquiryStatus = (id, status, notes) => {
    setInquiries((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status, ...(notes !== undefined ? { notes } : {}) } : item
      )
    );
  };

  const deleteInquiry = (id) => {
    setInquiries((prev) => prev.filter((item) => item.id !== id));
  };

  // Reset to Factory Defaults
  const resetToDefaults = () => {
    setProducts(initialProducts);
    setArticles(initialEnhancedArticles);
    setSiteSettings(defaultSiteSettings);
    setPolicies(defaultPolicies);
    setInquiries(defaultInquiries);
    localStorage.removeItem("fujinano_products");
    localStorage.removeItem("fujinano_articles");
    localStorage.removeItem("fujinano_site_settings");
    localStorage.removeItem("fujinano_policies");
    localStorage.removeItem("fujinano_inquiries");
  };

  return (
    <AppContext.Provider
      value={{
        products,
        categories,
        articles,
        siteSettings,
        policies,
        inquiries,
        updateProduct,
        addProduct,
        deleteProduct,
        updateArticle,
        addArticle,
        deleteArticle,
        updateSiteSettings,
        updatePolicies,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        resetToDefaults,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
