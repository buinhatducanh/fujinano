import React from "react";
import { Link } from "react-router-dom";
import { Star, Phone, FileText, CheckCircle2, ShieldCheck, MapPin } from "lucide-react";

export default function ProductCard({ product, onOpenOrder }) {
  if (!product) return null;

  return (
    <div
      style={{
        background: "rgba(0, 20, 65, 0.72)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderRadius: "10px",
        overflow: "hidden",
        border: "1px solid rgba(0, 102, 255, 0.25)",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        position: "relative",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.35)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.borderColor = "rgba(0, 150, 255, 0.65)";
        e.currentTarget.style.boxShadow = "0 12px 30px rgba(0, 85, 204, 0.38)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "rgba(0, 102, 255, 0.25)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.35)";
      }}
    >
      {/* Clickable Image & Info link */}
      <Link
        to={`/san-pham/${product.slug}`}
        style={{ textDecoration: "none", color: "inherit", display: "block" }}
      >
        {/* Product Image Wrapper */}
        <div style={{ position: "relative", width: "100%", paddingTop: "100%", background: "#020c24", overflow: "hidden" }}>
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
              transition: "transform 0.4s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />

          {/* Shopee Mall Badge */}
          {product.isMall && (
            <div
              style={{
                position: "absolute",
                top: "8px",
                left: "8px",
                background: "linear-gradient(135deg, #e60012, #ff2a2a)",
                color: "#fff",
                fontSize: "10px",
                fontWeight: 800,
                padding: "3px 8px",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                gap: "3px",
                zIndex: 2,
                boxShadow: "0 2px 6px rgba(230,0,18,0.5)",
                letterSpacing: "0.5px",
              }}
            >
              MALL CHÍNH HÃNG
            </div>
          )}

          {/* Shopee Yellow Discount Tag */}
          {product.discount > 0 && (
            <div
              style={{
                position: "absolute",
                top: 0,
                right: "10px",
                background: "linear-gradient(180deg, #ffb300, #ff8f00)",
                color: "#000",
                padding: "4px 5px 6px",
                fontSize: "11px",
                fontWeight: 900,
                textAlign: "center",
                lineHeight: 1.1,
                zIndex: 2,
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)",
                width: "38px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ color: "#d50000" }}>-{product.discount}%</div>
              <div style={{ fontSize: "8.5px", color: "#111", textTransform: "uppercase", fontWeight: 800 }}>GIẢM</div>
            </div>
          )}

          {/* Freeship Xtra Badge */}
          <div
            style={{
              position: "absolute",
              bottom: "8px",
              left: "8px",
              background: "rgba(0, 191, 165, 0.9)",
              color: "#fff",
              fontSize: "10px",
              fontWeight: 700,
              padding: "2px 7px",
              borderRadius: "3px",
              zIndex: 2,
              backdropFilter: "blur(4px)",
            }}
          >
            Freeship Xtra
          </div>
        </div>

        {/* Content Box */}
        <div style={{ padding: "12px 14px 8px" }}>
          {/* Category Mini Tag */}
          <div style={{ fontSize: "11px", color: "rgba(0, 200, 255, 0.9)", fontWeight: 600, marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
            {product.categoryName || "Thùng Sơn Công Nghiệp"}
          </div>

          {/* Title */}
          <h3
            style={{
              fontSize: "13.5px",
              fontWeight: 600,
              color: "#ffffff",
              margin: "0 0 8px",
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

          {/* Quality Tags */}
          <div style={{ display: "flex", gap: "6px", marginBottom: "10px", flexWrap: "wrap" }}>
            <span
              style={{
                border: "1px solid rgba(230, 0, 18, 0.6)",
                background: "rgba(230, 0, 18, 0.12)",
                color: "#ff4d4f",
                fontSize: "10.5px",
                padding: "1px 6px",
                borderRadius: "3px",
                fontWeight: 600,
              }}
            >
              Hàng Nhà Máy
            </span>
            <span
              style={{
                border: "1px solid rgba(0, 230, 118, 0.5)",
                background: "rgba(0, 230, 118, 0.1)",
                color: "#00e676",
                fontSize: "10.5px",
                padding: "1px 6px",
                borderRadius: "3px",
                fontWeight: 600,
              }}
            >
              CO/CQ Đầy Đủ
            </span>
          </div>

          {/* Price */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "17px", fontWeight: 800, color: "#ff4d4f", textShadow: "0 0 10px rgba(255, 77, 79, 0.3)" }}>
              ₫{product.price.toLocaleString("vi-VN")}
            </span>
            {product.originalPrice && (
              <span style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.45)", textDecoration: "line-through" }}>
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
              color: "rgba(255,255,255,0.6)",
              marginBottom: "10px",
              paddingBottom: "8px",
              borderBottom: "1px dashed rgba(255,255,255,0.1)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <Star size={11} fill="#ffce3d" color="#ffce3d" />
              <span style={{ fontWeight: 700, color: "#fff" }}>{product.rating}</span>
              <span style={{ margin: "0 2px" }}>•</span>
              <span>Đã bán {product.soldCount}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
              <MapPin size={10} color="#00a8ff" />
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
          gap: "8px",
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
            background: "linear-gradient(135deg, #e60012, #ff2a2a)",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            padding: "8px 4px",
            fontSize: "11.5px",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            transition: "all 0.2s ease",
            boxShadow: "0 2px 8px rgba(230, 0, 18, 0.4)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.03)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(230, 0, 18, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(230, 0, 18, 0.4)";
          }}
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
            background: "rgba(0, 10, 30, 0.85)",
            color: "#ffeb3b",
            border: "1px solid rgba(255, 235, 59, 0.5)",
            borderRadius: "5px",
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
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#ffeb3b";
            e.currentTarget.style.color = "#000";
            e.currentTarget.style.transform = "scale(1.03)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(255, 235, 59, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0, 10, 30, 0.85)";
            e.currentTarget.style.color = "#ffeb3b";
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";
          }}
          title="Gọi trực tiếp hotline shop"
        >
          <Phone size={13} />
          <span>Gọi Shop</span>
        </a>
      </div>
    </div>
  );
}
