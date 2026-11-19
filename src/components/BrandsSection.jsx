import React, { useState, useEffect, useRef } from "react";
import { Award, ShieldCheck } from "lucide-react";
import { brands, brandStats } from "../data/brands";

function useCounter(target, active) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let current = 0;
    const step = Math.ceil(target / 45);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(current);
      if (current >= target) clearInterval(timer);
    }, 25);
    return () => clearInterval(timer);
  }, [target, active]);

  return count;
}

function StatCard({ item, active }) {
  const numInt = parseInt(item.num.replace(/\D/g, ""), 10);
  const suffix = item.num.replace(/\d/g, "");
  const animatedNum = useCounter(numInt, active);

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const tiltX = (x / rect.width - 0.5) * 12;
    const tiltY = (y / rect.height - 0.5) * -12;
    setTilt({ x: tiltX, y: tiltY });
  };

  return (
    <div
      className="metallic-border"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
      style={{
        background: "rgba(2, 11, 29, 0.75)",
        backdropFilter: "blur(10px)",
        borderRadius: "16px",
        padding: "36px 20px",
        textAlign: "center",
        transform: isHovered
          ? `perspective(800px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale3d(1.04, 1.04, 1.04)`
          : "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)",
        transition: isHovered ? "none" : "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: active ? 1 : 0,
        transformStyle: "preserve-3d",
        boxShadow: isHovered
          ? `0 20px 45px rgba(0,0,0,0.55), 0 0 25px ${item.color}33`
          : "0 10px 30px rgba(0, 0, 0, 0.15)",
        cursor: "default",
      }}
    >
      <div
        style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: "56px",
          fontWeight: 800,
          color: "#fff",
          lineHeight: 1.3,
          marginBottom: "8px",
          transform: "translateZ(25px)",
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {animatedNum}
        <span style={{ color: item.color }}>{suffix}</span>
      </div>

      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "13.5px",
          color: "rgba(255,255,255,0.55)",
          fontWeight: 500,
          transform: "translateZ(15px)",
          transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {item.label}
      </div>
    </div>
  );
}

function BrandCard({ brand, active }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const tiltX = (x / rect.width - 0.5) * 14;
    const tiltY = (y / rect.height - 0.5) * -14;
    setTilt({ x: tiltX, y: tiltY });
  };

  return (
    <div
      className="metallic-border"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
      style={{
        background: "rgba(0, 11, 32, 0.7)",
        borderRadius: "14px",
        padding: "28px 20px",
        textAlign: "center",
        boxShadow: isHovered
          ? `0 20px 45px rgba(0,0,0,0.12), 0 0 24px ${brand.glow}`
          : "0 4px 16px rgba(0,0,0,0.04)",
        cursor: "default",
        transform: isHovered
          ? `perspective(800px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale3d(1.05, 1.05, 1.05)`
          : "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)",
        transition: isHovered ? "none" : "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: active ? 1 : 0,
        transformStyle: "preserve-3d",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {isHovered && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at ${tilt.x * 2 + 50}% ${-tilt.y * 2 + 50}%, rgba(0,0,0,0.02) 0%, transparent 60%)`,
            pointerEvents: "none",
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.25s",
          transform: "translateZ(10px)",
        }}
      >
        <ShieldCheck size={15} color={brand.color} />
      </div>

      <div
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "14px",
          background: isHovered ? `${brand.color}22` : `${brand.color}0f`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 16px",
          border: `1.5px solid ${brand.color}33`,
          transition: "all 0.3s ease",
          transform: "translateZ(20px)",
        }}
      >
        <span
          style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: "22px",
            fontWeight: 800,
            color: brand.color,
          }}
        >
          {brand.name.slice(0, 2).toUpperCase()}
        </span>
      </div>

      <div
        style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: "17px",
          fontWeight: 700,
          color: "#fff",
          marginBottom: "4px",
          transform: "translateZ(15px)",
        }}
      >
        {brand.name}
      </div>

      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: "12px",
          color: "rgba(255,255,255,0.45)",
          transform: "translateZ(10px)",
        }}
      >
        {brand.origin}
      </div>
    </div>
  );
}

export default function BrandsSection() {
  const sectionRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsActive(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="brands"
      className="pad-section-mobile"
      style={{ background: "transparent", padding: "100px 0" }}
      ref={sectionRef}
    >
      <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 32px" }}>
        {/* Animated Stats Grid */}
        <div
          className="grid-mobile-2 gap-mobile-sm"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
            marginBottom: "88px",
          }}
        >
          {brandStats.map((item, idx) => (
            <StatCard key={item.label} item={item} active={isActive} />
          ))}
        </div>

        {/* Section Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "56px",
            opacity: isActive ? 1 : 0,
            transition: "all 0.6s ease 0.2s",
            transform: isActive ? "translateY(0)" : "translateY(15px)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "12px",
            }}
          >
            <Award size={16} color="#e60012" />
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 700,
                color: "#e60012",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
              }}
            >
              Đối Tác Chính Hãng
            </p>
          </div>
          <h2
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: "clamp(32px, 3.5vw, 44px)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "0.3px",
            }}
          >
            ỦY QUYỀN PHÂN PHỐI &amp; THI CÔNG CHÍNH HÃNG
          </h2>
        </div>

        {/* Brands Grid */}
        <div
          className="grid-mobile-2 gap-mobile-sm"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {brands.map((b, idx) => (
            <BrandCard key={b.name} brand={b} active={isActive} />
          ))}
        </div>

        {/* Footnote */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginTop: "48px",
            opacity: isActive ? 0.6 : 0,
            transition: "opacity 0.5s ease 0.4s",
          }}
        >
          <ShieldCheck size={15} color="#e60012" />
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            Có đầy đủ giấy chứng nhận ủy quyền thi công chính hãng từ các tập đoàn sơn hàng đầu thế giới.
          </span>
        </div>
      </div>
    </section>
  );
}
