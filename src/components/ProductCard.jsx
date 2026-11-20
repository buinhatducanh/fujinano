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
            background: "#030c22",
            color: "#ffffff",
            border: "1px solid rgba(255, 255, 255, 0.2)",
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
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#0f172a";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#030c22";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
          }}
          title="Gọi trực tiếp hotline shop"
        >
          <Phone size={13} color="#22c55e" />
          <span>Gọi Shop</span>
        </a>
      </div>
    </div>
  );
}
