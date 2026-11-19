import React, { useEffect } from "react";
import { X, Check, ChevronRight, Phone, ArrowRight } from "lucide-react";

export default function ServiceModal({ svc, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!svc) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        display: "flex",
        alignItems: "stretch",
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
        }}
      />

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(700px, 100vw)",
          background: "#01122a",
          overflowY: "auto",
          boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
          animation: "slideInRight 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {/* Header Image */}
        <div
          style={{
            position: "relative",
            height: "280px",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <img
            src={svc.img}
            alt={svc.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)",
            }}
          />

          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.9)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            <X size={18} color="#000" />
          </button>

          <div style={{ position: "absolute", bottom: "24px", left: "28px" }}>
            <div
              style={{
                display: "inline-block",
                background: svc.color,
                color: "#fff",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "1px",
                textTransform: "uppercase",
                padding: "4px 12px",
                borderRadius: "4px",
                marginBottom: "8px",
              }}
            >
              {svc.tag}
            </div>
            <h2
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "36px",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.3,
              }}
            >
              {svc.title}
            </h2>
          </div>
        </div>

        {/* Modal Content */}
        <div style={{ padding: "32px 28px" }}>
          {/* Highlights */}
          {svc.highlights && (
            <div
              className="grid-mobile-1 gap-mobile-sm"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "10px",
                marginBottom: "32px",
              }}
            >
              {svc.highlights.map((h) => (
                <div
                  key={h}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 14px",
                    background: `${svc.color}0d`,
                    border: `1px solid ${svc.color}22`,
                    borderRadius: "8px",
                  }}
                >
                  <Check size={14} color={svc.color} strokeWidth={2.5} />
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#fff",
                    }}
                  >
                    {h}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Sub Services */}
          {svc.subServices && (
            <>
              <h3
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "16px",
                  paddingBottom: "10px",
                  borderBottom: `2px solid ${svc.color}`,
                }}
              >
                Các Gói Dịch Vụ
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  marginBottom: "32px",
                }}
              >
                {svc.subServices.map((sub) => (
                  <div
                    key={sub.name}
                    style={{
                      padding: "16px",
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: "10px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = svc.color;
                      e.currentTarget.style.background = `${svc.color}15`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "6px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "14.5px",
                          fontWeight: 600,
                          color: "#fff",
                        }}
                      >
                        {sub.name}
                      </span>
                      <ChevronRight size={14} color={svc.color} />
                    </div>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.7)",
                        lineHeight: 1.5,
                      }}
                    >
                      {sub.desc}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Gallery if present */}
          {svc.gallery && (
            <>
              <h3
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "16px",
                  paddingBottom: "10px",
                  borderBottom: `2px solid ${svc.color}`,
                }}
              >
                Hình Ảnh Thi Công Thực Tế
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "10px",
                  marginBottom: "32px",
                }}
              >
                {svc.gallery.map((imgUrl, i) => (
                  <div
                    key={i}
                    style={{
                      borderRadius: "8px",
                      overflow: "hidden",
                      aspectRatio: "4/3",
                    }}
                  >
                    <img
                      src={imgUrl}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transition: "transform 0.3s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* CTA Buttons */}
          <div style={{ display: "flex", gap: "12px" }}>
            <a
              href="tel:0947707616"
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "14px",
                background: "#e60012",
                color: "#fff",
                borderRadius: "8px",
                textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "15px",
                fontWeight: 600,
                boxShadow: "0 6px 20px rgba(230,0,18,0.3)",
                transition: "all 0.2s",
              }}
            >
              <Phone size={16} /> Gọi Báo Giá Ngay
            </a>
            <a
              href="#quote"
              onClick={onClose}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "14px",
                background: svc.color,
                color: "#fff",
                borderRadius: "8px",
                textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "15px",
                fontWeight: 600,
                transition: "all 0.2s",
              }}
            >
              Gửi Yêu Cầu <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(60px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
