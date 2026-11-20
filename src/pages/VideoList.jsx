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
  ExternalLink,
  Layers,
  ArrowRight
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function VideoList() {
  const { videos, siteSettings } = useAppContext();

  // Filters & Search
  const [typeFilter, setTypeFilter] = useState("all"); // 'all' | 'horizontal' | 'short'
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal Video Player State
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    document.title = "Thư Viện Video & YouTube Shorts | FUJINANO";
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

  // Unique categories list
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

  // Separate lists for 'all' mode
  const shortsList = useMemo(() => {
    return filteredVideos.filter((v) => v.type === "short");
  }, [filteredVideos]);

  const horizontalList = useMemo(() => {
    return filteredVideos.filter((v) => v.type === "horizontal");
  }, [filteredVideos]);

  // Safe fallback thumbnail
  const handleImageError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/images/slider/epoxy_floor.png";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "16px",
        paddingBottom: "70px",
        fontFamily: "'DM Sans', sans-serif",
        color: "#ffffff",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 20px" }}>
        {/* ================================================================= */}
        {/* 1. TOP HEADER & SEARCH BAR                                        */}
        {/* ================================================================= */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "20px",
            paddingBottom: "16px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
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
              <span style={{ color: "#38bdf8", fontWeight: 600 }}>Thư Viện Video</span>
            </div>

            <h1
              style={{
                fontSize: "clamp(22px, 2.5vw, 28px)",
                fontWeight: 800,
                color: "#ffffff",
                margin: 0,
                fontFamily: "'Be Vietnam Pro', sans-serif",
                letterSpacing: "-0.4px",
              }}
            >
              Video Kỹ Thuật &amp; YouTube Shorts
            </h1>
            <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#94a3b8" }}>
              Quy trình thi công thực tế, thử nghiệm màng sơn và video ngắn kỹ thuật từ FUJINANO
            </p>
          </div>

          {/* Search Box */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(2, 12, 38, 0.85)",
              border: "1px solid rgba(59, 130, 246, 0.25)",
              borderRadius: "8px",
              padding: "0 12px",
              width: "100%",
              maxWidth: "320px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
            }}
          >
            <Search size={15} color="#38bdf8" style={{ flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Tìm kiếm video, quy trình..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 10px",
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
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#94a3b8",
                  cursor: "pointer",
                  padding: "4px",
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. FILTER TOOLBAR: TYPE TABS & CATEGORIES                         */}
        {/* ================================================================= */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            background: "rgba(3, 14, 40, 0.7)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "12px",
            padding: "8px 12px",
            marginBottom: "28px",
          }}
        >
          {/* Segmented View Mode Tabs */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {[
              { id: "all", label: "Tất Cả", count: counts.total, icon: <Layers size={13} /> },
              { id: "short", label: "⚡ Shorts (9:16)", count: counts.shorts, icon: <Zap size={13} /> },
              { id: "horizontal", label: "🎬 Video (16:9)", count: counts.horizontal, icon: <Film size={13} /> },
            ].map((tab) => {
              const isActive = typeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setTypeFilter(tab.id)}
                  style={{
                    padding: "7px 14px",
                    borderRadius: "8px",
                    border: isActive
                      ? "1px solid rgba(255,255,255,0.2)"
                      : "1px solid transparent",
                    background: isActive
                      ? tab.id === "short"
                        ? "linear-gradient(135deg, #ef4444, #dc2626)"
                        : "linear-gradient(135deg, #2563eb, #1d4ed8)"
                      : "transparent",
                    color: isActive ? "#ffffff" : "#94a3b8",
                    fontWeight: isActive ? 700 : 500,
                    fontSize: "13px",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  <span
                    style={{
                      fontSize: "11px",
                      opacity: isActive ? 1 : 0.6,
                      background: "rgba(0,0,0,0.3)",
                      padding: "1px 6px",
                      borderRadius: "10px",
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
              const label = cat === "all" ? "Tất Cả Chuyên Mục" : cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    whiteSpace: "nowrap",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: isSelected ? 700 : 500,
                    border: isSelected
                      ? "1px solid #38bdf8"
                      : "1px solid rgba(255, 255, 255, 0.1)",
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
        {/* 3. CONTENT RENDERING: SEPARATED SECTIONS                          */}
        {/* ================================================================= */}

        {filteredVideos.length === 0 ? (
          <div
            style={{
              padding: "60px 20px",
              textAlign: "center",
              background: "rgba(2, 12, 38, 0.5)",
              borderRadius: "14px",
              border: "1px dashed rgba(255, 255, 255, 0.12)",
            }}
          >
            <p style={{ fontSize: "14.5px", color: "#94a3b8", margin: "0 0 14px" }}>
              Không tìm thấy video nào phù hợp từ khóa hoặc bộ lọc đã chọn.
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
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Hiển thị tất cả video
            </button>
          </div>
        ) : (
          <>
            {/* ------------------------------------------------------------- */}
            {/* SECTION A: YOUTUBE SHORTS (Khi typeFilter === 'all' hoặc 'short') */}
            {/* ------------------------------------------------------------- */}
            {(typeFilter === "all" || typeFilter === "short") && shortsList.length > 0 && (
              <div style={{ marginBottom: "42px" }}>
                {/* Section Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        background: "rgba(239, 68, 68, 0.18)",
                        border: "1px solid rgba(239, 68, 68, 0.35)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ef4444",
                      }}
                    >
                      <Zap size={18} fill="#ef4444" />
                    </div>
                    <div>
                      <h2
                        style={{
                          fontSize: "17px",
                          fontWeight: 800,
                          margin: 0,
                          color: "#ffffff",
                          fontFamily: "'Be Vietnam Pro', sans-serif",
                          letterSpacing: "-0.2px",
                        }}
                      >
                        ⚡ YouTube Shorts Kỹ Thuật
                      </h2>
                      <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#94a3b8" }}>
                        Clip thực tế dưới 60s: thử nghiệm độ bám, mẹo pha sơn &amp; test va đập
                      </p>
                    </div>
                  </div>

                  {typeFilter === "all" && shortsList.length > 4 && (
                    <button
                      onClick={() => setTypeFilter("short")}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#f87171",
                        fontSize: "12.5px",
                        fontWeight: 700,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <span>Xem tất cả Shorts</span>
                      <ArrowRight size={13} />
                    </button>
                  )}
                </div>

                {/* Shorts Grid: Strictly 9:16 Portrait Cards */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      typeFilter === "short"
                        ? "repeat(auto-fill, minmax(210px, 1fr))"
                        : "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: "16px",
                  }}
                >
                  {shortsList.map((vid) => (
                    <div
                      key={vid.id}
                      onClick={() => setActiveVideo(vid)}
                      style={{
                        position: "relative",
                        aspectRatio: "9 / 16",
                        borderRadius: "14px",
                        overflow: "hidden",
                        background: "#010a20",
                        border: "1px solid rgba(239, 68, 68, 0.25)",
                        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-5px) scale(1.02)";
                        e.currentTarget.style.borderColor = "#ef4444";
                        e.currentTarget.style.boxShadow = "0 14px 32px rgba(239, 68, 68, 0.35)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0) scale(1)";
                        e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.25)";
                        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.4)";
                      }}
                    >
                      {/* Image Thumbnail with Fallback */}
                      <img
                        src={vid.thumbnail}
                        alt={vid.title}
                        onError={handleImageError}
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          filter: "brightness(0.9)",
                        }}
                      />

                      {/* Gradient Backdrop Mask */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to top, rgba(1, 8, 26, 0.95) 0%, rgba(1, 8, 26, 0.25) 50%, rgba(1, 8, 26, 0.6) 100%)",
                        }}
                      />

                      {/* Top Header inside Card */}
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
                            padding: "3px 8px",
                            borderRadius: "12px",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "3px",
                            letterSpacing: "0.5px",
                            boxShadow: "0 2px 8px rgba(220, 38, 38, 0.5)",
                          }}
                        >
                          <Zap size={10} fill="#ffffff" /> SHORTS
                        </span>

                        <span
                          style={{
                            background: "rgba(0, 0, 0, 0.65)",
                            color: "#ffffff",
                            fontSize: "11px",
                            fontWeight: 700,
                            padding: "2px 7px",
                            borderRadius: "4px",
                            backdropFilter: "blur(4px)",
                          }}
                        >
                          {vid.duration}
                        </span>
                      </div>

                      {/* Center Play Button Overlay */}
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
                          transition: "transform 0.2s ease",
                        }}
                      >
                        <Play size={18} color="#ffffff" fill="#ffffff" style={{ marginLeft: "2px" }} />
                      </div>

                      {/* Bottom Title & Stats inside Card */}
                      <div style={{ position: "relative", zIndex: 2, padding: "14px 12px" }}>
                        <div
                          style={{
                            fontSize: "11px",
                            color: "#f87171",
                            fontWeight: 700,
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            marginBottom: "5px",
                          }}
                        >
                          <Flame size={12} />
                          <span>{vid.views}</span>
                          <span style={{ color: "rgba(255,255,255,0.45)" }}>• {vid.category}</span>
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
                            textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                          }}
                        >
                          {vid.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* SECTION B: VIDEO 16:9 WIDESCREEN (Khi typeFilter === 'all' | 'horizontal') */}
            {/* ------------------------------------------------------------- */}
            {(typeFilter === "all" || typeFilter === "horizontal") && horizontalList.length > 0 && (
              <div>
                {/* Section Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        background: "rgba(37, 99, 235, 0.18)",
                        border: "1px solid rgba(59, 130, 246, 0.35)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#38bdf8",
                      }}
                    >
                      <Film size={18} />
                    </div>
                    <div>
                      <h2
                        style={{
                          fontSize: "17px",
                          fontWeight: 800,
                          margin: 0,
                          color: "#ffffff",
                          fontFamily: "'Be Vietnam Pro', sans-serif",
                          letterSpacing: "-0.2px",
                        }}
                      >
                        🎬 Video Quy Trình &amp; Dự Án Thực Tế
                      </h2>
                      <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#94a3b8" }}>
                        Video toàn cảnh 16:9 hướng dẫn thi công tiêu chuẩn kỹ thuật &amp; nghiệm thu công trình
                      </p>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: "12px",
                      color: "#94a3b8",
                      background: "rgba(255, 255, 255, 0.06)",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    {horizontalList.length} Video 16:9
                  </span>
                </div>

                {/* Horizontal Grid: Strictly 16:9 Landscape Cards */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                    gap: "20px",
                  }}
                >
                  {horizontalList.map((vid) => (
                    <div
                      key={vid.id}
                      style={{
                        background: "rgba(3, 16, 48, 0.8)",
                        border: "1px solid rgba(59, 130, 246, 0.2)",
                        borderRadius: "14px",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.35)",
                        transition: "all 0.25s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-4px)";
                        e.currentTarget.style.borderColor = "#38bdf8";
                        e.currentTarget.style.boxShadow = "0 14px 30px rgba(56, 189, 248, 0.22)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.2)";
                        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.35)";
                      }}
                    >
                      {/* 16:9 Thumbnail Header */}
                      <div
                        onClick={() => setActiveVideo(vid)}
                        style={{
                          position: "relative",
                          aspectRatio: "16 / 9",
                          width: "100%",
                          cursor: "pointer",
                          overflow: "hidden",
                          background: "#010a20",
                        }}
                      >
                        <img
                          src={vid.thumbnail}
                          alt={vid.title}
                          onError={handleImageError}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.3s ease",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        />

                        {/* Dark Gradient Overlay */}
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background:
                              "linear-gradient(to top, rgba(2, 10, 30, 0.85) 0%, rgba(0,0,0,0) 60%)",
                          }}
                        />

                        {/* Category Pill */}
                        <div
                          style={{
                            position: "absolute",
                            top: "10px",
                            left: "10px",
                            background: "rgba(37, 99, 235, 0.9)",
                            color: "#ffffff",
                            fontSize: "11px",
                            fontWeight: 700,
                            padding: "3px 8px",
                            borderRadius: "5px",
                            backdropFilter: "blur(4px)",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                          }}
                        >
                          {vid.category}
                        </div>

                        {/* Duration Badge */}
                        <div
                          style={{
                            position: "absolute",
                            bottom: "10px",
                            right: "10px",
                            background: "rgba(0, 0, 0, 0.8)",
                            color: "#ffffff",
                            fontSize: "11.5px",
                            fontWeight: 700,
                            padding: "2px 7px",
                            borderRadius: "5px",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <Clock size={11} />
                          <span>{vid.duration}</span>
                        </div>

                        {/* Floating Play Icon */}
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: "48px",
                            height: "48px",
                            borderRadius: "50%",
                            background: "rgba(220, 38, 38, 0.9)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 0 20px rgba(220, 38, 38, 0.65)",
                            transition: "transform 0.2s ease",
                          }}
                        >
                          <Play size={20} color="#ffffff" fill="#ffffff" style={{ marginLeft: "2px" }} />
                        </div>
                      </div>

                      {/* Card Body Info */}
                      <div
                        style={{
                          padding: "16px 18px",
                          display: "flex",
                          flexDirection: "column",
                          flex: 1,
                        }}
                      >
                        {/* Meta views and date */}
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
                          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <Eye size={13} color="#38bdf8" />
                            <span>{vid.views} lượt xem</span>
                          </span>
                          <span>{vid.date}</span>
                        </div>

                        {/* Title */}
                        <h3
                          onClick={() => setActiveVideo(vid)}
                          style={{
                            fontSize: "14.5px",
                            fontWeight: 700,
                            color: "#ffffff",
                            lineHeight: 1.4,
                            margin: "0 0 10px",
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

                        {/* Excerpt snippet */}
                        {vid.highlights && vid.highlights.length > 0 && (
                          <div
                            style={{
                              fontSize: "11.5px",
                              color: "#cbd5e1",
                              background: "rgba(255, 255, 255, 0.04)",
                              borderRadius: "6px",
                              padding: "6px 10px",
                              marginBottom: "12px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            ✓ {vid.highlights[0]}
                          </div>
                        )}

                        {/* Action buttons */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                            paddingTop: "12px",
                            marginTop: "auto",
                            fontSize: "12.5px",
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
                            <Play size={13} fill="#38bdf8" />
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
                              fontWeight: 600,
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                          >
                            <span>Chi tiết</span>
                            <ChevronRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ===================================================================== */}
      {/* 4. MODAL VIDEO PLAYER (PHÁT YOUTUBE 16:9 HOẶC SHORTS 9:16)            */}
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
              maxWidth: activeVideo.type === "short" ? "380px" : "860px",
              background: "#020f2e",
              border: `1px solid ${
                activeVideo.type === "short"
                  ? "rgba(239, 68, 68, 0.4)"
                  : "rgba(59, 130, 246, 0.35)"
              }`,
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
                    background:
                      activeVideo.type === "short" ? "#dc2626" : "rgba(37, 99, 235, 0.3)",
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
                maxHeight: activeVideo.type === "short" ? "68vh" : "55vh",
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

            {/* Modal Footer */}
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
