import React from "react";
import { Link } from "react-router-dom";
import { Star, Phone, FileText, MapPin } from "lucide-react";

export default function ProductCard({ product, onOpenOrder }) {
  if (!product) return null;

  return (
    <div
      style={{
        background: "rgba(8, 22, 54, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "10px",
        overflow: "hidden",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
        position: "relative",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.5)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.45)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
        e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.3)";
      }}
    >
      {/* Clickable Image & Info link */}
      <Link
        to={`/san-pham/${product.slug}`}
        style={{ textDecoration: "none", color: "inherit", display: "block" }}
      >
        {/* Product Image Wrapper */}
        <div style={{ position: "relative", width: "100%", paddingTop: "100%", background: "#ffffff", overflow: "hidden" }}>
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
              objectFit: "contain",
              padding: "6px",
              transition: "transform 0.35s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />

          {/* Discount Tag */}
          {product.discount > 0 && (
            <div
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                background: "#dc2626",
                color: "#ffffff",
                padding: "2px 6px",
                fontSize: "11px",
                fontWeight: 700,
                borderRadius: "4px",
                zIndex: 2,
              }}
            >
              -{product.discount}%
            </div>
          )}
        </div>

        {/* Content Box */}
        <div style={{ padding: "14px 14px 10px" }}>
          {/* Title - Short & Clean */}
          <h3
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#ffffff",
              margin: "0 0 8px",
              lineHeight: 1.35,
              height: "38px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.shortName || product.name}
          </h3>

          {/* Price */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "8px" }}>
            <span style={{ fontSize: "17px", fontWeight: 800, color: "#f87171" }}>
              ₫{product.price.toLocaleString("vi-VN")}
            </span>
            {product.originalPrice && (
              <span style={{ fontSize: "12px", color: "#94a3b8", textDecoration: "line-through" }}>
                ₫{product.originalPrice.toLocaleString("vi-VN")}
              </span>
            )}
          </div>

          {/* Rating & Sold */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "11.5px",
              color: "#94a3b8",
              marginBottom: "8px",
              gap: "4px",
            }}
          >
            <Star size={12} fill="#f59e0b" color="#f59e0b" />
            <span style={{ fontWeight: 700, color: "#ffffff" }}>{product.rating}</span>
            <span style={{ margin: "0 2px" }}>•</span>
            <span>Đã bán {product.soldCount}</span>
          </div>
        </div>
      </Link>

      {/* Nút hành động duy nhất, tinh tế trên nền xanh */}
      <div style={{ padding: "0 12px 14px", marginTop: "auto" }}>
        <Link
          to={`/san-pham/${product.slug}`}
          style={{
            background: "rgba(255, 255, 255, 0.06)",
            color: "#ffffff",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "6px",
            padding: "8px 12px",
            fontSize: "12.5px",
            fontWeight: 600,
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#2563eb";
            e.currentTarget.style.borderColor = "#3b82f6";
            e.currentTarget.style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
            e.currentTarget.style.color = "#ffffff";
          }}
        >
          <span>Xem Chi Tiết &amp; Báo Giá</span>
        </Link>
      </div>
    </div>
  );
}
