import React from "react";
import Logo from "./Logo";
import {
  Globe,
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  QrCode,
  FileText
} from "lucide-react";

const serviceLinks = [
  "Sơn Epoxy Nhà Xưởng",
  "Sơn Nhà Xưởng & Mái Tôn",
  "Sơn Giao Thông",
  "Sơn Sân Thể Thao",
  "Sơn Chống Cháy",
  "Sơn Dân Dụng",
];

const navLinks = ["Trang Chủ", "Về Chúng Tôi", "Dự Án", "Sản Phẩm", "Blog", "Tuyển Dụng"];

export default function Footer({ onOpenOrderModal }) {
  return (
    <footer
      id="about"
      style={{
        background: "transparent",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        position: "relative",
      }}
    >
      {/* Top Gradient Highlight Bar */}
      <div
        style={{
          height: "4px",
          background: "linear-gradient(90deg, #0a0f1e 0%, #0055cc 30%, #e60012 70%, #0a0f1e 100%)",
          boxShadow: "0 -4px 20px rgba(0,85,204,0.4), 0 4px 20px rgba(230,0,18,0.4)",
          position: "relative",
          zIndex: 10,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "30%",
          width: "40%",
          height: "2px",
          background: "linear-gradient(90deg, transparent, #ffffff, transparent)",
          opacity: 0.6,
          filter: "blur(1px)",
          zIndex: 11,
        }}
      />

      <div
        className="grid-mobile-1 pad-section-mobile gap-mobile-sm"
        style={{
          maxWidth: "1360px",
          margin: "0 auto",
          padding: "72px 32px 56px",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1.4fr",
          gap: "56px",
        }}
      >
        {/* Col 1: Brand Info */}
        <div>
          <div style={{ marginBottom: "20px" }}>
            <Logo size="lg" dark={false} />
          </div>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13.5px",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.8,
              marginBottom: "24px",
              fontWeight: 300,
              maxWidth: "280px",
            }}
          >
            Đơn vị thi công sơn chuyên nghiệp — Epoxy, chống thấm, kẻ vạch, sân thể thao. Vật liệu chính hãng, đội ngũ lành nghề, bảo hành dài hạn.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { icon: Globe, text: "CÔNG TY TNHH FUJI NANO VIỆT NAM", bold: true },
              { icon: MapPin, text: "45 Mậu Thân, P. Cái Khế, TP. Cần Thơ" },
              { icon: Mail, text: "baogia@fujinano.com" },
              { icon: Globe, text: "www.fujinano.com" },
            ].map(({ icon: Icon, text, bold }, idx) => (
              <div key={idx} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                <Icon
                  size={13}
                  color="rgba(255,255,255,0.3)"
                  style={{ marginTop: "2px", flexShrink: 0 }}
                />
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    color: bold ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.4)",
                    fontWeight: bold ? 600 : 300,
                    lineHeight: 1.5,
                  }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Col 2: Services */}
        <div>
          <h4
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "16px",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              marginBottom: "20px",
              paddingBottom: "10px",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            Dịch Vụ
          </h4>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {serviceLinks.map((item) => (
              <li key={item}>
                <a
                  href="#services"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.42)",
                    textDecoration: "none",
                    fontWeight: 300,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#0077ff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.42)")}
                >
                  <div
                    style={{
                      width: "12px",
                      height: "1px",
                      background: "#e60012",
                      flexShrink: 0,
                    }}
                  />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Navigation */}
        <div>
          <h4
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "16px",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              marginBottom: "20px",
              paddingBottom: "10px",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            Liên Kết
          </h4>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {navLinks.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.42)",
                    textDecoration: "none",
                    fontWeight: 300,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.42)")}
                >
                  <div
                    style={{
                      width: "12px",
                      height: "1px",
                      background: "rgba(255,255,255,0.2)",
                      flexShrink: 0,
                    }}
                  />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Quick Contact & QR Code */}
        <div>
          <h4
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "16px",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              marginBottom: "20px",
              paddingBottom: "10px",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            Liên Hệ & Đặt Mua
          </h4>

          {/* Cách 1: Đặt mua / Báo giá */}
          <button
            onClick={() => onOpenOrderModal && onOpenOrderModal(null)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "14px 20px",
              background: "linear-gradient(135deg, #e60012, #ff2a2a)",
              border: "none",
              borderRadius: "12px",
              color: "#fff",
              cursor: "pointer",
              marginBottom: "12px",
              boxShadow: "0 4px 15px rgba(230,0,18,0.4)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <FileText size={18} color="#fff" />
            </div>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "11px", opacity: 0.85, textTransform: "uppercase" }}>
                Cách 1: Đặt Mua Trực Tuyến
              </div>
              <div style={{ fontSize: "14px", fontWeight: 800 }}>
                Để Lại Thông Tin Báo Giá
              </div>
            </div>
          </button>

          {/* Hotline Box (Cách 2) */}
          <a
            href="tel:0947707616"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "16px 20px",
              background: "rgba(230,0,18,0.1)",
              border: "1px solid rgba(230,0,18,0.25)",
              borderRadius: "12px",
              textDecoration: "none",
              marginBottom: "12px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(230,0,18,0.18)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(230,0,18,0.1)")}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: "#e60012",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Phone size={16} color="#fff" />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: "1px",
                }}
              >
                Hotline 24/7
              </div>
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "#fff",
                }}
              >
                0947.707.616
              </div>
            </div>
          </a>

          {/* Zalo Box */}
          <a
            href="https://zalo.me/0947707616"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "16px 20px",
              background: "rgba(0,85,204,0.1)",
              border: "1px solid rgba(0,85,204,0.25)",
              borderRadius: "12px",
              textDecoration: "none",
              marginBottom: "20px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,85,204,0.18)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,85,204,0.1)")}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: "#0055cc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <MessageCircle size={16} color="#fff" />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: "1px",
                }}
              >
                Chat Zalo
              </div>
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "#fff",
                }}
              >
                Nhắn Tin Ngay
              </div>
            </div>
          </a>

          {/* QR Code */}
          <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "#03153B",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                padding: "8px",
              }}
            >
              <QrCode size={60} color="#0055cc" strokeWidth={1.2} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.55)",
                  marginBottom: "4px",
                }}
              >
                Quét QR
              </div>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.3)",
                  lineHeight: 1.6,
                  fontWeight: 300,
                }}
              >
                Truy cập website và nhận tư vấn miễn phí ngay
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div
          style={{
            maxWidth: "1360px",
            margin: "0 auto",
            padding: "20px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              color: "rgba(255,255,255,0.22)",
              fontWeight: 300,
            }}
          >
            © 2025 FUJINANO — Công Ty TNHH Fuji Nano Việt Nam · MST: 1801784735 · Giám đốc: Ngô Anh Tú
          </span>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              color: "rgba(255,255,255,0.22)",
              fontWeight: 300,
            }}
          >
            Thiết kế bởi FUJINANO Team
          </span>
        </div>
      </div>
    </footer>
  );
}
