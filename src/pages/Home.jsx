import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, Phone, FileText, ShieldCheck, Truck, RotateCcw, Headphones, CheckCircle2, ArrowRight, X, Star } from "lucide-react";
import { categories, products } from "../data/products";
import { projects } from "../data/projects";
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

  // Lọc sản phẩm
  const filteredProducts = products.filter((p) => {
    const matchCategory = activeCategory === "all" || p.category === activeCategory;
    const matchQuery =
      !queryParam ||
      p.name.toLowerCase().includes(queryParam.toLowerCase()) ||
      p.shortName.toLowerCase().includes(queryParam.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(queryParam.toLowerCase());
    return matchCategory && matchQuery;
  });

  const featuredProduct = products[0]; // Sơn Epoxy 18L
  const featuredProjects = projects.slice(0, 3);

  return (
    <div style={{ minHeight: "100vh", padding: "85px 0 60px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: "1340px", margin: "0 auto", padding: "0 20px" }}>
        
        {/* ======================================================== */}
        {/* 1. HERO BANNER THANH LỊCH (BRAND STORE STYLE)             */}
        {/* ======================================================== */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(8, 26, 68, 0.92) 0%, rgba(2, 14, 42, 0.96) 100%)",
            border: "1px solid rgba(59, 130, 246, 0.25)",
            borderRadius: "16px",
            padding: "36px 32px",
            marginBottom: "32px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
            display: "grid",
            gridTemplateColumns: "1.25fr 0.95fr",
            gap: "36px",
            alignItems: "center",
          }}
          className="grid-2"
        >
          {/* Cột Trái: Tiêu đề, mô tả và ô tìm kiếm */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(59, 130, 246, 0.15)",
                border: "1px solid rgba(59, 130, 246, 0.35)",
                borderRadius: "20px",
                padding: "4px 12px",
                marginBottom: "16px",
              }}
            >
              <span style={{ fontSize: "11.5px", color: "#38bdf8", fontWeight: 700, letterSpacing: "0.5px" }}>
                CÔNG NGHỆ NANO NHẬT BẢN • CHUẨN ISO 9001:2015
              </span>
            </div>

            <h1
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.3,
                marginBottom: "12px",
              }}
            >
              TỔNG KHO PHÂN PHỐI SƠN CÔNG NGHIỆP FUJINANO
            </h1>

            <p style={{ fontSize: "14px", color: "#cbd5e1", lineHeight: 1.6, marginBottom: "20px" }}>
              Cung ứng trực tiếp các dòng thùng sơn chất lượng cao: <strong>Sơn sàn Epoxy</strong>, <strong>Chống thấm Polyurethane</strong>, <strong>Sơn chống cháy PCCC</strong>, <strong>Sân tennis</strong>. Giá sỉ tận gốc nhà máy, giao nhanh tận chân công trình.
            </p>

            {/* Ô tìm kiếm thông minh Shopee */}
            <form
              onSubmit={handleSearchSubmit}
              style={{
                display: "flex",
                alignItems: "center",
                background: "#ffffff",
                borderRadius: "8px",
                padding: "3px 4px 3px 12px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.25)",
                marginBottom: "12px",
              }}
            >
              <Search size={16} color="#64748b" style={{ flexShrink: 0 }} />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Nhập loại sơn cần tìm (Ví dụ: Epoxy tự phẳng, Chống thấm 18L...)"
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  padding: "8px 10px",
                  fontSize: "13.5px",
                  color: "#0f172a",
                  background: "transparent",
                  minWidth: 0,
                }}
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput("");
                    setSearchParams({});
                  }}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: "4px 8px" }}
                >
                  <X size={14} />
                </button>
              )}
              <button
                type="submit"
                style={{
                  background: "#dc2626",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "8px 18px",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Tìm Kiếm
              </button>
            </form>

            {/* Gợi ý từ khóa tìm nhanh */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
              <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 600 }}>Gợi ý:</span>
              {quickKeywords.map((kw) => (
                <button
                  key={kw}
                  onClick={() => handleKeywordClick(kw)}
                  style={{
                    background: queryParam === kw ? "rgba(59, 130, 246, 0.3)" : "rgba(255, 255, 255, 0.08)",
                    color: queryParam === kw ? "#38bdf8" : "#cbd5e1",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "14px",
                    padding: "3px 10px",
                    fontSize: "11.5px",
                    cursor: "pointer",
                  }}
                >
                  {kw}
                </button>
              ))}
            </div>

            {/* Cam kết 2 dòng */}
            <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "#38bdf8", fontWeight: 600 }}>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <CheckCircle2 size={13} color="#22c55e" /> CO/CQ &amp; Hóa đơn VAT
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <CheckCircle2 size={13} color="#22c55e" /> Đo độ ẩm &amp; khảo sát miễn phí
              </span>
            </div>
          </div>

          {/* Cột Phải: Thùng sơn nổi bật tiêu biểu */}
          <div
            style={{
              background: "rgba(2, 10, 28, 0.65)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "12px",
              padding: "20px",
              display: "flex",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "150px",
                height: "150px",
                background: "#ffffff",
                borderRadius: "10px",
                padding: "8px",
                flexShrink: 0,
                boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
              }}
            >
              <img
                src={featuredProduct.images?.[0]}
                alt={featuredProduct.name}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <div>
              <span
                style={{
                  background: "#dc2626",
                  color: "#ffffff",
                  fontSize: "10.5px",
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: "4px",
                }}
              >
                BÁN CHẠY NHẤT 2026
              </span>
              <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#ffffff", margin: "8px 0 4px", lineHeight: 1.35 }}>
                {featuredProduct.shortName}
              </h4>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "8px" }}>
                <span style={{ fontSize: "18px", fontWeight: 800, color: "#f87171" }}>
                  ₫{featuredProduct.price.toLocaleString("vi-VN")}
                </span>
                <span style={{ fontSize: "12px", color: "#94a3b8", textDecoration: "line-through" }}>
                  ₫{featuredProduct.originalPrice.toLocaleString("vi-VN")}
                </span>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <Link
                  to={`/san-pham/${featuredProduct.slug}`}
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#ffffff",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "6px",
                    padding: "6px 12px",
                    fontSize: "12px",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Xem Chi Tiết
                </Link>
                <button
                  onClick={() => onOpenOrderModal && onOpenOrderModal(featuredProduct)}
                  style={{
                    background: "#dc2626",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "6px",
                    padding: "6px 12px",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Đặt Mua Ngay
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. KHU VỰC SẢN PHẨM THÙNG SƠN (TRỌNG TÂM E-COMMERCE)      */}
        {/* ======================================================== */}
        <div id="products" style={{ marginBottom: "48px" }}>
          {/* Header Khu Vực Sản Phẩm */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff", letterSpacing: "0.3px", margin: 0 }}>
                DANH MỤC THÙNG SƠN CÔNG NGHIỆP FUJINANO
              </h2>
              <p style={{ fontSize: "12.5px", color: "#94a3b8", margin: "3px 0 0" }}>
                Sơn chính hãng nhà máy — Có đầy đủ thùng 18L, lon 5L, phuy 200L cho nhà thầu
              </p>
            </div>

            <div style={{ fontSize: "12.5px", color: "#38bdf8", fontWeight: 600 }}>
              Hiển thị {filteredProducts.length} sản phẩm
            </div>
          </div>

          {/* Thanh lọc danh mục (Horizontal Category Pills) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              overflowX: "auto",
              paddingBottom: "12px",
              marginBottom: "20px",
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
              Tất Cả ({products.length})
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

          {/* Trạng thái tìm kiếm (nếu có) */}
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

          {/* Lưới 8 Thùng Sơn Shopee */}
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

        {/* ======================================================== */}
        {/* 3. KHỐI CHỨNG CHỈ & TIÊU CHUẨN (ISO 9001, PCCC, JOTUN, KCC) */}
        {/* ======================================================== */}
        <div
          style={{
            background: "rgba(8, 22, 54, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "14px",
            padding: "28px 24px",
            marginBottom: "48px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", margin: "0 0 4px" }}>
              TIÊU CHUẨN CHẤT LƯỢNG &amp; CHỨNG NHẬN ỦY QUYỀN
            </h3>
            <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>
              Sản phẩm đạt chứng nhận kiểm định chất lượng nghiêm ngặt trước khi xuất xưởng
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "rgba(2, 10, 28, 0.5)", padding: "12px", borderRadius: "8px" }}>
              <img src="/assets/iso_9001.png" alt="ISO 9001" style={{ height: "48px", width: "auto", objectFit: "contain" }} />
              <div>
                <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#ffffff" }}>ISO 9001:2015</div>
                <div style={{ fontSize: "11px", color: "#94a3b8" }}>Quản lý chất lượng quốc tế</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "rgba(2, 10, 28, 0.5)", padding: "12px", borderRadius: "8px" }}>
              <img src="/assets/fire_safety.png" alt="PCCC" style={{ height: "48px", width: "auto", objectFit: "contain" }} />
              <div>
                <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#ffffff" }}>CỤC CẢNH SÁT PCCC</div>
                <div style={{ fontSize: "11px", color: "#94a3b8" }}>Kiểm định chống cháy 120P</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "rgba(2, 10, 28, 0.5)", padding: "12px", borderRadius: "8px" }}>
              <img src="/assets/kcc_auth.png" alt="KCC" style={{ height: "48px", width: "auto", objectFit: "contain" }} />
              <div>
                <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#ffffff" }}>KCC KOREA</div>
                <div style={{ fontSize: "11px", color: "#94a3b8" }}>Chứng nhận phân phối chính thức</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "rgba(2, 10, 28, 0.5)", padding: "12px", borderRadius: "8px" }}>
              <img src="/assets/jotun_auth.png" alt="Jotun" style={{ height: "48px", width: "auto", objectFit: "contain" }} />
              <div>
                <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#ffffff" }}>JOTUN PAINTS</div>
                <div style={{ fontSize: "11px", color: "#94a3b8" }}>Đối tác phân phối công nghiệp</div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. KHỐI DỰ ÁN THỰC TẾ TIÊU BIỂU (SOCIAL PROOF)            */}
        {/* ======================================================== */}
        <div style={{ marginBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
            <div>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff", margin: "0 0 4px" }}>
                CÔNG TRÌNH THỰC TẾ ĐÃ NGHIỆM THU
              </h3>
              <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>
                Hơn 850+ nhà máy, xưởng chế biến và sân thể thao trên toàn quốc tin dùng sơn FUJINANO
              </p>
            </div>
            <Link
              to="/du-an"
              style={{
                color: "#38bdf8",
                fontSize: "13px",
                fontWeight: 700,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span>Xem Tất Cả Dự Án</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "20px",
            }}
          >
            {featuredProjects.map((p) => (
              <Link
                key={p.slug}
                to={`/du-an/${p.slug}`}
                style={{
                  background: "rgba(8, 22, 54, 0.88)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "12px",
                  overflow: "hidden",
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <div style={{ height: "180px", width: "100%", background: "#030c22", overflow: "hidden" }}>
                  <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "16px" }}>
                  <div style={{ fontSize: "11.5px", color: "#38bdf8", fontWeight: 700, marginBottom: "4px" }}>
                    {p.client}
                  </div>
                  <h4 style={{ fontSize: "15px", fontWeight: 700, color: "#ffffff", margin: "0 0 6px" }}>
                    {p.title}
                  </h4>
                  <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                    Hệ sơn: <strong style={{ color: "#cbd5e1" }}>{p.service}</strong> {p.area ? `• Diện tích: ${p.area}` : ""}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 5. DẢI CAM KẾT CHẤT LƯỢNG (4 TIÊU CHÍ)                     */}
        {/* ======================================================== */}
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

      {/* 6. NÚT NỔI LIÊN HỆ DƯỚI GÓC PHẢI */}
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
