import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Video as VideoIcon,
  Play,
  Search,
  Clock,
  Eye,
  ChevronRight,
  X,
  Phone,
  Flame,
  Film,
  Zap,
  ExternalLink
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
    document.title = "Video Thi Công & YouTube Shorts | FUJINANO";
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

  // Filtered categories
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
      const matchType = typeFilter === "all" ? true : v.type === typeFilter;
      const matchCat = selectedCategory === "all" ? true : v.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === ""
          ? true
          : v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            v.category?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchType && matchCat && matchSearch;
    });
  }, [videos, typeFilter, selectedCategory, searchQuery]);

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "12px",
        paddingBottom: "60px",
        fontFamily: "'DM Sans', sans-serif",
        color: "#ffffff",
      }}
    >
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 20px" }}>
        {/* ================================================================= */}
        {/* 1. COMPACT HEADER & BREADCRUMB (GỌN GÀNG, KHÔNG TEXT RƯỜM RÀ)   */}
        {/* ================================================================= */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "14px",
            marginBottom: "18px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12.5px",
                color: "#94a3b8",
                marginBottom: "6px",
              }}
            >
              <Link to="/" style={{ color: "#94a3b8", textDecoration: "none" }}>
                Trang Chủ
              </Link>
              <ChevronRight size={12} color="#64748b" />
              <span style={{ color: "#38bdf8", fontWeight: 600 }}>Video</span>
            </div>

            <h1
              style={{
                fontSize: "clamp(22px, 2.4vw, 28px)",
                fontWeight: 800,
                color: "#ffffff",
                margin: 0,
                fontFamily: "'Be Vietnam Pro', sans-serif",
                letterSpacing: "-0.3px",
              }}
            >
              Video Thi Công &amp; Shorts Kỹ Thuật
            </h1>
          </div>

          {/* Search Box Gọn Gàng */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(2, 12, 38, 0.9)",
              border: "1px solid rgba(255, 255, 255, 0.14)",
              borderRadius: "8px",
              padding: "0 12px",
              width: "100%",
              maxWidth: "300px",
            }}
          >
            <Search size={14} color="#64748b" style={{ flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Tìm video, chủ đề..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 10px",
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#ffffff",
                fontSize: "13px",
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer", padding: "2px" }}
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. COMPACT TOOLBAR: TABS & CATEGORY CHIPS (TRÊN 1 DÒNG GỌN GÀNG)  */}
        {/* ================================================================= */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            background: "rgba(2, 10, 30, 0.7)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "12px",
            padding: "8px 12px",
            marginBottom: "22px",
          }}
        >
          {/* Segmented View Mode Tabs */}
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {[
              { id: "all", label: "Tất Cả", count: counts.total },
              { id: "horizontal", label: "🎬 Video 16:9", count: counts.horizontal },
              { id: "short", label: "⚡ Shorts 9:16", count: counts.shorts },
            ].map((tab) => {
              const isActive = typeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setTypeFilter(tab.id)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "none",
                    background: isActive
                      ? tab.id === "short"
                        ? "#dc2626"
                        : "#2563eb"
                      : "transparent",
                    color: isActive ? "#ffffff" : "#94a3b8",
                    fontWeight: isActive ? 700 : 500,
                    fontSize: "12.5px",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span>{tab.label}</span>
                  <span
                    style={{
                      fontSize: "10.5px",
                      opacity: isActive ? 1 : 0.6,
                      background: "rgba(0,0,0,0.25)",
                      padding: "1px 5px",
                      borderRadius: "8px",
                    }}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Category Chips Scrollable */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              overflowX: "auto",
              scrollbarWidth: "none",
              maxWidth: "100%",
            }}
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              const label = cat === "all" ? "Tất Cả Hạng Mục" : cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    whiteSpace: "nowrap",
                    padding: "5px 11px",
                    borderRadius: "16px",
                    fontSize: "12px",
                    fontWeight: isSelected ? 700 : 500,
                    border: isSelected
                      ? "1px solid #38bdf8"
                      : "1px solid rgba(255, 255, 255, 0.08)",
                    background: isSelected
                      ? "rgba(56, 189, 248, 0.15)"
                      : "transparent",
                    color: isSelected ? "#38bdf8" : "#94a3b8",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. VIDEO GRID (THIẾT KẾ GỌN GÀNG, ĐẬM CHẤT THỊ GIÁC)             */}
        {/* ================================================================= */}
        {filteredVideos.length === 0 ? (
          <div
            style={{
              padding: "50px 20px",
              textAlign: "center",
              background: "rgba(2, 12, 38, 0.4)",
              borderRadius: "12px",
              border: "1px dashed rgba(255, 255, 255, 0.12)",
            }}
          >
            <p style={{ fontSize: "14px", color: "#94a3b8", margin: "0 0 12px" }}>
              Không tìm thấy video nào phù hợp bộ lọc.
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
                padding: "6px 14px",
                borderRadius: "6px",
                fontSize: "12.5px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Hiển thị tất cả video
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                typeFilter === "short"
                  ? "repeat(auto-fill, minmax(200px, 1fr))"
                  : "repeat(auto-fill, minmax(290px, 1fr))",
              gap: "18px",
            }}
          >
            {filteredVideos.map((vid) => {
              const isShort = vid.type === "short";

              // -------------------------------------------------------------
              // 3A. YOUTUBE SHORTS (9:16 DỌC GỌN GÀNG)
              // -------------------------------------------------------------
              if (isShort) {
                return (
                  <div
                    key={vid.id}
                    onClick={() => setActiveVideo(vid)}
                    style={{
                      position: "relative",
                      borderRadius: "14px",
                      overflow: "hidden",
                      background: "#01091d",
                      border: "1px solid rgba(239, 68, 68, 0.25)",
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
                      cursor: "pointer",
                      aspectRatio: "9 / 16",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      transition: "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.borderColor = "#ef4444";
                      e.currentTarget.style.boxShadow = "0 12px 30px rgba(239, 68, 68, 0.35)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.25)";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.4)";
                    }}
                  >
                    {/* Background Thumbnail */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `url(${vid.thumbnail})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        filter: "brightness(0.85)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(0, 5, 18, 0.95) 0%, rgba(0, 5, 18, 0.1) 45%, rgba(0, 5, 18, 0.5) 100%)",
                      }}
                    />

                    {/* Top Tag & Duration */}
                    <div
                      style={{
                        position: "relative",
                        zIndex: 2,
                        padding: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          background: "#dc2626",
                          color: "#ffffff",
                          fontSize: "10px",
                          fontWeight: 800,
                          padding: "2px 7px",
                          borderRadius: "10px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "3px",
                          letterSpacing: "0.5px",
                        }}
                      >
                        <Zap size={10} fill="#ffffff" /> SHORTS
                      </span>

                      <span
                        style={{
                          background: "rgba(0, 0, 0, 0.65)",
                          color: "#ffffff",
                          fontSize: "10.5px",
                          fontWeight: 700,
                          padding: "2px 6px",
                          borderRadius: "4px",
                        }}
                      >
                        {vid.duration}
                      </span>
                    </div>

                    {/* Center Floating Play Button */}
                    <div
                      style={{
                        position: "absolute",
                        top: "45%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 2,
                        width: "46px",
                        height: "46px",
                        borderRadius: "50%",
                        background: "rgba(220, 38, 38, 0.9)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 0 20px rgba(220, 38, 38, 0.6)",
                      }}
                    >
                      <Play size={18} color="#ffffff" fill="#ffffff" style={{ marginLeft: "2px" }} />
                    </div>

                    {/* Bottom Title & Views */}
                    <div style={{ position: "relative", zIndex: 2, padding: "14px 12px" }}>
                      <div
                        style={{
                          fontSize: "10.5px",
                          color: "#f87171",
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          marginBottom: "4px",
                        }}
                      >
                        <Flame size={12} />
                        <span>{vid.views}</span>
                        <span style={{ color: "rgba(255,255,255,0.4)" }}>• {vid.category}</span>
                      </div>

                      <h3
                        style={{
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "#ffffff",
                          lineHeight: 1.35,
                          margin: 0,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {vid.title}
                      </h3>
                    </div>
                  </div>
                );
              }

              // -------------------------------------------------------------
              // 3B. YOUTUBE VIDEO NGANG (16:9 CARD GỌN GÀNG, TINH TẾ)
              // -------------------------------------------------------------
              return (
                <div
                  key={vid.id}
                  style={{
                    background: "rgba(3, 16, 48, 0.75)",
                    border: "1px solid rgba(59, 130, 246, 0.18)",
                    borderRadius: "12px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                    transition: "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.borderColor = "#38bdf8";
                    e.currentTarget.style.boxShadow = "0 12px 28px rgba(56, 189, 248, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.18)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.3)";
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
                        transition: "transform 0.3s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(0, 8, 25, 0.7) 0%, rgba(0,0,0,0) 60%)",
                      }}
                    />

                    {/* Category pill */}
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        background: "rgba(37, 99, 235, 0.85)",
                        color: "#ffffff",
                        fontSize: "10.5px",
                        fontWeight: 700,
                        padding: "2px 7px",
                        borderRadius: "4px",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      {vid.category}
                    </div>

                    {/* Duration badge */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: "8px",
                        right: "10px",
                        background: "rgba(0, 0, 0, 0.75)",
                        color: "#ffffff",
                        fontSize: "11px",
                        fontWeight: 700,
                        padding: "2px 6px",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        gap: "3px",
                      }}
                    >
                      <Clock size={11} />
                      <span>{vid.duration}</span>
                    </div>

                    {/* Play Button */}
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        background: "rgba(220, 38, 38, 0.9)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 0 16px rgba(220, 38, 38, 0.6)",
                      }}
                    >
                      <Play size={18} color="#ffffff" fill="#ffffff" style={{ marginLeft: "2px" }} />
                    </div>
                  </div>

                  {/* Body Info Gọn Gàng */}
                  <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: "11.5px",
                        color: "#94a3b8",
                        marginBottom: "6px",
                      }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <Eye size={12} color="#38bdf8" />
                        <span>{vid.views}</span>
                      </span>
                      <span>{vid.date}</span>
                    </div>

                    <h3
                      onClick={() => setActiveVideo(vid)}
                      style={{
                        fontSize: "14.5px",
                        fontWeight: 700,
                        color: "#ffffff",
                        lineHeight: 1.4,
                        margin: "0 0 12px",
                        cursor: "pointer",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        flex: 1,
                        transition: "color 0.15s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#38bdf8")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
                    >
                      {vid.title}
                    </h3>

                    {/* Quick action footer */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                        paddingTop: "10px",
                        marginTop: "auto",
                        fontSize: "12px",
                      }}
                    >
                      <button
                        onClick={() => setActiveVideo(vid)}
                        style={{
                          background: "transparent",
                          color: "#38bdf8",
                          border: "none",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          padding: 0,
                        }}
                      >
                        <Play size={12} fill="#38bdf8" />
                        <span>Phát Video</span>
                      </button>

                      <Link
                        to={`/video/${vid.slug}`}
                        style={{
                          color: "#94a3b8",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        <span>Chi tiết</span>
                        <ChevronRight size={13} />
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
      {/* 4. MODAL VIDEO PLAYER (PHÁT YOUTUBE 16:9 HOẶC SHORTS 9:16 GỌN GÀNG)    */}
      {/* ===================================================================== */}
      {activeVideo && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "rgba(0, 8, 25, 0.88)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
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
              maxWidth: activeVideo.type === "short" ? "380px" : "840px",
              background: "#020f2e",
              border: `1px solid ${activeVideo.type === "short" ? "rgba(239, 68, 68, 0.4)" : "rgba(59, 130, 246, 0.3)"}`,
              borderRadius: "14px",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.7)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "rgba(2, 8, 22, 0.95)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
                <span
                  style={{
                    background: activeVideo.type === "short" ? "#dc2626" : "rgba(37, 99, 235, 0.3)",
                    color: activeVideo.type === "short" ? "#fff" : "#38bdf8",
                    fontSize: "10.5px",
                    fontWeight: 800,
                    padding: "2px 7px",
                    borderRadius: "6px",
                    flexShrink: 0,
                  }}
                >
                  {activeVideo.type === "short" ? "SHORTS" : "16:9"}
                </span>
                <span
                  style={{
                    fontSize: "13px",
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
                  width: "28px",
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  cursor: "pointer",
                  flexShrink: 0,
                  marginLeft: "10px",
                }}
              >
                <X size={15} />
              </button>
            </div>

            {/* Embedded Video */}
            <div
              style={{
                position: "relative",
                width: "100%",
                background: "#000",
                aspectRatio: activeVideo.type === "short" ? "9 / 16" : "16 / 9",
                maxHeight: activeVideo.type === "short" ? "65vh" : "55vh",
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

            {/* Compact Modal Footer */}
            <div
              style={{
                padding: "12px 16px",
                background: "rgba(2, 10, 28, 0.98)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                <span>{activeVideo.category}</span> • <span>{activeVideo.views} lượt xem</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <a
                  href={`tel:${siteSettings?.hotlineRaw || "0947707616"}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "7px 12px",
                    background: "#dc2626",
                    color: "#ffffff",
                    borderRadius: "6px",
                    fontWeight: 700,
                    fontSize: "12px",
                    textDecoration: "none",
                  }}
                >
                  <Phone size={13} />
                  <span>Hotline: {siteSettings?.hotline || "0947.707.616"}</span>
                </a>

                <Link
                  to={`/video/${activeVideo.slug}`}
                  onClick={() => setActiveVideo(null)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "7px 12px",
                    background: "rgba(255, 255, 255, 0.08)",
                    color: "#ffffff",
                    borderRadius: "6px",
                    fontWeight: 600,
                    fontSize: "12px",
                    textDecoration: "none",
                  }}
                >
                  <span>Xem chi tiết</span>
                  <ExternalLink size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
