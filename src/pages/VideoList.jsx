import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Video as VideoIcon,
  Play,
  Search,
  Sparkles,
  Clock,
  Eye,
  Filter,
  Layers,
  ChevronRight,
  ExternalLink,
  X,
  Phone,
  Flame,
  Film,
  Zap,
  CheckCircle2,
  Share2
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function VideoList() {
  const { videos, siteSettings } = useAppContext();

  // Filters & Search
  const [typeFilter, setTypeFilter] = useState("all"); // 'all' | 'horizontal' | 'short'
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal Player State
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    document.title = "Thư Viện Video Thi Công & YouTube Shorts | FUJINANO";
    window.scrollTo(0, 0);
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveVideo(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filtered categories from dataset
  const categories = useMemo(() => {
    const set = new Set();
    videos.forEach((v) => {
      if (v.category) set.add(v.category);
    });
    return ["all", ...Array.from(set)];
  }, [videos]);

  // Counts
  const counts = useMemo(() => {
    const total = videos.length;
    const horizontal = videos.filter((v) => v.type === "horizontal").length;
    const shorts = videos.filter((v) => v.type === "short").length;
    return { total, horizontal, shorts };
  }, [videos]);

  // Filtered Video List
  const filteredVideos = useMemo(() => {
    return videos.filter((v) => {
      const matchType =
        typeFilter === "all" ? true : v.type === typeFilter;
      const matchCat =
        selectedCategory === "all" ? true : v.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === ""
          ? true
          : v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            v.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            v.category?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchType && matchCat && matchSearch;
    });
  }, [videos, typeFilter, selectedCategory, searchQuery]);

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "10px",
        paddingBottom: "80px",
        fontFamily: "'DM Sans', sans-serif",
        color: "#ffffff",
      }}
    >
      <div style={{ maxWidth: "1340px", margin: "0 auto", padding: "0 24px" }}>
        {/* ================================================================= */}
        {/* 1. BREADCRUMB                                                     */}
        {/* ================================================================= */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            color: "#94a3b8",
            marginBottom: "20px",
          }}
        >
          <Link to="/" style={{ color: "#cbd5e1", textDecoration: "none" }}>
            Trang Chủ
          </Link>
          <ChevronRight size={13} color="#64748b" />
          <span style={{ color: "#38bdf8", fontWeight: 600 }}>Thư Viện Video</span>
        </div>

        {/* ================================================================= */}
        {/* 2. HERO HEADER                                                    */}
        {/* ================================================================= */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(8, 28, 77, 0.9) 0%, rgba(3, 14, 46, 0.95) 100%)",
            border: "1px solid rgba(59, 130, 246, 0.25)",
            borderRadius: "20px",
            padding: "36px 32px",
            marginBottom: "36px",
            boxShadow: "0 16px 40px rgba(0, 0, 0, 0.4)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle Decorative Glow */}
          <div
            style={{
              position: "absolute",
              top: "-80px",
              right: "-80px",
              width: "280px",
              height: "280px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0) 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-60px",
              left: "-60px",
              width: "240px",
              height: "240px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, rgba(56, 189, 248, 0) 70%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1, maxWidth: "860px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(239, 68, 68, 0.15)",
                border: "1px solid rgba(239, 68, 68, 0.35)",
                color: "#f87171",
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.5px",
                marginBottom: "14px",
                textTransform: "uppercase",
              }}
            >
              <VideoIcon size={14} />
              <span>YOUTUBE VIDEO &amp; SHORTS THỰC TẾ</span>
            </div>

            <h1
              style={{
                fontSize: "clamp(26px, 3.2vw, 38px)",
                fontWeight: 900,
                color: "#ffffff",
                lineHeight: 1.25,
                margin: "0 0 14px",
                fontFamily: "'Be Vietnam Pro', sans-serif",
              }}
            >
              THƯ VIỆN VIDEO THI CÔNG &amp; MẸO KỸ THUẬT NANO
            </h1>

            <p
              style={{
                fontSize: "14.5px",
                color: "#cbd5e1",
                lineHeight: 1.7,
                margin: "0 0 24px",
              }}
            >
              Tổng hợp video quay cận cảnh các công trình thực tế (16:9 Widescreen) và chuỗi video ngắn YouTube Shorts (9:16 Vertical) — hướng dẫn kỹ thuật mài sàn, quy trình sơn tự san phẳng, kiểm tra ngâm nước chống thấm và các thử nghiệm độ bền va đập từ kỹ sư FUJINANO.
            </p>

            {/* Quick Stat Badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              <div
                style={{
                  background: "rgba(2, 10, 28, 0.7)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Film size={15} color="#38bdf8" />
                <span>
                  <strong>{counts.horizontal}</strong> Video Ngang 16:9
                </span>
              </div>

              <div
                style={{
                  background: "rgba(2, 10, 28, 0.7)",
                  border: "1px solid rgba(239, 68, 68, 0.25)",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Zap size={15} color="#f87171" />
                <span>
                  <strong>{counts.shorts}</strong> YouTube Shorts 9:16
                </span>
              </div>

              <div
                style={{
                  background: "rgba(2, 10, 28, 0.7)",
                  border: "1px solid rgba(16, 185, 129, 0.25)",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <CheckCircle2 size={15} color="#34d399" />
                <span>100% Video Công Trình Thực Tế</span>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. TABS (TẤT CẢ / VIDEO NGANG / SHORTS) & SEARCH BAR              */}
        {/* ================================================================= */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "20px",
          }}
        >
          {/* Primary View Mode Tabs */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(2, 12, 38, 0.9)",
              padding: "5px",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              gap: "4px",
            }}
          >
            {[
              { id: "all", label: "Tất Cả", icon: Layers, count: counts.total },
              { id: "horizontal", label: "Video Ngang 16:9", icon: Film, count: counts.horizontal },
              { id: "short", label: "YouTube Shorts 9:16", icon: Zap, count: counts.shorts },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = typeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setTypeFilter(tab.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    padding: "9px 16px",
                    borderRadius: "8px",
                    border: "none",
                    background: isActive
                      ? tab.id === "short"
                        ? "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"
                        : "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)"
                      : "transparent",
                    color: isActive ? "#ffffff" : "#94a3b8",
                    fontWeight: isActive ? 700 : 500,
                    fontSize: "13.5px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <Icon size={15} />
                  <span>{tab.label}</span>
                  <span
                    style={{
                      fontSize: "11px",
                      padding: "2px 6px",
                      borderRadius: "10px",
                      background: isActive ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)",
                      color: isActive ? "#ffffff" : "#64748b",
                    }}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(2, 12, 38, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "10px",
              padding: "0 14px",
              width: "100%",
              maxWidth: "360px",
            }}
          >
            <Search size={16} color="#64748b" style={{ flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Tìm video, chủ đề, mẹo kỹ thuật..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "11px 12px",
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#ffffff",
                fontSize: "13.5px",
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer" }}
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 4. CATEGORY PILLS FILTER                                          */}
        {/* ================================================================= */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            overflowX: "auto",
            paddingBottom: "12px",
            marginBottom: "28px",
            scrollbarWidth: "none",
          }}
        >
          <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 700, textTransform: "uppercase", marginRight: "4px" }}>
            Chủ đề:
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const label = cat === "all" ? "Tất Cả Hạng Mục" : cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  whiteSpace: "nowrap",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "12.5px",
                  fontWeight: isSelected ? 700 : 500,
                  border: isSelected
                    ? "1px solid #38bdf8"
                    : "1px solid rgba(255, 255, 255, 0.1)",
                  background: isSelected
                    ? "rgba(56, 189, 248, 0.15)"
                    : "rgba(2, 12, 38, 0.6)",
                  color: isSelected ? "#38bdf8" : "#cbd5e1",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* ================================================================= */}
        {/* 5. VIDEO GRID (HỖ TRỢ CẢ VIDEO NGANG 16:9 VÀ SHORTS 9:16)        */}
        {/* ================================================================= */}
        {filteredVideos.length === 0 ? (
          <div
            style={{
              padding: "70px 20px",
              textAlign: "center",
              background: "rgba(2, 12, 38, 0.6)",
              borderRadius: "16px",
              border: "1px dashed rgba(255, 255, 255, 0.15)",
            }}
          >
            <VideoIcon size={44} color="#64748b" style={{ margin: "0 auto 14px" }} />
            <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#ffffff", marginBottom: "6px" }}>
              Không tìm thấy video phù hợp
            </h3>
            <p style={{ fontSize: "13.5px", color: "#94a3b8", marginBottom: "18px" }}>
              Hãy thử tìm kiếm với từ khóa khác hoặc bỏ chọn bộ lọc hiện tại.
            </p>
            <button
              onClick={() => {
                setTypeFilter("all");
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              style={{
                background: "#2563eb",
                color: "#ffffff",
                border: "none",
                padding: "8px 18px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Xem tất cả video
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                typeFilter === "short"
                  ? "repeat(auto-fill, minmax(240px, 1fr))"
                  : "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "24px",
            }}
          >
            {filteredVideos.map((vid) => {
              const isShort = vid.type === "short";

              // -------------------------------------------------------------
              // RENDERING YOUTUBE SHORTS (9:16 VERTICAL CARD)
              // -------------------------------------------------------------
              if (isShort) {
                return (
                  <div
                    key={vid.id}
                    onClick={() => setActiveVideo(vid)}
                    style={{
                      position: "relative",
                      borderRadius: "18px",
                      overflow: "hidden",
                      background: "linear-gradient(180deg, #071536 0%, #020b1f 100%)",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
                      cursor: "pointer",
                      aspectRatio: "9 / 16",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-6px) scale(1.02)";
                      e.currentTarget.style.borderColor = "#ef4444";
                      e.currentTarget.style.boxShadow = "0 18px 45px rgba(239, 68, 68, 0.35)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.3)";
                      e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.4)";
                    }}
                  >
                    {/* Background Thumbnail with dark gradient overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `url(${vid.thumbnail})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        filter: "brightness(0.85)",
                        transition: "transform 0.5s ease",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(0, 6, 20, 0.96) 0%, rgba(0, 6, 20, 0.3) 50%, rgba(0, 6, 20, 0.6) 100%)",
                      }}
                    />

                    {/* Top Header: YouTube Shorts Red Badge & Duration */}
                    <div
                      style={{
                        position: "relative",
                        zIndex: 2,
                        padding: "16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          background: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)",
                          color: "#ffffff",
                          fontSize: "11px",
                          fontWeight: 800,
                          padding: "4px 9px",
                          borderRadius: "14px",
                          boxShadow: "0 4px 12px rgba(239, 68, 68, 0.5)",
                          letterSpacing: "0.5px",
                        }}
                      >
                        <Zap size={12} fill="#ffffff" />
                        <span>SHORTS</span>
                      </div>

                      <div
                        style={{
                          background: "rgba(0, 0, 0, 0.6)",
                          backdropFilter: "blur(4px)",
                          color: "#ffffff",
                          fontSize: "11.5px",
                          fontWeight: 700,
                          padding: "3px 8px",
                          borderRadius: "6px",
                          border: "1px solid rgba(255, 255, 255, 0.15)",
                        }}
                      >
                        {vid.duration}
                      </div>
                    </div>

                    {/* Center Floating Play Button */}
                    <div
                      style={{
                        position: "absolute",
                        top: "45%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 2,
                        width: "56px",
                        height: "56px",
                        borderRadius: "50%",
                        background: "rgba(239, 68, 68, 0.95)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 0 25px rgba(239, 68, 68, 0.7)",
                        border: "2px solid #ffffff",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      <Play size={22} color="#ffffff" fill="#ffffff" style={{ marginLeft: "3px" }} />
                    </div>

                    {/* Bottom Metadata & Title */}
                    <div style={{ position: "relative", zIndex: 2, padding: "18px 16px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          fontSize: "11.5px",
                          color: "#f87171",
                          fontWeight: 700,
                          marginBottom: "6px",
                        }}
                      >
                        <Flame size={14} />
                        <span>{vid.views} lượt xem</span>
                      </div>

                      <h3
                        style={{
                          fontSize: "14.5px",
                          fontWeight: 700,
                          color: "#ffffff",
                          lineHeight: 1.4,
                          margin: "0 0 8px",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {vid.title}
                      </h3>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          fontSize: "11.5px",
                          color: "#94a3b8",
                          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                          paddingTop: "8px",
                        }}
                      >
                        <span>{vid.category}</span>
                        <span style={{ color: "#38bdf8", fontWeight: 600 }}>Xem ngay ▶</span>
                      </div>
                    </div>
                  </div>
                );
              }

              // -------------------------------------------------------------
              // RENDERING YOUTUBE VIDEO NGANG (16:9 LANDSCAPE CARD)
              // -------------------------------------------------------------
              return (
                <div
                  key={vid.id}
                  style={{
                    background: "rgba(3, 16, 48, 0.8)",
                    border: "1px solid rgba(59, 130, 246, 0.22)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.35)",
                    transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.borderColor = "#38bdf8";
                    e.currentTarget.style.boxShadow = "0 18px 40px rgba(56, 189, 248, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.22)";
                    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.35)";
                  }}
                >
                  {/* Thumbnail 16:9 */}
                  <div
                    onClick={() => setActiveVideo(vid)}
                    style={{
                      position: "relative",
                      aspectRatio: "16 / 9",
                      width: "100%",
                      cursor: "pointer",
                      overflow: "hidden",
                      background: "#010a1f",
                    }}
                  >
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.4s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(0, 10, 30, 0.8) 0%, rgba(0,0,0,0.1) 60%)",
                      }}
                    />

                    {/* Category & Type Badge */}
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "12px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <span
                        style={{
                          background: "rgba(37, 99, 235, 0.85)",
                          color: "#ffffff",
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "3px 8px",
                          borderRadius: "4px",
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        {vid.category}
                      </span>
                      <span
                        style={{
                          background: "rgba(0, 0, 0, 0.6)",
                          color: "#38bdf8",
                          fontSize: "10px",
                          fontWeight: 700,
                          padding: "3px 6px",
                          borderRadius: "4px",
                          border: "1px solid rgba(56, 189, 248, 0.3)",
                        }}
                      >
                        16:9 Widescreen
                      </span>
                    </div>

                    {/* Duration Badge */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        right: "12px",
                        background: "rgba(0, 0, 0, 0.75)",
                        color: "#ffffff",
                        fontSize: "11.5px",
                        fontWeight: 700,
                        padding: "3px 7px",
                        borderRadius: "5px",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Clock size={12} />
                      <span>{vid.duration}</span>
                    </div>

                    {/* Centered Play Button */}
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "52px",
                        height: "52px",
                        borderRadius: "50%",
                        background: "rgba(220, 38, 38, 0.9)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 0 20px rgba(220, 38, 38, 0.6)",
                        border: "2px solid #ffffff",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      <Play size={20} color="#ffffff" fill="#ffffff" style={{ marginLeft: "3px" }} />
                    </div>
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: "12px",
                        color: "#94a3b8",
                        marginBottom: "8px",
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <Eye size={13} color="#38bdf8" />
                        <span>{vid.views} lượt xem</span>
                      </span>
                      <span>{vid.date}</span>
                    </div>

                    <h3
                      onClick={() => setActiveVideo(vid)}
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#ffffff",
                        lineHeight: 1.45,
                        margin: "0 0 10px",
                        cursor: "pointer",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        transition: "color 0.15s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
                    >
                      {vid.title}
                    </h3>

                    <p
                      style={{
                        fontSize: "13px",
                        color: "#94a3b8",
                        lineHeight: 1.6,
                        margin: "0 0 16px",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        flex: 1,
                      }}
                    >
                      {vid.description}
                    </p>

                    {/* Actions */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                        paddingTop: "12px",
                        marginTop: "auto",
                      }}
                    >
                      <button
                        onClick={() => setActiveVideo(vid)}
                        style={{
                          background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                          color: "#ffffff",
                          border: "none",
                          padding: "7px 14px",
                          borderRadius: "6px",
                          fontSize: "12.5px",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <Play size={13} fill="#ffffff" />
                        <span>Xem Trực Tiếp</span>
                      </button>

                      <Link
                        to={`/video/${vid.slug}`}
                        style={{
                          fontSize: "12.5px",
                          color: "#38bdf8",
                          textDecoration: "none",
                          fontWeight: 600,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <span>Trang Chi Tiết</span>
                        <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ===================================================================== */}
      {/* 6. MODAL VIDEO PLAYER (PHÁT YOUTUBE 16:9 HOẶC SHORTS 9:16)            */}
      {/* ===================================================================== */}
      {activeVideo && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "rgba(0, 8, 25, 0.85)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
          onClick={() => setActiveVideo(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: activeVideo.type === "short" ? "420px" : "900px",
              background: "#020f2e",
              border: `1px solid ${activeVideo.type === "short" ? "rgba(239, 68, 68, 0.5)" : "rgba(59, 130, 246, 0.4)"}`,
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "0 25px 70px rgba(0, 0, 0, 0.7)",
              display: "flex",
              flexDirection: "column",
              animation: "fadeIn 0.25s ease",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "14px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "rgba(2, 8, 22, 0.9)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
                {activeVideo.type === "short" ? (
                  <span
                    style={{
                      background: "linear-gradient(135deg, #ef4444, #dc2626)",
                      color: "#fff",
                      fontSize: "11px",
                      fontWeight: 800,
                      padding: "2px 7px",
                      borderRadius: "10px",
                    }}
                  >
                    SHORTS 9:16
                  </span>
                ) : (
                  <span
                    style={{
                      background: "rgba(37, 99, 235, 0.3)",
                      color: "#38bdf8",
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "2px 7px",
                      borderRadius: "10px",
                    }}
                  >
                    16:9 Widescreen
                  </span>
                )}
                <span
                  style={{
                    fontSize: "13.5px",
                    fontWeight: 700,
                    color: "#ffffff",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {activeVideo.title}
                </span>
              </div>

              <button
                onClick={() => setActiveVideo(null)}
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  cursor: "pointer",
                  flexShrink: 0,
                  marginLeft: "12px",
                }}
              >
                <X size={17} />
              </button>
            </div>

            {/* Embedded Iframe Container */}
            <div
              style={{
                position: "relative",
                width: "100%",
                background: "#000",
                aspectRatio: activeVideo.type === "short" ? "9 / 16" : "16 / 9",
                maxHeight: activeVideo.type === "short" ? "68vh" : "60vh",
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              />
            </div>

            {/* Modal Footer & Description */}
            <div style={{ padding: "18px 20px", background: "rgba(2, 10, 28, 0.95)" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "12.5px",
                  color: "#94a3b8",
                  marginBottom: "10px",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <span>Hạng mục: <strong style={{ color: "#38bdf8" }}>{activeVideo.category}</strong></span>
                <span>Lượt xem: <strong style={{ color: "#f87171" }}>{activeVideo.views}</strong></span>
                <span>Tác giả: <strong>{activeVideo.author}</strong></span>
              </div>

              <p
                style={{
                  fontSize: "13px",
                  color: "#cbd5e1",
                  lineHeight: 1.6,
                  margin: "0 0 16px",
                  maxHeight: "80px",
                  overflowY: "auto",
                }}
              >
                {activeVideo.description}
              </p>

              {/* Action Buttons */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href={`tel:${siteSettings?.hotlineRaw || "0947707616"}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "7px",
                    padding: "9px 18px",
                    background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                    color: "#ffffff",
                    borderRadius: "8px",
                    fontWeight: 700,
                    fontSize: "13px",
                    textDecoration: "none",
                  }}
                >
                  <Phone size={14} />
                  <span>Tư Vấn Sơn: {siteSettings?.hotline || "0947.707.616"}</span>
                </a>

                <Link
                  to={`/video/${activeVideo.slug}`}
                  onClick={() => setActiveVideo(null)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "9px 16px",
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "#ffffff",
                    borderRadius: "8px",
                    fontWeight: 600,
                    fontSize: "13px",
                    textDecoration: "none",
                  }}
                >
                  <span>Xem Chi Tiết Quy Trình</span>
                  <ExternalLink size={13} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
