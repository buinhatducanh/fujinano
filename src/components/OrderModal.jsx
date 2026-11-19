import React, { useState } from "react";
import { X, CheckCircle2, Phone, Send, ShieldCheck, Truck, Sparkles } from "lucide-react";
import { products } from "../data/products";

export default function OrderModal({ isOpen, onClose, product, initialVariant, initialColor, initialQuantity = 1 }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const currentProduct = product || products[0];
  const selectedVolume = initialVariant || currentProduct.volumes?.[0]?.name || "Thùng 18 Lít";
  const selectedColor = initialColor || currentProduct.colors?.[0]?.name || "Tiêu chuẩn";
  const selectedPrice = initialVariant
    ? currentProduct.volumes?.find((v) => v.name === initialVariant)?.price || currentProduct.price
    : currentProduct.price;

  const totalPrice = selectedPrice * initialQuantity;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0, 10, 30, 0.82)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
      onClick={handleClose}
    >
      <div
        style={{
          background: "linear-gradient(135deg, rgba(0, 20, 65, 0.98), rgba(0, 10, 35, 0.98))",
          border: "1.5px solid rgba(0, 150, 255, 0.4)",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "520px",
          maxHeight: "92vh",
          overflowY: "auto",
          boxShadow: "0 25px 60px rgba(0,0,0,0.7), 0 0 30px rgba(0, 100, 255, 0.2)",
          position: "relative",
          color: "#fff",
          fontFamily: "'DM Sans', sans-serif",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div
          style={{
            padding: "18px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(90deg, #e60012 0%, #0055cc 100%)",
            color: "#fff",
            borderRadius: "14px 14px 0 0",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Sparkles size={16} color="#ffeb3b" />
              <h3 style={{ fontSize: "16px", fontWeight: 800, margin: 0, letterSpacing: "0.5px" }}>
                ĐỂ LẠI THÔNG TIN ĐẶT MUA / BÁO GIÁ
              </h3>
            </div>
            <p style={{ fontSize: "12px", opacity: 0.9, margin: "3px 0 0" }}>
              Kỹ sư FUJINANO sẽ gọi lại tư vấn kỹ thuật &amp; báo giá chiết khấu trong 5-15 phút
            </p>
          </div>
          <button
            onClick={handleClose}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#fff",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.4)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
          >
            <X size={18} />
          </button>
        </div>

        {isSuccess ? (
          <div style={{ padding: "40px 24px", textAlign: "center" }}>
            <CheckCircle2 size={56} color="#00e676" style={{ margin: "0 auto 16px" }} />
            <h4 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "8px" }}>
              ĐÃ GỬI THÔNG TIN THÀNH CÔNG!
            </h4>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", lineHeight: 1.6, marginBottom: "24px" }}>
              Cảm ơn quý khách <strong>{formData.name}</strong>. Kỹ sư tư vấn của{" "}
              <strong style={{ color: "#00a8ff" }}>FUJINANO</strong> sẽ liên hệ qua SĐT <strong style={{ color: "#ffeb3b" }}>{formData.phone}</strong> trong vòng 5-15 phút để xác nhận số lượng thùng, hướng dẫn định mức thi công và thời gian giao hàng tận nơi.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="tel:0947707616"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "11px 22px",
                  background: "linear-gradient(135deg, #e60012, #ff2a2a)",
                  color: "#fff",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "14px",
                  boxShadow: "0 4px 14px rgba(230,0,18,0.5)",
                }}
              >
                <Phone size={16} /> Gọi Hotline Ngay: 0947.707.616
              </a>
              <button
                onClick={handleClose}
                style={{
                  padding: "11px 22px",
                  background: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ padding: "20px 24px" }}>
            {/* Thông tin thùng sơn tóm tắt */}
            <div
              style={{
                display: "flex",
                gap: "14px",
                padding: "12px",
                background: "rgba(0, 10, 30, 0.6)",
                borderRadius: "10px",
                marginBottom: "20px",
                border: "1px solid rgba(0, 100, 255, 0.25)",
              }}
            >
              <img
                src={currentProduct.images?.[0] || "/images/slider/epoxy_floor.png"}
                alt={currentProduct.name}
                style={{
                  width: "72px",
                  height: "72px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4
                  style={{
                    fontSize: "13.5px",
                    fontWeight: 600,
                    color: "#fff",
                    margin: "0 0 4px",
                    lineHeight: 1.4,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {currentProduct.name}
                </h4>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.65)", marginBottom: "4px" }}>
                  Quy cách: <strong style={{ color: "#00a8ff" }}>{selectedVolume}</strong> | Màu: <strong style={{ color: "#00a8ff" }}>{selectedColor}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "15px", fontWeight: 800, color: "#ff4d4f" }}>
                    ₫{totalPrice.toLocaleString("vi-VN")}
                  </span>
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>
                    Số lượng: x{initialQuantity} thùng
                  </span>
                </div>
              </div>
            </div>

            {/* Form nhập thông tin */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.9)", marginBottom: "6px" }}>
                  Họ và tên quý khách *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Anh Hoàng / Chị Mai (Nhà thầu / Chủ xưởng)"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    borderRadius: "8px",
                    background: "rgba(0, 15, 45, 0.8)",
                    border: "1px solid rgba(0, 100, 255, 0.3)",
                    color: "#fff",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#00a8ff")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0, 100, 255, 0.3)")}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.9)", marginBottom: "6px" }}>
                  Số điện thoại nhận tư vấn &amp; báo giá *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Nhập số điện thoại (VD: 0912 345 678)"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    borderRadius: "8px",
                    background: "rgba(0, 15, 45, 0.8)",
                    border: "1px solid rgba(0, 100, 255, 0.3)",
                    color: "#fff",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#00a8ff")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0, 100, 255, 0.3)")}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.9)", marginBottom: "6px" }}>
                  Địa chỉ giao hàng (Tỉnh / Thành phố / Tên Công Trình)
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: KCN Trà Nóc, TP. Cần Thơ hoặc Quận 7, TP.HCM"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    borderRadius: "8px",
                    background: "rgba(0, 15, 45, 0.8)",
                    border: "1px solid rgba(0, 100, 255, 0.3)",
                    color: "#fff",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#00a8ff")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0, 100, 255, 0.3)")}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "rgba(255,255,255,0.9)", marginBottom: "6px" }}>
                  Yêu cầu kỹ thuật / Diện tích cần sơn (m²)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ví dụ: Cần sơn 800m2 sàn xưởng cơ khí, nền bê tông mác 250..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    background: "rgba(0, 15, 45, 0.8)",
                    border: "1px solid rgba(0, 100, 255, 0.3)",
                    color: "#fff",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                    resize: "vertical",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#00a8ff")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0, 100, 255, 0.3)")}
                />
              </div>

              {/* Cam kết của shop */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.7)",
                  padding: "10px",
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: "8px",
                  border: "1px dashed rgba(255,255,255,0.15)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <ShieldCheck size={14} color="#00e676" />
                  <span>100% Chính hãng</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <Truck size={14} color="#00e676" />
                  <span>Giao tận chân công trình</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <CheckCircle2 size={14} color="#00e676" />
                  <span>CO/CQ &amp; VAT</span>
                </div>
              </div>

              {/* Nút gửi thông tin */}
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "14px",
                  background: "linear-gradient(135deg, #e60012, #ff2a2a)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 4px 16px rgba(230, 0, 18, 0.4)",
                  marginTop: "6px",
                  transition: "transform 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <Send size={16} />
                <span>GỬI YÊU CẦU ĐẶT MUA / BÁO GIÁ</span>
              </button>

              {/* Hoặc gọi trực tiếp */}
              <div style={{ textAlign: "center", marginTop: "4px" }}>
                <span style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.6)" }}>
                  Cần gấp tư vấn kỹ thuật ngay lập tức?{" "}
                  <a
                    href="tel:0947707616"
                    style={{ color: "#ffeb3b", fontWeight: 700, textDecoration: "underline" }}
                  >
                    Gọi Hotline 0947.707.616
                  </a>
                </span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
