import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Phone, FileText, ShieldCheck, Truck, RotateCcw, Headphones, Filter, X } from "lucide-react";
import { categories, products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Home({ onOpenOrderModal }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(queryParam);
  const [activeCategory, setActiveCategory] = useState("all");

  const quickKeywords = [
    "Sơn Epoxy 18L",
    "Chống Thấm PU",
    "Sơn Chống Cháy 120P",
    "Sơn Sân Tennis",
    "Sơn Lót Kháng Kiềm",
    "Mài Sàn Bê Tông",
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleKeywordClick = (kw) => {
    setSearchInput(kw);
    setSearchParams({ q: kw });
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchParams({});
  };

  // Filter products by category and search
  const filteredProducts = products.filter((p) => {
    const matchCategory = activeCategory === "all" || p.category === activeCategory;
    const matchQuery =
      !queryParam ||
      p.name.toLowerCase().includes(queryParam.toLowerCase()) ||
      p.shortName.toLowerCase().includes(queryParam.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(queryParam.toLowerCase());
    return matchCategory && matchQuery;
  });

  return (
    <div style={{ minHeight: "100vh", padding: "100px 0 60px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 20px" }}>
        
        {/* 1. KHU VỰC TẬP TRUNG TÌM KIẾM SẢN PHẨM (PROMINENT SEARCH SECTION) */}
        <div
          style={{
            background: "rgba(8, 22, 54, 0.88)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderRadius: "14px",
            padding: "24px",
            boxShadow: "0 6px 24px rgba(0,0,0,0.35)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            marginBottom: "20px",
          }}
        >
          {/* Header Title & Slogan */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff", margin: 0, letterSpacing: "-0.3px" }}>
                TỔNG KHO PHÂN PHỐI THÙNG SƠN CHÍNH HÃNG FUJINANO
              </h1>
              <p style={{ fontSize: "13px", color: "#94a3b8", margin: "4px 0 0" }}>
                Sơn Epoxy sàn, PU chống thấm, sơn chống cháy, sơn thể thao - Giá sỉ tận nhà máy
              </p>
            </div>

            {/* 2 Cách Mua Nhanh Header CTAs */}
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <button
                onClick={() => onOpenOrderModal && onOpenOrderModal(null)}
                style={{
                  background: "#dc2626",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 14px",
                  fontSize: "12.5px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#b91c1c")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#dc2626")}
              >
                <FileText size={14} />
                <span>Để Lại SĐT Báo Giá</span>
              </button>

              <a
                href="tel:0947707616"
                style={{
                  background: "#030c22",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                  padding: "8px 14px",
                  fontSize: "12.5px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  textDecoration: "none",
                }}
              >
                <Phone size={14} color="#22c55e" />
                <span>Gọi: 0947.707.616</span>
              </a>
            </div>
          </div>

          {/* Ô TÌM KIẾM LỚN VÀ RÕ RÀNG */}
          <form
            onSubmit={handleSearchSubmit}
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(2, 10, 28, 0.75)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "10px",
              padding: "4px 6px 4px 16px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2) inset",
              transition: "border-color 0.2s",
            }}
          >
            <Search size={18} color="#94a3b8" style={{ flexShrink: 0, marginRight: "8px" }} />
            <input
              type="text"
              placeholder="Nhập tên thùng sơn cần tìm (Ví dụ: Epoxy tự phẳng, PU chống thấm 20kg, sơn chống cháy...)"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                outline: "none",
                fontSize: "14px",
                color: "#ffffff",
                padding: "8px 0",
              }}
            />
            {searchInput && (
              <button
                type="button"
                onClick={handleClearSearch}
                style={{
                  background: "none",
                  border: "none",
                  color: "#94a3b8",
                  cursor: "pointer",
                  padding: "6px 10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <X size={16} />
              </button>
            )}
            <button
              type="submit"
              style={{
                background: "#030c22",
                color: "#ffffff",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                borderRadius: "8px",
                padding: "9px 20px",
                fontSize: "13.5px",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                flexShrink: 0,
              }}
            >
              <span>Tìm Kiếm</span>
            </button>
          </form>

          {/* Quick Keywords Pills */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "12px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 600 }}>Gợi ý tìm nhanh:</span>
            {quickKeywords.map((kw) => (
              <button
                key={kw}
                onClick={() => handleKeywordClick(kw)}
                style={{
                  background: queryParam === kw ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.08)",
                  color: queryParam === kw ? "#ffffff" : "#cbd5e1",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "20px",
                  padding: "4px 12px",
                  fontSize: "12px",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  if (queryParam !== kw) {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                    e.currentTarget.style.color = "#cbd5e1";
                  }
                }}
              >
                {kw}
              </button>
            ))}
          </div>
        </div>

        {/* 2. DANH MỤC THÙNG SƠN TRỰC QUAN (SHOPEE STYLE CATEGORY SHELF) */}
        <div
          style={{
            background: "rgba(8, 22, 54, 0.88)",
            backdropFilter: "blur(14px)",
            borderRadius: "14px",
            padding: "16px 20px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            marginBottom: "16px",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "14px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "13.5px", fontWeight: 700, color: "#ffffff", letterSpacing: "0.5px" }}>
                DANH MỤC THÙNG SƠN NỔI BẬT
              </span>
              <span style={{ fontSize: "11px", background: "rgba(59, 130, 246, 0.2)", color: "#38bdf8", padding: "2px 8px", borderRadius: "10px", fontWeight: 600 }}>
                Chính Hãng Fuji Nano
              </span>
            </div>
            {activeCategory !== "all" && (
              <button
                onClick={() => setActiveCategory("all")}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#38bdf8",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Xem tất cả ({products.length})
              </button>
            )}
          </div>

          {/* Category Visual Cards Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(105px, 1fr))",
              gap: "10px",
            }}
          >
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <div
                  key={cat.id}
                  onClick={() => setActiveCategory(isSelected ? "all" : cat.id)}
                  style={{
                    background: isSelected ? "rgba(59, 130, 246, 0.2)" : "rgba(2, 10, 28, 0.6)",
                    border: isSelected ? "2px solid #38bdf8" : "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "10px",
                    padding: "10px 6px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.18s ease",
                    transform: isSelected ? "translateY(-2px)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.4)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.background = "rgba(2, 10, 28, 0.85)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.background = "rgba(2, 10, 28, 0.6)";
                    }
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "10px",
                      background: "#ffffff",
                      padding: "4px",
                      marginBottom: "8px",
                      overflow: "hidden",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
                    }}
                  >
                    <img
                      src={cat.img}
                      alt={cat.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: isSelected ? 700 : 600,
                      color: isSelected ? "#38bdf8" : "#f1f5f9",
                      lineHeight: 1.25,
                    }}
                  >
                    {cat.name}
                  </span>
                  <span style={{ fontSize: "10.5px", color: "#94a3b8", marginTop: "2px" }}>
                    {cat.count} SP
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. THÔNG BÁO 2 CÁCH MUA HÀNG TIỆN LỢI */}
        <div
          style={{
            background: "rgba(14, 165, 233, 0.12)",
            border: "1px solid rgba(14, 165, 233, 0.25)",
            borderRadius: "10px",
            padding: "10px 16px",
            fontSize: "12.5px",
            color: "#e0f2fe",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontWeight: 800, color: "#38bdf8" }}>⚡ 2 CÁCH MUA HÀNG TIỆN LỢI:</span>
            <span>(1) Bấm <strong>"Đặt Mua"</strong> để lại số điện thoại nhận báo giá chiết khấu, hoặc (2) Bấm <strong>"Gọi Shop"</strong> để gặp kỹ sư tư vấn ngay!</span>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <span style={{ fontSize: "11.5px", color: "#38bdf8", fontWeight: 600 }}>• Miễn phí vận chuyển từ 2 thùng</span>
            <span style={{ fontSize: "11.5px", color: "#38bdf8", fontWeight: 600 }}>• CO/CQ &amp; Hóa đơn VAT</span>
          </div>
        </div>

        {/* 4. LƯỚI SẢN PHẨM THÙNG SƠN (TRUNG TÂM TRANG) */}
        <div style={{ marginBottom: "30px" }}>
          {queryParam && (
            <div style={{ marginBottom: "14px", fontSize: "13.5px", color: "#94a3b8" }}>
              Kết quả tìm kiếm cho: <strong style={{ color: "#ffffff" }}>"{queryParam}"</strong> ({filteredProducts.length} thùng sơn)
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div
              style={{
                background: "rgba(8, 22, 54, 0.88)",
                borderRadius: "12px",
                padding: "60px 20px",
                textAlign: "center",
                border: "1px solid rgba(255, 255, 255, 0.12)",
              }}
            >
              <p style={{ fontSize: "15px", color: "#94a3b8", marginBottom: "14px" }}>
                Không tìm thấy thùng sơn nào phù hợp với từ khóa "{queryParam}".
              </p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchParams({});
                  setSearchInput("");
                }}
                style={{
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  padding: "9px 20px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Xem tất cả thùng sơn
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
                gap: "16px",
              }}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onOpenOrder={onOpenOrderModal} />
              ))}
            </div>
          )}
        </div>

        {/* 5. DẢI CAM KẾT CHẤT LƯỢNG (NHẸ NHÀNG, TINH TẾ) */}
        <div
          style={{
            background: "rgba(8, 22, 54, 0.88)",
            borderRadius: "12px",
            padding: "20px 24px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "rgba(16, 185, 129, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#34d399", flexShrink: 0 }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "13px", color: "#ffffff" }}>100% Sơn Chính Hãng</div>
              <div style={{ fontSize: "11.5px", color: "#94a3b8" }}>Đầy đủ chứng chỉ CO/CQ, xuất hóa đơn VAT</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "rgba(14, 165, 233, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#38bdf8", flexShrink: 0 }}>
              <Truck size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "13px", color: "#ffffff" }}>Giao Tận Chân Công Trình</div>
              <div style={{ fontSize: "11.5px", color: "#94a3b8" }}>Đội xe giao nhanh Cần Thơ, TP.HCM &amp; gửi chành xe</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "rgba(245, 158, 11, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fbbf24", flexShrink: 0 }}>
              <RotateCcw size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "13px", color: "#ffffff" }}>Đổi Trả Trong 7 Ngày</div>
              <div style={{ fontSize: "11.5px", color: "#94a3b8" }}>Đổi trả nếu phát sinh lỗi bao bì hoặc sai màu</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "rgba(239, 68, 68, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f87171", flexShrink: 0 }}>
              <Headphones size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "13px", color: "#ffffff" }}>Kỹ Sư Tư Vấn 24/7</div>
              <div style={{ fontSize: "11.5px", color: "#94a3b8" }}>Hỗ trợ tính định mức $m^2$ &amp; khảo sát miễn phí</div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. NÚT NỔI GỌI & BÁO GIÁ DỄ BẤM (GỌN GÀNG, KHÔNG CHÓI) */}
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          zIndex: 999,
        }}
      >
        <button
          onClick={() => onOpenOrderModal && onOpenOrderModal(null)}
          style={{
            background: "#dc2626",
            color: "#ffffff",
            border: "none",
            borderRadius: "30px",
            padding: "11px 18px",
            fontWeight: 700,
            fontSize: "13px",
            display: "flex",
            alignItems: "center",
            gap: "7px",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.4)",
            transition: "transform 0.15s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <FileText size={16} />
          <span>Đặt Mua / Báo Giá</span>
        </button>

        <a
          href="tel:0947707616"
          style={{
            background: "#030c22",
            color: "#ffffff",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            borderRadius: "30px",
            padding: "11px 18px",
            fontWeight: 700,
            fontSize: "13px",
            display: "flex",
            alignItems: "center",
            gap: "7px",
            textDecoration: "none",
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.4)",
            transition: "transform 0.15s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <Phone size={16} color="#22c55e" />
          <span>Gọi: 0947.707.616</span>
        </a>
      </div>
    </div>
  );
}
