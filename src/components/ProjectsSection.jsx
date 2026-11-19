import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { projects } from "../data/projects";

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const tiltX = (x / rect.width - 0.5) * 12;
    const tiltY = (y / rect.height - 0.5) * -12;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      className="metallic-border"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        gridColumn: project.span > 1 ? `span ${project.span}` : undefined,
        borderRadius: "16px",
        overflow: "hidden",
        position: "relative",
        height: "320px",
        cursor: "pointer",
        boxShadow: isHovered
          ? "0 28px 60px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.05)"
          : "0 6px 20px rgba(0,0,0,0.06)",
        transform: isHovered
          ? `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale3d(1.025, 1.025, 1.025)`
          : isVisible
          ? "perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)"
          : "translateY(32px) scale(0.97)",
        opacity: isVisible ? 1 : 0,
        transition: isHovered
          ? "none"
          : "all 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease",
        transformStyle: "preserve-3d",
      }}
    >
      {isHovered && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at ${tilt.x * 2.5 + 50}% ${-tilt.y * 2.5 + 50}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
            pointerEvents: "none",
            zIndex: 3,
          }}
        />
      )}

      <img
        src={project.img}
        alt={project.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: isHovered ? "scale(1.08)" : "scale(1)",
          transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isHovered
            ? "linear-gradient(180deg, rgba(8,14,26,0.15) 0%, rgba(8,14,26,0.92) 100%)"
            : "linear-gradient(180deg, transparent 35%, rgba(8,14,26,0.8) 100%)",
          transition: "background 0.35s",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "18px",
          left: "18px",
          background: project.serviceColor,
          color: "#fff",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.5px",
          padding: "5px 12px",
          borderRadius: "4px",
          textTransform: "uppercase",
          transform: "translateZ(20px)",
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          zIndex: 2,
        }}
      >
        {project.service}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "24px",
          zIndex: 2,
          transform: "translateZ(30px)",
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px",
            fontWeight: 700,
            color: "#64748b",
            letterSpacing: "1px",
            textTransform: "uppercase",
            marginBottom: "6px",
          }}
        >
          {project.client}
        </div>
        <h3
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: "23px",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.3,
            marginBottom: "8px",
          }}
        >
          {project.title}
        </h3>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <MapPin size={12} color="rgba(255,255,255,0.5)" />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                color: "rgba(255,255,255,0.5)",
                fontWeight: 300,
              }}
            >
              {project.location} · {project.area}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              color: "#ff4455",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12.5px",
              fontWeight: 600,
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "translateX(0)" : "translateX(-8px)",
              transition: "all 0.3s ease",
            }}
          >
            Xem Dự Án <ArrowRight size={13} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
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
      id="portfolio"
      className="pad-section-mobile"
      style={{ padding: "96px 0", background: "transparent" }}
      ref={sectionRef}
    >
      <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 32px" }}>
        <div
          className="flex-col-mobile align-start-mobile gap-mobile-sm"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "48px",
            flexWrap: "wrap",
            gap: "20px",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
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
                marginBottom: "10px",
              }}
            >
              Dự Án Nổi Bật
            </p>
            <h2
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "48px",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.3px",
                lineHeight: 1.3,
              }}
            >
              Công Trình <br />
              <span style={{ color: "#0055cc" }}>Đã Hoàn Thành</span>
            </h2>
          </div>

          <a
            href="#portfolio"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              color: "#0055cc",
              textDecoration: "none",
              borderBottom: "1.5px solid #0055cc44",
              paddingBottom: "2px",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#0055cc")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#0055cc44")}
          >
            Xem Tất Cả <ArrowRight size={14} />
          </a>
        </div>

        <div
          className="grid-mobile-1 gap-mobile-sm"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          }}
        >
          {projects.map((p, idx) => (
            <Link
              key={p.title}
              to={`/du-an/${p.slug}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
                outline: "none",
                gridColumn: p.span > 1 ? `span ${p.span}` : undefined,
              }}
            >
              <ProjectCard project={p} index={idx} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
