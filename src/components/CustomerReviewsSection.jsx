import React, { useState } from "react";
import { Star, CheckCircle, ThumbsUp, Quote, MessageSquare } from "lucide-react";

export default function CustomerReviewsSection() {
  const [filterRating, setFilterRating] = useState("all");

  const reviews = [
    {
      id: 1,
      author: "Trần Quốc Bảo",
      role: "Nhà Thầu Cơ Điện & Sàn Công Nghiệp (TP. Cần Thơ)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop",
      productName: "Sơn Epoxy Tự San Phẳng 18L",
      rating: 5,
      date: "12/11/2026",
      verified: true,
      comment:
        "Tôi đã thi công sơn tự phẳng Fuji Nano cho xưởng chế biến thủy sản 1.500m² tại KCN Trà Nóc. Sơn chảy rất đều, bám dính cực chắc, mặt sàn bóng gương và chịu xe nâng 5 tấn ra vào liên tục không hề trầy xước. Giao hàng từ kho Mậu Thân chỉ mất 2 tiếng.",
      image: "/images/slider/epoxy_floor.png",
      likes: 42,
    },
    {
      id: 2,
      author: "Nguyễn Hoàng Đức",
      role: "Chủ Thầu Xây Dựng Dân Dụng (Vĩnh Long)",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop",
      productName: "Sơn Chống Thấm Polyurethane PU 18L",
      rating: 5,
      date: "04/11/2026",
      verified: true,
      comment:
        "Lăn 2 lớp cho sàn mái sân thượng 350m² trước mùa mưa bão miền Tây. Bề mặt sơn dai dẻo như cao su, nước mưa trút xuống trôi tuột, trần nhà bên dưới khô ráo 100%. Giá sỉ tận gốc nhà máy hợp lý hơn hẳn các dòng sơn nhập khẩu.",
      image: "/images/slider/sports_court.png",
      likes: 38,
    },
    {
      id: 3,
      author: "Lê Văn Minh",
      role: "Chủ Cụm Sân Pickleball & Tennis (Q. Bình Thủy, Cần Thơ)",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop",
      productName: "Sơn Sân Thể Thao Đa Năng 18L",
      rating: 5,
      date: "28/10/2026",
      verified: true,
      comment:
        "Sơn sân thể thao độ nảy bóng rất chuẩn, bề mặt nhám mịn chống trơn trượt tối đa. Khách chơi bóng dù trời mưa nhẹ vẫn không lo bị ngã. Đội ngũ kỹ thuật hỗ trợ tính định mức và giao sơn tận sân.",
      image: "/images/slider/sports_court.png",
      likes: 29,
    },
    {
      id: 4,
      author: "Kỹ sư Phan Thanh Tùng",
      role: "Giám Sát PCCC Nhà Xưởng Thép (KCN Sóng Thần, Bình Dương)",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop",
      productName: "Sơn Chống Cháy Kết Cấu Thép 20KG",
      rating: 5,
      date: "15/10/2026",
      verified: true,
      comment:
        "Đầy đủ tem kiểm định của Cục Cảnh sát PCCC và phiếu kiểm nghiệm xuất xưởng CO/CQ. Sơn bám dính khung kèo thép rất chắc chắn, quá trình nghiệm thu PCCC với chủ đầu tư diễn ra thuận lợi nhanh chóng.",
      image: "/images/slider/fireproof_steel.png",
      likes: 51,
    },
  ];

  return (
    <div style={{ marginBottom: "40px" }}>
      {/* Header đánh giá */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div>
          <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", margin: 0 }}>
            Đánh Giá Của Khách Hàng &amp; Nhà Thầu
          </h3>
          <p style={{ fontSize: "12.5px", color: "#94a3b8", margin: "3px 0 0" }}>
            Trải nghiệm thực tế từ các kỹ sư, chủ xưởng và đơn vị thi công trên toàn quốc
          </p>
        </div>

        {/* Tổng quan rating */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(8, 22, 54, 0.8)", padding: "6px 14px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.12)" }}>
          <div style={{ display: "flex", color: "#f59e0b" }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
            ))}
          </div>
          <span style={{ fontSize: "13px", fontWeight: 800, color: "#ffffff" }}>4.9 / 5.0</span>
          <span style={{ fontSize: "11.5px", color: "#94a3b8" }}>(1.250+ lượt đánh giá)</span>
        </div>
      </div>

      {/* Grid danh sách đánh giá */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "18px",
        }}
      >
        {reviews.map((r) => (
          <div
            key={r.id}
            style={{
              background: "rgba(8, 22, 54, 0.88)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "12px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.25)",
              transition: "transform 0.2s ease, border-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
            }}
          >
            <div>
              {/* Header người đánh giá */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <img
                  src={r.avatar}
                  alt={r.author}
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #38bdf8",
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "14px", fontWeight: 700, color: "#ffffff" }}>{r.author}</span>
                    {r.verified && (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "2px", background: "rgba(34, 197, 94, 0.15)", color: "#34d399", padding: "1px 6px", borderRadius: "10px", fontSize: "10px", fontWeight: 600 }}>
                        <CheckCircle size={10} /> Đã Mua Hàng
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: "11px", color: "#94a3b8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {r.role}
                  </div>
                </div>
              </div>

              {/* Số sao & Sản phẩm đã mua */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                <div style={{ display: "flex", gap: "2px" }}>
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} size={13} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <span style={{ fontSize: "11px", color: "#64748b" }}>{r.date}</span>
              </div>

              <div style={{ fontSize: "11.5px", color: "#38bdf8", fontWeight: 600, marginBottom: "8px" }}>
                Đã mua: {r.productName}
              </div>

              {/* Lời nhận xét */}
              <p style={{ fontSize: "13px", color: "#cbd5e1", lineHeight: 1.5, margin: "0 0 14px", fontStyle: "normal" }}>
                "{r.comment}"
              </p>
            </div>

            {/* Ảnh nghiệm thu & Thích */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "12px",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <img
                  src={r.image}
                  alt="Ảnh công trình thực tế"
                  style={{
                    width: "48px",
                    height: "36px",
                    borderRadius: "4px",
                    objectFit: "cover",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                  }}
                />
                <span style={{ fontSize: "11px", color: "#94a3b8" }}>Ảnh thực tế sàn</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#94a3b8", fontSize: "11.5px" }}>
                <ThumbsUp size={12} color="#38bdf8" />
                <span>Hữu ích ({r.likes})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
