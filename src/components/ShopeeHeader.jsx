import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Phone, MessageCircle, FileText, ShieldCheck, Truck, Headphones } from "lucide-react";
import Logo from "./Logo";

export default function ShopeeHeader({ onOpenOrderModal }) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const trendingTags = [
    "Sơn Epoxy 18L",
    "Sơn Chống Thấm PU",
    "Sơn Chống Cháy 120P",
    "Sơn Sân Tennis",
    "Sơn Lót Kháng Kiềm",
    "Mài Sàn Bê Tông",
  ];

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 1000, boxShadow: "0 2px 10px rgba(0,0,0,0.12)" }}>
      {/* 1. Top Shopee Bar */}
      <div
        style={{
          background: "#d0011b",
          color: "rgba(255,255,255,0.9)",
          fontSize: "12px",
          fontFamily: "'DM Sans', sans-serif",
          padding: "5px 0",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <span>Kênh Dự Án &amp; Đại Lý</span>
            <span>|</span>
            <span>Nhà Máy FUJINANO - Công Nghệ Nhật Bản</span>
            <span>|</span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <ShieldCheck size={13} /> Cam Kết 100% Chính Hãng
            </span>
          </div>

          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <a
              href="https://zalo.me/0947707616"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#fff", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}
            >
              <MessageCircle size={13} /> Chat Zalo: 0947.707.616
            </a>
            <span>|</span>
            <a
              href="tel:0947707616"
              style={{ color: "#ffeb3b", fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}
            >
              <Phone size={13} /> Hotline 24/7: 0947.707.616
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Shopee Header Bar (Orange/Red) */}
      <div
        style={{
          background: "linear-gradient(-180deg, #f53d2d, #f63)",
          padding: "16px 0 12px",
          color: "#fff",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          {/* Logo & Mall Badge */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              color: "#fff",
              flexShrink: 0,
            }}
          >
            <div style={{ background: "#fff", padding: "4px 8px", borderRadius: "8px", display: "flex", alignItems: "center" }}>
              <Logo size="sm" dark={true} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  background: "#d0011b",
                  color: "#fff",
                  fontSize: "10px",
                  fontWeight: 800,
                  padding: "1px 6px",
                  borderRadius: "3px",
                  width: "fit-content",
                  letterSpacing: "1px",
                }}
              >
                MALL
              </span>
              <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.5px", marginTop: "2px" }}>
                OFFICIAL STORE
              </span>
            </div>
          </Link>

          {/* Search Box */}
          <div style={{ flex: 1, maxWidth: "680px" }}>
            <form
              onSubmit={handleSearch}
              style={{
                display: "flex",
                background: "#fff",
                borderRadius: "4px",
                padding: "3px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <input
                type="text"
                placeholder="Tìm thùng sơn Epoxy, chống thấm, chống cháy, sơn thể thao..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  padding: "10px 14px",
                  fontSize: "14px",
                  borderRadius: "4px 0 0 4px",
                  color: "#333",
                }}
              />
              <button
                type="submit"
                style={{
                  background: "#ee4d2d",
                  border: "none",
                  color: "#fff",
                  padding: "0 24px",
                  borderRadius: "3px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f53d2d")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#ee4d2d")}
              >
                <Search size={18} />
              </button>
            </form>

            {/* Trending Tags below search */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "6px",
                fontSize: "12px",
                color: "rgba(255,255,255,0.9)",
                overflowX: "auto",
                whiteSpace: "nowrap",
                paddingBottom: "2px",
              }}
            >
              {trendingTags.map((tag) => (
                <span
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag);
                    navigate(`/?q=${encodeURIComponent(tag)}`);
                  }}
                  style={{ cursor: "pointer", transition: "opacity 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 2 Cách Bán Hàng - Nổi Bật Ở Header */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexShrink: 0 }}>
            {/* Cách 1: Nút Để Lại Thông Tin / Đặt Mua */}
            <button
              onClick={() => onOpenOrderModal(null)}
              style={{
                background: "#fff",
                color: "#ee4d2d",
                border: "none",
                borderRadius: "4px",
                padding: "8px 14px",
                fontWeight: 700,
                fontSize: "13px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                transition: "transform 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <FileText size={16} />
              <span>ĐẶT MUA / BÁO GIÁ</span>
            </button>

            {/* Cách 2: Gọi Trực Tiếp Shop */}
            <a
              href="tel:0947707616"
              style={{
                background: "#010a1c",
                color: "#ffeb3b",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "4px",
                padding: "8px 14px",
                fontWeight: 700,
                fontSize: "13px",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                transition: "transform 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <Phone size={15} />
              <span>GỌI SHOP: 0947.707.616</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. Sub Navigation Bar */}
      <nav
        style={{
          background: "#fff",
          borderBottom: "1px solid #e5e5e5",
          fontSize: "13.5px",
          fontWeight: 600,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            gap: "28px",
            height: "44px",
            overflowX: "auto",
            whiteSpace: "nowrap",
          }}
        >
          <Link to="/" style={{ color: "#ee4d2d", textDecoration: "none" }}>
            TẤT CẢ THÙNG SƠN
          </Link>
          <Link to="/?cat=epoxy" style={{ color: "#333", textDecoration: "none" }}>
            Sơn Epoxy Sàn Nhà Xưởng
          </Link>
          <Link to="/?cat=chong-tham" style={{ color: "#333", textDecoration: "none" }}>
            Sơn Chống Thấm PU
          </Link>
          <Link to="/?cat=chong-chay" style={{ color: "#333", textDecoration: "none" }}>
            Sơn Chống Cháy Thép
          </Link>
          <Link to="/?cat=the-thao" style={{ color: "#333", textDecoration: "none" }}>
            Sơn Sân Thể Thao
          </Link>
          <Link to="/?cat=giao-thong" style={{ color: "#333", textDecoration: "none" }}>
            Sơn Kẻ Vạch Giao Thông
          </Link>
          <a
            href="https://zalo.me/0947707616"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0055cc", textDecoration: "none", marginLeft: "auto", display: "flex", alignItems: "center", gap: "4px" }}
          >
            <Headphones size={15} /> Kỹ Sư Trực Tuyến 24/7
          </a>
        </div>
      </nav>
    </header>
  );
}
