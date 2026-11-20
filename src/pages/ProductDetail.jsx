import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Phone,
  MessageCircle,
  FileText,
  Share2,
  Heart,
  ChevronRight,
  Check,
  Building
} from "lucide-react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function ProductDetail({ onOpenOrderModal }) {
  const { slug } = useParams();

  // Find product by slug or id, fallback to products[0]
  const product = products.find((p) => p.slug === slug || p.id === slug) || products[0];

  // States for variants & gallery
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVolume, setSelectedVolume] = useState(
    product.volumes?.[0]?.name || "Thùng 18 Lít"
  );
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0]?.name || "Xanh Lá Cây (#6018)"
  );
  const [quantity, setQuantity] = useState(1);
  const [activeReviewFilter, setActiveReviewFilter] = useState("all");
  const [isLiked, setIsLiked] = useState(false);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImageIndex(0);
    if (product.volumes?.[0]) setSelectedVolume(product.volumes[0].name);
    if (product.colors?.[0]) setSelectedColor(product.colors[0].name);
    setQuantity(1);
  }, [slug, product]);

  // Current price based on selected volume
  const currentVolumeObj = product.volumes?.find((v) => v.name === selectedVolume);
  const currentPrice = currentVolumeObj ? currentVolumeObj.price : product.price;
  const originalPrice = currentVolumeObj ? currentVolumeObj.originalPrice : product.originalPrice;
  const discountPercent = originalPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : product.discount;

  // Handle open order modal with pre-selected options
  const handleOpenOrder = () => {
    if (onOpenOrderModal) {
      onOpenOrderModal(product, selectedVolume, selectedColor, quantity);
    }
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div style={{ minHeight: "100vh", padding: "100px 0 60px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 20px" }}>
        {/* 1. Breadcrumbs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            color: "#94a3b8",
            marginBottom: "16px",
            flexWrap: "wrap",
          }}
        >
          <Link to="/" style={{ color: "#38bdf8", textDecoration: "none" }}>
            Trang Chủ
          </Link>
          <ChevronRight size={13} />
          <Link to={`/?q=${encodeURIComponent(product.categoryName)}`} style={{ color: "#38bdf8", textDecoration: "none" }}>
            {product.categoryName}
          </Link>
          <ChevronRight size={13} />
          <span style={{ color: "#ffffff", fontWeight: 600 }}>{product.shortName}</span>
        </div>

        {/* 2. Main Product Info Box */}
        <div
          style={{
            background: "rgba(8, 22, 54, 0.88)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            borderRadius: "14px",
            padding: "28px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 6px 24px rgba(0,0,0,0.35)",
            display: "grid",
            gridTemplateColumns: "440px 1fr",
            gap: "36px",
            marginBottom: "20px",
          }}
          className="grid-2"
        >
          {/* Left Column: Gallery */}
          <div>
            {/* Main Big Photo */}
            <div
              style={{
                width: "100%",
                paddingTop: "100%",
                position: "relative",
                background: "#030c22",
                borderRadius: "10px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                marginBottom: "12px",
              }}
            >
              <img
                src={product.images?.[selectedImageIndex] || product.images?.[0] || "/images/slider/epoxy_floor.png"}
                alt={product.name}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  left: "12px",
                  background: "#dc2626",
                  color: "#fff",
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: "4px",
                }}
              >
                CHÍNH HÃNG
              </div>
            </div>

            {/* Thumbnail Row */}
            <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "6px" }}>
              {(product.images || []).map((img, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setSelectedImageIndex(idx)}
                  onClick={() => setSelectedImageIndex(idx)}
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "6px",
                    overflow: "hidden",
                    border: selectedImageIndex === idx ? "2px solid #38bdf8" : "1px solid rgba(255, 255, 255, 0.15)",
                    background: "#030c22",
                    cursor: "pointer",
                    flexShrink: 0,
                    opacity: selectedImageIndex === idx ? 1 : 0.6,
                    transition: "all 0.15s ease",
                  }}
                >
                  <img src={img} alt={`thumb-${idx}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>

            {/* Social Share & Favorite */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "14px",
                paddingTop: "12px",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                fontSize: "13px",
                color: "#94a3b8",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Share2 size={15} />
                <span>Chia sẻ:</span>
                <span style={{ color: "#38bdf8", fontWeight: 600, cursor: "pointer" }}>Zalo</span>
                <span>•</span>
                <span style={{ color: "#60a5fa", fontWeight: 600, cursor: "pointer" }}>Facebook</span>
              </div>
              <button
                onClick={() => setIsLiked(!isLiked)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: isLiked ? "#ff4d4f" : "#94a3b8",
                  fontSize: "13px",
                }}
              >
                <Heart size={16} fill={isLiked ? "#ff4d4f" : "none"} color={isLiked ? "#ff4d4f" : "#94a3b8"} />
                <span>Đã thích ({isLiked ? "343" : "342"})</span>
              </button>
            </div>
          </div>

          {/* Right Column: Title, Ratings, Price, Variants & CTAs */}
          <div>
            {/* Title */}
            <h1 style={{ fontSize: "20px", fontWeight: 700, color: "#ffffff", lineHeight: 1.4, margin: "0 0 10px" }}>
              {product.name}
            </h1>

            {/* Rating & Sold count */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginBottom: "16px",
                fontSize: "13px",
                color: "#94a3b8",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ color: "#f59e0b", fontWeight: 800, fontSize: "15px" }}>
                  {product.rating}
                </span>
                <div style={{ display: "flex", color: "#f59e0b" }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
              </div>
              <span style={{ opacity: 0.3 }}>|</span>
              <div>
                <strong style={{ color: "#ffffff" }}>{product.reviewsCount}</strong> Đánh Giá
              </div>
              <span style={{ opacity: 0.3 }}>|</span>
              <div>
                <strong style={{ color: "#ffffff" }}>{product.soldCount}</strong> Đã Bán
              </div>
            </div>

            {/* Price Banner */}
            <div
              style={{
                background: "rgba(2, 10, 28, 0.65)",
                border: "1px solid rgba(220, 38, 38, 0.35)",
                padding: "16px 20px",
                borderRadius: "8px",
                marginBottom: "20px",
                display: "flex",
                alignItems: "baseline",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              {originalPrice && (
                <span style={{ fontSize: "15px", color: "#94a3b8", textDecoration: "line-through" }}>
                  ₫{originalPrice.toLocaleString("vi-VN")}
                </span>
              )}
              <span style={{ fontSize: "26px", fontWeight: 800, color: "#ff4d4f" }}>
                ₫{currentPrice.toLocaleString("vi-VN")}
              </span>
              {discountPercent > 0 && (
                <span
                  style={{
                    background: "#dc2626",
                    color: "#fff",
                    fontSize: "11px",
                    fontWeight: 800,
                    padding: "2px 6px",
                    borderRadius: "3px",
                  }}
                >
                  -{discountPercent}%
                </span>
              )}
              <span style={{ fontSize: "12px", color: "#34d399", fontWeight: 600, background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.25)", padding: "2px 8px", borderRadius: "4px" }}>
                Giá sỉ tận gốc nhà máy
              </span>
            </div>

            {/* Vouchers & Shipping */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px", fontSize: "13px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{ width: "100px", color: "#94a3b8", flexShrink: 0 }}>Ưu Đãi:</span>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {(product.vouchers || ["Giảm ₫50k", "Freeship Xtra"]).map((v, i) => (
                    <span
                      key={i}
                      style={{
                        background: "rgba(225, 29, 72, 0.15)",
                        color: "#fb7185",
                        border: "1px solid rgba(225, 29, 72, 0.3)",
                        padding: "2px 8px",
                        borderRadius: "3px",
                        fontSize: "11.5px",
                        fontWeight: 600,
                      }}
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                <span style={{ width: "100px", color: "#94a3b8", flexShrink: 0, marginTop: "2px" }}>Vận Chuyển:</span>
                <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#34d399", fontWeight: 600 }}>
                    <Truck size={16} />
                    <span>Miễn phí vận chuyển tận chân công trình (Đơn từ 2 thùng)</span>
                  </div>
                  <div style={{ color: "#94a3b8", fontSize: "12px" }}>
                    Gửi hàng từ: <strong style={{ color: "#ffffff" }}>KCN Trà Nóc, TP. Cần Thơ</strong> &amp; Kho Hà Nội / TP.HCM
                  </div>
                </div>
              </div>
            </div>

            {/* Variant 1: Dung Tích / Quy Cách */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "16px", fontSize: "13px" }}>
              <span style={{ width: "100px", color: "#94a3b8", flexShrink: 0, marginTop: "6px" }}>
                Quy Cách:
              </span>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {(product.volumes || []).map((vol) => {
                  const isSelected = selectedVolume === vol.name;
                  return (
                    <button
                      key={vol.name}
                      onClick={() => setSelectedVolume(vol.name)}
                      style={{
                        padding: "7px 14px",
                        borderRadius: "6px",
                        border: isSelected ? "2px solid #dc2626" : "1px solid rgba(255, 255, 255, 0.15)",
                        background: isSelected ? "rgba(220, 38, 38, 0.15)" : "rgba(2, 10, 28, 0.6)",
                        color: isSelected ? "#ff4d4f" : "#ffffff",
                        fontWeight: isSelected ? 700 : 500,
                        fontSize: "13px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {isSelected && <Check size={14} color="#ff4d4f" />}
                      <span>{vol.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Variant 2: Màu Sắc */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "18px", fontSize: "13px" }}>
              <span style={{ width: "100px", color: "#94a3b8", flexShrink: 0, marginTop: "6px" }}>
                Mã Màu:
              </span>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {(product.colors || []).map((col) => {
                  const isSelected = selectedColor === col.name;
                  return (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(col.name)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "5px",
                        border: isSelected ? "2px solid #dc2626" : "1px solid rgba(255, 255, 255, 0.15)",
                        background: isSelected ? "rgba(220, 38, 38, 0.15)" : "rgba(2, 10, 28, 0.6)",
                        color: isSelected ? "#ff4d4f" : "#ffffff",
                        fontWeight: isSelected ? 700 : 500,
                        fontSize: "12px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <span
                        style={{
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          background: col.code || "#ddd",
                          border: "1px solid rgba(255,255,255,0.3)",
                        }}
                      />
                      <span>{col.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px", fontSize: "13px" }}>
              <span style={{ width: "100px", color: "#94a3b8", flexShrink: 0 }}>Số Lượng:</span>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: "6px", overflow: "hidden" }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ width: "32px", height: "32px", border: "none", background: "rgba(2, 10, 28, 0.7)", color: "#ffffff", cursor: "pointer", fontSize: "16px", fontWeight: 700 }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    style={{ width: "48px", height: "32px", border: "none", background: "rgba(2, 10, 28, 0.5)", color: "#ffffff", textAlign: "center", fontSize: "13px", fontWeight: 700, outline: "none" }}
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ width: "32px", height: "32px", border: "none", background: "rgba(2, 10, 28, 0.7)", color: "#ffffff", cursor: "pointer", fontSize: "16px", fontWeight: 700 }}
                  >
                    +
                  </button>
                </div>
                <span style={{ marginLeft: "12px", color: "#94a3b8", fontSize: "12px" }}>
                  {product.stock || 240} thùng sẵn kho
                </span>
              </div>
            </div>

            {/* CRITICAL: 2 CÁCH BÁN HÀNG THEO YÊU CẦU */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.3fr 1.1fr",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              {/* CÁCH 1: ĐỂ LẠI THÔNG TIN ĐẶT MUA / BÁO GIÁ */}
              <button
                type="button"
                onClick={handleOpenOrder}
                style={{
                  background: "#dc2626",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "13px 16px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "2px",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#b91c1c")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#dc2626")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 700, fontSize: "14px" }}>
                  <FileText size={16} />
                  <span>ĐỂ LẠI SĐT BÁO GIÁ</span>
                </div>
                <span style={{ fontSize: "11px", opacity: 0.9 }}>
                  Nhận báo giá chiết khấu trong 5 phút
                </span>
              </button>

              {/* CÁCH 2: GỌI TRỰC TIẾP CHO SHOP */}
              <a
                href="tel:0947707616"
                style={{
                  background: "#030c22",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                  borderRadius: "8px",
                  padding: "13px 16px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "2px",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#0f172a";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#030c22";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.25)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 700, fontSize: "14px" }}>
                  <Phone size={16} color="#22c55e" />
                  <span>GỌI: 0947.707.616</span>
                </div>
                <span style={{ fontSize: "11px", color: "#94a3b8" }}>
                  Tư vấn kỹ thuật trực tiếp 24/7
                </span>
              </a>
            </div>

            {/* Shop Commitments */}
            <div
              style={{
                background: "rgba(2, 10, 28, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                padding: "12px 16px",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
                color: "#cbd5e1",
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <ShieldCheck size={16} color="#34d399" />
                <span>100% Chính Hãng (CO/CQ)</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <RotateCcw size={16} color="#34d399" />
                <span>Đổi trả 7 ngày nếu lỗi</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Building size={16} color="#34d399" />
                <span>Xuất Hóa Đơn VAT</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Shop Profile Strip */}
        <div
          style={{
            background: "rgba(8, 22, 54, 0.88)",
            backdropFilter: "blur(14px)",
            borderRadius: "12px",
            padding: "18px 24px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: "#030c22",
                color: "#fff",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "18px",
              }}
            >
              FN
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h3 style={{ fontSize: "15px", fontWeight: 700, margin: 0, color: "#ffffff" }}>
                  FUJINANO OFFICIAL STORE
                </h3>
                <span style={{ background: "#dc2626", color: "#fff", fontSize: "10px", fontWeight: 700, padding: "1px 5px", borderRadius: "3px" }}>
                  Chính Hãng
                </span>
              </div>
              <div style={{ fontSize: "12px", color: "#94a3b8", marginTop: "3px" }}>
                Online 5 phút trước • Tổng kho Miền Tây &amp; Toàn Quốc
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <a
              href="tel:0947707616"
              style={{
                background: "#030c22",
                color: "#fff",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                textDecoration: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "12.5px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Phone size={13} color="#22c55e" /> Gọi Shop
            </a>
            <a
              href="https://zalo.me/0947707616"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                color: "#ffffff",
                textDecoration: "none",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "12.5px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <MessageCircle size={13} color="#38bdf8" /> Chat Zalo
            </a>
          </div>
        </div>

        {/* 4. Specifications & Description */}
        <div
          style={{
            background: "rgba(8, 22, 54, 0.88)",
            backdropFilter: "blur(14px)",
            borderRadius: "14px",
            padding: "24px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            marginBottom: "20px",
          }}
        >
          {/* CHI TIẾT SẢN PHẨM */}
          <div style={{ marginBottom: "28px" }}>
            <h3
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#ffffff",
                textTransform: "uppercase",
                background: "rgba(2, 10, 28, 0.65)",
                padding: "10px 14px",
                margin: "0 0 16px",
                borderRadius: "6px",
                borderLeft: "3px solid #dc2626",
              }}
            >
              THÔNG SỐ KỸ THUẬT SẢN PHẨM
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "0 12px" }}>
              <div style={{ display: "flex", fontSize: "13.5px", lineHeight: 1.6 }}>
                <span style={{ width: "220px", color: "#94a3b8" }}>Danh Mục</span>
                <span style={{ color: "#38bdf8", fontWeight: 500 }}>FUJINANO &gt; Thùng Sơn &gt; {product.categoryName}</span>
              </div>
              {product.specs &&
                Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} style={{ display: "flex", fontSize: "13.5px", lineHeight: 1.6 }}>
                    <span style={{ width: "220px", color: "#94a3b8" }}>{key}</span>
                    <span style={{ color: "#ffffff", fontWeight: 500 }}>{val}</span>
                  </div>
                ))}
              <div style={{ display: "flex", fontSize: "13.5px", lineHeight: 1.6 }}>
                <span style={{ width: "220px", color: "#94a3b8" }}>Gửi hàng từ</span>
                <span style={{ color: "#ffffff" }}>KCN Trà Nóc, Bình Thủy, TP. Cần Thơ</span>
              </div>
            </div>
          </div>

          {/* MÔ TẢ SẢN PHẨM */}
          <div>
            <h3
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#ffffff",
                textTransform: "uppercase",
                background: "rgba(2, 10, 28, 0.65)",
                padding: "10px 14px",
                margin: "0 0 16px",
                borderRadius: "6px",
                borderLeft: "3px solid #dc2626",
              }}
            >
              MÔ TẢ SẢN PHẨM &amp; HƯỚNG DẪN THI CÔNG
            </h3>

            <div
              style={{
                fontSize: "14px",
                color: "#cbd5e1",
                lineHeight: 1.8,
                padding: "0 12px",
              }}
              dangerouslySetInnerHTML={{ __html: product.description || "<p>Đang cập nhật thông tin chi tiết...</p>" }}
            />
          </div>
        </div>

        {/* 5. Customer Reviews Section */}
        <div
          style={{
            background: "rgba(8, 22, 54, 0.88)",
            backdropFilter: "blur(14px)",
            borderRadius: "14px",
            padding: "24px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            marginBottom: "24px",
          }}
        >
          <h3
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#ffffff",
              textTransform: "uppercase",
              margin: "0 0 16px",
            }}
          >
            ĐÁNH GIÁ CỦA KHÁCH HÀNG
          </h3>

          <div
            style={{
              background: "rgba(2, 10, 28, 0.65)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "8px",
              padding: "20px",
              display: "flex",
              alignItems: "center",
              gap: "28px",
              marginBottom: "20px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "30px", fontWeight: 800, color: "#f59e0b" }}>
                {product.rating} <span style={{ fontSize: "16px", color: "#94a3b8" }}>/ 5</span>
              </div>
              <div style={{ display: "flex", justifyContent: "center", color: "#f59e0b", marginTop: "4px" }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", flex: 1 }}>
              {[
                { id: "all", label: "Tất Cả" },
                { id: "5", label: "5 Sao (175)" },
                { id: "4", label: "4 Sao (11)" },
                { id: "has_comment", label: "Có Bình Luận (140)" },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setActiveReviewFilter(btn.id)}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "6px",
                    border: activeReviewFilter === btn.id ? "1px solid #dc2626" : "1px solid rgba(255, 255, 255, 0.15)",
                    background: activeReviewFilter === btn.id ? "rgba(220, 38, 38, 0.2)" : "rgba(255, 255, 255, 0.06)",
                    color: activeReviewFilter === btn.id ? "#ff4d4f" : "#cbd5e1",
                    fontWeight: activeReviewFilter === btn.id ? 700 : 500,
                    fontSize: "12.5px",
                    cursor: "pointer",
                  }}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reviews List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {(product.reviews || []).map((rev, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  gap: "14px",
                  paddingBottom: "16px",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <img
                  src={rev.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop"}
                  alt={rev.user}
                  style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "1px solid rgba(255, 255, 255, 0.2)" }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#ffffff", marginBottom: "2px" }}>
                    {rev.user}
                  </div>
                  <div style={{ display: "flex", color: "#f59e0b", marginBottom: "3px" }}>
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} size={11} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <div style={{ fontSize: "11.5px", color: "#94a3b8", marginBottom: "6px" }}>
                    {rev.date} | Phân loại: {rev.variant || "Thùng 18 Lít"}
                  </div>
                  <div style={{ fontSize: "13.5px", color: "#cbd5e1", lineHeight: 1.5, marginBottom: "8px" }}>
                    {rev.comment}
                  </div>
                  {rev.images && rev.images.length > 0 && (
                    <div style={{ display: "flex", gap: "8px" }}>
                      {rev.images.map((imgUrl, i) => (
                        <img
                          key={i}
                          src={imgUrl}
                          alt="review-img"
                          style={{ width: "72px", height: "72px", borderRadius: "6px", objectFit: "cover", border: "1px solid rgba(255, 255, 255, 0.15)" }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Related Products Grid */}
        <div>
          <div
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#ffffff",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            CÁC THÙNG SƠN CÙNG DANH MỤC
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
              gap: "16px",
            }}
          >
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} onOpenOrder={onOpenOrderModal} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
