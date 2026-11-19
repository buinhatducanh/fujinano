import React, { useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { services } from "../data/services";
import ServiceModal from "./ServiceModal";

function ServiceCard({ svc, index, onOpen }) {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -10;
    const tiltY = ((x - centerX) / centerX) * 10;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.5s ease ${index * 0.07}s, transform 0.5s ease ${index * 0.07}s`,
        perspective: "1000px",
      }}
    >
      <div
        className="metallic-border"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={onOpen}
        style={{
          borderRadius: "14px",
          overflow: "hidden",
          cursor: "pointer",
          boxShadow: isHovered
            ? `0 24px 50px ${svc.color}40`
            : "0 4px 20px rgba(0,0,0,0.3)",
          transform: isHovered
            ? `translateY(-6px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
            : "translateY(0) rotateX(0) rotateY(0)",
          transition: isHovered
            ? "transform 0.1s ease-out, box-shadow 0.3s ease"
            : "all 0.5s ease",
          background: "rgba(0, 11, 32, 0.7)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div style={{ position: "relative", height: "220px", overflow: "hidden" }}>
          <img
            src={svc.img}
            alt={svc.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: isHovered ? "scale(1.07)" : "scale(1)",
              transition: "transform 0.5s ease",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: isHovered
                ? "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)"
                : "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.35) 100%)",
              transition: "background 0.3s",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "14px",
              left: "14px",
              background: svc.tagBg,
              color: "#fff",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.5px",
              padding: "4px 10px",
              borderRadius: "4px",
              textTransform: "uppercase",
            }}
          >
            {svc.tag}
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "16px",
              right: "16px",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "scale(1)" : "scale(0.7)",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            <ArrowRight size={16} color={svc.color} />
          </div>
        </div>

        <div style={{ padding: "20px 22px 24px" }}>
          <div
            style={{
              width: "32px",
              height: "3px",
              background: svc.color,
              borderRadius: "2px",
              marginBottom: "12px",
              transition: "width 0.3s",
              ...(isHovered ? { width: "56px" } : {}),
            }}
          />
          <h3
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "22px",
              fontWeight: 800,
              color: "#fff",
              marginBottom: "12px",
              lineHeight: 1.2,
            }}
          >
            {svc.title}
          </h3>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "16px",
              color: "rgba(255,255,255,0.7)",
              marginBottom: "24px",
            }}
          >
            {svc.short}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {svc.subServices.slice(0, 3).map((item) => (
              <span
                key={item.name}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11.5px",
                  color: svc.color,
                  background: `${svc.color}0f`,
                  padding: "3px 10px",
                  borderRadius: "50px",
                  border: `1px solid ${svc.color}22`,
                }}
              >
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState(null);
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
      id="services"
      className="pad-section-mobile"
      style={{ padding: "96px 0", background: "transparent" }}
    >
      <div
        style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 32px" }}
        ref={sectionRef}
      >
        <div
          style={{
            maxWidth: "600px",
            marginBottom: "56px",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.5s ease",
          }}
        >
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
            Dịch Vụ Của Chúng Tôi
          </p>
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "48px",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.3,
            }}
          >
            Giải Pháp Hoàn Hảo Cho Mọi Công Trình
          </h2>
        </div>

        <div
          className="grid-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "28px",
          }}
        >
          {services.map((svc, i) => (
            <ServiceCard
              key={svc.id}
              svc={svc}
              index={i}
              onOpen={() => setSelectedService(svc)}
            />
          ))}
        </div>
      </div>

      {selectedService && (
        <ServiceModal
          svc={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </section>
  );
}
