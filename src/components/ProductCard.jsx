import React from "react";
import { Link } from "react-router-dom";
import { Star, Phone, FileText, MapPin, ShieldCheck } from "lucide-react";

export default function ProductCard({ product, onOpenOrder }) {
  if (!product) return null;

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "10px",
        overflow: "hidden",
        border: "1px solid #e2e8f0",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
        position: "relative",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.borderColor = "#cbd5e1";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "#e2e8f0";
        e.currentTarget.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.04)";
      }}
    >
      {/* Clickable Image & Info link */}
      <Link
        to={`/san-pham/${product.slug}`}
        style={{ textDecoration: "none", color: "inherit", display: "block" }}
      >
        {/* Product Image Wrapper */}
        <div style={{ position: "relative", width: "100%", paddingTop: "100%", background: "#f8fafc", overflow: "hidden" }}>
          <img
            src={product.images?.[0] || "/images/slider/epoxy_floor.png"}
            alt={product.name}
            loading="lazy"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.35s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />

          {/* Genuine / Mall Badge */}
          {product.isMall && (
            <div
              style={{
                position: "absolute",
                top: "8px",
                left: "8px",
                background: "#dc2626",
                color: "#ffffff",
                fontSize: "10px",
                fontWeight: 700,
                padding: "2px 7px",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                gap: "3px",
                zIndex: 2,
                boxShadow: "0 2px 4px rgba(220, 38, 38, 0.2)",
                letterSpacing: "0.3px",
              }}
            >
              CHÍNH HÃNG
            </div>
          )}

          {/* Discount Tag */}
          {product.discount > 0 && (
            <div
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                background: "#fef08a",
                color: "#991b1b",
                padding: "2px 6px",
                fontSize: "11px",
                fontWeight: 800,
                borderRadius: "4px",
                zIndex: 2,
                border: "1px solid #fde047",
              }}
            >
              -{product.discount}%
            </div>
          )}

          {/* Free Shipping Tag */}
          <div
            style={{
              position: "absolute",
              bottom: "8px",
              left: "8px",
              background: "#0d9488",
              color: "#fff",
              fontSize: "10px",
              fontWeight: 600,
              padding: "2px 6px",
              borderRadius: "3px",
              zIndex: 2,
            }}
          >
            Freeship Xtra
          </div>
        </div>

        {/* Content Box */}
        <div style={{ padding: "12px 14px 10px" }}>
          {/* Category Tag */}
          <div style={{ fontSize: "11px", color: "#2563eb", fontWeight: 600, marginBottom: "4px", textTransform: "uppercase" }}>
            {product.categoryName || "Thùng Sơn Công Nghiệp"}
          </div>

          {/* Title */}
          <h3
            style={{
              fontSize: "13.5px",
              fontWeight: 600,
              color: "#0f172a",
              margin: "0 0 6px",
              lineHeight: 1.4,
              height: "38px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.name}
          </h3>

          {/* Quality & Spec Badge */}
          <div style={{ display: "flex", gap: "6px", marginBottom: "8px", flexWrap: "wrap" }}>
            <span
              style={{
                background: "#f1f5f9",
                color: "#475569",
                fontSize: "10.5px",
                padding: "2px 6px",
                borderRadius: "3px",
                fontWeight: 500,
              }}
            >
              CO/CQ Đầy Đủ
            </span>
            <span
              style={{
                background: "#ecfdf5",
                color: "#059669",
                fontSize: "10.5px",
                padding: "2px 6px",
                borderRadius: "3px",
                fontWeight: 600,
              }}
            >
              Giá Tận Xưởng
            </span>
          </div>

          {/* Price */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "17px", fontWeight: 800, color: "#dc2626" }}>
              ₫{product.price.toLocaleString("vi-VN")}
            </span>
            {product.originalPrice && (
              <span style={{ fontSize: "11.5px", color: "#94a3b8", textDecoration: "line-through" }}>
                ₫{product.originalPrice.toLocaleString("vi-VN")}
              </span>
            )}
          </div>

          {/* Rating, Sold, Location */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "11px",
              color: "#64748b",
              marginBottom: "8px",
              paddingBottom: "8px",
              borderBottom: "1px dashed #e2e8f0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <Star size={11} fill="#f59e0b" color="#f59e0b" />
              <span style={{ fontWeight: 700, color: "#1e293b" }}>{product.rating}</span>
              <span style={{ margin: "0 2px" }}>•</span>
              <span>Đã bán {product.soldCount}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
              <MapPin size={10} color="#64748b" />
              <span>{product.location || "Cần Thơ"}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* 2 CÁCH BÁN HÀNG TRỰC TIẾP TRÊN CARD (MANDATORY REQUIREMENT) */}
      <div
        style={{
          padding: "0 10px 10px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6px",
          marginTop: "auto",
        }}
      >
        {/* Cách 1: Để lại thông tin / Đặt Mua */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onOpenOrder(product);
          }}
          style={{
            background: "#dc2626",
            color: "#ffffff",
            border: "none",
            borderRadius: "6px",
            padding: "8px 4px",
            fontSize: "11.5px",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#b91c1c")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#dc2626")}
          title="Để lại thông tin nhận tư vấn và đặt mua"
        >
          <FileText size={13} />
          <span>Đặt Mua</span>
        </button>

        {/* Cách 2: Gọi trực tiếp shop */}
        <a
          href="tel:0947707616"
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#0f172a",
            color: "#ffffff",
            border: "1px solid #334155",
            borderRadius: "6px",
            padding: "8px 4px",
            fontSize: "11.5px",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            textDecoration: "none",
            transition: "background 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#1e293b")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#0f172a")}
          title="Gọi trực tiếp hotline shop"
        >
          <Phone size={13} color="#22c55e" />
          <span>Gọi Shop</span>
        </a>
      </div>
    </div>
  );
}
