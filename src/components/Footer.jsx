import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import {
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  QrCode,
  FileText,
  Settings,
  ArrowUp,
  X,
  Globe,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

const productLinks = [
  { label: "Sơn Epoxy Sàn Nhà Xưởng", href: "/#products" },
  { label: "Sơn Chống Thấm Polyurethane (PU)", href: "/#products" },
  { label: "Sơn Chống Cháy Kết Cấu Thép 120P", href: "/#products" },
  { label: "Sơn Sân Thể Thao (Pickleball/Tennis)", href: "/#products" },
  { label: "Sơn Kẻ Vạch Nhiệt Dẻo Giao Thông", href: "/#products" },
  { label: "Sơn Lót Kháng Kiềm Nano", href: "/#products" },
  { label: "Tăng Cứng Mài Sàn Bê Tông", href: "/#products" },
];

const companyLinks = [
  { label: "Trang Chủ (Sản Phẩm)", href: "/" },
  { label: "Về FUJINANO (Hồ Sơ Năng Lực)", href: "/ve-chung-toi" },
  { label: "Dự Án Đã Nghiệm Thu", href: "/du-an" },
  { label: "Video Thi Công Thực Tế", href: "/video" },
  { label: "Tin Tức & Cẩm Nang Kỹ Thuật", href: "/tin-tuc" },
  { label: "Liên Hệ & Sơ Đồ Tổng Kho", href: "/lien-he" },
];

export default function Footer({ onOpenOrderModal }) {
  const { siteSettings, policies } = useAppContext();
  const [activePolicyKey, setActivePolicyKey] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const policyItems = [
    {
      key: "warranty",
      label: "Chính Sách Bảo Hành (5 - 10 Năm)",
      summary: policies?.warranty?.summary || "Bảo hành màng sơn lên đến 5 năm đối với sơn sàn Epoxy và 10 năm đối với hệ sơn chống thấm Polyurethane.",
      data: policies?.warranty,
    },
    {
      key: "returns",
      label: "Chính Sách Đổi Trả Trong 7 Ngày",
      summary: policies?.returns?.summary || "Đổi trả linh hoạt, hoàn tiền 100% trong vòng 7 ngày nếu lỗi do nhà sản xuất.",
      data: policies?.returns,
    },
    {
      key: "shipping",
      label: "Chính Sách Giao Nhận & Chành Xe",
      summary: policies?.shipping?.summary || "Giao hỏa tốc 2 giờ tại Cần Thơ, hỗ trợ chi phí chành xe đi khắp Tây Nam Bộ và toàn quốc.",
      data: policies?.shipping,
    },
    {
      key: "payment",
      label: "Quy Định Thanh Toán & Kiểm Hàng",
      summary: policies?.payment?.summary || "Đồng kiểm niêm phong và chứng chỉ CO/CQ xuất xưởng trước khi thanh toán.",
      data: policies?.payment,
    },
  ];

  const activePolicy = policyItems.find((p) => p.key === activePolicyKey);

  return (
    <footer
      id="about"
      style={{
        background: "#041232",
        borderTop: "2px solid #dc2626",
        position: "relative",
        color: "#ffffff",
        fontFamily: "'DM Sans', 'Be Vietnam Pro', sans-serif",
      }}
    >
      <style>{`
        .fuji-footer-link {
          color: rgba(255, 255, 255, 0.65);
          text-decoration: none;
          font-size: 13.5px;
          line-height: 1.5;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: color 0.15s ease, transform 0.15s ease;
        }
        .fuji-footer-link:hover {
          color: #ffffff;
          transform: translateX(3px);
        }
        .fuji-footer-btn-social {
          width: 34px;
          height: 34px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: all 0.15s ease;
        }
        .fuji-footer-btn-social:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.3);
        }

        @media (max-width: 1024px) {
          .fuji-footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 640px) {
          .fuji-footer-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .fuji-footer-bottom {
            flex-direction: column !important;
            text-align: center;
            gap: 14px !important;
          }
        }
      `}</style>

      {/* Main Footer Container */}
      <div
        style={{
          maxWidth: "1340px",
          margin: "0 auto",
          padding: "56px 24px 44px",
        }}
      >
        <div
          className="fuji-footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr 1.1fr 1.3fr",
            gap: "48px",
          }}
        >
          {/* CỘT 1: THÔNG TIN DOANH NGHIỆP */}
          <div>
            <div style={{ marginBottom: "18px" }}>
              <Logo size="md" dark={false} />
            </div>

            <p
              style={{
                fontSize: "13.5px",
                color: "rgba(255, 255, 255, 0.6)",
                lineHeight: 1.65,
                marginBottom: "20px",
                maxWidth: "340px",
              }}
            >
              Đơn vị sản xuất và thi công sơn công nghiệp — Sơn sàn Epoxy, chống thấm Polyurethane, sơn chống cháy và sân thể thao công nghệ Nano Nhật Bản.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "9px", marginBottom: "20px" }}>
              <div style={{ fontSize: "13px", color: "#ffffff", fontWeight: 700, lineHeight: 1.4 }}>
                {siteSettings?.companyName || "CÔNG TY TNHH FUJI NANO VIỆT NAM"}
              </div>

              <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                <MapPin size={14} color="rgba(255, 255, 255, 0.5)" style={{ marginTop: "3px", flexShrink: 0 }} />
                <span style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.65)", lineHeight: 1.5 }}>
                  {siteSettings?.address || "Số 45 đường Mậu Thân, P. Cái Khế, Q. Ninh Kiều, TP. Cần Thơ"}
                </span>
              </div>

              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <Mail size={14} color="rgba(255, 255, 255, 0.5)" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.65)" }}>
                  {siteSettings?.emailBaoGia || siteSettings?.email || "baogia@fujinano.com"}
                </span>
              </div>

              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <Globe size={14} color="rgba(255, 255, 255, 0.5)" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.65)" }}>
                  {siteSettings?.website || "www.fujinano.vn"}
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <a
                href={`https://zalo.me/${siteSettings?.hotlineRaw || "0947707616"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="fuji-footer-btn-social"
                title="Zalo Kỹ Thuật"
              >
                <MessageCircle size={15} />
              </a>

              <Link
                to="/video"
                className="fuji-footer-btn-social"
                title="Kênh Video Công Trình"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </Link>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="fuji-footer-btn-social"
                title="Facebook FUJINANO"
              >
                <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              <a
                href={`tel:${siteSettings?.hotlineRaw || "0947707616"}`}
                className="fuji-footer-btn-social"
                title="Gọi Hotline"
              >
                <Phone size={14} />
              </a>

              <span
                style={{
                  fontSize: "11px",
                  color: "rgba(255, 255, 255, 0.4)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "4px",
                  padding: "3px 7px",
                  marginLeft: "4px",
                }}
              >
                ISO 9001:2015
              </span>
            </div>
          </div>

          {/* CỘT 2: SẢN PHẨM & DỊCH VỤ */}
          <div>
            <h4
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "14px",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "16px",
                paddingBottom: "8px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              Sản Phẩm &amp; Dịch Vụ
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "9px" }}>
              {productLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="fuji-footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CỘT 3: VỀ DOANH NGHIỆP & CHÍNH SÁCH */}
          <div>
            <h4
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "14px",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "16px",
                paddingBottom: "8px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              Hỗ Trợ &amp; Doanh Nghiệp
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "9px" }}>
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="fuji-footer-link">
                    {item.label}
                  </Link>
                </li>
              ))}
              {policyItems.map((policy) => (
                <li key={policy.key}>
                  <button
                    onClick={() => setActivePolicyKey(policy.key)}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                    className="fuji-footer-link"
                  >
                    <span>{policy.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CỘT 4: LIÊN HỆ & BÁO GIÁ */}
          <div>
            <h4
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "14px",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "1px",
                textTransform: "uppercase",
                marginBottom: "16px",
                paddingBottom: "8px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              Liên Hệ &amp; Báo Giá
            </h4>

            {/* Hotline Box */}
            <a
              href={`tel:${siteSettings?.hotlineRaw || "0947707616"}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 14px",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                textDecoration: "none",
                marginBottom: "10px",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)")}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "6px",
                  background: "#dc2626",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Phone size={15} />
              </div>
              <div>
                <div style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.5)", textTransform: "uppercase" }}>
                  Hotline Kỹ Thuật 24/7
                </div>
                <div style={{ fontSize: "16px", fontWeight: 800, color: "#ffffff", letterSpacing: "0.5px" }}>
                  {siteSettings?.hotline || "0947.707.616"}
                </div>
              </div>
            </a>

            {/* Zalo Box */}
            <a
              href={`https://zalo.me/${siteSettings?.hotlineRaw || "0947707616"}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 14px",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                textDecoration: "none",
                marginBottom: "10px",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)")}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "6px",
                  background: "#084e96",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <MessageCircle size={15} />
              </div>
              <div>
                <div style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.5)", textTransform: "uppercase" }}>
                  Chat Zalo Kỹ Sư
                </div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff" }}>
                  Tư Vấn &amp; Gửi Mẫu Sơn
                </div>
              </div>
            </a>

            {/* Nút Yêu Cầu Báo Giá */}
            <button
              onClick={() => onOpenOrderModal && onOpenOrderModal(null)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "11px 16px",
                background: "#dc2626",
                border: "none",
                borderRadius: "8px",
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                marginBottom: "12px",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#b91c1c")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#dc2626")}
            >
              <FileText size={15} />
              <span>Yêu Cầu Báo Giá Nhanh</span>
            </button>

            {/* Mini QR Code */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 10px",
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "6px",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  background: "#ffffff",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  padding: "2px",
                }}
              >
                <QrCode size={38} color="#041232" strokeWidth={1.5} />
              </div>
              <div style={{ fontSize: "11.5px", color: "rgba(255, 255, 255, 0.55)", lineHeight: 1.4 }}>
                Quét mã QR để kết nối Zalo với kỹ thuật viên
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          background: "#020b20",
          padding: "18px 24px",
        }}
      >
        <div
          className="fuji-footer-bottom"
          style={{
            maxWidth: "1340px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div style={{ fontSize: "12.5px", color: "rgba(255, 255, 255, 0.5)", lineHeight: 1.6 }}>
            © {new Date().getFullYear()} <strong>FUJINANO</strong> — {siteSettings?.companyName || "Công Ty TNHH Fuji Nano Việt Nam"}. MST: {siteSettings?.taxId || "1801784735"} · Giám đốc: {siteSettings?.representative || "Ngô Anh Tú"}.
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <Link
              to="/admin"
              style={{
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.6)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                padding: "4px 8px",
                borderRadius: "4px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <Settings size={12} />
              <span>Quản Trị CMS</span>
            </Link>

            <button
              onClick={scrollToTop}
              style={{
                fontSize: "12px",
                color: "rgba(255, 255, 255, 0.6)",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "4px",
                padding: "4px 8px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
              }}
              title="Về đầu trang"
            >
              <ArrowUp size={12} />
              <span>Lên đầu trang</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal Chính Sách (nếu người dùng bấm vào chính sách) */}
      {activePolicy && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={() => setActivePolicyKey(null)}
        >
          <div
            style={{
              background: "#081534",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "12px",
              maxWidth: "520px",
              width: "100%",
              padding: "24px",
              color: "#ffffff",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ShieldCheck size={18} color="#dc2626" />
                <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>
                  {activePolicy.data?.title || activePolicy.label}
                </h3>
              </div>
              <button
                onClick={() => setActivePolicyKey(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(255, 255, 255, 0.6)",
                  cursor: "pointer",
                }}
              >
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.6, marginBottom: "16px" }}>
              {activePolicy.summary}
            </p>

            {activePolicy.data?.terms && (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
                {activePolicy.data.terms.map((term, i) => (
                  <div key={i} style={{ display: "flex", gap: "8px", fontSize: "12.5px", color: "rgba(255, 255, 255, 0.65)" }}>
                    <CheckCircle2 size={15} color="#4ade80" style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span>{term}</span>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setActivePolicyKey(null)}
              style={{
                width: "100%",
                padding: "9px",
                background: "#dc2626",
                border: "none",
                borderRadius: "6px",
                color: "#ffffff",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
