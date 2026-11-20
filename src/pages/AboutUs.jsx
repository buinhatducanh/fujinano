import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Award, Factory, Users, CheckCircle2, MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export default function AboutUs({ onOpenOrderModal }) {
  const stats = [
    { val: "12+", label: "Năm Kinh Nghiệm", desc: "Tiên phong công nghệ sơn nano Nhật Bản" },
    { val: "850+", label: "Dự Án Hoàn Thành", desc: "Nhà xưởng, bệnh viện, sân thể thao toàn quốc" },
    { val: "1.2M+", label: "m² Sàn Đã Thi Công", desc: "Khẳng định uy tín và chất lượng bền vững" },
    { val: "100%", label: "Chuẩn ISO & PCCC", desc: "Đầy đủ chứng chỉ CO/CQ và hóa đơn VAT" },
  ];

  const milestones = [
    { year: "2012", title: "Thành lập & Nghiên cứu", desc: "Khởi đầu từ xưởng nghiên cứu ứng dụng công nghệ hạt Nano vào hóa chất phủ sàn công nghiệp." },
    { year: "2016", title: "Chuyển giao công nghệ Nhật Bản", desc: "Hợp tác chuyển giao dây chuyền sản xuất nhựa Epoxy Bisphenol-A và Polyurethane từ đối tác Tokyo." },
    { year: "2019", title: "Đạt chuẩn ISO 9001:2015 & PCCC", desc: "Được Cục PCCC cấp chứng nhận sơn chống cháy đạt thời gian chịu nhiệt 120 phút ở 1200°C." },
    { year: "2024", title: "Mở rộng Tổng kho Cần Thơ & Miền Tây", desc: "Thiết lập trung tâm phân phối và đội xe giao hàng nhanh trực tiếp tận chân công trình ĐBSCL." },
  ];

  return (
    <div style={{ minHeight: "100vh", padding: "110px 0 60px", color: "#ffffff", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 20px" }}>
        
        {/* Breadcrumb */}
        <div style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "20px", display: "flex", gap: "8px", alignItems: "center" }}>
          <Link to="/" style={{ color: "#38bdf8" }}>Trang Chủ</Link>
          <span>/</span>
          <span style={{ color: "#ffffff" }}>Về Chúng Tôi</span>
        </div>

        {/* Hero Section */}
        <div
          style={{
            background: "rgba(8, 22, 54, 0.9)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "16px",
            padding: "48px 36px",
            marginBottom: "32px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div style={{ maxWidth: "800px" }}>
            <span
              style={{
                display: "inline-block",
                background: "rgba(59, 130, 246, 0.15)",
                color: "#38bdf8",
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: 700,
                marginBottom: "16px",
                border: "1px solid rgba(59, 130, 246, 0.3)",
              }}
            >
              HỒ SƠ NĂNG LỰC DOANH NGHIỆP
            </span>
            <h1 style={{ fontSize: "32px", fontWeight: 800, lineHeight: 1.3, marginBottom: "16px", color: "#ffffff" }}>
              CÔNG TY TNHH FUJI NANO VIỆT NAM
            </h1>
            <p style={{ fontSize: "15px", color: "#cbd5e1", lineHeight: 1.7, marginBottom: "24px" }}>
              Tiên phong nghiên cứu, sản xuất và phân phối các dòng sơn công nghiệp chất lượng cao ứng dụng công nghệ hạt Nano Nhật Bản. FUJINANO cung ứng các giải pháp thùng sơn chuyên dụng: Sơn sàn Epoxy tự phẳng, Chống thấm Polyurethane, Sơn chống cháy kết cấu thép PCCC, Sơn thể thao chuẩn ITF và hóa chất tăng cứng xoa nền bê tông.
            </p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <button
                onClick={() => onOpenOrderModal && onOpenOrderModal(null)}
                style={{
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  padding: "10px 22px",
                  borderRadius: "8px",
                  fontSize: "13.5px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Nhận Báo Giá Dự Án
              </button>
              <a
                href="tel:0947707616"
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  color: "#fff",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontSize: "13.5px",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Phone size={15} color="#22c55e" /> Hotline: 0947.707.616
              </a>
            </div>
          </div>
        </div>

        {/* 4 Thống kê ấn tượng */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
            marginBottom: "36px",
          }}
        >
          {stats.map((s, idx) => (
            <div
              key={idx}
              style={{
                background: "rgba(8, 22, 54, 0.85)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                padding: "24px",
              }}
            >
              <div style={{ fontSize: "36px", fontWeight: 800, color: "#38bdf8", marginBottom: "4px" }}>
                {s.val}
              </div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff", marginBottom: "6px" }}>
                {s.label}
              </div>
              <div style={{ fontSize: "12px", color: "#94a3b8" }}>{s.desc}</div>
            </div>
          ))}
        </div>

        {/* Thông tin pháp lý & Cam kết */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "24px",
            marginBottom: "36px",
          }}
          className="grid-2"
        >
          <div
            style={{
              background: "rgba(8, 22, 54, 0.85)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "14px",
              padding: "32px",
            }}
          >
            <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px", color: "#ffffff" }}>
              Thông Tin Doanh Nghiệp &amp; Pháp Lý
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px", color: "#cbd5e1" }}>
              <li><strong>Tên đầy đủ:</strong> CÔNG TY TNHH FUJI NANO VIỆT NAM</li>
              <li><strong>Tên quốc tế:</strong> FUJI NANO VIETNAM COMPANY LIMITED</li>
              <li><strong>Mã số thuế:</strong> 1801784735 do Sở KH&amp;ĐT TP. Cần Thơ cấp</li>
              <li><strong>Trụ sở chính:</strong> Số 45 đường Mậu Thân, Phường Cái Khế, Quận Ninh Kiều, TP. Cần Thơ</li>
              <li><strong>Lĩnh vực chính:</strong> Sản xuất và phân phối sơn công nghiệp, chất chống thấm, màng phủ epoxy, phụ gia tăng cứng bê tông</li>
              <li><strong>Đại diện pháp luật:</strong> Ngô Anh Tú</li>
              <li><strong>Cam kết chất lượng:</strong> 100% lô hàng xuất kho đều có phiếu kiểm nghiệm xuất xưởng (CO/CQ) và hóa đơn GTGT đầy đủ</li>
            </ul>
          </div>

          <div
            style={{
              background: "rgba(8, 22, 54, 0.85)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "14px",
              padding: "32px",
            }}
          >
            <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px", color: "#ffffff" }}>
              Năng Lực Cung Ứng &amp; Thi Công
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "13.5px", color: "#cbd5e1" }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <CheckCircle2 size={18} color="#34d399" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span><strong>Tổng kho miền Tây:</strong> Sẵn kho 2.000+ thùng sơn các loại tại Cần Thơ, đáp ứng ngay trong ngày cho các dự án KCN Trà Nóc, Thốt Nốt, Vĩnh Long, Hậu Giang.</span>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <CheckCircle2 size={18} color="#34d399" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span><strong>Đội ngũ kỹ sư khảo sát:</strong> Trực tiếp đo độ ẩm bê tông bằng máy Protimeter, test cường độ mác sàn trước khi tư vấn dòng sơn.</span>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <CheckCircle2 size={18} color="#34d399" style={{ flexShrink: 0, marginTop: "2px" }} />
                <span><strong>Bảo hành chính hãng:</strong> Bảo hành màng sơn lên đến 5 năm đối với hệ sơn Epoxy và 10 năm đối với chống thấm PU lộ thiên.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lịch sử phát triển */}
        <div
          style={{
            background: "rgba(8, 22, 54, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "14px",
            padding: "32px",
            marginBottom: "36px",
          }}
        >
          <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "24px", color: "#ffffff" }}>
            Hành Trình Phát Triển Thương Hiệu FUJINANO
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {milestones.map((m, idx) => (
              <div
                key={idx}
                style={{
                  borderLeft: "2px solid #38bdf8",
                  paddingLeft: "16px",
                }}
              >
                <div style={{ fontSize: "18px", fontWeight: 800, color: "#38bdf8", marginBottom: "4px" }}>
                  {m.year}
                </div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff", marginBottom: "6px" }}>
                  {m.title}
                </div>
                <div style={{ fontSize: "12.5px", color: "#94a3b8", lineHeight: 1.5 }}>
                  {m.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner cuối trang */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(12, 42, 114, 0.9), rgba(0, 22, 72, 0.95))",
            border: "1px solid rgba(59, 130, 246, 0.3)",
            borderRadius: "14px",
            padding: "32px",
            textAlign: "center",
          }}
        >
          <h3 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "8px" }}>
            Quý Khách Cần Báo Giá Đại Lý Hoặc Khảo Sát Công Trình?
          </h3>
          <p style={{ fontSize: "14px", color: "#cbd5e1", marginBottom: "20px" }}>
            Kỹ sư FUJINANO sẵn sàng tư vấn giải pháp định mức m² và gửi mẫu thử trực tiếp đến công trình.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => onOpenOrderModal && onOpenOrderModal(null)}
              style={{
                background: "#dc2626",
                color: "#fff",
                border: "none",
                padding: "11px 26px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Để Lại Thông Tin Nhận Báo Giá
            </button>
            <Link
              to="/lien-he"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                color: "#fff",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                padding: "11px 22px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Xem Bản Đồ &amp; Liên Hệ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
