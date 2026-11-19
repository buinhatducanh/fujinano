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
  Building,
  Sparkles,
  MapPin,
  CheckCircle2
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
    <div style={{ minHeight: "100vh", padding: "120px 0 80px", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 24px" }}>
        {/* 1. Breadcrumbs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            color: "rgba(255,255,255,0.6)",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <Link to="/" style={{ color: "#00a8ff", textDecoration: "none" }}>
            Trang Chủ
          </Link>
          <ChevronRight size={13} />
          <Link to={`/?q=${encodeURIComponent(product.categoryName)}`} style={{ color: "#00a8ff", textDecoration: "none" }}>
            {product.categoryName}
          </Link>
          <ChevronRight size={13} />
          <span style={{ color: "#fff", fontWeight: 600 }}>{product.shortName}</span>
        </div>

        {/* 2. Main Product Info Box (Shopee Product Details in FUJINANO Dark Glass Theme) */}
        <div
          style={{
            background: "rgba(0, 18, 55, 0.78)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderRadius: "14px",
            padding: "28px",
            border: "1.5px solid rgba(0, 102, 255, 0.35)",
            boxShadow: "0 10px 35px rgba(0,0,0,0.5)",
            display: "grid",
            gridTemplateColumns: "460px 1fr",
            gap: "40px",
            marginBottom: "24px",
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
                background: "#020c24",
                borderRadius: "10px",
                overflow: "hidden",
                border: "1px solid rgba(0, 102, 255, 0.25)",
                marginBottom: "14px",
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
                  transition: "transform 0.3s ease",
                }}
              />
              {/* Mall Badge */}
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  left: "12px",
                  background: "linear-gradient(135deg, #e60012, #ff2a2a)",
                  color: "#fff",
                  fontSize: "11px",
                  fontWeight: 800,
                  padding: "4px 10px",
                  borderRadius: "4px",
                  boxShadow: "0 2px 8px rgba(230,0,18,0.5)",
                  letterSpacing: "0.5px",
                }}
              >
                FUJINANO MALL
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
                    width: "76px",
                    height: "76px",
                    borderRadius: "6px",
                    overflow: "hidden",
                    border: selectedImageIndex === idx ? "2px solid #00a8ff" : "1px solid rgba(255,255,255,0.15)",
                    background: "#020c24",
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
                marginTop: "16px",
                paddingTop: "14px",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                fontSize: "13px",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Share2 size={15} />
                <span>Chia sẻ:</span>
                <span style={{ color: "#00a8ff", fontWeight: 600, cursor: "pointer" }}>Zalo</span>
                <span>•</span>
                <span style={{ color: "#4267b2", fontWeight: 600, cursor: "pointer" }}>Facebook</span>
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
                  color: isLiked ? "#ff4d4f" : "rgba(255,255,255,0.7)",
                  fontSize: "13px",
                }}
              >
                <Heart size={16} fill={isLiked ? "#ff4d4f" : "none"} color={isLiked ? "#ff4d4f" : "rgba(255,255,255,0.7)"} />
                <span>Đã thích ({isLiked ? "343" : "342"})</span>
              </button>
            </div>
          </div>

          {/* Right Column: Title, Ratings, Price, Variants & CTAs */}
          <div>
            {/* Mall Tag & Title */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "12px" }}>
              <span
                style={{
                  background: "linear-gradient(135deg, #e60012, #ff2a2a)",
                  color: "#fff",
                  fontSize: "11px",
                  fontWeight: 800,
                  padding: "2px 7px",
                  borderRadius: "3px",
                  whiteSpace: "nowrap",
                  marginTop: "3px",
                  boxShadow: "0 2px 6px rgba(230,0,18,0.4)",
                }}
              >
                Mall
              </span>
              <h1 style={{ fontSize: "21px", fontWeight: 700, color: "#fff", lineHeight: 1.4, margin: 0 }}>
                {product.name}
              </h1>
            </div>

            {/* Rating & Sold count */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "18px",
                fontSize: "13px",
                color: "rgba(255,255,255,0.7)",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ color: "#ffce3d", fontWeight: 800, fontSize: "16px" }}>
                  {product.rating}
                </span>
                <div style={{ display: "flex", color: "#ffce3d" }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#ffce3d" color="#ffce3d" />
                  ))}
                </div>
              </div>
              <span style={{ opacity: 0.3 }}>|</span>
              <div>
                <strong style={{ color: "#fff" }}>{product.reviewsCount}</strong> Đánh Giá
              </div>
              <span style={{ opacity: 0.3 }}>|</span>
              <div>
                <strong style={{ color: "#fff" }}>{product.soldCount}</strong> Đã Bán
              </div>
              <div style={{ marginLeft: "auto", color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>
                Mã SP: {product.id.toUpperCase()}
              </div>
            </div>

            {/* Shopee Orange/Red Price Banner (Dark Style) */}
            <div
              style={{
                background: "rgba(0, 10, 30, 0.65)",
                border: "1px solid rgba(230, 0, 18, 0.35)",
                padding: "16px 22px",
                borderRadius: "8px",
                marginBottom: "22px",
                display: "flex",
                alignItems: "baseline",
                gap: "14px",
                flexWrap: "wrap",
              }}
            >
              {originalPrice && (
                <span style={{ fontSize: "16px", color: "rgba(255,255,255,0.45)", textDecoration: "line-through" }}>
                  ₫{originalPrice.toLocaleString("vi-VN")}
                </span>
              )}
              <span style={{ fontSize: "30px", fontWeight: 800, color: "#ff4d4f", textShadow: "0 0 12px rgba(255, 77, 79, 0.35)" }}>
                ₫{currentPrice.toLocaleString("vi-VN")}
              </span>
              {discountPercent > 0 && (
                <span
                  style={{
                    background: "linear-gradient(135deg, #e60012, #ff2a2a)",
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: 800,
                    padding: "3px 8px",
                    borderRadius: "3px",
                    textTransform: "uppercase",
                  }}
                >
                  {discountPercent}% GIẢM
                </span>
              )}
              <span style={{ fontSize: "11.5px", color: "#ffeb3b", fontWeight: 700, background: "rgba(255, 235, 59, 0.12)", border: "1px solid rgba(255,235,59,0.3)", padding: "3px 10px", borderRadius: "4px" }}>
                GÌ CŨNG RẺ - Giá sỉ tận gốc nhà máy
              </span>
            </div>

            {/* Shopee Vouchers & Shipping */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "22px", fontSize: "13px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <span style={{ width: "110px", color: "rgba(255,255,255,0.6)", flexShrink: 0 }}>Mã Giảm Giá:</span>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {(product.vouchers || ["Giảm ₫50k", "Freeship Xtra"]).map((v, i) => (
                    <span
                      key={i}
                      style={{
                        background: "rgba(230, 0, 18, 0.15)",
                        color: "#ff4d4f",
                        border: "1px dashed #ff4d4f",
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
                <span style={{ width: "110px", color: "rgba(255,255,255,0.6)", flexShrink: 0, marginTop: "2px" }}>Vận Chuyển:</span>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#00e676", fontWeight: 700 }}>
                    <Truck size={16} />
                    <span>Miễn phí vận chuyển tận chân công trình (Đơn từ 2 thùng)</span>
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>
                    Gửi hàng từ: <strong style={{ color: "#fff" }}>KCN Trà Nóc, TP. Cần Thơ</strong> / Chi nhánh Hà Nội, TP.HCM
                  </div>
                </div>
              </div>
            </div>

            {/* Variant 1: Dung Tích / Quy Cách */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "18px", fontSize: "13px" }}>
              <span style={{ width: "110px", color: "rgba(255,255,255,0.6)", flexShrink: 0, marginTop: "6px" }}>
                Quy Cách:
              </span>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {(product.volumes || []).map((vol) => {
                  const isSelected = selectedVolume === vol.name;
                  return (
                    <button
                      key={vol.name}
                      onClick={() => setSelectedVolume(vol.name)}
                      style={{
                        padding: "8px 16px",
                        borderRadius: "6px",
                        border: isSelected ? "2px solid #e60012" : "1px solid rgba(0, 102, 255, 0.3)",
                        background: isSelected ? "rgba(230, 0, 18, 0.2)" : "rgba(0, 15, 45, 0.6)",
                        color: isSelected ? "#ff4d4f" : "#fff",
                        fontWeight: isSelected ? 800 : 500,
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
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "20px", fontSize: "13px" }}>
              <span style={{ width: "110px", color: "rgba(255,255,255,0.6)", flexShrink: 0, marginTop: "6px" }}>
                Mã Màu:
              </span>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {(product.colors || []).map((col) => {
                  const isSelected = selectedColor === col.name;
                  return (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(col.name)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "5px",
                        border: isSelected ? "2px solid #e60012" : "1px solid rgba(0, 102, 255, 0.3)",
                        background: isSelected ? "rgba(230, 0, 18, 0.2)" : "rgba(0, 15, 45, 0.6)",
                        color: isSelected ? "#ff4d4f" : "#fff",
                        fontWeight: isSelected ? 800 : 500,
                        fontSize: "12.5px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <span
                        style={{
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          background: col.code || "#ddd",
                          border: "1px solid rgba(255,255,255,0.4)",
                        }}
                      />
                      <span>{col.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px", fontSize: "13px" }}>
              <span style={{ width: "110px", color: "rgba(255,255,255,0.6)", flexShrink: 0 }}>Số Lượng:</span>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", border: "1px solid rgba(0, 102, 255, 0.3)", borderRadius: "6px", overflow: "hidden" }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ width: "34px", height: "34px", border: "none", background: "rgba(0, 15, 45, 0.8)", color: "#fff", cursor: "pointer", fontSize: "16px", fontWeight: 700 }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    style={{ width: "50px", height: "34px", border: "none", background: "rgba(0, 10, 30, 0.6)", color: "#fff", textAlign: "center", fontSize: "14px", fontWeight: 700, outline: "none" }}
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ width: "34px", height: "34px", border: "none", background: "rgba(0, 15, 45, 0.8)", color: "#fff", cursor: "pointer", fontSize: "16px", fontWeight: 700 }}
                  >
                    +
                  </button>
                </div>
                <span style={{ marginLeft: "14px", color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>
                  {product.stock || 240} thùng có sẵn trong kho
                </span>
              </div>
            </div>

            {/* CRITICAL: CHỈ 2 CÁCH BÁN HÀNG THEO YÊU CẦU CỦA NGƯỜI DÙNG */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.4fr 1.1fr",
                gap: "14px",
                marginBottom: "22px",
              }}
            >
              {/* CÁCH 1: ĐỂ LẠI THÔNG TIN ĐẶT MUA / BÁO GIÁ */}
              <button
                type="button"
                onClick={handleOpenOrder}
                style={{
                  background: "linear-gradient(135deg, #e60012, #ff2a2a)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "15px 16px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "3px",
                  boxShadow: "0 6px 20px rgba(230, 0, 18, 0.45)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(230, 0, 18, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(230, 0, 18, 0.45)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 800, fontSize: "15.5px" }}>
                  <FileText size={18} />
                  <span>ĐỂ LẠI THÔNG TIN ĐẶT MUA</span>
                </div>
                <span style={{ fontSize: "12px", opacity: 0.9 }}>
                  Nhận báo giá chiết khấu trong 5 phút
                </span>
              </button>

              {/* CÁCH 2: GỌI TRỰC TIẾP CHO SHOP */}
              <a
                href="tel:0947707616"
                style={{
                  background: "rgba(0, 10, 30, 0.85)",
                  color: "#ffeb3b",
                  border: "1.5px solid rgba(255, 235, 59, 0.6)",
                  borderRadius: "8px",
                  padding: "15px 16px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "3px",
                  textDecoration: "none",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#ffeb3b";
                  e.currentTarget.style.color = "#000";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(255, 235, 59, 0.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(0, 10, 30, 0.85)";
                  e.currentTarget.style.color = "#ffeb3b";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.4)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 800, fontSize: "15.5px" }}>
                  <Phone size={18} />
                  <span>GỌI SHOP: 0947.707.616</span>
                </div>
                <span style={{ fontSize: "12px", opacity: 0.85 }}>
                  Gặp kỹ sư tư vấn kỹ thuật trực tiếp
                </span>
              </a>
            </div>

            {/* Shopee Shop Commitments */}
            <div
              style={{
                background: "rgba(0, 10, 30, 0.55)",
                border: "1px solid rgba(0, 102, 255, 0.25)",
                borderRadius: "8px",
                padding: "12px 18px",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "12px",
                color: "rgba(255,255,255,0.8)",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <ShieldCheck size={16} color="#00e676" />
                <span>100% Chính Hãng (CO/CQ)</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <RotateCcw size={16} color="#00e676" />
                <span>Đổi trả 7 ngày nếu lỗi</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Building size={16} color="#00e676" />
                <span>Xuất Hóa Đơn VAT</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Shop Profile Strip (Shopee Mall Shop Bar in Dark Style) */}
        <div
          style={{
            background: "rgba(0, 18, 55, 0.75)",
            backdropFilter: "blur(14px)",
            borderRadius: "14px",
            padding: "22px 28px",
            border: "1px solid rgba(0, 102, 255, 0.25)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "24px",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {/* Shop Avatar & Name */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #e60012, #0055cc)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 900,
                fontSize: "20px",
                boxShadow: "0 4px 12px rgba(230,0,18,0.4)",
              }}
            >
              FN
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0, color: "#fff" }}>
                  FUJINANO OFFICIAL MALL
                </h3>
                <span style={{ background: "#e60012", color: "#fff", fontSize: "10px", fontWeight: 800, padding: "2px 6px", borderRadius: "3px" }}>
                  Mall Chính Hãng
                </span>
              </div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginTop: "4px" }}>
                Online 5 phút trước • Tổng kho Miền Tây &amp; Toàn Quốc
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <a
                  href="tel:0947707616"
                  style={{
                    background: "linear-gradient(135deg, #e60012, #ff2a2a)",
                    color: "#fff",
                    textDecoration: "none",
                    padding: "5px 14px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <Phone size={13} /> Gọi Shop
                </a>
                <a
                  href="https://zalo.me/0947707616"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "rgba(0, 10, 30, 0.7)",
                    color: "#fff",
                    textDecoration: "none",
                    border: "1px solid rgba(0, 102, 255, 0.4)",
                    padding: "5px 14px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <MessageCircle size={13} color="#00a8ff" /> Chat Zalo
                </a>
              </div>
            </div>
          </div>

          {/* Shop Stats Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px 32px",
              fontSize: "13px",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            <div>
              Đánh Giá: <strong style={{ color: "#ffce3d" }}>4.9 (1.8k)</strong>
            </div>
            <div>
              Tỉ Lệ Phản Hồi: <strong style={{ color: "#00e676" }}>100%</strong>
            </div>
            <div>
              Tham Gia: <strong style={{ color: "#fff" }}>6 Năm</strong>
            </div>
            <div>
              Sản Phẩm: <strong style={{ color: "#fff" }}>50+ Thùng Sơn</strong>
            </div>
            <div>
              Thời Gian Phản Hồi: <strong style={{ color: "#fff" }}>Trong vài phút</strong>
            </div>
            <div>
              Người Theo Dõi: <strong style={{ color: "#fff" }}>24.5k</strong>
            </div>
          </div>
        </div>

        {/* 4. Product Specifications & Description (Bảng Thông Số Shopee in Dark Style) */}
        <div
          style={{
            background: "rgba(0, 18, 55, 0.75)",
            backdropFilter: "blur(14px)",
            borderRadius: "14px",
            padding: "28px",
            border: "1px solid rgba(0, 102, 255, 0.25)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
            marginBottom: "24px",
          }}
        >
          {/* Section 1: CHI TIẾT SẢN PHẨM */}
          <div style={{ marginBottom: "36px" }}>
            <h3
              style={{
                fontSize: "15px",
                fontWeight: 800,
                color: "#fff",
                textTransform: "uppercase",
                background: "rgba(0, 10, 30, 0.65)",
                padding: "12px 18px",
                margin: "0 0 18px",
                borderRadius: "6px",
                borderLeft: "4px solid #e60012",
              }}
            >
              CHI TIẾT SẢN PHẨM
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "0 16px" }}>
              <div style={{ display: "flex", fontSize: "14px", lineHeight: 1.6 }}>
                <span style={{ width: "220px", color: "rgba(255,255,255,0.5)" }}>Danh Mục</span>
                <span style={{ color: "#00a8ff" }}>FUJINANO &gt; Thùng Sơn Công Nghiệp &gt; {product.categoryName}</span>
              </div>
              {product.specs &&
                Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} style={{ display: "flex", fontSize: "14px", lineHeight: 1.6 }}>
                    <span style={{ width: "220px", color: "rgba(255,255,255,0.5)" }}>{key}</span>
                    <span style={{ color: "#fff", fontWeight: 500 }}>{val}</span>
                  </div>
                ))}
              <div style={{ display: "flex", fontSize: "14px", lineHeight: 1.6 }}>
                <span style={{ width: "220px", color: "rgba(255,255,255,0.5)" }}>Gửi hàng từ</span>
                <span style={{ color: "#fff" }}>KCN Trà Nóc, Bình Thủy, TP. Cần Thơ</span>
              </div>
            </div>
          </div>

          {/* Section 2: MÔ TẢ SẢN PHẨM */}
          <div>
            <h3
              style={{
                fontSize: "15px",
                fontWeight: 800,
                color: "#fff",
                textTransform: "uppercase",
                background: "rgba(0, 10, 30, 0.65)",
                padding: "12px 18px",
                margin: "0 0 18px",
                borderRadius: "6px",
                borderLeft: "4px solid #e60012",
              }}
            >
              MÔ TẢ SẢN PHẨM &amp; QUY TRÌNH THI CÔNG
            </h3>

            <div
              style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1.8,
                padding: "0 16px",
              }}
              dangerouslySetInnerHTML={{ __html: product.description || "<p>Đang cập nhật thông tin chi tiết...</p>" }}
            />
          </div>
        </div>

        {/* 5. Customer Reviews Section (Đánh Giá Sản Phẩm Shopee in Dark Style) */}
        <div
          style={{
            background: "rgba(0, 18, 55, 0.75)",
            backdropFilter: "blur(14px)",
            borderRadius: "14px",
            padding: "28px",
            border: "1px solid rgba(0, 102, 255, 0.25)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
            marginBottom: "32px",
          }}
        >
          <h3
            style={{
              fontSize: "15px",
              fontWeight: 800,
              color: "#fff",
              textTransform: "uppercase",
              margin: "0 0 20px",
            }}
          >
            ĐÁNH GIÁ CỦA KHÁCH HÀNG
          </h3>

          {/* Shopee Review Score Box */}
          <div
            style={{
              background: "rgba(0, 10, 30, 0.65)",
              border: "1px solid rgba(0, 102, 255, 0.25)",
              borderRadius: "8px",
              padding: "24px",
              display: "flex",
              alignItems: "center",
              gap: "36px",
              marginBottom: "24px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "34px", fontWeight: 800, color: "#ffce3d" }}>
                {product.rating} <span style={{ fontSize: "18px", color: "rgba(255,255,255,0.6)" }}>trên 5</span>
              </div>
              <div style={{ display: "flex", justifyContent: "center", color: "#ffce3d", marginTop: "4px" }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#ffce3d" color="#ffce3d" />
                ))}
              </div>
            </div>

            {/* Filter buttons */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", flex: 1 }}>
              {[
                { id: "all", label: "Tất Cả" },
                { id: "5", label: "5 Sao (175)" },
                { id: "4", label: "4 Sao (11)" },
                { id: "has_comment", label: "Có Bình Luận (140)" },
                { id: "has_photo", label: "Có Hình Ảnh Thực Tế (95)" },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setActiveReviewFilter(btn.id)}
                  style={{
                    padding: "7px 16px",
                    borderRadius: "4px",
                    border: activeReviewFilter === btn.id ? "1px solid #e60012" : "1px solid rgba(255,255,255,0.15)",
                    background: activeReviewFilter === btn.id ? "rgba(230,0,18,0.2)" : "rgba(0, 15, 45, 0.6)",
                    color: activeReviewFilter === btn.id ? "#ff4d4f" : "#fff",
                    fontWeight: activeReviewFilter === btn.id ? 700 : 400,
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Reviews List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {(product.reviews || []).map((rev, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  gap: "16px",
                  paddingBottom: "20px",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <img
                  src={rev.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop"}
                  alt={rev.user}
                  style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "1px solid rgba(255,255,255,0.2)" }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "13.5px", fontWeight: 700, color: "#fff", marginBottom: "2px" }}>
                    {rev.user}
                  </div>
                  <div style={{ display: "flex", color: "#ffce3d", marginBottom: "4px" }}>
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} size={12} fill="#ffce3d" color="#ffce3d" />
                    ))}
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginBottom: "8px" }}>
                    {rev.date} | Phân loại hàng: {rev.variant || "Thùng 18 Lít"}
                  </div>
                  <div style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.9)", lineHeight: 1.5, marginBottom: "12px" }}>
                    {rev.comment}
                  </div>
                  {rev.images && rev.images.length > 0 && (
                    <div style={{ display: "flex", gap: "10px" }}>
                      {rev.images.map((imgUrl, i) => (
                        <img
                          key={i}
                          src={imgUrl}
                          alt="review-img"
                          style={{ width: "80px", height: "80px", borderRadius: "6px", objectFit: "cover", border: "1px solid rgba(0, 102, 255, 0.4)" }}
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
              fontSize: "15px",
              fontWeight: 800,
              color: "#fff",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "18px",
            }}
          >
            CÁC THÙNG SƠN CÙNG DANH MỤC
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
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
