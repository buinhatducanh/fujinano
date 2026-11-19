import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Zap, Flame, Clock, ShieldCheck, Truck, Headphones, RotateCcw, ChevronRight, Phone, FileText, Search, Sparkles } from "lucide-react";
import { categories, products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Home({ onOpenOrderModal }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(queryParam);

  const [activeCategory, setActiveCategory] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Countdown timer for Flash Sale
  const [timeLeft, setTimeLeft] = useState({
    hours: 3,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 4, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Hero carousel slides
  const slides = [
    {
      title: "TỔNG KHO SƠN SÀN EPOXY & THÙNG SƠN CÔNG NGHIỆP",
      subtitle: "Kháng Hóa Chất • Chịu Xe Nâng 30 Tấn • Bề Mặt Sáng Bóng Như Gương",
      image: "/images/slider/epoxy_floor.png",
      tag: "GIÁ SỈ TẬN NHÀ MÁY",
    },
    {
      title: "SƠN SÂN THỂ THAO TENNIS & SƠN KẺ VẠCH NHIỆT DẺO",
      subtitle: "Đạt Chuẩn Thi Đấu Quốc Tế ITF • Bền Màu 10 Năm • Chống Trơn Trượt",
      image: "/images/slider/sports_court.png",
      tag: "ĐẠI LÝ ỦY QUYỀN CHÍNH HÃNG",
    },
    {
      title: "HÓA CHẤT TĂNG CỨNG & MÀI BÓNG BÊ TÔNG LIQUID HARDENER",
      subtitle: "Công Nghệ Nhật Bản • Kháng Bụi 100% • Bảo Vệ Nền Kho Logistics Bền Vững",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1200&h=500&fit=crop&auto=format",
      tag: "CÔNG NGHỆ NANO NHẬT BẢN",
    },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    } else {
      setSearchParams({});
    }
  };

  // Filter products by category and search
  const filteredProducts = products.filter((p) => {
    const matchCategory = activeCategory === "all" || p.category === activeCategory;
    const matchQuery =
      !queryParam ||
      p.name.toLowerCase().includes(queryParam.toLowerCase()) ||
      p.shortName.toLowerCase().includes(queryParam.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(queryParam.toLowerCase());
    return matchCategory && matchQuery;
  });

  const flashSaleProducts = products.filter((p) => p.flashSale);

  return (
    <div style={{ minHeight: "100vh", padding: "120px 0 80px", position: "relative", zIndex: 1 }}>
      {/* 1. Shopee Top Banner Section (Styled with FUJINANO Dark Glass Theme) */}
      <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 24px" }}>
        {/* Compact Search & Action Bar (Shopee style in FUJINANO theme) */}
        <div
          style={{
            background: "rgba(0, 18, 55, 0.75)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(0, 102, 255, 0.3)",
            borderRadius: "12px",
            padding: "12px 20px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "14px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
          }}
        >
          {/* Search form */}
          <form
            onSubmit={handleSearchSubmit}
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(0, 10, 30, 0.7)",
              border: "1px solid rgba(0, 140, 255, 0.4)",
              borderRadius: "8px",
              padding: "4px 6px",
              flex: "1 1 380px",
              maxWidth: "560px",
            }}
          >
            <input
              type="text"
              placeholder="Tìm thùng sơn Epoxy, chống thấm, chống cháy, sơn sân tennis..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#fff",
                fontSize: "13.5px",
                padding: "8px 12px",
              }}
            />
            <button
              type="submit"
              style={{
                background: "linear-gradient(135deg, #e60012, #ff2a2a)",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "8px 18px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontWeight: 700,
                fontSize: "13px",
              }}
            >
              <Search size={15} />
              <span>Tìm Kiếm</span>
            </button>
          </form>

          {/* 2 CÁCH BÁN HÀNG NỔI BẬT NGAY TRÊN TOP BAR */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
            {/* Cách 1 */}
            <button
              onClick={() => onOpenOrderModal && onOpenOrderModal(null)}
              style={{
                background: "linear-gradient(135deg, #e60012, #ff2a2a)",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "10px 18px",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 15px rgba(230,0,18,0.4)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <FileText size={15} />
              <span>ĐẶT MUA / BÁO GIÁ NHANH</span>
            </button>

            {/* Cách 2 */}
            <a
              href="tel:0947707616"
              style={{
                background: "rgba(0, 10, 30, 0.8)",
                color: "#ffeb3b",
                border: "1px solid rgba(255, 235, 59, 0.5)",
                borderRadius: "8px",
                padding: "10px 18px",
                fontSize: "13px",
                fontWeight: 700,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#ffeb3b";
                e.currentTarget.style.color = "#000";
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0, 10, 30, 0.8)";
                e.currentTarget.style.color = "#ffeb3b";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <Phone size={15} />
              <span>GỌI SHOP: 0947.707.616</span>
            </a>
          </div>
        </div>

        {/* Hero Slider & Right Promo Banners */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2.1fr 1fr",
            gap: "16px",
            marginBottom: "24px",
          }}
          className="grid-2"
        >
          {/* Main Carousel (Left) */}
          <div
            style={{
              position: "relative",
              borderRadius: "14px",
              overflow: "hidden",
              height: "320px",
              border: "1.5px solid rgba(0, 120, 255, 0.35)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
              background: "#010a1c",
            }}
          >
            {slides.map((s, idx) => (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: currentSlide === idx ? 1 : 0,
                  transition: "opacity 0.6s ease-in-out",
                  pointerEvents: currentSlide === idx ? "auto" : "none",
                }}
              >
                <img
                  src={s.image}
                  alt={s.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "brightness(0.65)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to right, rgba(0, 10, 35, 0.92) 0%, rgba(0, 15, 50, 0.5) 60%, transparent 100%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "0 36px",
                    color: "#fff",
                  }}
                >
                  <span
                    style={{
                      background: "linear-gradient(135deg, #e60012, #ff2a2a)",
                      color: "#fff",
                      padding: "3px 10px",
                      borderRadius: "4px",
                      fontSize: "11px",
                      fontWeight: 800,
                      letterSpacing: "0.5px",
                      width: "fit-content",
                      marginBottom: "12px",
                      boxShadow: "0 2px 8px rgba(230,0,18,0.5)",
                    }}
                  >
                    {s.tag}
                  </span>
                  <h2
                    style={{
                      fontSize: "23px",
                      fontWeight: 800,
                      lineHeight: 1.3,
                      marginBottom: "8px",
                      maxWidth: "480px",
                      textShadow: "0 2px 8px rgba(0,0,0,0.7)",
                    }}
                  >
                    {s.title}
                  </h2>
                  <p
                    style={{
                      fontSize: "13.5px",
                      color: "rgba(255,255,255,0.85)",
                      marginBottom: "20px",
                      maxWidth: "440px",
                      lineHeight: 1.5,
                    }}
                  >
                    {s.subtitle}
                  </p>

                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <button
                      onClick={() => onOpenOrderModal && onOpenOrderModal(null)}
                      style={{
                        background: "linear-gradient(135deg, #e60012, #ff2a2a)",
                        color: "#fff",
                        border: "none",
                        padding: "9px 20px",
                        borderRadius: "6px",
                        fontSize: "13px",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        boxShadow: "0 4px 14px rgba(230,0,18,0.4)",
                      }}
                    >
                      <FileText size={15} /> Nhận Báo Giá Nhanh
                    </button>
                    <a
                      href="tel:0947707616"
                      style={{
                        background: "rgba(0, 20, 60, 0.75)",
                        border: "1px solid rgba(255, 235, 59, 0.5)",
                        color: "#ffeb3b",
                        textDecoration: "none",
                        padding: "9px 20px",
                        borderRadius: "6px",
                        fontSize: "13px",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <Phone size={15} /> Gọi Hotline: 0947.707.616
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {/* Slider indicators */}
            <div
              style={{
                position: "absolute",
                bottom: "16px",
                left: "36px",
                display: "flex",
                gap: "6px",
                zIndex: 10,
              }}
            >
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  style={{
                    width: currentSlide === idx ? "26px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    background: currentSlide === idx ? "#e60012" : "rgba(255,255,255,0.4)",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "all 0.2s",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right 2 Promo Banners (Metallic dark glass theme) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", height: "320px" }}>
            {/* Banner 1 */}
            <div
              style={{
                flex: 1,
                borderRadius: "14px",
                overflow: "hidden",
                position: "relative",
                background: "linear-gradient(135deg, rgba(0, 25, 75, 0.85), rgba(0, 10, 35, 0.9))",
                border: "1px solid rgba(0, 140, 255, 0.35)",
                color: "#fff",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ fontSize: "11px", color: "#ffeb3b", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                ★ Chiết Khấu Đến 35% Thùng Sơn
              </div>
              <h4 style={{ fontSize: "16px", fontWeight: 700, margin: "6px 0 6px", lineHeight: 1.3 }}>
                Sơn Epoxy Sàn &amp; Sơn Chống Thấm PU
              </h4>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)", marginBottom: "12px" }}>
                Áp dụng nhà thầu &amp; đại lý đơn từ 5 thùng
              </div>
              <button
                onClick={() => onOpenOrderModal && onOpenOrderModal(null)}
                style={{
                  alignSelf: "flex-start",
                  background: "linear-gradient(135deg, #e60012, #ff2a2a)",
                  color: "#fff",
                  border: "none",
                  padding: "6px 14px",
                  borderRadius: "5px",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Nhận Báo Giá Dự Án &rarr;
              </button>
            </div>

            {/* Banner 2 */}
            <div
              style={{
                flex: 1,
                borderRadius: "14px",
                overflow: "hidden",
                position: "relative",
                background: "linear-gradient(135deg, rgba(30, 0, 10, 0.85), rgba(0, 15, 45, 0.9))",
                border: "1px solid rgba(230, 0, 18, 0.35)",
                color: "#fff",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ fontSize: "11px", color: "#ffeb3b", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                ★ Kỹ Sư Khảo Sát Tận Nơi
              </div>
              <h4 style={{ fontSize: "16px", fontWeight: 700, margin: "6px 0 6px", lineHeight: 1.3 }}>
                Đo Độ Ẩm &amp; Mác Nền Bê Tông Miễn Phí
              </h4>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)", marginBottom: "12px" }}>
                Hỗ trợ kỹ thuật thực địa 24/7 toàn quốc
              </div>
              <a
                href="tel:0947707616"
                style={{
                  alignSelf: "flex-start",
                  background: "#ffeb3b",
                  color: "#000",
                  textDecoration: "none",
                  padding: "6px 14px",
                  borderRadius: "5px",
                  fontSize: "12px",
                  fontWeight: 800,
                }}
              >
                Gọi Kỹ Sư Trực Tiếp &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Shopee Service Guarantee Strip */}
        <div
          style={{
            background: "rgba(0, 18, 55, 0.65)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(0, 100, 255, 0.25)",
            borderRadius: "12px",
            padding: "16px 24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ShieldCheck size={22} color="#00e676" />
            <span style={{ fontSize: "13px", color: "#fff", fontWeight: 600 }}>100% Sơn Chính Hãng (CO/CQ)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Truck size={22} color="#00a8ff" />
            <span style={{ fontSize: "13px", color: "#fff", fontWeight: 600 }}>Giao Hàng Tận Chân Công Trình</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <RotateCcw size={22} color="#ffeb3b" />
            <span style={{ fontSize: "13px", color: "#fff", fontWeight: 600 }}>Đổi Trả 7 Ngày Miễn Phí</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Headphones size={22} color="#ff4d4f" />
            <span style={{ fontSize: "13px", color: "#fff", fontWeight: 600 }}>Kỹ Sư Tư Vấn &amp; Khảo Sát 24/7</span>
          </div>
        </div>
      </div>

      {/* 2. Shopee Category Icon Grid (Dark theme) */}
      <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 24px", marginBottom: "24px" }}>
        <div
          style={{
            background: "rgba(0, 18, 55, 0.72)",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(0, 100, 255, 0.25)",
            borderRadius: "12px",
            padding: "20px 24px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <Sparkles size={16} color="#00a8ff" />
            <span style={{ fontSize: "14px", fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "1px" }}>
              DANH MỤC THÙNG SƠN CÔNG NGHIỆP
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
              gap: "14px",
            }}
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <div
                  key={cat.id}
                  onClick={() => setActiveCategory(activeCategory === cat.id ? "all" : cat.id)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "12px 8px",
                    borderRadius: "10px",
                    border: isActive ? "2px solid #e60012" : "1px solid rgba(0, 100, 255, 0.2)",
                    background: isActive ? "rgba(230, 0, 18, 0.15)" : "rgba(0, 10, 30, 0.55)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    textAlign: "center",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.borderColor = "rgba(0, 150, 255, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.borderColor = "rgba(0, 100, 255, 0.2)";
                  }}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      background: "#010a1c",
                      marginBottom: "10px",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    <img src={cat.img} alt={cat.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <span style={{ fontSize: "12.5px", fontWeight: 600, color: isActive ? "#ff4d4f" : "#fff", lineHeight: 1.3 }}>
                    {cat.name}
                  </span>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>
                    {cat.count} sản phẩm
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Shopee Flash Sale Section (Dark Glowing Theme) */}
      <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 24px", marginBottom: "24px" }}>
        <div
          style={{
            background: "rgba(0, 18, 55, 0.75)",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(230, 0, 18, 0.4)",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 8px 30px rgba(230, 0, 18, 0.15)",
          }}
        >
          {/* Flash Sale Header */}
          <div
            style={{
              padding: "16px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              background: "linear-gradient(90deg, rgba(230, 0, 18, 0.25) 0%, transparent 100%)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#ff4d4f", fontWeight: 800, fontSize: "18px", letterSpacing: "0.5px" }}>
                <Zap size={22} fill="#ff4d4f" color="#ff4d4f" />
                <span>FLASH SALE THÙNG SƠN GIÁ TỐT</span>
              </div>

              {/* Countdown Clocks */}
              <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                <span style={{ background: "#010a1c", color: "#ffeb3b", border: "1px solid rgba(255,235,59,0.3)", padding: "4px 8px", borderRadius: "4px", fontWeight: 800, fontSize: "13px" }}>
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span style={{ fontWeight: 800, color: "#fff" }}>:</span>
                <span style={{ background: "#010a1c", color: "#ffeb3b", border: "1px solid rgba(255,235,59,0.3)", padding: "4px 8px", borderRadius: "4px", fontWeight: 800, fontSize: "13px" }}>
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span style={{ fontWeight: 800, color: "#fff" }}>:</span>
                <span style={{ background: "#010a1c", color: "#ffeb3b", border: "1px solid rgba(255,235,59,0.3)", padding: "4px 8px", borderRadius: "4px", fontWeight: 800, fontSize: "13px" }}>
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
              </div>
            </div>

            <div
              onClick={() => setActiveCategory("all")}
              style={{ fontSize: "13px", color: "#ff4d4f", fontWeight: 700, display: "flex", alignItems: "center", gap: "3px", cursor: "pointer" }}
            >
              <span>Xem tất cả ưu đãi</span>
              <ChevronRight size={16} />
            </div>
          </div>

          {/* Flash Sale Products Row */}
          <div
            style={{
              padding: "20px 24px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "16px",
            }}
          >
            {flashSaleProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} onOpenOrder={onOpenOrderModal} />
            ))}
          </div>
        </div>
      </div>

      {/* 4. Shopee Daily Discover (Gợi Ý Hôm Nay) - Tabbed Main Feed */}
      <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 24px" }}>
        {/* Sticky Tab Header */}
        <div
          style={{
            background: "rgba(0, 18, 55, 0.85)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(0, 100, 255, 0.25)",
            borderBottom: "3px solid #e60012",
            borderRadius: "12px 12px 0 0",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            overflowX: "auto",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          <div
            onClick={() => setActiveCategory("all")}
            style={{
              padding: "16px 22px",
              fontSize: "14px",
              fontWeight: 800,
              color: activeCategory === "all" ? "#ff4d4f" : "rgba(255,255,255,0.7)",
              cursor: "pointer",
              borderBottom: activeCategory === "all" ? "3px solid #e60012" : "none",
              marginBottom: activeCategory === "all" ? "-3px" : "0",
              whiteSpace: "nowrap",
            }}
          >
            GỢI Ý HÔM NAY (TẤT CẢ THÙNG SƠN)
          </div>
          {categories.slice(0, 5).map((cat) => (
            <div
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: "16px 18px",
                fontSize: "13px",
                fontWeight: 600,
                color: activeCategory === cat.id ? "#ff4d4f" : "rgba(255,255,255,0.65)",
                cursor: "pointer",
                borderBottom: activeCategory === cat.id ? "3px solid #e60012" : "none",
                marginBottom: activeCategory === cat.id ? "-3px" : "0",
                whiteSpace: "nowrap",
              }}
            >
              {cat.name}
            </div>
          ))}
        </div>

        {/* 2 Selling Methods Notification Banner */}
        <div
          style={{
            background: "linear-gradient(90deg, rgba(230, 0, 18, 0.2) 0%, rgba(0, 85, 204, 0.2) 100%)",
            borderLeft: "4px solid #e60012",
            borderRight: "1px solid rgba(0, 100, 255, 0.2)",
            padding: "12px 20px",
            fontSize: "13px",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontWeight: 800, color: "#ffeb3b" }}>⚡ 2 CÁCH MUA HÀNG TIỆN LỢI:</span>
            <span>(1) Bấm <strong>"Đặt Mua"</strong> để lại thông tin nhận báo giá chiết khấu, hoặc (2) Bấm <strong>"Gọi Shop"</strong> gặp kỹ sư tư vấn 24/7!</span>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => onOpenOrderModal && onOpenOrderModal(null)}
              style={{
                background: "linear-gradient(135deg, #e60012, #ff2a2a)",
                color: "#fff",
                border: "none",
                padding: "5px 14px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Để Lại Thông Tin
            </button>
            <a
              href="tel:0947707616"
              style={{
                background: "rgba(0, 10, 30, 0.8)",
                border: "1px solid rgba(255,235,59,0.5)",
                color: "#ffeb3b",
                textDecoration: "none",
                padding: "5px 14px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              Gọi 0947.707.616
            </a>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div
          style={{
            background: "rgba(0, 15, 45, 0.65)",
            backdropFilter: "blur(14px)",
            padding: "24px",
            border: "1px solid rgba(0, 100, 255, 0.25)",
            borderTop: "none",
            borderRadius: "0 0 12px 12px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
          }}
        >
          {queryParam && (
            <div style={{ marginBottom: "18px", fontSize: "14px", color: "rgba(255,255,255,0.8)" }}>
              Kết quả tìm kiếm cho từ khóa: <strong style={{ color: "#00a8ff" }}>"{queryParam}"</strong> ({filteredProducts.length} thùng sơn)
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div style={{ padding: "60px 0", textAlign: "center", color: "rgba(255,255,255,0.5)" }}>
              <p style={{ fontSize: "16px", marginBottom: "14px" }}>Không tìm thấy thùng sơn phù hợp.</p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchParams({});
                  setSearchInput("");
                }}
                style={{
                  background: "linear-gradient(135deg, #e60012, #ff2a2a)",
                  color: "#fff",
                  border: "none",
                  padding: "10px 22px",
                  borderRadius: "6px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Xem tất cả thùng sơn
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "16px",
              }}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onOpenOrder={onOpenOrderModal} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 5. Quick Floating Actions (Call & Quote) */}
      <div
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          zIndex: 999,
        }}
      >
        {/* Method 1: Nút để lại thông tin đặt mua nổi */}
        <button
          onClick={() => onOpenOrderModal && onOpenOrderModal(null)}
          style={{
            background: "linear-gradient(135deg, #e60012, #ff2a2a)",
            color: "#fff",
            border: "none",
            borderRadius: "30px",
            padding: "12px 20px",
            fontWeight: 800,
            fontSize: "13.5px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            boxShadow: "0 6px 20px rgba(230, 0, 18, 0.5)",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <FileText size={17} />
          <span>Đặt Mua / Báo Giá</span>
        </button>

        {/* Method 2: Nút gọi hotline nổi */}
        <a
          href="tel:0947707616"
          style={{
            background: "#010a1c",
            color: "#ffeb3b",
            border: "2px solid #ffeb3b",
            borderRadius: "30px",
            padding: "12px 20px",
            fontWeight: 800,
            fontSize: "13.5px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
            boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <Phone size={17} color="#ffeb3b" />
          <span>Gọi Shop: 0947.707.616</span>
        </a>
      </div>
    </div>
  );
}
