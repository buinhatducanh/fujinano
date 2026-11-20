import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Send, CheckCircle2 } from "lucide-react";

export default function Contact({ onOpenOrderModal }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    topic: "Tư vấn chọn thùng sơn",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Vui lòng điền Họ tên và Số điện thoại");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div style={{ minHeight: "100vh", padding: "110px 0 60px", color: "#ffffff", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 20px" }}>
        
        {/* Breadcrumb */}
        <div style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "20px", display: "flex", gap: "8px", alignItems: "center" }}>
          <Link to="/" style={{ color: "#38bdf8" }}>Trang Chủ</Link>
          <span>/</span>
          <span style={{ color: "#ffffff" }}>Liên Hệ</span>
        </div>

        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <span
            style={{
              display: "inline-block",
              background: "rgba(59, 130, 246, 0.15)",
              color: "#38bdf8",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 700,
              marginBottom: "12px",
              border: "1px solid rgba(59, 130, 246, 0.3)",
            }}
          >
            HỆ THỐNG PHÂN PHỐI &amp; TỔNG KHO CẦN THƠ
          </span>
          <h1 style={{ fontSize: "30px", fontWeight: 800, marginBottom: "10px", color: "#ffffff" }}>
            Liên Hệ Với FUJINANO
          </h1>
          <p style={{ fontSize: "14.5px", color: "#94a3b8", maxWidth: "700px" }}>
            Quý khách hàng, đối tác nhà thầu và đại lý sơn có thể liên hệ trực tiếp qua Hotline 0947.707.616 hoặc ghé thăm văn phòng để nhận tư vấn kỹ thuật và xem mẫu sơn thực tế.
          </p>
        </div>

        {/* 2 Cột: Thông tin liên hệ & Form gửi yêu cầu */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "28px",
            marginBottom: "36px",
          }}
          className="grid-2"
        >
          {/* Cột 1: Thông tin liên hệ chi tiết */}
          <div
            style={{
              background: "rgba(8, 22, 54, 0.88)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "14px",
              padding: "32px",
            }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "20px", color: "#ffffff" }}>
              CÔNG TY TNHH FUJI NANO VIỆT NAM
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "8px", background: "rgba(59, 130, 246, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#38bdf8", flexShrink: 0 }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 600 }}>TRỤ SỞ &amp; SHOWROOM TRƯNG BÀY:</div>
                  <div style={{ fontSize: "14px", color: "#ffffff", fontWeight: 600, marginTop: "2px" }}>
                    Số 45 đường Mậu Thân, Phường Cái Khế, Quận Ninh Kiều, TP. Cần Thơ
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "8px", background: "rgba(34, 197, 94, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#22c55e", flexShrink: 0 }}>
                  <Phone size={18} />
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 600 }}>HOTLINE KỸ SƯ 24/7 &amp; ZALO:</div>
                  <div style={{ fontSize: "16px", color: "#22c55e", fontWeight: 800, marginTop: "2px" }}>
                    <a href="tel:0947707616" style={{ color: "inherit", textDecoration: "none" }}>0947.707.616</a>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "8px", background: "rgba(239, 68, 68, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f87171", flexShrink: 0 }}>
                  <Mail size={18} />
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 600 }}>EMAIL TIẾP NHẬN BÁO GIÁ:</div>
                  <div style={{ fontSize: "14px", color: "#ffffff", marginTop: "2px" }}>
                    <a href="mailto:info@fujinano.vn" style={{ color: "inherit" }}>info@fujinano.vn</a>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <div style={{ width: "38px", height: "38px", borderRadius: "8px", background: "rgba(245, 158, 11, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fbbf24", flexShrink: 0 }}>
                  <Clock size={18} />
                </div>
                <div>
                  <div style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 600 }}>GIỜ MỞ CỬA KHO HÀNG:</div>
                  <div style={{ fontSize: "14px", color: "#ffffff", marginTop: "2px" }}>
                    Thứ 2 - Thứ 7: 7:30 - 17:30 (Chủ nhật hỗ trợ qua Hotline)
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(255, 255, 255, 0.1)", fontSize: "13px", color: "#94a3b8" }}>
              • Mã số thuế: <strong style={{ color: "#ffffff" }}>1801784735</strong><br />
              • Đầy đủ hóa đơn GTGT điện tử và chứng chỉ xuất xưởng CO/CQ cho mọi đơn hàng.
            </div>
          </div>

          {/* Cột 2: Form gửi tin nhắn / để lại thông tin */}
          <div
            style={{
              background: "rgba(8, 22, 54, 0.88)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "14px",
              padding: "32px",
            }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px", color: "#ffffff" }}>
              Gửi Tin Nhắn / Yêu Cầu Báo Giá
            </h2>
            <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "20px" }}>
              Kỹ sư FUJINANO sẽ liên hệ phản hồi trong vòng 15 phút.
            </p>

            {submitted ? (
              <div style={{ padding: "40px 20px", textAlign: "center" }}>
                <CheckCircle2 size={48} color="#34d399" style={{ margin: "0 auto 12px" }} />
                <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>Gửi Thành Công!</h3>
                <p style={{ fontSize: "13.5px", color: "#cbd5e1", marginBottom: "16px" }}>
                  Cảm ơn quý khách. Kỹ sư của chúng tôi sẽ gọi lại ngay theo số điện thoại đã cung cấp.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.2)",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  Gửi yêu cầu khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12.5px", color: "#cbd5e1", marginBottom: "4px", fontWeight: 600 }}>
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ví dụ: Nguyễn Văn An"
                    style={{
                      width: "100%",
                      background: "rgba(2, 10, 28, 0.7)",
                      border: "1px solid rgba(255, 255, 255, 0.18)",
                      borderRadius: "6px",
                      padding: "9px 12px",
                      color: "#fff",
                      fontSize: "13.5px",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12.5px", color: "#cbd5e1", marginBottom: "4px", fontWeight: 600 }}>
                    Số điện thoại liên hệ *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Ví dụ: 0912 345 678"
                    style={{
                      width: "100%",
                      background: "rgba(2, 10, 28, 0.7)",
                      border: "1px solid rgba(255, 255, 255, 0.18)",
                      borderRadius: "6px",
                      padding: "9px 12px",
                      color: "#fff",
                      fontSize: "13.5px",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12.5px", color: "#cbd5e1", marginBottom: "4px", fontWeight: 600 }}>
                    Nhu cầu cần hỗ trợ
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    style={{
                      width: "100%",
                      background: "#081534",
                      border: "1px solid rgba(255, 255, 255, 0.18)",
                      borderRadius: "6px",
                      padding: "9px 12px",
                      color: "#fff",
                      fontSize: "13.5px",
                      outline: "none",
                    }}
                  >
                    <option value="Tư vấn chọn thùng sơn">Tư vấn chọn thùng sơn phù hợp</option>
                    <option value="Báo giá chiết khấu đại lý">Báo giá chiết khấu đại lý / nhà thầu</option>
                    <option value="Khảo sát công trình trực tiếp">Khảo sát công trình trực tiếp</option>
                    <option value="Hỗ trợ kỹ thuật thi công">Hỗ trợ kỹ thuật thi công</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12.5px", color: "#cbd5e1", marginBottom: "4px", fontWeight: 600 }}>
                    Ghi chú thêm (Diện tích m², loại nền, địa điểm)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Ví dụ: Tôi cần sơn sàn xưởng 500m² tại KCN Trà Nóc Cần Thơ..."
                    style={{
                      width: "100%",
                      background: "rgba(2, 10, 28, 0.7)",
                      border: "1px solid rgba(255, 255, 255, 0.18)",
                      borderRadius: "6px",
                      padding: "9px 12px",
                      color: "#fff",
                      fontSize: "13.5px",
                      outline: "none",
                      resize: "vertical",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    background: "#dc2626",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "11px",
                    fontSize: "14px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    marginTop: "6px",
                  }}
                >
                  <Send size={15} /> Gửi Yêu Cầu Cho Kỹ Sư
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Google Maps Embed */}
        <div
          style={{
            background: "rgba(8, 22, 54, 0.88)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "14px",
            overflow: "hidden",
            padding: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
            <MapPin size={18} color="#38bdf8" />
            <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>
              Bản Đồ Chỉ Đường Đến Trụ Sở FUJINANO Cần Thơ
            </h3>
          </div>
          <div style={{ width: "100%", height: "380px", borderRadius: "10px", overflow: "hidden" }}>
            <iframe
              title="Bản đồ FUJINANO Cần Thơ"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.84151740994!2d105.7725!3d10.038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0629f6f6e5a61%3A0x6b445a6c4296fb77!2zNDUgTcledSBUaMOibiwgQ8OhaSBLaOG6vywgTmluaCBLaeG7gXUsIEPhuqduIFRoxqEsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
