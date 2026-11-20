import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, Phone, FileText, ShieldCheck, Truck, RotateCcw, Headphones, ArrowRight, X } from "lucide-react";
import { categories } from "../data/products";
import { projects } from "../data/projects";
import ProductCard from "../components/ProductCard";
import CustomerReviewsSection from "../components/CustomerReviewsSection";
import { useAppContext } from "../context/AppContext";

export default function Home({ onOpenOrderModal }) {
  const { products, siteSettings } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(queryParam);
  const [activeCategory, setActiveCategory] = useState("all");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    } else {
      setSearchParams({});
    }
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
        {/* 1. HERO BANNER GỌN GÀNG                                  */}
        {/* ======================================================== */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(8, 26, 68, 0.9) 0%, rgba(2, 14, 42, 0.95) 100%)",
            border: "1px solid rgba(59, 130, 246, 0.2)",
            borderRadius: "14px",
            padding: "28px 30px",
            marginBottom: "28px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.35)",
            display: "grid",
            gridTemplateColumns: "1.3fr 0.9fr",
            gap: "28px",
            alignItems: "center",
          }}
          className="grid-2"
        >
          {/* Cột Trái */}
          <div>
            <h1
              style={{
                fontSize: "26px",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.3,
                marginBottom: "8px",
              }}
            >
              Sơn Công Nghiệp FUJINANO
            </h1>

            <p style={{ fontSize: "14px", color: "#cbd5e1", lineHeight: 1.5, marginBottom: "18px" }}>
              Sơn sàn Epoxy, Chống thấm PU, Sơn chống cháy kết cấu thép &amp; Sân thể thao. Giá sỉ tận nhà máy.
            </p>

            {/* Ô tìm kiếm */}
            <form
              onSubmit={handleSearchSubmit}
              style={{
                display: "flex",
                alignItems: "center",
                background: "#ffffff",
                borderRadius: "8px",
                padding: "3px 4px 3px 12px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                maxWidth: "480px",
              }}
            >
              <Search size={16} color="#64748b" style={{ flexShrink: 0 }} />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Tìm loại sơn cần mua..."
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
          </div>

          {/* Cột Phải: 3 Cam kết uy tín nhà máy (Thay thế box sản phẩm trùng lặp) */}
          <div
            style={{
              background: "rgba(2, 10, 28, 0.65)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "12px",
              padding: "18px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: "rgba(56, 189, 248, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <ShieldCheck size={18} color="#38bdf8" />
              </div>
              <div>
                <strong style={{ fontSize: "13.5px", color: "#ffffff", display: "block" }}>
                  100% Công Nghệ Nhật Bản
                </strong>
                <span style={{ fontSize: "11.5px", color: "#94a3b8" }}>
                  Màng sơn bền chắc, chịu tải nén và kháng hóa chất
                </span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: "rgba(16, 185, 129, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Truck size={18} color="#34d399" />
              </div>
              <div>
                <strong style={{ fontSize: "13.5px", color: "#ffffff", display: "block" }}>
                  Giao Hàng Tận Chân Công Trình
                </strong>
                <span style={{ fontSize: "11.5px", color: "#94a3b8" }}>
                  Hỏa tốc 2H tại Cần Thơ, hỗ trợ chành xe toàn quốc
                </span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  background: "rgba(245, 158, 11, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <RotateCcw size={18} color="#f59e0b" />
              </div>
              <div>
                <strong style={{ fontSize: "13.5px", color: "#ffffff", display: "block" }}>
                  Giá Sỉ Xuất Xưởng &amp; CO/CQ Đầy Đủ
                </strong>
                <span style={{ fontSize: "11.5px", color: "#94a3b8" }}>
                  Bảo hành 5 năm màng sơn, xuất hóa đơn VAT trong ngày
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. KHU VỰC SẢN PHẨM THÙNG SƠN                             */}
        {/* ======================================================== */}
        <div id="products" style={{ marginBottom: "40px" }}>
          {/* Header Sản phẩm */}
          <div style={{ marginBottom: "14px" }}>
            <h2 style={{ fontSize: "19px", fontWeight: 800, color: "#ffffff", margin: 0 }}>
              Sản Phẩm Thùng Sơn
            </h2>
          </div>

          {/* Thanh lọc danh mục (Pills) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              overflowX: "auto",
              paddingBottom: "10px",
              marginBottom: "18px",
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
                padding: "6px 16px",
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
                    padding: "6px 16px",
                    fontSize: "13px",
                    fontWeight: isSelected ? 700 : 500,
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    flexShrink: 0,
                  }}
                >
                  {cat.name}
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
                padding: "8px 14px",
                marginBottom: "16px",
                fontSize: "13px",
                color: "#94a3b8",
              }}
            >
              <div>
                Kết quả cho: <strong style={{ color: "#ffffff" }}>"{queryParam}"</strong> ({filteredProducts.length} sản phẩm)
              </div>
              <button
                onClick={() => setSearchParams({})}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#38bdf8",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <X size={13} /> Xóa tìm kiếm
              </button>
            </div>
          )}

          {/* Lưới 8 Thùng Sơn */}
          {filteredProducts.length === 0 ? (
            <div
              style={{
                background: "rgba(8, 22, 54, 0.88)",
                borderRadius: "12px",
                padding: "50px 20px",
                textAlign: "center",
                border: "1px solid rgba(255, 255, 255, 0.12)",
              }}
            >
              <p style={{ fontSize: "14px", color: "#94a3b8", marginBottom: "14px" }}>
                Không tìm thấy sản phẩm phù hợp với "{queryParam}".
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
                  padding: "8px 18px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Xem tất cả
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
        {/* 3. CHỨNG NHẬN & ĐỐI TÁC                                   */}
        {/* ======================================================== */}
        <div
          style={{
            background: "rgba(8, 22, 54, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
            padding: "20px 24px",
            marginBottom: "36px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "14px" }}>
            <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
              CHỨNG NHẬN &amp; ĐỐI TÁC
            </h3>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "14px",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(2, 10, 28, 0.5)", padding: "10px 14px", borderRadius: "8px" }}>
              <img src="/assets/iso_9001.png" alt="ISO 9001" style={{ height: "40px", width: "auto", objectFit: "contain" }} />
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff" }}>ISO 9001:2015</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(2, 10, 28, 0.5)", padding: "10px 14px", borderRadius: "8px" }}>
              <img src="/assets/fire_safety.png" alt="PCCC" style={{ height: "40px", width: "auto", objectFit: "contain" }} />
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff" }}>Kiểm Định PCCC</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(2, 10, 28, 0.5)", padding: "10px 14px", borderRadius: "8px" }}>
              <img src="/assets/kcc_auth.png" alt="KCC" style={{ height: "40px", width: "auto", objectFit: "contain" }} />
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff" }}>KCC KOREA</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "rgba(2, 10, 28, 0.5)", padding: "10px 14px", borderRadius: "8px" }}>
              <img src="/assets/jotun_auth.png" alt="Jotun" style={{ height: "40px", width: "auto", objectFit: "contain" }} />
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff" }}>JOTUN PAINTS</span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. DỰ ÁN TIÊU BIỂU                                        */}
        {/* ======================================================== */}
        <div style={{ marginBottom: "36px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
              Dự Án Tiêu Biểu
            </h3>
            <Link
              to="/du-an"
              style={{
                color: "#38bdf8",
                fontSize: "12.5px",
                fontWeight: 600,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <span>Xem Tất Cả</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "16px",
            }}
          >
            {featuredProjects.map((p) => (
              <Link
                key={p.slug}
                to={`/du-an/${p.slug}`}
                style={{
                  background: "rgba(8, 22, 54, 0.88)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <div style={{ height: "160px", width: "100%", background: "#030c22", overflow: "hidden" }}>
                  <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "14px" }}>
                  <div style={{ fontSize: "11px", color: "#38bdf8", fontWeight: 600, marginBottom: "2px" }}>
                    {p.client}
                  </div>
                  <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff", margin: "0 0 4px" }}>
                    {p.title}
                  </h4>
                  <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                    {p.service} {p.area ? `• ${p.area}` : ""}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4.5. ĐÁNH GIÁ CỦA KHÁCH HÀNG & NHÀ THẦU                  */}
        {/* ======================================================== */}
        <CustomerReviewsSection />

        {/* ======================================================== */}
        {/* 5. CAM KẾT CHẤT LƯỢNG (GỌN GÀNG)                         */}
        {/* ======================================================== */}
        <div
          style={{
            background: "rgba(8, 22, 54, 0.85)",
            borderRadius: "10px",
            padding: "16px 20px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ShieldCheck size={20} color="#34d399" />
            <span style={{ fontWeight: 600, fontSize: "13px", color: "#ffffff" }}>100% Chính Hãng (CO/CQ)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Truck size={20} color="#38bdf8" />
            <span style={{ fontWeight: 600, fontSize: "13px", color: "#ffffff" }}>Giao Tận Chân Công Trình</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <RotateCcw size={20} color="#fbbf24" />
            <span style={{ fontWeight: 600, fontSize: "13px", color: "#ffffff" }}>Đổi Trả Trong 7 Ngày</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Headphones size={20} color="#f87171" />
            <span style={{ fontWeight: 600, fontSize: "13px", color: "#ffffff" }}>Kỹ Sư Tư Vấn 24/7</span>
          </div>
        </div>
      </div>
    </div>
  );
}
