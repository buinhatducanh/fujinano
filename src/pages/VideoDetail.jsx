import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Clock,
  Video as VideoIcon,
  Eye,
  CheckCircle2,
  Phone,
  Zap,
  Film,
  Share2,
  Calendar,
  User,
  ExternalLink
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function VideoDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { videos, siteSettings } = useAppContext();
  const [copied, setCopied] = useState(false);

  const video = videos.find((v) => v.slug === slug);

  useEffect(() => {
    if (video) {
      document.title = `${video.title} | FUJINANO`;
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", video.description || video.title);
    }
    window.scrollTo(0, 0);
    return () => {
      document.title = "FUJINANO - Giải Pháp Sơn & Chống Thấm Cao Cấp Công Nghệ Nhật Bản";
    };
  }, [video, slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!video) {
    return (
      <div
        style={{
          paddingTop: "140px",
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          fontFamily: "'DM Sans', sans-serif",
          color: "#fff",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            fontWeight: 800,
            fontFamily: "'Be Vietnam Pro', sans-serif",
          }}
        >
          404
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px" }}>
          Video không tồn tại hoặc đã được cập nhật đường dẫn mới.
        </p>
        <Link
          to="/video"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 24px",
            background: "#2563eb",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          <ArrowLeft size={16} /> Về Thư Viện Video
        </Link>
      </div>
    );
  }

  const isShort = video.type === "short";
  const relatedVideos = videos.filter((v) => v.slug !== slug).slice(0, 4);

  return (
    <div
      style={{
        paddingTop: "90px",
        paddingBottom: "80px",
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
        color: "#ffffff",
      }}
    >
      <div style={{ maxWidth: "1260px", margin: "0 auto", padding: "0 24px" }}>
        {/* Navigation Breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px",
            fontSize: "13px",
            color: "#94a3b8",
            marginBottom: "24px",
          }}
        >
          <Link to="/" style={{ color: "#cbd5e1", textDecoration: "none" }}>
            Trang Chủ
          </Link>
          <span>/</span>
          <Link to="/video" style={{ color: "#cbd5e1", textDecoration: "none" }}>
            Thư Viện Video
          </Link>
          <span>/</span>
          <span style={{ color: "#38bdf8", fontWeight: 600 }}>
            {isShort ? "YouTube Shorts" : "Video Thi Công"}
          </span>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            color: "#cbd5e1",
            padding: "7px 14px",
            borderRadius: "6px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            marginBottom: "20px",
            transition: "background 0.15s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)")}
        >
          <ArrowLeft size={15} />
          <span>Quay Lại Danh Sách Video</span>
        </button>

        {/* Two-Column Layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isShort ? "1fr 340px" : "1fr 360px",
            gap: "40px",
            alignItems: "start",
          }}
          className="grid-mobile-1"
        >
          {/* Main Column: Video Player & Description */}
          <div>
            {/* Header Title & Badges */}
            <div style={{ marginBottom: "18px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                {isShort ? (
                  <span
                    style={{
                      background: "linear-gradient(135deg, #ef4444, #dc2626)",
                      color: "#fff",
                      fontSize: "11px",
                      fontWeight: 800,
                      padding: "3px 10px",
                      borderRadius: "14px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Zap size={12} fill="#fff" />
                    <span>YOUTUBE SHORTS 9:16</span>
                  </span>
                ) : (
                  <span
                    style={{
                      background: "rgba(37, 99, 235, 0.25)",
                      color: "#38bdf8",
                      border: "1px solid rgba(56, 189, 248, 0.4)",
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "3px 10px",
                      borderRadius: "14px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Film size={12} />
                    <span>VIDEO NGANG 16:9</span>
                  </span>
                )}

                <span
                  style={{
                    background: "rgba(255, 255, 255, 0.08)",
                    color: "#cbd5e1",
                    fontSize: "11.5px",
                    fontWeight: 600,
                    padding: "3px 10px",
                    borderRadius: "14px",
                  }}
                >
                  {video.category}
                </span>
              </div>

              <h1
                style={{
                  fontSize: "clamp(20px, 2.5vw, 28px)",
                  fontWeight: 800,
                  lineHeight: 1.35,
                  margin: "0 0 12px",
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                }}
              >
                {video.title}
              </h1>

              {/* Meta stats */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "18px",
                  fontSize: "12.5px",
                  color: "#94a3b8",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <Eye size={14} color="#38bdf8" />
                  <span>{video.views} lượt xem</span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <Clock size={14} />
                  <span>Thời lượng: {video.duration}</span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <Calendar size={14} />
                  <span>Ngày đăng: {video.date}</span>
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <User size={14} />
                  <span>Tác giả: {video.author}</span>
                </span>
              </div>
            </div>

            {/* Embedded Video Player Container */}
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: isShort ? "440px" : "100%",
                margin: isShort ? "0 auto 28px" : "0 0 28px",
                aspectRatio: isShort ? "9 / 16" : "16 / 9",
                background: "#010a1f",
                borderRadius: "18px",
                overflow: "hidden",
                border: `1px solid ${isShort ? "rgba(239, 68, 68, 0.4)" : "rgba(59, 130, 246, 0.35)"}`,
                boxShadow: isShort
                  ? "0 20px 50px rgba(239, 68, 68, 0.25)"
                  : "0 20px 50px rgba(0, 0, 0, 0.5)",
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={video.title}
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

            {/* Action Bar (Share & Watch on YouTube) */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "12px",
                padding: "14px 18px",
                background: "rgba(3, 16, 48, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                marginBottom: "28px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button
                  onClick={handleCopyLink}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    background: copied ? "rgba(16, 185, 129, 0.2)" : "rgba(255, 255, 255, 0.1)",
                    color: copied ? "#34d399" : "#ffffff",
                    border: `1px solid ${copied ? "rgba(16, 185, 129, 0.4)" : "rgba(255, 255, 255, 0.15)"}`,
                    padding: "7px 14px",
                    borderRadius: "6px",
                    fontSize: "12.5px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  <Share2 size={13} />
                  <span>{copied ? "✓ Đã sao chép link" : "Chia sẻ video"}</span>
                </button>

                <a
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "rgba(239, 68, 68, 0.15)",
                    color: "#f87171",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    padding: "7px 14px",
                    borderRadius: "6px",
                    fontSize: "12.5px",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  <span>Xem trên YouTube</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              <div style={{ fontSize: "12px", color: "#64748b" }}>
                Nguồn: Kênh Kỹ Thuật FUJINANO Official
              </div>
            </div>

            {/* Video Technical Highlights */}
            {video.highlights && video.highlights.length > 0 && (
              <div
                style={{
                  background: "rgba(3, 16, 48, 0.8)",
                  border: "1px solid rgba(59, 130, 246, 0.25)",
                  borderRadius: "14px",
                  padding: "22px 24px",
                  marginBottom: "28px",
                }}
              >
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#ffffff",
                    margin: "0 0 14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <CheckCircle2 size={18} color="#34d399" />
                  <span>Đặc Điểm &amp; Tiêu Chuẩn Kỹ Thuật Đạt Được</span>
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "10px",
                  }}
                >
                  {video.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                        fontSize: "13px",
                        color: "#cbd5e1",
                        background: "rgba(2, 10, 28, 0.5)",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                      }}
                    >
                      <span style={{ color: "#38bdf8", fontWeight: 700 }}>•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Video Detailed Description */}
            <div
              style={{
                background: "rgba(3, 16, 48, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "14px",
                padding: "24px",
                marginBottom: "32px",
              }}
            >
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff", margin: "0 0 12px" }}>
                Mô Tả Chi Tiết Quy Trình Thi Công
              </h3>
              <p style={{ fontSize: "14px", color: "#cbd5e1", lineHeight: 1.8, margin: 0 }}>
                {video.description}
              </p>
            </div>

            {/* CTA Box */}
            <div
              style={{
                background: "linear-gradient(135deg, rgba(37, 99, 235, 0.2) 0%, rgba(220, 38, 38, 0.15) 100%)",
                border: "1px solid rgba(59, 130, 246, 0.35)",
                borderRadius: "16px",
                padding: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              <div>
                <h4 style={{ fontSize: "17px", fontWeight: 800, margin: "0 0 6px" }}>
                  Bạn cần khảo sát mặt bằng &amp; tư vấn giải pháp tương tự?
                </h4>
                <p style={{ fontSize: "13px", color: "#cbd5e1", margin: 0 }}>
                  Kỹ sư FUJINANO hỗ trợ tư vấn định mức sơn và lên phương án thi công tối ưu chi phí hoàn toàn miễn phí.
                </p>
              </div>

              <a
                href={`tel:${siteSettings?.hotlineRaw || "0947707616"}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "11px 22px",
                  background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                  color: "#ffffff",
                  borderRadius: "8px",
                  fontWeight: 700,
                  fontSize: "13.5px",
                  textDecoration: "none",
                  boxShadow: "0 6px 18px rgba(220, 38, 38, 0.4)",
                  flexShrink: 0,
                }}
              >
                <Phone size={15} />
                <span>Gọi Hotline: {siteSettings?.hotline || "0947.707.616"}</span>
              </a>
            </div>
          </div>

          {/* Sidebar: Related Videos & Shorts */}
          <div>
            <div
              style={{
                background: "rgba(3, 16, 48, 0.85)",
                border: "1px solid rgba(59, 130, 246, 0.25)",
                borderRadius: "16px",
                padding: "22px 20px",
                position: "sticky",
                top: "100px",
              }}
            >
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "#ffffff",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>Video Khuyên Xem</span>
                <Link
                  to="/video"
                  style={{
                    fontSize: "12px",
                    color: "#38bdf8",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Xem tất cả ({videos.length})
                </Link>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {relatedVideos.map((rel) => {
                  const relIsShort = rel.type === "short";
                  return (
                    <Link
                      key={rel.id}
                      to={`/video/${rel.slug}`}
                      style={{
                        display: "flex",
                        gap: "12px",
                        padding: "10px",
                        background: "rgba(2, 12, 38, 0.6)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "10px",
                        textDecoration: "none",
                        color: "#ffffff",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(37, 99, 235, 0.15)";
                        e.currentTarget.style.borderColor = "#38bdf8";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(2, 12, 38, 0.6)";
                        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                      }}
                    >
                      {/* Mini Thumbnail */}
                      <div
                        style={{
                          position: "relative",
                          width: relIsShort ? "56px" : "80px",
                          aspectRatio: relIsShort ? "9 / 16" : "16 / 9",
                          borderRadius: "6px",
                          overflow: "hidden",
                          flexShrink: 0,
                          background: "#01081a",
                        }}
                      >
                        <img
                          src={rel.thumbnail}
                          alt={rel.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(0,0,0,0.3)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Play size={14} color="#ffffff" fill="#ffffff" />
                        </div>
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "4px" }}>
                          {relIsShort ? (
                            <span
                              style={{
                                background: "#ef4444",
                                color: "#fff",
                                fontSize: "9.5px",
                                fontWeight: 800,
                                padding: "1px 5px",
                                borderRadius: "4px",
                              }}
                            >
                              SHORTS
                            </span>
                          ) : (
                            <span
                              style={{
                                background: "rgba(59, 130, 246, 0.3)",
                                color: "#38bdf8",
                                fontSize: "9.5px",
                                fontWeight: 700,
                                padding: "1px 5px",
                                borderRadius: "4px",
                              }}
                            >
                              16:9
                            </span>
                          )}
                          <span style={{ fontSize: "11px", color: "#64748b" }}>{rel.duration}</span>
                        </div>

                        <h4
                          style={{
                            fontSize: "12.5px",
                            fontWeight: 600,
                            lineHeight: 1.35,
                            margin: "0 0 4px",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {rel.title}
                        </h4>

                        <span style={{ fontSize: "11px", color: "#94a3b8" }}>{rel.views} lượt xem</span>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Company Info Box */}
              <div
                style={{
                  marginTop: "24px",
                  paddingTop: "18px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                  fontSize: "12px",
                  color: "#94a3b8",
                  lineHeight: 1.6,
                }}
              >
                <div style={{ fontWeight: 700, color: "#ffffff", marginBottom: "4px" }}>
                  {siteSettings?.companyName || "CÔNG TY TNHH FUJI NANO VIỆT NAM"}
                </div>
                <div>Đại diện: {siteSettings?.representative || "Ngô Anh Tú"}</div>
                <div>Kho hàng: {siteSettings?.address || "45 Mậu Thân, Cái Khế, Cần Thơ"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
