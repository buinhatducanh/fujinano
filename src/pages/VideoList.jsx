import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Video as VideoIcon, Play } from "lucide-react";
import { videos } from "../data/videos";

export default function VideoList() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);

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
      id="videos"
      className="pad-section-mobile"
      style={{ background: "transparent", padding: "100px 0", color: "#fff" }}
      ref={sectionRef}
    >
      <div style={{ maxWidth: "1360px", margin: "0 auto", padding: "0 32px" }}>
        {/* Header */}
        <div
          style={{
            textAlign: "center",
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
            <VideoIcon size={16} color="#e60012" />
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
              Thực Tế Công Trình
            </p>
          </div>
          <h2
            style={{
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: "clamp(32px, 3.5vw, 44px)",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "0.3px",
            }}
          >
            VIDEO THI CÔNG
          </h2>
        </div>

        {/* Video Cards Grid */}
        <div
          className="grid-mobile-1 gap-mobile-sm"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "32px",
          }}
        >
          {videos.map((vid, idx) => (
            <Link
              key={idx}
              to={`/video/${vid.slug}`}
              className="metallic-border"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                position: "relative",
                borderRadius: "20px",
                overflow: "hidden",
                cursor: "pointer",
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? "translateY(0) perspective(1000px) rotateX(0deg)"
                  : "translateY(60px) perspective(1000px) rotateX(-20deg)",
                transformOrigin: "bottom center",
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + idx * 0.15}s`,
                boxShadow:
                  hoveredIdx === idx
                    ? "0 25px 50px rgba(0,0,0,0.5)"
                    : "0 10px 30px rgba(0,0,0,0.3)",
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `url(${vid.thumbnail}) center/cover`,
                  transform: hoveredIdx === idx ? "scale(1.08)" : "scale(1)",
                  transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    hoveredIdx === idx
                      ? "linear-gradient(to top, rgba(2, 18, 48, 0.9) 0%, rgba(2, 18, 48, 0.2) 50%, rgba(0,0,0,0.1) 100%)"
                      : "linear-gradient(to top, rgba(2, 18, 48, 0.95) 0%, rgba(2, 18, 48, 0.4) 50%, rgba(0,0,0,0.2) 100%)",
                  transition: "all 0.4s ease",
                }}
              />

              <div style={{ paddingTop: "65%" }} />

              {/* Play Button Overlay */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform:
                    hoveredIdx === idx
                      ? "translate(-50%, -50%) scale(1.1)"
                      : "translate(-50%, -50%) scale(1)",
                  width: "64px",
                  height: "64px",
                  background: "rgba(230, 0, 18, 0.9)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow:
                    hoveredIdx === idx
                      ? "0 0 30px rgba(230,0,18,0.6)"
                      : "0 0 0px rgba(230,0,18,0)",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <Play size={24} color="#fff" fill="#fff" style={{ marginLeft: "4px" }} />
              </div>

              {/* Title & Duration */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "30px",
                  transform: hoveredIdx === idx ? "translateY(-10px)" : "translateY(0)",
                  transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "6px 12px",
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(8px)",
                    borderRadius: "20px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "#fff",
                    marginBottom: "12px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {vid.duration}
                </div>
                <h3
                  style={{
                    fontFamily: "'Be Vietnam Pro', sans-serif",
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#fff",
                    lineHeight: 1.4,
                  }}
                >
                  {vid.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
