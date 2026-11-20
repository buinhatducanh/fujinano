import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Logo from "./Logo";
import { Search, Phone, FileText, X, Menu, Building2, Briefcase, Newspaper, Video, MapPin, ChevronRight } from "lucide-react";

export default function Navbar({ onOpenOrderModal }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get("q") || "";
  const [keyword, setKeyword] = useState(currentQuery);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setKeyword(currentQuery);
  }, [currentQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/?q=${encodeURIComponent(keyword.trim())}`);
    } else {
      navigate("/");
    }
    setMobileMenuOpen(false);
  };

  const handleClear = () => {
    setKeyword("");
    navigate("/");
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.4)",
        }}
      >
        {/* 1. TIER 1: THANH ĐIỀU HƯỚNG SEO & TIỆN ÍCH (TOP UTILITY BAR - 30px) */}
        <div
          className="top-seo-bar"
          style={{
            background: "rgba(0, 8, 25, 0.95)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
            fontSize: "12px",
            color: "#94a3b8",
            padding: "5px 0",
          }}
        >
          <div
            style={{
              maxWidth: "1320px",
              margin: "0 auto",
              padding: "0 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Các trang SEO cốt lõi */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <Link
                to="/ve-chung-toi"
                style={{ color: "#cbd5e1", textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
              >
                Về Chúng Tôi
              </Link>
              <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
              <Link
                to="/du-an"
                style={{ color: "#cbd5e1", textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
              >
                Dự Án Thực Tế
              </Link>
              <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
              <Link
                to="/tin-tuc"
                style={{ color: "#cbd5e1", textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
              >
                Tin Tức &amp; Kỹ Thuật
              </Link>
              <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
              <Link
                to="/video"
                style={{ color: "#cbd5e1", textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
              >
                Video Thi Công
              </Link>
              <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
              <Link
                to="/lien-he"
                style={{ color: "#cbd5e1", textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
              >
                Liên Hệ &amp; Bản Đồ
              </Link>
            </div>

            {/* Thông tin kho bãi & Hotline */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "11.5px" }}>
              <span style={{ color: "#94a3b8" }}>
                Tổng kho Cần Thơ: <strong>45 Mậu Thân</strong>
              </span>
              <span style={{ color: "#94a3b8" }}>
                Hotline 24/7: <strong style={{ color: "#38bdf8" }}>0947.707.616</strong>
              </span>
            </div>
          </div>
        </div>

        {/* 2. TIER 2: THANH HEADER BÁN HÀNG CHÍNH (MAIN BAR - 64px) */}
        <div
          style={{
            background: "rgba(0, 18, 55, 0.96)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          <div
            style={{
              maxWidth: "1320px",
              margin: "0 auto",
              padding: "10px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            {/* Logo Thương Hiệu */}
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              <Logo size="sm" dark={false} />
            </Link>

            {/* Ô Tìm Kiếm Tập Trung (Shopee Style) */}
            <form
              onSubmit={handleSearchSubmit}
              className="header-search-form"
              style={{
                flex: "1 1 520px",
                maxWidth: "580px",
                display: "flex",
                alignItems: "center",
                background: "#ffffff",
                borderRadius: "8px",
                padding: "3px 4px 3px 12px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              <Search size={17} color="#64748b" style={{ flexShrink: 0 }} />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Tìm thùng sơn Epoxy, Chống thấm PU, Chống cháy 120P..."
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
              {keyword && (
                <button
                  type="button"
                  onClick={handleClear}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#94a3b8",
                    padding: "4px 8px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <X size={15} />
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
                  transition: "background 0.15s ease",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#b91c1c")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#dc2626")}
              >
                Tìm Kiếm
              </button>
            </form>

            {/* Đúng 2 Phương Thức Bán Hàng */}
            <div
              className="header-actions"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexShrink: 0,
              }}
            >
              {/* Phương thức 1: Để lại SĐT / Nhận Báo Giá */}
              <button
                onClick={() => onOpenOrderModal && onOpenOrderModal(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "9px 16px",
                  borderRadius: "8px",
                  background: "#dc2626",
                  color: "#ffffff",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: 700,
                  border: "none",
                  boxShadow: "0 2px 8px rgba(220, 38, 38, 0.35)",
                  whiteSpace: "nowrap",
                  transition: "background 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#b91c1c")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#dc2626")}
              >
                <FileText size={15} />
                <span>Báo Giá Nhanh</span>
              </button>

              {/* Phương thức 2: Hotline Trực Tiếp */}
              <a
                href="tel:0947707616"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 14px",
                  background: "rgba(8, 22, 54, 0.9)",
                  color: "#ffffff",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.22)",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  transition: "border-color 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(34, 197, 94, 0.7)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.22)")}
              >
                <Phone size={14} color="#22c55e" />
                <span>0947.707.616</span>
              </a>

              {/* Hamburger Button cho Mobile */}
              <button
                className="mob-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  display: "none",
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "6px",
                  padding: "7px",
                  color: "#ffffff",
                  cursor: "pointer",
                }}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* 3. MOBILE SLIDE DRAWER (ĐẦY ĐỦ CÁC TRANG SEO & ĐIỀU HƯỚNG) */}
        {mobileMenuOpen && (
          <div
            style={{
              background: "#081534",
              borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow: "0 12px 30px rgba(0,0,0,0.6)",
              padding: "16px 20px 24px",
              maxHeight: "85vh",
              overflowY: "auto",
            }}
          >
            <div style={{ fontSize: "11.5px", color: "#94a3b8", fontWeight: 700, marginBottom: "8px", textTransform: "uppercase" }}>
              Trang Doanh Nghiệp &amp; SEO
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "16px" }}>
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  color: "#ffffff",
                  textDecoration: "none",
                  background: "rgba(255,255,255,0.04)",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                <span>Trang Chủ (Thùng Sơn)</span>
                <ChevronRight size={15} color="#94a3b8" />
              </Link>

              <Link
                to="/ve-chung-toi"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  color: "#ffffff",
                  textDecoration: "none",
                  background: "rgba(255,255,255,0.04)",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Building2 size={16} color="#38bdf8" />
                  <span>Về Chúng Tôi (Hồ Sơ Năng Lực)</span>
                </div>
                <ChevronRight size={15} color="#94a3b8" />
              </Link>

              <Link
                to="/du-an"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  color: "#ffffff",
                  textDecoration: "none",
                  background: "rgba(255,255,255,0.04)",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Briefcase size={16} color="#34d399" />
                  <span>Dự Án Đã Nghiệm Thu</span>
                </div>
                <ChevronRight size={15} color="#94a3b8" />
              </Link>

              <Link
                to="/tin-tuc"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  color: "#ffffff",
                  textDecoration: "none",
                  background: "rgba(255,255,255,0.04)",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Newspaper size={16} color="#f59e0b" />
                  <span>Tin Tức &amp; Kiến Thức Sơn</span>
                </div>
                <ChevronRight size={15} color="#94a3b8" />
              </Link>

              <Link
                to="/video"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  color: "#ffffff",
                  textDecoration: "none",
                  background: "rgba(255,255,255,0.04)",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Video size={16} color="#ef4444" />
                  <span>Video Thi Công Thực Tế</span>
                </div>
                <ChevronRight size={15} color="#94a3b8" />
              </Link>

              <Link
                to="/lien-he"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  color: "#ffffff",
                  textDecoration: "none",
                  background: "rgba(255,255,255,0.04)",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <MapPin size={16} color="#38bdf8" />
                  <span>Liên Hệ &amp; Bản Đồ Tổng Kho</span>
                </div>
                <ChevronRight size={15} color="#94a3b8" />
              </Link>
            </div>

            {/* 2 CTA Buttons trên mobile */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrderModal && onOpenOrderModal(null);
                }}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#dc2626",
                  color: "#ffffff",
                  borderRadius: "8px",
                  border: "none",
                  fontWeight: 700,
                  fontSize: "14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <FileText size={16} /> Báo Giá Nhanh / Đặt Mua
              </button>
              <a
                href="tel:0947707616"
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#030c22",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                  color: "#ffffff",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <Phone size={16} color="#22c55e" /> Gọi Hotline: 0947.707.616
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 900px) {
          .top-seo-bar {
            display: none !important;
          }
          .mob-menu-btn {
            display: block !important;
          }
          .header-actions span {
            display: none;
          }
        }
        @media (max-width: 640px) {
          .header-search-form {
            order: 3;
            flex-basis: 100% !important;
            max-width: 100% !important;
            margin-top: 6px;
          }
        }
      `}</style>
    </>
  );
}
