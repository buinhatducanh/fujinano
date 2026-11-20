import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Logo from "./Logo";
import { Search, Phone, FileText, X } from "lucide-react";

export default function Navbar({ onOpenOrderModal }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentQuery = searchParams.get("q") || "";
  const [keyword, setKeyword] = useState(currentQuery);

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
          background: "rgba(0, 18, 55, 0.96)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.35)",
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

          {/* 2. Ô Tìm Kiếm Tập Trung (Shopee Style) */}
          <form
            onSubmit={handleSearchSubmit}
            className="header-search-form"
            style={{
              flex: "1 1 520px",
              maxWidth: "600px",
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
              placeholder="Tìm kiếm thùng sơn (Epoxy, Chống thấm, Chống cháy, Sân tennis...)"
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

          {/* 3. Đúng 2 Phương Thức Bán Hàng Cốt Lõi */}
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
          </div>
        </div>
      </header>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .header-search-form {
            order: 3;
            flex-basis: 100% !important;
            max-width: 100% !important;
            margin-top: 4px;
          }
          header > div {
            flex-wrap: wrap !important;
            padding: 8px 14px !important;
          }
          .header-actions span {
            display: inline;
          }
        }
      `}</style>
    </>
  );
}
