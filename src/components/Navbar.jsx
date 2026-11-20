import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { Phone, FileText, Menu, X, Search, ChevronRight, Building2, Briefcase, Newspaper, MapPin, Layers } from "lucide-react";

export default function Navbar({ onOpenOrderModal }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [navSearchText, setNavSearchText] = useState("");

  const handleNavSearch = (e) => {
    e.preventDefault();
    if (navSearchText.trim()) {
      navigate(`/?q=${encodeURIComponent(navSearchText.trim())}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Trang Chủ", href: "/" },
    { label: "Sản Phẩm", href: "/#products" },
    { label: "Dự Án", href: "/du-an" },
    { label: "Tin Tức", href: "/tin-tuc" },
    { label: "Về Chúng Tôi", href: "/ve-chung-toi" },
    { label: "Liên Hệ", href: "/lien-he" },
  ];

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: "70px",
          background: "rgba(0, 18, 55, 0.95)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.4)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            maxWidth: "1340px",
            width: "100%",
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          {/* 1. Logo Thương Hiệu */}
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

          {/* 2. Menu Điều Hướng Desktop (Gọn gàng & Chuẩn SEO) */}
          <nav className="desk-nav" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {navLinks.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  style={{
                    color: isActive ? "#38bdf8" : "#f1f5f9",
                    fontSize: "14px",
                    fontWeight: isActive ? 700 : 500,
                    textDecoration: "none",
                    padding: "8px 14px",
                    borderRadius: "6px",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#38bdf8";
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isActive ? "#38bdf8" : "#f1f5f9";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* 3. Cụm Hành Động & 2 Phương Thức Bán Hàng */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
            {/* Nút Tìm kiếm nhanh */}
            <div style={{ position: "relative" }} className="desk-nav">
              {searchOpen ? (
                <form
                  onSubmit={handleNavSearch}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "#081534",
                    border: "1px solid rgba(59, 130, 246, 0.4)",
                    borderRadius: "8px",
                    padding: "2px 8px",
                    width: "220px",
                  }}
                >
                  <Search size={14} color="#94a3b8" />
                  <input
                    type="text"
                    autoFocus
                    value={navSearchText}
                    onChange={(e) => setNavSearchText(e.target.value)}
                    placeholder="Tìm thùng sơn..."
                    style={{
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      color: "#fff",
                      fontSize: "12.5px",
                      padding: "6px 8px",
                      width: "100%",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: "2px" }}
                  >
                    <X size={14} />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  title="Tìm kiếm thùng sơn"
                  style={{
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "8px",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#cbd5e1",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.5)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)")}
                >
                  <Search size={16} />
                </button>
              )}
            </div>

            {/* Phương thức 1: Nhận Báo Giá (Modal) */}
            <button
              onClick={() => onOpenOrderModal && onOpenOrderModal(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "8px",
                background: "#dc2626",
                color: "#ffffff",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 700,
                border: "none",
                boxShadow: "0 2px 10px rgba(220, 38, 38, 0.3)",
                whiteSpace: "nowrap",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#b91c1c")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#dc2626")}
            >
              <FileText size={14} />
              <span>Nhận Báo Giá</span>
            </button>

            {/* Phương thức 2: Hotline Kỹ Sư Trực Tiếp */}
            <a
              href="tel:0947707616"
              className="desk-nav"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 14px",
                background: "rgba(8, 22, 54, 0.9)",
                color: "#ffffff",
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 700,
                whiteSpace: "nowrap",
                transition: "border-color 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(34, 197, 94, 0.6)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)")}
            >
              <Phone size={14} color="#22c55e" />
              <span>0947.707.616</span>
            </a>

            {/* Mobile Menu Button */}
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

        {/* 4. Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              position: "absolute",
              top: "70px",
              left: 0,
              right: 0,
              background: "#081534",
              borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow: "0 14px 32px rgba(0,0,0,0.6)",
              padding: "16px 20px 24px",
              maxHeight: "85vh",
              overflowY: "auto",
            }}
          >
            {/* Search trên mobile */}
            <form onSubmit={handleNavSearch} style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
              <input
                type="text"
                value={navSearchText}
                onChange={(e) => setNavSearchText(e.target.value)}
                placeholder="Tìm thùng sơn..."
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "6px",
                  padding: "8px 12px",
                  color: "#fff",
                  fontSize: "13.5px",
                }}
              />
              <button
                type="submit"
                style={{
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "8px 14px",
                  fontWeight: 700,
                  fontSize: "13px",
                }}
              >
                Tìm
              </button>
            </form>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "16px" }}>
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "11px 12px",
                    borderRadius: "8px",
                    color: "#ffffff",
                    textDecoration: "none",
                    background: "rgba(255,255,255,0.04)",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  <span>{item.label}</span>
                  <ChevronRight size={15} color="#94a3b8" />
                </Link>
              ))}
            </div>

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
                <FileText size={16} /> Nhận Báo Giá Nhanh
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
        @media (max-width: 960px) {
          .desk-nav {
            display: none !important;
          }
          .mob-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
