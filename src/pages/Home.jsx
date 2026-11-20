import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Phone, FileText, ShieldCheck, Truck, RotateCcw, Headphones, X } from "lucide-react";
import { categories, products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Home({ onOpenOrderModal }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const [activeCategory, setActiveCategory] = useState("all");

  // Lọc sản phẩm theo danh mục và từ khóa tìm kiếm
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
    <div style={{ minHeight: "100vh", padding: "115px 0 50px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 20px" }}>

        {/* 1. THANH LỌC DANH MỤC THÙNG SƠN TINH GỌN (HORIZONTAL CATEGORY PILLS) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            overflowX: "auto",
            padding: "6px 0 14px",
            marginBottom: "16px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            whiteSpace: "nowrap",
          }}
        >
          <button
            onClick={() => {
              setActiveCategory("all");
              if (queryParam) setSearchParams({});
            }}
            style={{
              background: activeCategory === "all" && !queryParam ? "#dc2626" : "rgba(8, 22, 54, 0.85)",
              color: "#ffffff",
              border: activeCategory === "all" && !queryParam ? "1px solid #dc2626" : "1px solid rgba(255, 255, 255, 0.14)",
              borderRadius: "20px",
              padding: "7px 18px",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.15s ease",
              flexShrink: 0,
            }}
          >
            Tất Cả Thùng Sơn ({products.length})
          </button>

          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(isSelected ? "all" : cat.id);
                  if (queryParam) setSearchParams({});
                }}
                style={{
                  background: isSelected ? "#dc2626" : "rgba(8, 22, 54, 0.85)",
                  color: isSelected ? "#ffffff" : "#cbd5e1",
                  border: isSelected ? "1px solid #dc2626" : "1px solid rgba(255, 255, 255, 0.14)",
                  borderRadius: "20px",
                  padding: "7px 18px",
                  fontSize: "13px",
                  fontWeight: isSelected ? 700 : 500,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  flexShrink: 0,
                }}
              >
                {cat.name} ({cat.count})
              </button>
            );
          })}
        </div>

        {/* 2. TRẠNG THÁI TÌM KIẾM (NẾU CÓ) */}
        {queryParam && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "rgba(8, 22, 54, 0.85)",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              borderRadius: "8px",
              padding: "10px 16px",
              marginBottom: "20px",
              fontSize: "13.5px",
              color: "#94a3b8",
            }}
          >
            <div>
              Kết quả tìm kiếm cho: <strong style={{ color: "#ffffff" }}>"{queryParam}"</strong> ({filteredProducts.length} thùng sơn)
            </div>
            <button
              onClick={() => setSearchParams({})}
              style={{
                background: "transparent",
                border: "none",
                color: "#38bdf8",
                cursor: "pointer",
                fontSize: "12.5px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <X size={14} /> Xóa tìm kiếm
            </button>
          </div>
        )}

        {/* 3. LƯỚI SẢN PHẨM THÙNG SƠN (TRUNG TÂM MÀN HÌNH - SHOPEE STYLE) */}
        <div style={{ marginBottom: "36px" }}>
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
              <p style={{ fontSize: "15px", color: "#94a3b8", marginBottom: "16px" }}>
                Không tìm thấy thùng sơn nào phù hợp với từ khóa "{queryParam}".
              </p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchParams({});
                }}
                style={{
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  padding: "9px 22px",
                  borderRadius: "8px",
                  fontSize: "13.5px",
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
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "18px",
              }}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onOpenOrder={onOpenOrderModal} />
              ))}
            </div>
          )}
        </div>

        {/* 4. CAM KẾT CHẤT LƯỢNG TINH TẾ (CHÂN TRANG) */}
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
              <div style={{ fontSize: "11.5px", color: "#94a3b8" }}>Hỗ trợ đổi trả nếu phát sinh lỗi bao bì hoặc sai màu</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "rgba(239, 68, 68, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f87171", flexShrink: 0 }}>
              <Headphones size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "13px", color: "#ffffff" }}>Kỹ Sư Tư Vấn 24/7</div>
              <div style={{ fontSize: "11.5px", color: "#94a3b8" }}>Hỗ trợ tính định mức m² &amp; khảo sát miễn phí</div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. NÚT NỔI LIÊN HỆ DƯỚI GÓC PHẢI */}
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
          <span>Báo Giá Nhanh</span>
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
          <span>0947.707.616</span>
        </a>
      </div>
    </div>
  );
}
