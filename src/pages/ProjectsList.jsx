import React, { useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { MapPin, ArrowRight, CheckCircle2, Phone, FileText } from "lucide-react";

export default function ProjectsList({ onOpenOrderModal }) {
  const [filter, setFilter] = useState("all");

  const categories = [
    { id: "all", label: "Tất Cả Dự Án" },
    { id: "epoxy", label: "Sơn Epoxy Sàn" },
    { id: "pu", label: "Chống Thấm & PU" },
    { id: "court", label: "Sân Thể Thao" },
    { id: "fireproof", label: "Sơn Chống Cháy" },
  ];

  const filteredProjects = projects.filter((p) => {
    if (filter === "all") return true;
    if (filter === "epoxy") return p.service.toLowerCase().includes("epoxy");
    if (filter === "pu") return p.service.toLowerCase().includes("thấm") || p.service.toLowerCase().includes("pu");
    if (filter === "court") return p.service.toLowerCase().includes("sân") || p.title.toLowerCase().includes("thể thao");
    if (filter === "fireproof") return p.service.toLowerCase().includes("cháy");
    return true;
  });

  return (
    <div style={{ minHeight: "100vh", padding: "110px 0 60px", color: "#ffffff", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 20px" }}>
        
        {/* Breadcrumb */}
        <div style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "20px", display: "flex", gap: "8px", alignItems: "center" }}>
          <Link to="/" style={{ color: "#38bdf8" }}>Trang Chủ</Link>
          <span>/</span>
          <span style={{ color: "#ffffff" }}>Dự Án Thực Tế</span>
        </div>

        {/* Header Section */}
        <div style={{ marginBottom: "28px" }}>
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
            HƠN 850+ CÔNG TRÌNH NGHIỆM THU
          </span>
          <h1 style={{ fontSize: "30px", fontWeight: 800, marginBottom: "10px", color: "#ffffff" }}>
            Dự Án Thực Tế &amp; Công Trình Đã Thi Công
          </h1>
          <p style={{ fontSize: "14.5px", color: "#94a3b8", maxWidth: "750px", lineHeight: 1.6 }}>
            Tổng hợp hình ảnh thực tế các công trình sơn sàn epoxy nhà xưởng, chống thấm mái sàn sân thượng, sân thể thao tennis pickleball và bảo vệ kết cấu thép chống cháy do FUJINANO cung cấp vật tư và trực tiếp thi công.
          </p>
        </div>

        {/* Category Filters */}
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "12px", marginBottom: "28px" }}>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              style={{
                background: filter === c.id ? "#dc2626" : "rgba(8, 22, 54, 0.85)",
                color: filter === c.id ? "#ffffff" : "#cbd5e1",
                border: filter === c.id ? "1px solid #dc2626" : "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "20px",
                padding: "7px 18px",
                fontSize: "13px",
                fontWeight: filter === c.id ? 700 : 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.15s ease",
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            gap: "24px",
            marginBottom: "48px",
          }}
        >
          {filteredProjects.map((p) => (
            <Link
              key={p.slug}
              to={`/du-an/${p.slug}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
                background: "rgba(8, 22, 54, 0.88)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "14px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                transition: "transform 0.2s ease, border-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
              }}
            >
              <div style={{ position: "relative", width: "100%", height: "230px", overflow: "hidden", background: "#030c22" }}>
                <img
                  src={p.img}
                  alt={p.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    background: p.serviceColor || "#0284c7",
                    color: "#ffffff",
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderRadius: "4px",
                  }}
                >
                  {p.service}
                </div>
                {p.area && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "12px",
                      right: "12px",
                      background: "rgba(0, 0, 0, 0.75)",
                      backdropFilter: "blur(4px)",
                      color: "#38bdf8",
                      fontSize: "12px",
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    Diện tích: {p.area}
                  </div>
                )}
              </div>

              <div style={{ padding: "20px" }}>
                <div style={{ fontSize: "12px", color: "#38bdf8", fontWeight: 700, marginBottom: "4px" }}>
                  Khách hàng: {p.client}
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#ffffff", marginBottom: "10px", lineHeight: 1.4 }}>
                  {p.title}
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12.5px", color: "#94a3b8", marginBottom: "14px" }}>
                  <MapPin size={14} color="#f87171" />
                  <span>{p.location}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#38bdf8", fontWeight: 600 }}>
                  <span>Xem hồ sơ &amp; ảnh nghiệm thu</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Báo giá dự án */}
        <div
          style={{
            background: "rgba(8, 22, 54, 0.9)",
            border: "1px solid rgba(59, 130, 246, 0.3)",
            borderRadius: "14px",
            padding: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "6px" }}>
              Bạn Đang Cần Khảo Sát &amp; Báo Giá Cho Công Trình Của Mình?
            </h3>
            <p style={{ fontSize: "13.5px", color: "#94a3b8", margin: 0 }}>
              Kỹ sư FUJINANO đến tận nơi khảo sát mặt sàn, đo độ ẩm bê tông và lập dự toán vật tư miễn phí.
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => onOpenOrderModal && onOpenOrderModal(null)}
              style={{
                background: "#dc2626",
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "8px",
                fontSize: "13.5px",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <FileText size={15} /> Nhận Dự Toán Miễn Phí
            </button>
            <a
              href="tel:0947707616"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                color: "#fff",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                padding: "10px 18px",
                borderRadius: "8px",
                fontSize: "13.5px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "6px",
                textDecoration: "none",
              }}
            >
              <Phone size={14} color="#22c55e" /> Gọi: 0947.707.616
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
