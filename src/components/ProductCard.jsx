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
                color: "#854d0e",
                padding: "2px 6px",
                fontSize: "11px",
                fontWeight: 800,
                borderRadius: "4px",
                zIndex: 2,
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
              background: "rgba(13, 148, 136, 0.95)",
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
          <div style={{ fontSize: "11px", color: "#38bdf8", fontWeight: 600, marginBottom: "4px", textTransform: "uppercase" }}>
            {product.categoryName || "Thùng Sơn Công Nghiệp"}
          </div>

          {/* Title */}
          <h3
            style={{
              fontSize: "13.5px",
              fontWeight: 600,
              color: "#ffffff",
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
                background: "rgba(255, 255, 255, 0.08)",
                color: "#cbd5e1",
                fontSize: "10.5px",
                padding: "2px 6px",
                borderRadius: "3px",
                fontWeight: 500,
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              CO/CQ Đầy Đủ
            </span>
            <span
              style={{
                background: "rgba(16, 185, 129, 0.15)",
                color: "#34d399",
                fontSize: "10.5px",
                padding: "2px 6px",
                borderRadius: "3px",
                fontWeight: 600,
                border: "1px solid rgba(16, 185, 129, 0.25)",
              }}
            >
              Giá Tận Xưởng
            </span>
          </div>

          {/* Price */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "17px", fontWeight: 800, color: "#ff4d4f" }}>
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
              color: "#94a3b8",
              marginBottom: "8px",
              paddingBottom: "8px",
              borderBottom: "1px dashed rgba(255, 255, 255, 0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <Star size={11} fill="#f59e0b" color="#f59e0b" />
              <span style={{ fontWeight: 700, color: "#ffffff" }}>{product.rating}</span>
              <span style={{ margin: "0 2px" }}>•</span>
              <span>Đã bán {product.soldCount}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
              <MapPin size={10} color="#94a3b8" />
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
