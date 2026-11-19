import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Tag } from "lucide-react";
import { newsArticles } from "../data/news";

function NewsCard({ article, index, isVisible }) {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const tiltX = (x / rect.width - 0.5) * 10;
    const tiltY = (y / rect.height - 0.5) * -10;
    setTilt({ x: tiltX, y: tiltY });
  };

  return (
    <Link
      to={`/tin-tuc/${article.slug}`}
      className="metallic-border"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
      style={{
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
        background: "rgba(0, 11, 32, 0.7)",
        borderRadius: "14px",
        overflow: "hidden",
        boxShadow: isHovered
          ? "0 20px 48px rgba(0,0,0,0.12)"
          : "0 4px 16px rgba(0,0,0,0.06)",
        transform: isVisible
          ? isHovered
            ? `translateY(-6px) perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`
            : "translateY(0) perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)"
          : "translateY(28px) scale(0.95)",
        opacity: isVisible ? 1 : 0,
        transition: isHovered
          ? "transform 0.1s ease-out, box-shadow 0.3s ease"
          : `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease, box-shadow 0.3s ease`,
        transformStyle: "preserve-3d",
        cursor: "pointer",
      }}
    >
      <div style={{ height: "200px", overflow: "hidden" }}>
        <img
          src={article.img}
          alt={article.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: isHovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.5s ease",
          }}
        />
      </div>

      <div
        style={{
          padding: "22px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ marginBottom: "12px" }}>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              color: article.tagColor,
              background: `${article.tagColor}18`,
              padding: "4px 10px",
              borderRadius: "4px",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            {article.tag}
          </span>
        </div>

        <h3
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "17px",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.4,
            marginBottom: "10px",
          }}
        >
          {article.title}
        </h3>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13.5px",
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.65,
            marginBottom: "16px",
            fontWeight: 300,
          }}
        >
          {article.excerpt}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "14px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            marginTop: "auto",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              color: "#94a3b8",
            }}
          >
            {article.date}
          </span>

          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: isHovered ? "8px" : "4px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              color: "#0055cc",
              transition: "gap 0.2s",
            }}
          >
            Đọc Thêm <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function NewsList() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section
      id="blog"
      className="pad-section-mobile"
      style={{ padding: "96px 0", background: "transparent" }}
      ref={sectionRef}
    >
      <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 32px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "48px",
            flexWrap: "wrap",
            gap: "16px",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.5s ease",
          }}
        >
          <div>
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
              Kiến Thức &amp; Tư Vấn
            </p>
            <h2
              className="heading-xl-mobile"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "44px",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.3px",
                lineHeight: 1.3,
              }}
            >
              Bài Viết Mới Nhất
            </h2>
          </div>

          <Link
            to="/tin-tuc"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              color: "#0055cc",
              textDecoration: "none",
              borderBottom: "1.5px solid rgba(0,85,204,0.3)",
              paddingBottom: "2px",
            }}
          >
            Tất Cả Bài Viết <ArrowRight size={14} />
          </Link>
        </div>

        <div
          className="grid-mobile-1 gap-mobile-sm"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "22px",
          }}
        >
          {newsArticles.map((article, idx) => (
            <NewsCard
              key={article.title}
              article={article}
              index={idx}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
