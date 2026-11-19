import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Truck, RotateCcw, Headphones, Phone, MessageCircle, MapPin, Mail, Award, CheckCircle } from "lucide-react";
import Logo from "./Logo";

export default function ShopeeFooter({ onOpenOrderModal }) {
  return (
    <footer style={{ background: "#fbfbfb", borderTop: "4px solid #ee4d2d", color: "rgba(0,0,0,0.65)", fontSize: "12px", fontFamily: "'DM Sans', sans-serif" }}>
      {/* 1. Shopee Top Trust Bar */}
      <div style={{ borderBottom: "1px solid #eaeaea", background: "#fff", padding: "28px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ width: "46px", height: "46px", borderRadius: "50%", background: "#fef0ee", display: "flex", alignItems: "center", justifyContent: "center", color: "#ee4d2d", flexShrink: 0 }}>
                <RotateCcw size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "14px", color: "#222" }}>7 Ngày Đổi Trả Miễn Phí</div>
                <div style={{ color: "#777", fontSize: "12px", marginTop: "2px" }}>Bảo vệ quyền lợi khách hàng 100%</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ width: "46px", height: "46px", borderRadius: "50%", background: "#fef0ee", display: "flex", alignItems: "center", justifyContent: "center", color: "#ee4d2d", flexShrink: 0 }}>
                <ShieldCheck size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "14px", color: "#222" }}>100% Hàng Chính Hãng</div>
                <div style={{ color: "#777", fontSize: "12px", marginTop: "2px" }}>Đầy đủ CO/CQ, xuất hóa đơn VAT</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ width: "46px", height: "46px", borderRadius: "50%", background: "#fef0ee", display: "flex", alignItems: "center", justifyContent: "center", color: "#ee4d2d", flexShrink: 0 }}>
                <Truck size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "14px", color: "#222" }}>Giao Toàn Quốc Tận Nơi</div>
                <div style={{ color: "#777", fontSize: "12px", marginTop: "2px" }}>Xe tải công ty &amp; chành xe liên tỉnh</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ width: "46px", height: "46px", borderRadius: "50%", background: "#fef0ee", display: "flex", alignItems: "center", justifyContent: "center", color: "#ee4d2d", flexShrink: 0 }}>
                <Headphones size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "14px", color: "#222" }}>Kỹ Sư Khảo Sát 24/7</div>
                <div style={{ color: "#777", fontSize: "12px", marginTop: "2px" }}>Tư vấn định mức sơn miễn phí</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Directory */}
      <div style={{ padding: "40px 0 30px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "32px",
            }}
          >
            {/* Column 1: Chăm sóc & 2 cách mua */}
            <div>
              <div style={{ fontWeight: 700, fontSize: "13px", color: "rgba(0,0,0,0.85)", textTransform: "uppercase", marginBottom: "16px" }}>
                2 CÁCH MUA HÀNG DỄ DÀNG
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", lineHeight: 1.5 }}>
                <li>
                  <button
                    onClick={() => onOpenOrderModal && onOpenOrderModal(null)}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      color: "#ee4d2d",
                      fontWeight: 700,
                      cursor: "pointer",
                      fontSize: "12.5px",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span style={{ background: "#ee4d2d", color: "#fff", width: "18px", height: "18px", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "10px" }}>1</span>
                    Cách 1: Để lại thông tin đặt mua
                  </button>
                  <p style={{ margin: "3px 0 0 24px", color: "#888", fontSize: "11px" }}>
                    Nhân viên gọi lại báo giá chiết khấu trong 5 phút.
                  </p>
                </li>
                <li>
                  <a
                    href="tel:0947707616"
                    style={{
                      color: "#010a1c",
                      fontWeight: 700,
                      textDecoration: "none",
                      fontSize: "12.5px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span style={{ background: "#010a1c", color: "#ffeb3b", width: "18px", height: "18px", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "10px" }}>2</span>
                    Cách 2: Gọi Hotline 0947.707.616
                  </a>
                  <p style={{ margin: "3px 0 0 24px", color: "#888", fontSize: "11px" }}>
                    Tư vấn trực tiếp với kỹ sư sơn công nghiệp 24/7.
                  </p>
                </li>
                <li style={{ marginTop: "8px", borderTop: "1px dashed #e0e0e0", paddingTop: "8px" }}>
                  <a href="https://zalo.me/0947707616" target="_blank" rel="noopener noreferrer" style={{ color: "#0068ff", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    <MessageCircle size={14} /> Nhắn tin Zalo: 0947.707.616
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Về FUJINANO */}
            <div>
              <div style={{ fontWeight: 700, fontSize: "13px", color: "rgba(0,0,0,0.85)", textTransform: "uppercase", marginBottom: "16px" }}>
                VỀ FUJINANO MALL
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px", color: "#666" }}>
                <li>Công ty Cổ phần Công nghệ FUJINANO</li>
                <li>Hệ thống phân phối sơn sàn Epoxy hàng đầu</li>
                <li>Đại lý ủy quyền KCC Hàn Quốc &amp; Jotun Na Uy</li>
                <li>Sản phẩm đạt chuẩn ISO 9001:2015</li>
                <li>Kiểm định phòng cháy chữa cháy Cục Cảnh sát PCCC</li>
                <li>Chính sách bảo mật thanh toán &amp; dữ liệu</li>
              </ul>
            </div>

            {/* Column 3: Vận chuyển & Thanh toán */}
            <div>
              <div style={{ fontWeight: 700, fontSize: "13px", color: "rgba(0,0,0,0.85)", textTransform: "uppercase", marginBottom: "16px" }}>
                VẬN CHUYỂN &amp; THANH TOÁN
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", color: "#666" }}>
                <div>
                  <span style={{ fontWeight: 600, color: "#333" }}>Thanh toán:</span> COD (nhận hàng kiểm tra thanh toán), Chuyển khoản ngân hàng công ty.
                </div>
                <div>
                  <span style={{ fontWeight: 600, color: "#333" }}>Vận chuyển:</span> Đội xe giao tận chân công trình tại Cần Thơ, TP.HCM, Hà Nội và gửi chành xe toàn quốc.
                </div>
                <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                  <span style={{ background: "#eee", padding: "3px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 600 }}>VIETCOMBANK</span>
                  <span style={{ background: "#eee", padding: "3px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 600 }}>TIỀN MẶT COD</span>
                  <span style={{ background: "#eee", padding: "3px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 600 }}>HÓA ĐƠN VAT</span>
                </div>
              </div>
            </div>

            {/* Column 4: Hệ thống kho & Hotline */}
            <div>
              <div style={{ fontWeight: 700, fontSize: "13px", color: "rgba(0,0,0,0.85)", textTransform: "uppercase", marginBottom: "16px" }}>
                KHO HÀNG &amp; LIÊN HỆ
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", color: "#666" }}>
                <div style={{ display: "flex", gap: "6px", alignItems: "flex-start" }}>
                  <MapPin size={15} color="#ee4d2d" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span><strong>Tổng kho Miền Tây:</strong> KCN Trà Nóc, Q. Bình Thủy, TP. Cần Thơ</span>
                </div>
                <div style={{ display: "flex", gap: "6px", alignItems: "flex-start" }}>
                  <MapPin size={15} color="#ee4d2d" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span><strong>Kho Miền Nam:</strong> KCN Sóng Thần, Bình Dương / TP.HCM</span>
                </div>
                <div style={{ display: "flex", gap: "6px", alignItems: "flex-start" }}>
                  <MapPin size={15} color="#ee4d2d" style={{ flexShrink: 0, marginTop: "2px" }} />
                  <span><strong>Kho Miền Bắc:</strong> KCN Quang Minh, Mê Linh, Hà Nội</span>
                </div>
                <div style={{ display: "flex", gap: "6px", alignItems: "center", marginTop: "4px" }}>
                  <Phone size={15} color="#ee4d2d" />
                  <a href="tel:0947707616" style={{ color: "#ee4d2d", fontWeight: 700, textDecoration: "none", fontSize: "14px" }}>
                    0947.707.616
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom License Bar */}
      <div style={{ background: "#f5f5f5", padding: "20px 0", borderTop: "1px solid #e0e0e0", textAlign: "center" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
          <p style={{ margin: "0 0 6px", color: "#777", fontSize: "12px" }}>
            © 2026 FUJINANO MALL - HỆ THỐNG PHÂN PHỐI SƠN CÔNG NGHIỆP &amp; THÙNG SƠN CAO CẤP HÀNG ĐẦU VIỆT NAM
          </p>
          <p style={{ margin: 0, color: "#999", fontSize: "11px" }}>
            Thiết kế gọn gàng, tối ưu trải nghiệm mua thùng sơn chuyên nghiệp theo phong cách Shopee Mall. 2 phương thức mua hàng: Để lại thông tin báo giá &amp; Gọi hotline trực tiếp.
          </p>
        </div>
      </div>
    </footer>
  );
}
