import React, { useState, useEffect, useRef } from "react";
import { Users } from "lucide-react";
import { clients } from "../data/clients";

export default function ClientsSection() {
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

  const marqueeList = [...clients, ...clients, ...clients, ...clients];

  return (
    <section
      id="clients"
      className="pad-section-mobile"
      style={{
        background: "transparent",
        padding: "100px 0",
        overflow: "hidden",
      }}
      ref={sectionRef}
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-container {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .marquee-container:hover {
          animation-play-state: paused;
        }
        .client-logo-box {
          flex: 0 0 auto;
          width: 240px;
          height: 120px;
          margin: 0 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          filter: grayscale(100%) opacity(0.6);
          cursor: pointer;
        }
        .client-logo-box:hover {
          filter: grayscale(0%) opacity(1);
          transform: translateY(-8px) scale(1.05);
          box-shadow: 
            0 20px 40px rgba(0,0,0,0.4),
            inset 0 4px 6px rgba(255,255,255,0.1),
            inset 0 -4px 6px rgba(0,0,0,0.2);
        }
      `}</style>

      <div
        style={{
          maxWidth: "1360px",
          margin: "0 auto",
          padding: "0 32px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            marginBottom: "56px",
            opacity: isVisible ? 1 : 0,
            transition: "all 0.6s ease 0.2s",
            transform: isVisible ? "translateY(0)" : "translateY(15px)",
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
            <Users size={16} color="#e60012" />
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
              Đối Tác Khách Hàng
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
            KHÁCH HÀNG TIÊU BIỂU
          </h2>
        </div>
      </div>

      <div
        style={{
          position: "relative",
          opacity: isVisible ? 1 : 0,
          transition: "all 0.8s ease 0.4s",
        }}
      >
        {/* Left and Right Fade Gradients */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "150px",
            background: "linear-gradient(to right, #010A1C, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "150px",
            background: "linear-gradient(to left, #010A1C, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        <div className="marquee-container">
          {marqueeList.map((item, idx) => (
            <div
              key={idx}
              className="client-logo-box metallic-border"
              style={{ borderRadius: "16px" }}
            >
              <span
                style={{
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: "28px",
                  fontWeight: 800,
                  color: "#fff",
                }}
              >
                {item.logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
