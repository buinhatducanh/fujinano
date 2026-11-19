import React, { useState, useEffect, useRef } from "react";
import {
  CheckCircle2,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send
} from "lucide-react";
import { contactChannels, branchOffices } from "../data/branches";

const serviceOptions = [
  "Sơn Epoxy Nhà Xưởng",
  "Sơn Nhà Xưởng & Mái Tôn",
  "Sơn Giao Thông & Kẻ Vạch",
  "Sơn Sân Thể Thao",
  "Sơn Chống Cháy",
  "Sơn Nội/Ngoại Thất Dân Dụng",
  "Khác",
];

export default function QuoteSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    area: "",
    note: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="quote"
      className="pad-section-mobile"
      style={{
        background: "transparent",
        padding: "96px 0",
        position: "relative",
        overflow: "hidden",
      }}
      ref={sectionRef}
    >
      {/* Background Glowing Orbs */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(230,0,18,0.15) 0%, transparent 60%)",
          filter: "blur(40px)",
          animation: "orbMove1 15s infinite alternate ease-in-out",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "10%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(0,85,204,0.15) 0%, transparent 60%)",
          filter: "blur(40px)",
          animation: "orbMove2 20s infinite alternate-reverse ease-in-out",
          pointerEvents: "none",
        }}
      />

      {/* Subtle Dot Grid */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.03,
          pointerEvents: "none",
        }}
      >
        <defs>
          <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#fff" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      <div
        style={{
          maxWidth: "1360px",
          margin: "0 auto",
          padding: "0 32px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="grid-mobile-1 gap-mobile-sm"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "start",
          }}
        >
          {/* Left: Quote Request Form */}
          <div
            className="metallic-border pad-form-mobile"
            style={{
              minWidth: 0,
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? "translateX(0) scale(1)"
                : "translateX(-24px) scale(0.95)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
              background: "rgba(0, 11, 32, 0.6)",
              backdropFilter: "blur(20px) saturate(1.5)",
              borderRadius: "24px",
              padding: "48px",
              boxShadow: "0 30px 60px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.02)",
            }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                color: "#e60012",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
            >
              Nhận Báo Giá
            </p>
            <h2
              className="heading-xl-mobile"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "44px",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.3,
                marginBottom: "12px",
                letterSpacing: "-0.3px",
              }}
            >
              Báo Giá Miễn Phí <br />
              <span style={{ color: "#0077ff" }}>Trong 2 Giờ</span>
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "15px",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.7,
                marginBottom: "32px",
                fontWeight: 300,
              }}
            >
              Gửi thông tin công trình, đội kỹ sư FUJINANO sẽ liên hệ tư vấn và báo giá ngay.
            </p>

            {submitted ? (
              <div
                style={{
                  background: "rgba(0,170,85,0.12)",
                  border: "1px solid rgba(0,170,85,0.3)",
                  borderRadius: "12px",
                  padding: "32px",
                  textAlign: "center",
                }}
              >
                <CheckCircle2
                  size={48}
                  color="#00aa55"
                  style={{ marginBottom: "16px", marginInline: "auto" }}
                />
                <h3
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: "8px",
                  }}
                >
                  Đã Nhận Yêu Cầu!
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  Chúng tôi sẽ gọi lại cho bạn trong vòng 2 giờ làm việc.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div
                  className="form-grid-mobile"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "14px",
                    marginBottom: "14px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.7)",
                        marginBottom: "6px",
                      }}
                    >
                      Họ &amp; Tên *
                    </label>
                    <input
                      type="text"
                      placeholder="Nguyễn Văn A"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "8px",
                        color: "#fff",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "14px",
                        outline: "none",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#0055cc")}
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")
                      }
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.7)",
                        marginBottom: "6px",
                      }}
                    >
                      Số Điện Thoại *
                    </label>
                    <input
                      type="tel"
                      placeholder="0912 345 678"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "8px",
                        color: "#fff",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "14px",
                        outline: "none",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#0055cc")}
                      onBlur={(e) =>
                        (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")
                      }
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "14px" }}>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.7)",
                      marginBottom: "6px",
                    }}
                  >
                    Dịch Vụ Cần Báo Giá *
                  </label>
                  <select
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: "#01122a",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "8px",
                      color: "#fff",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                  >
                    <option value="">-- Chọn dịch vụ --</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: "14px" }}>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.7)",
                      marginBottom: "6px",
                    }}
                  >
                    Diện Tích Ước Tính (m²)
                  </label>
                  <input
                    type="text"
                    placeholder="VD: 500m², 1.000m²..."
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "8px",
                      color: "#fff",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#0055cc")}
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")
                    }
                  />
                </div>

                <div style={{ marginBottom: "24px" }}>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.7)",
                      marginBottom: "6px",
                    }}
                  >
                    Ghi Chú Thêm
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Mô tả hiện trạng sàn, yêu cầu đặc biệt..."
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "8px",
                      color: "#fff",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      outline: "none",
                      resize: "vertical",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#0055cc")}
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)")
                    }
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "16px",
                    background: "linear-gradient(135deg, #e60012, #cc0010)",
                    border: "none",
                    borderRadius: "10px",
                    color: "#fff",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "15px",
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    boxShadow: "0 8px 30px rgba(230,0,18,0.4)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 12px 35px rgba(230,0,18,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(230,0,18,0.4)";
                  }}
                >
                  <Send size={16} /> GỬI YÊU CẦU BÁO GIÁ
                </button>
              </form>
            )}
          </div>

          {/* Right: Branch Offices & Contact Channels */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(24px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
            }}
          >
            <div style={{ marginBottom: "32px" }}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#e60012",
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                Hệ Thống Chi Nhánh
              </p>
              <h3
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "32px",
                  fontWeight: 800,
                  color: "#fff",
                  lineHeight: 1.25,
                }}
              >
                Văn Phòng Phủ Khắp 3 Miền
              </h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {branchOffices.map((branch) => (
                <div
                  key={branch.region}
                  className="metallic-border"
                  style={{
                    borderRadius: "16px",
                    padding: "24px",
                    background: "rgba(0, 11, 32, 0.6)",
                    backdropFilter: "blur(12px)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateX(6px)";
                    e.currentTarget.style.borderColor = branch.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateX(0)";
                    e.currentTarget.style.borderColor = "transparent";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "12px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "11px",
                          fontWeight: 700,
                          color: branch.color,
                          letterSpacing: "1.5px",
                          textTransform: "uppercase",
                        }}
                      >
                        {branch.region}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontSize: "18px",
                          fontWeight: 700,
                          color: "#fff",
                          lineHeight: 1.3,
                        }}
                      >
                        {branch.city}
                      </div>
                    </div>

                    <a
                      href={`tel:${branch.hotline.replace(/\./g, "")}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: branch.color,
                        textDecoration: "none",
                        background: `${branch.color}15`,
                        padding: "5px 12px",
                        borderRadius: "50px",
                        border: `1px solid ${branch.color}33`,
                        transition: "all 0.2s",
                      }}
                    >
                      <Phone size={11} /> {branch.hotline}
                    </a>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <div style={{ display: "flex", gap: "6px", alignItems: "flex-start" }}>
                      <MapPin
                        size={12}
                        color="rgba(255,255,255,0.35)"
                        style={{ marginTop: "2px", flexShrink: 0 }}
                      />
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "12.5px",
                          color: "rgba(255,255,255,0.5)",
                          lineHeight: 1.5,
                        }}
                      >
                        {branch.address}
                      </span>
                    </div>

                    <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                      <Clock
                        size={12}
                        color="rgba(255,255,255,0.35)"
                        style={{ flexShrink: 0 }}
                      />
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "12.5px",
                          color: "rgba(255,255,255,0.5)",
                        }}
                      >
                        {branch.hours}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
