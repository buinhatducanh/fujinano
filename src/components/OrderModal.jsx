import React, { useState } from "react";
import { X, CheckCircle2, Phone, Send, ShieldCheck, Truck } from "lucide-react";
import { products } from "../data/products";
import { useAppContext } from "../context/AppContext";

export default function OrderModal({ isOpen, onClose, product, initialVariant, initialColor, initialQuantity = 1 }) {
  const { addInquiry, siteSettings } = useAppContext();
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
    if (addInquiry) {
      addInquiry({
        name: formData.name,
        phone: formData.phone,
        product: currentProduct.shortName || currentProduct.name,
        quantity: initialQuantity,
        topic: `Đặt mua: ${selectedVolume} - Màu: ${selectedColor}`,
        notes: `Địa chỉ: ${formData.address || "Chưa có"}. Ghi chú: ${formData.note || "Không có"}. Tổng tiền ước tính: ${totalPrice.toLocaleString("vi-VN")} ₫`,
      });
    }
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
        background: "rgba(0, 8, 25, 0.75)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
      onClick={handleClose}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #081534 0%, #030c22 100%)",
          borderRadius: "14px",
          width: "100%",
          maxWidth: "500px",
          maxHeight: "92vh",
          overflowY: "auto",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          position: "relative",
          color: "#ffffff",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          fontFamily: "'DM Sans', sans-serif",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div
          style={{
            padding: "18px 22px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(2, 10, 28, 0.8)",
            color: "#ffffff",
            borderRadius: "13px 13px 0 0",
          }}
        >
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0 }}>
              ĐỂ LẠI THÔNG TIN ĐẶT MUA / BÁO GIÁ
            </h3>
            <p style={{ fontSize: "12px", color: "#94a3b8", margin: "3px 0 0" }}>
              Kỹ sư FUJINANO sẽ gọi lại tư vấn kỹ thuật &amp; báo giá trong 5-15 phút
            </p>
          </div>
          <button
            onClick={handleClose}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "none",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#ffffff",
            }}
          >
            <X size={16} />
          </button>
        </div>

        {isSuccess ? (
          <div style={{ padding: "36px 24px", textAlign: "center" }}>
            <CheckCircle2 size={52} color="#34d399" style={{ margin: "0 auto 14px" }} />
            <h4 style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", marginBottom: "8px" }}>
              ĐÃ GỬI THÔNG TIN THÀNH CÔNG!
            </h4>
            <p style={{ fontSize: "13.5px", color: "#cbd5e1", lineHeight: 1.6, marginBottom: "22px" }}>
              Cảm ơn quý khách <strong>{formData.name}</strong>. Kỹ sư tư vấn sẽ gọi vào số điện thoại{" "}
              <strong style={{ color: "#ff4d4f" }}>{formData.phone}</strong> trong vòng 5-15 phút để xác nhận số lượng thùng, bảng mã màu và tiến độ giao hàng.
            </p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <a
                href={`tel:${siteSettings?.hotlineRaw || "0947707616"}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "10px 18px",
                  background: "#dc2626",
                  color: "#ffffff",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "13.5px",
                }}
              >
                <Phone size={15} /> Gọi Hotline: {siteSettings?.hotline || "0947.707.616"}
              </a>
              <button
                onClick={handleClose}
                style={{
                  padding: "10px 18px",
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "13.5px",
                  cursor: "pointer",
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ padding: "20px 22px" }}>
            {/* Tóm tắt thùng sơn đã chọn */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                padding: "12px",
                background: "rgba(2, 10, 28, 0.6)",
                borderRadius: "8px",
                marginBottom: "18px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <img
                src={currentProduct.images?.[0] || "/images/slider/epoxy_floor.png"}
                alt={currentProduct.name}
                style={{
                  width: "64px",
                  height: "64px",
                  objectFit: "contain",
                  background: "#ffffff",
                  padding: "4px",
                  borderRadius: "6px",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#ffffff",
                    margin: "0 0 3px",
                    lineHeight: 1.35,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {currentProduct.name}
                </h4>
                <div style={{ fontSize: "11.5px", color: "#94a3b8", marginBottom: "3px" }}>
                  Quy cách: <strong style={{ color: "#38bdf8" }}>{selectedVolume}</strong> | Màu: <strong style={{ color: "#38bdf8" }}>{selectedColor}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "14.5px", fontWeight: 800, color: "#ff4d4f" }}>
                    ₫{totalPrice.toLocaleString("vi-VN")}
                  </span>
                  <span style={{ fontSize: "11.5px", color: "#94a3b8" }}>
                    Số lượng: x{initialQuantity} thùng
                  </span>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 600, color: "#cbd5e1", marginBottom: "5px" }}>
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
                    padding: "9px 12px",
                    borderRadius: "6px",
                    background: "rgba(2, 10, 28, 0.7)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "#ffffff",
                    fontSize: "13.5px",
                    outline: "none",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#38bdf8")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)")}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 600, color: "#cbd5e1", marginBottom: "5px" }}>
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
                    padding: "9px 12px",
                    borderRadius: "6px",
                    background: "rgba(2, 10, 28, 0.7)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "#ffffff",
                    fontSize: "13.5px",
                    outline: "none",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#38bdf8")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)")}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 600, color: "#cbd5e1", marginBottom: "5px" }}>
                  Địa chỉ giao hàng (Tỉnh / Thành phố / Tên Công Trình)
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: KCN Trà Nóc, Cần Thơ hoặc Quận 7, TP.HCM"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: "6px",
                    background: "rgba(2, 10, 28, 0.7)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "#ffffff",
                    fontSize: "13.5px",
                    outline: "none",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#38bdf8")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)")}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 600, color: "#cbd5e1", marginBottom: "5px" }}>
                  Diện tích cần sơn hoặc ghi chú thêm
                </label>
                <textarea
                  rows={2}
                  placeholder="Ví dụ: Cần sơn 500m2 sàn nhà xưởng, giao trong tuần..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: "6px",
                    background: "rgba(2, 10, 28, 0.7)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "#ffffff",
                    fontSize: "13.5px",
                    outline: "none",
                    resize: "vertical",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#38bdf8")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)")}
                />
              </div>

              {/* Cam kết */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  fontSize: "11.5px",
                  color: "#cbd5e1",
                  padding: "8px 12px",
                  background: "rgba(255, 255, 255, 0.06)",
                  borderRadius: "6px",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <ShieldCheck size={13} color="#34d399" />
                  <span>100% Chính hãng</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Truck size={13} color="#38bdf8" />
                  <span>Giao tận nơi</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <CheckCircle2 size={13} color="#34d399" />
                  <span>CO/CQ &amp; VAT</span>
                </div>
              </div>

              {/* Nút gửi */}
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#dc2626",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  marginTop: "4px",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#b91c1c")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#dc2626")}
              >
                <Send size={15} />
                <span>GỬI YÊU CẦU BÁO GIÁ NGAY</span>
              </button>

              <div style={{ textAlign: "center", marginTop: "2px" }}>
                <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                  Hoặc gọi hotline trực tiếp:{" "}
                  <a
                    href={`tel:${siteSettings?.hotlineRaw || "0947707616"}`}
                    style={{ color: "#38bdf8", fontWeight: 700, textDecoration: "underline" }}
                  >
                    {siteSettings?.hotline || "0947.707.616"}
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
