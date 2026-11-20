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
  CheckCircle2,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import { useAppContext } from "../context/AppContext";

export default function ProductDetail({ onOpenOrderModal }) {
  const { slug } = useParams();
  const { products, siteSettings } = useAppContext();

  // Tìm sản phẩm theo slug hoặc id, mặc định sản phẩm đầu tiên
  const product = products.find((p) => p.slug === slug || p.id === slug) || products[0];

  // States
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVolume, setSelectedVolume] = useState(
    product.volumes?.[0]?.name || "Thùng 18 Lít"
  );
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0]?.name || "Tiêu chuẩn"
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("specs");
  const [isLiked, setIsLiked] = useState(false);

  // Tính giá hiện tại theo quy cách dung tích được chọn (khai báo trước useEffect)
  const currentVolumeObj = product?.volumes?.find((v) => v.name === selectedVolume);
  const currentPrice = currentVolumeObj ? currentVolumeObj.price : (product?.price || 0);
  const originalPrice = currentVolumeObj ? currentVolumeObj.originalPrice : (product?.originalPrice || 0);
  const discountPercent = originalPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : (product?.discount || 0);

  // Cuộn lên đầu trang và reset lựa chọn khi đổi sản phẩm
  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImageIndex(0);
    if (product?.volumes && product.volumes.length > 0) {
      setSelectedVolume(product.volumes[0].name);
    }
    if (product?.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0].name);
    }
    setQuantity(1);
    setActiveTab("specs");
  }, [slug, product]);

  // SEO & Schema.org Structured Data
  useEffect(() => {
    if (!product) return;

    // 1. Dynamic Page Title
    const pageTitle = `${product.shortName || product.name} - Giá Tốt Chính Hãng | FUJINANO`;
    document.title = pageTitle;

    // 2. Meta Helper
    const setMetaTag = (attrName, attrVal, content) => {
      let meta = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attrName, attrVal);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    const currentUrl = window.location.href;
    const mainImgUrl = product.images?.[0]?.startsWith("http")
      ? product.images[0]
      : `${window.location.origin}${product.images?.[0] || "/images/products/fn-epoxy-18l.jpg"}`;

    const seoDescription = `Mua ${product.name} chính hãng FUJINANO công nghệ Nhật Bản. Giá bán: ₫${(currentVolumeObj ? currentVolumeObj.price : product.price).toLocaleString("vi-VN")}. Đầy đủ chứng chỉ CO/CQ, giao nhanh tận công trình!`;

    // Standard Meta
    setMetaTag("name", "description", seoDescription);
    setMetaTag("name", "keywords", `${product.name}, sơn fujinano, sơn epoxy tự phẳng, sơn chống thấm, giá sơn thùng 18l, fujinano cần thơ`);

    // Open Graph (Facebook, Zalo)
    setMetaTag("property", "og:type", "product");
    setMetaTag("property", "og:title", pageTitle);
    setMetaTag("property", "og:description", seoDescription);
    setMetaTag("property", "og:image", mainImgUrl);
    setMetaTag("property", "og:url", currentUrl);
    setMetaTag("property", "og:site_name", "FUJINANO VIỆT NAM");
    setMetaTag("property", "product:price:amount", String(currentPrice));
    setMetaTag("property", "product:price:currency", "VND");

    // Twitter Card
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", pageTitle);
    setMetaTag("name", "twitter:description", seoDescription);
    setMetaTag("name", "twitter:image", mainImgUrl);

    // Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", currentUrl);

    // 3. Schema.org JSON-LD (Product + BreadcrumbList) for Google Rich Snippets
    const productSchema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      name: product.name,
      image: [mainImgUrl],
      description: seoDescription,
      sku: product.id || "FN-01",
      mpn: product.slug,
      brand: {
        "@type": "Brand",
        name: "FUJINANO JAPAN",
      },
      offers: {
        "@type": "Offer",
        url: currentUrl,
        priceCurrency: "VND",
        price: currentPrice,
        priceValidUntil: "2027-12-31",
        itemCondition: "https://schema.org/NewCondition",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: siteSettings?.companyName || "CÔNG TY TNHH FUJI NANO VIỆT NAM",
        },
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating || "4.9",
        reviewCount: product.reviewsCount || 186,
        bestRating: "5",
        worstRating: "1",
      },
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Trang Chủ",
          item: window.location.origin,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: product.categoryName || "Sơn Công Nghiệp",
          item: `${window.location.origin}/?q=${encodeURIComponent(product.categoryName || "")}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: product.shortName || product.name,
          item: currentUrl,
        },
      ],
    };

    // Inject Scripts
    const injectSchema = (id, data) => {
      let script = document.getElementById(id);
      if (!script) {
        script = document.createElement("script");
        script.id = id;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(data);
    };

    injectSchema("product-jsonld", productSchema);
    injectSchema("breadcrumb-jsonld", breadcrumbSchema);

    // Cleanup when unmounting or switching product
    return () => {
      document.title = "FUJINANO - Giải Pháp Sơn & Chống Thấm Cao Cấp Công Nghệ Nhật Bản";
      const pScript = document.getElementById("product-jsonld");
      if (pScript) pScript.remove();
      const bScript = document.getElementById("breadcrumb-jsonld");
      if (bScript) bScript.remove();
    };
  }, [product, currentPrice, currentVolumeObj, siteSettings]);

  // Xử lý mở modal đặt hàng / báo giá
  const handleOpenOrder = () => {
    if (onOpenOrderModal) {
      onOpenOrderModal(product, selectedVolume, selectedColor, quantity);
    }
  };

  // Danh sách ảnh của sản phẩm
  const productImages = product.images && product.images.length > 0
    ? product.images
    : ["/images/products/fn-epoxy-18l.jpg"];

  // Sản phẩm liên quan cùng danh mục
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || !product.category))
    .slice(0, 4);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "110px 0 60px",
        position: "relative",
        zIndex: 1,
        color: "#ffffff",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        {/* 1. BREADCRUMBS */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            color: "#94a3b8",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <Link to="/" style={{ color: "#38bdf8", textDecoration: "none" }}>
            Trang Chủ
          </Link>
          <ChevronRight size={14} color="#64748b" />
          <Link
            to={`/?q=${encodeURIComponent(product.categoryName || "")}`}
            style={{ color: "#38bdf8", textDecoration: "none" }}
          >
            {product.categoryName || "Sơn Công Nghiệp"}
          </Link>
          <ChevronRight size={14} color="#64748b" />
          <span style={{ color: "#e2e8f0", fontWeight: 600 }}>{product.shortName || product.name}</span>
        </div>

        {/* 2. MAIN PRODUCT SECTION (GALLERY + THÔNG TIN BÁN HÀNG) */}
        <div
          style={{
            background: "rgba(6, 20, 52, 0.9)",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
            padding: "30px",
            display: "grid",
            gridTemplateColumns: "460px 1fr",
            gap: "36px",
            marginBottom: "28px",
          }}
          className="grid-2"
        >
          {/* CỘT TRÁI: HÌNH ẢNH SẢN PHẨM */}
          <div>
            {/* Ảnh to chính */}
            <div
              style={{
                width: "100%",
                paddingTop: "94%",
                position: "relative",
                background: "#ffffff",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                marginBottom: "12px",
              }}
            >
              <img
                src={productImages[selectedImageIndex] || productImages[0]}
                alt={`${product.name} - Sơn chính hãng FUJINANO công nghệ Nhật Bản`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  padding: "16px",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  left: "12px",
                  background: "#dc2626",
                  color: "#ffffff",
                  fontSize: "11px",
                  fontWeight: 700,
                  padding: "3px 8px",
                  borderRadius: "4px",
                }}
              >
                CHÍNH HÃNG
              </div>
            </div>

            {/* Dải ảnh thumbnails */}
            {productImages.length > 1 && (
              <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "4px" }}>
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    style={{
                      width: "74px",
                      height: "74px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      border: selectedImageIndex === idx ? "2px solid #38bdf8" : "1px solid rgba(255, 255, 255, 0.15)",
                      background: "#ffffff",
                      cursor: "pointer",
                      padding: "4px",
                      flexShrink: 0,
                      opacity: selectedImageIndex === idx ? 1 : 0.65,
                      transition: "all 0.15s ease",
                    }}
                  >
                    <img
                      src={img}
                      alt={`${product.shortName || product.name} - Hình ${idx + 1}`}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Dòng chia sẻ & yêu thích */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "14px",
                paddingTop: "12px",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                fontSize: "12.5px",
                color: "#94a3b8",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Share2 size={14} />
                <span>Chia sẻ:</span>
                <a
                  href={`https://zalo.me/?url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#38bdf8", fontWeight: 600 }}
                >
                  Zalo
                </a>
                <span>•</span>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#60a5fa", fontWeight: 600 }}
                >
                  Facebook
                </a>
              </div>

              <button
                type="button"
                onClick={() => setIsLiked(!isLiked)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  color: isLiked ? "#ff4d4f" : "#94a3b8",
                  fontSize: "12.5px",
                }}
              >
                <Heart size={15} fill={isLiked ? "#ff4d4f" : "none"} color={isLiked ? "#ff4d4f" : "#94a3b8"} />
                <span>{isLiked ? "Đã lưu" : "Lưu tin"}</span>
              </button>
            </div>
          </div>

          {/* CỘT PHẢI: THÔNG TIN SẢN PHẨM & MUA HÀNG */}
          <div>
            {/* Tên sản phẩm */}
            <h1
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1.4,
                margin: "0 0 10px",
              }}
            >
              {product.name}
            </h1>

            {/* Đánh giá & tình trạng */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
                fontSize: "13px",
                color: "#94a3b8",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span style={{ color: "#f59e0b", fontWeight: 800 }}>{product.rating || "4.9"}</span>
                <div style={{ display: "flex", color: "#f59e0b" }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
              </div>
              <span style={{ opacity: 0.3 }}>|</span>
              <div>
                <strong style={{ color: "#ffffff" }}>{product.reviewsCount || 186}</strong> đánh giá
              </div>
              <span style={{ opacity: 0.3 }}>|</span>
              <div>
                <strong style={{ color: "#ffffff" }}>{product.soldCount || "1.8k"}</strong> đã bán
              </div>
              <span style={{ opacity: 0.3 }}>|</span>
              <div style={{ color: "#34d399", fontWeight: 600 }}>
                {product.stock ? `${product.stock} thùng sẵn kho` : "Sẵn kho Cần Thơ"}
              </div>
            </div>

            {/* Khung Giá bán */}
            <div
              style={{
                background: "rgba(2, 10, 28, 0.65)",
                border: "1px solid rgba(220, 38, 38, 0.3)",
                padding: "16px 20px",
                borderRadius: "10px",
                marginBottom: "20px",
                display: "flex",
                alignItems: "baseline",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <span style={{ fontSize: "28px", fontWeight: 800, color: "#ff4d4f" }}>
                ₫{currentPrice.toLocaleString("vi-VN")}
              </span>
              {originalPrice && (
                <span style={{ fontSize: "15px", color: "#64748b", textDecoration: "line-through" }}>
                  ₫{originalPrice.toLocaleString("vi-VN")}
                </span>
              )}
              {discountPercent > 0 && (
                <span
                  style={{
                    background: "#dc2626",
                    color: "#ffffff",
                    fontSize: "11.5px",
                    fontWeight: 700,
                    padding: "2px 7px",
                    borderRadius: "4px",
                  }}
                >
                  -{discountPercent}%
                </span>
              )}
              <span
                style={{
                  fontSize: "12px",
                  color: "#34d399",
                  fontWeight: 600,
                  marginLeft: "auto",
                }}
              >
                Giá sỉ tận gốc nhà máy
              </span>
            </div>

            {/* Chọn Quy cách / Dung tích (nếu có) */}
            {product.volumes && product.volumes.length > 0 && (
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "8px" }}>
                  Quy cách đóng gói: <strong style={{ color: "#ffffff" }}>{selectedVolume}</strong>
                </div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {product.volumes.map((vol) => {
                    const isSelected = selectedVolume === vol.name;
                    return (
                      <button
                        key={vol.name}
                        type="button"
                        onClick={() => setSelectedVolume(vol.name)}
                        style={{
                          padding: "8px 14px",
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
            )}

            {/* Chọn Màu sắc (nếu có) */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ marginBottom: "18px" }}>
                <div style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "8px" }}>
                  Màu sắc: <strong style={{ color: "#ffffff" }}>{selectedColor}</strong>
                </div>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {product.colors.map((col) => {
                    const isSelected = selectedColor === col.name;
                    return (
                      <button
                        key={col.name}
                        type="button"
                        onClick={() => setSelectedColor(col.name)}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "6px",
                          border: isSelected ? "2px solid #dc2626" : "1px solid rgba(255, 255, 255, 0.15)",
                          background: isSelected ? "rgba(220, 38, 38, 0.15)" : "rgba(2, 10, 28, 0.6)",
                          color: isSelected ? "#ff4d4f" : "#cbd5e1",
                          fontWeight: isSelected ? 700 : 500,
                          fontSize: "12px",
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
                            border: "1px solid rgba(255, 255, 255, 0.4)",
                          }}
                        />
                        <span>{col.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Chọn Số lượng */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "22px" }}>
              <span style={{ fontSize: "13px", color: "#94a3b8" }}>Số Lượng:</span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "6px",
                  overflow: "hidden",
                  background: "rgba(2, 10, 28, 0.7)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: "34px",
                    height: "34px",
                    border: "none",
                    background: "transparent",
                    color: "#ffffff",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: 700,
                  }}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  style={{
                    width: "48px",
                    height: "34px",
                    border: "none",
                    background: "transparent",
                    color: "#ffffff",
                    textAlign: "center",
                    fontSize: "13px",
                    fontWeight: 700,
                    outline: "none",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    width: "34px",
                    height: "34px",
                    border: "none",
                    background: "transparent",
                    color: "#ffffff",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: 700,
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* CỤM 2 NÚT BÁN HÀNG */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.3fr 1.1fr",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              {/* Nút Đặt mua / Báo giá */}
              <button
                type="button"
                onClick={handleOpenOrder}
                style={{
                  background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
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
                  boxShadow: "0 4px 14px rgba(220, 38, 38, 0.4)",
                  transition: "opacity 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 700, fontSize: "14px" }}>
                  <FileText size={16} />
                  <span>ĐẶT MUA / BÁO GIÁ</span>
                </div>
                <span style={{ fontSize: "11px", opacity: 0.9 }}>
                  Nhận báo giá chiết khấu trong 5 phút
                </span>
              </button>

              {/* Nút Gọi Shop */}
              <a
                href={`tel:${siteSettings?.hotlineRaw || "0947707616"}`}
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
                  transition: "all 0.15s ease",
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
                  <span>GỌI: {siteSettings?.hotline || "0947.707.616"}</span>
                </div>
                <span style={{ fontSize: "11px", color: "#94a3b8" }}>
                  Tư vấn kỹ thuật sơn 24/7
                </span>
              </a>
            </div>

            {/* 3 Cam kết mua hàng */}
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
                <Truck size={16} color="#38bdf8" />
                <span>Giao hàng tận công trình</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <RotateCcw size={16} color="#34d399" />
                <span>Đổi trả 7 ngày nếu lỗi</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. CHI TIẾT SẢN PHẨM & MÔ TẢ (TABS ĐƠN GIẢN) */}
        <div
          style={{
            background: "rgba(6, 20, 52, 0.9)",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            padding: "24px",
            marginBottom: "28px",
          }}
        >
          {/* Header các Tabs */}
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
              gap: "12px",
              marginBottom: "20px",
              overflowX: "auto",
            }}
          >
            {[
              { id: "specs", label: "Thông Số Kỹ Thuật" },
              { id: "desc", label: "Mô Tả & Hướng Dẫn Sử Dụng" },
              { id: "reviews", label: `Đánh Giá Khách Hàng (${product.reviewsCount || 186})` },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: "10px 16px",
                    background: "transparent",
                    border: "none",
                    borderBottom: isActive ? "2px solid #dc2626" : "2px solid transparent",
                    color: isActive ? "#ff4d4f" : "#94a3b8",
                    fontWeight: isActive ? 700 : 500,
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* NỘI DUNG TAB 1: THÔNG SỐ KỸ THUẬT */}
          {activeTab === "specs" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div
                style={{
                  display: "flex",
                  padding: "10px 14px",
                  background: "rgba(2, 10, 28, 0.5)",
                  borderRadius: "6px",
                  fontSize: "13.5px",
                }}
              >
                <span style={{ width: "220px", color: "#94a3b8", flexShrink: 0 }}>Danh Mục</span>
                <span style={{ color: "#38bdf8", fontWeight: 500 }}>{product.categoryName}</span>
              </div>

              {product.specs &&
                Object.entries(product.specs).map(([key, val], idx) => (
                  <div
                    key={key}
                    style={{
                      display: "flex",
                      padding: "10px 14px",
                      background: idx % 2 === 0 ? "rgba(255, 255, 255, 0.02)" : "rgba(2, 10, 28, 0.5)",
                      borderRadius: "6px",
                      fontSize: "13.5px",
                    }}
                  >
                    <span style={{ width: "220px", color: "#94a3b8", flexShrink: 0 }}>{key}</span>
                    <span style={{ color: "#ffffff", fontWeight: 500 }}>{val}</span>
                  </div>
                ))}

              <div
                style={{
                  display: "flex",
                  padding: "10px 14px",
                  background: "rgba(255, 255, 255, 0.02)",
                  borderRadius: "6px",
                  fontSize: "13.5px",
                }}
              >
                <span style={{ width: "220px", color: "#94a3b8", flexShrink: 0 }}>Kho gửi hàng</span>
                <span style={{ color: "#ffffff" }}>KCN Trà Nóc, Bình Thủy, TP. Cần Thơ &amp; Kho Hà Nội / TP.HCM</span>
              </div>
            </div>
          )}

          {/* NỘI DUNG TAB 2: MÔ TẢ CHI TIẾT */}
          {activeTab === "desc" && (
            <div
              style={{
                fontSize: "14px",
                color: "#cbd5e1",
                lineHeight: 1.8,
                padding: "8px 4px",
              }}
              dangerouslySetInnerHTML={{
                __html: product.description || "<p>Thông tin sản phẩm đang được cập nhật...</p>",
              }}
            />
          )}

          {/* NỘI DUNG TAB 3: ĐÁNH GIÁ KHÁCH HÀNG */}
          {activeTab === "reviews" && (
            <div>
              {/* Tổng quan số sao */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  padding: "16px",
                  background: "rgba(2, 10, 28, 0.6)",
                  borderRadius: "10px",
                  marginBottom: "20px",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "28px", fontWeight: 800, color: "#f59e0b" }}>
                    {product.rating || "4.9"} <span style={{ fontSize: "14px", color: "#94a3b8" }}>/ 5</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center", color: "#f59e0b", marginTop: "4px" }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: "13px", color: "#94a3b8" }}>
                  Dựa trên <strong>{product.reviewsCount || 186}</strong> đánh giá của khách hàng và nhà thầu đã sử dụng sản phẩm.
                </div>
              </div>

              {/* Danh sách bình luận */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {(product.reviews || [
                  {
                    user: "tran_hoang_cons",
                    rating: 5,
                    date: "14/10/2026",
                    variant: "Thùng 18 Lít",
                    comment: "Sơn chất lượng rất tốt, độ bám dính cao, thợ thi công dễ dàng và màu sắc rất đều đẹp. Đóng gói cẩn thận.",
                  },
                  {
                    user: "viet_duc_group",
                    rating: 5,
                    date: "02/10/2026",
                    variant: "Thùng 18 Lít",
                    comment: "Giao hàng từ kho Cần Thơ rất nhanh, đầy đủ hóa đơn VAT và chứng nhận CO/CQ. Sẽ tiếp tục ủng hộ Fuji Nano.",
                  },
                ]).map((rev, idx) => (
                  <div
                    key={idx}
                    style={{
                      paddingBottom: "14px",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <strong style={{ fontSize: "13.5px", color: "#ffffff" }}>{rev.user}</strong>
                      <span style={{ fontSize: "11.5px", color: "#64748b" }}>{rev.date}</span>
                    </div>
                    <div style={{ display: "flex", color: "#f59e0b", marginBottom: "4px" }}>
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} size={11} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>
                    <div style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "6px" }}>
                      Phân loại: {rev.variant || "Thùng 18 Lít"}
                    </div>
                    <p style={{ fontSize: "13.5px", color: "#cbd5e1", lineHeight: 1.6, margin: 0 }}>
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 4. SẢN PHẨM CÙNG DANH MỤC */}
        {relatedProducts.length > 0 && (
          <div>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#ffffff",
                textTransform: "uppercase",
                margin: "0 0 16px",
                letterSpacing: "0.5px",
              }}
            >
              SẢN PHẨM CÙNG DANH MỤC
            </h2>
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
        )}
      </div>
    </div>
  );
}
