import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { heroSlides } from "../data/heroSlider";

function FloatingParticles() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 2,
        overflow: "hidden",
      }}
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="float-particle"
          style={{
            position: "absolute",
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            borderRadius: "50%",
            background: `rgba(255,255,255,${0.04 + Math.random() * 0.08})`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `floatUp ${10 + Math.random() * 15}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  );
}

function ParallaxShapes({ mousePos }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 3,
        overflow: "hidden",
        perspective: "1000px",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: "15%",
          top: "20%",
          width: "140px",
          height: "140px",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "50%",
          transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px) rotateX(${mousePos.y * 30}deg) rotateY(${mousePos.x * 30}deg)`,
          transition: "transform 0.2s ease-out",
          boxShadow: "0 0 20px rgba(255,255,255,0.03) inset",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "10%",
          bottom: "25%",
          width: "80px",
          height: "80px",
          border: "1px solid rgba(230,0,18,0.15)",
          transform: `translate(${mousePos.x * -30}px, ${mousePos.y * -30}px) rotateZ(45deg) rotateX(${mousePos.y * -40}deg)`,
          transition: "transform 0.2s ease-out",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "-10px",
            border: "1px dashed rgba(230,0,18,0.1)",
            transform: "translateZ(-20px)",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: "30%",
          top: "15%",
          width: "250px",
          height: "250px",
          background: "radial-gradient(circle, rgba(0,85,204,0.1) 0%, transparent 70%)",
          transform: `translate(${mousePos.x * 60}px, ${mousePos.y * 60}px)`,
          transition: "transform 0.2s ease-out",
        }}
      />
    </div>
  );
}

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [prevSlide, setPrevSlide] = useState(null);
  const [animating, setAnimating] = useState(false);
  const isTransitioning = useRef(false);
  const [progress, setProgress] = useState(0);
  const slideTimer = useRef(null);
  const progressTimer = useRef(null);
  const [contentVisible, setContentVisible] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  }, []);

  const goToSlide = useCallback((targetIndex) => {
    if (isTransitioning.current) return;
    setCurrent((curr) => {
      const nextIdx = ((targetIndex % heroSlides.length) + heroSlides.length) % heroSlides.length;
      if (nextIdx === curr) return curr;

      setContentVisible(false);
      setAnimating(true);
      isTransitioning.current = true;
      setPrevSlide(curr);

      setTimeout(() => {
        setCurrent(nextIdx);
        setTimeout(() => {
          setContentVisible(true);
          setAnimating(false);
          isTransitioning.current = false;
          setPrevSlide(null);
        }, 100);
      }, 500);

      setProgress(0);
      return curr;
    });
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide(current + 1);
  }, [current, goToSlide]);

  const prevSlideAction = useCallback(() => {
    goToSlide(current - 1);
  }, [current, goToSlide]);

  const resetTimers = useCallback(() => {
    if (slideTimer.current) clearInterval(slideTimer.current);
    if (progressTimer.current) clearInterval(progressTimer.current);
    setProgress(0);

    let p = 0;
    progressTimer.current = setInterval(() => {
      p += 100 / 70;
      setProgress(Math.min(p, 100));
    }, 100);

    slideTimer.current = setInterval(() => {
      goToSlide(current + 1);
    }, 7000);
  }, [current, goToSlide]);

  useEffect(() => {
    resetTimers();
    return () => {
      if (slideTimer.current) clearInterval(slideTimer.current);
      if (progressTimer.current) clearInterval(progressTimer.current);
    };
  }, [current, resetTimers]);

  const slide = heroSlides[current] || heroSlides[0];

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "700px",
        overflow: "hidden",
        background: "transparent",
        perspective: "1500px",
      }}
    >
      {/* Background Images */}
      {heroSlides.map((item, idx) => (
        <div
          key={idx}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            opacity: idx === current || idx === prevSlide ? 1 : 0,
            transform:
              idx === current
                ? `scale(1.05) translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`
                : idx === prevSlide
                ? "scale(1.08)"
                : "scale(1.1)",
            transition:
              idx === current
                ? "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s ease-out"
                : "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <img
            src={item.img}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      ))}

      {/* Gradients */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(135deg, rgba(2,11,29,0.88) 0%, rgba(2,11,29,0.55) 50%, rgba(2,11,29,0.75) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40%",
          zIndex: 1,
          background: "linear-gradient(to top, rgba(2,11,29,0.95), transparent)",
        }}
      />

      <FloatingParticles />
      <ParallaxShapes mousePos={mousePos} />

      {/* Main Content */}
      <div
        className="hero-main-content"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "120px 80px 0 80px",
          maxWidth: "1400px",
          margin: "0 auto",
          left: 0,
          right: 0,
          zIndex: 4,
          transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
          transition: "transform 0.2s ease-out",
        }}
      >
        <p
          className="hero-label"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
            fontWeight: 700,
            letterSpacing: "3px",
            color: slide.accent,
            marginBottom: "16px",
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
          }}
        >
          {slide.label}
        </p>

        <h1 style={{ marginBottom: "24px", paddingTop: "8px" }}>
          <span
            style={{
              display: "block",
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: "clamp(44px, 6vw, 90px)",
              fontWeight: 700,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.25,
              letterSpacing: "-1px",
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
            }}
          >
            {slide.headline}
          </span>
          <span
            style={{
              display: "block",
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: "clamp(48px, 7vw, 100px)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.25,
              letterSpacing: "-1px",
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s",
              textShadow: `0 0 80px ${slide.accent}22`,
            }}
          >
            {slide.headlineBold}
          </span>
        </h1>

        <p
          className="hero-sub-text"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "18px",
            color: "rgba(255,255,255,0.7)",
            maxWidth: "600px",
            lineHeight: 1.6,
            marginBottom: "36px",
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.35s",
          }}
        >
          {slide.sub}
        </p>

        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.45s",
          }}
        >
          <a
            href={slide.href}
            className="hero-cta-primary magnetic"
            style={{
              padding: "15px 36px",
              background: slide.accent,
              color: "#fff",
              borderRadius: "10px",
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s",
              boxShadow: `0 8px 30px ${slide.accent}44`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <span className="btn-shine" />
            <span style={{ position: "relative", zIndex: 1 }}>{slide.cta}</span>
            <ArrowRight size={16} style={{ position: "relative", zIndex: 1 }} />
          </a>

          <a
            href="tel:0947707616"
            className="hero-cta-secondary magnetic"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 28px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#fff",
              borderRadius: "10px",
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "15px",
              fontWeight: 500,
              backdropFilter: "blur(12px)",
              transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s",
            }}
          >
            <Phone size={15} />
            Gọi Tư Vấn
          </a>
        </div>
      </div>

      {/* Thumbnails Gallery */}
      <div
        className="thumb-gallery"
        style={{
          position: "absolute",
          bottom: "60px",
          right: "60px",
          display: "flex",
          gap: "14px",
          zIndex: 6,
          perspective: "800px",
        }}
      >
        {heroSlides.map((item, idx) => {
          const isActive = idx === current;
          return (
            <div
              key={idx}
              onClick={() => goToSlide(idx)}
              className="thumb-card-3d"
              style={{
                width: isActive ? "140px" : "80px",
                height: "100px",
                borderRadius: "14px",
                overflow: "hidden",
                cursor: "pointer",
                border: isActive ? `2px solid ${item.accent}` : "1px solid rgba(255,255,255,0.15)",
                boxShadow: isActive
                  ? `0 12px 30px rgba(0,0,0,0.5), 0 0 15px ${item.accent}33`
                  : "0 6px 20px rgba(0,0,0,0.3)",
                transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                position: "relative",
                transform: isActive ? "translateY(-8px) scale(1)" : "translateY(0) scale(1)",
              }}
            >
              <img
                src={item.img}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  filter: isActive ? "none" : "brightness(0.5) saturate(0.7)",
                  transition: "filter 0.4s",
                }}
              />
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: item.accent,
                    boxShadow: `0 0 8px ${item.accent}`,
                  }}
                />
              )}
              <div
                style={{
                  position: "absolute",
                  top: "6px",
                  left: "8px",
                  fontFamily: "'Be Vietnam Pro', sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
                  textShadow: "0 1px 4px rgba(0,0,0,0.6)",
                }}
              >
                {String(idx + 1).padStart(2, "0")}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Left Counter & Circular Progress */}
      <div
        className="hero-bottom-left"
        style={{
          position: "absolute",
          bottom: "60px",
          left: "80px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          zIndex: 6,
        }}
      >
        <div style={{ position: "relative", width: "48px", height: "48px" }}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            style={{ transform: "rotate(-90deg)" }}
          >
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="2"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke={slide.accent}
              strokeWidth="2"
              strokeDasharray={`${2 * Math.PI * 20}`}
              strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
              strokeLinecap="round"
              style={{
                transition: "stroke-dashoffset 0.1s linear, stroke 0.5s",
              }}
            />
          </svg>
          <span
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Be Vietnam Pro', sans-serif",
              fontSize: "14px",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            {String(current + 1).padStart(2, "0")}
          </span>
        </div>

        <div
          style={{
            width: "1px",
            height: "28px",
            background: "rgba(255,255,255,0.12)",
          }}
        />

        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "2px",
          }}
        >
          / {String(heroSlides.length).padStart(2, "0")}
        </span>
      </div>

      {/* Prev / Next Arrows */}
      <button
        onClick={prevSlideAction}
        className="hero-arrow-3d hero-arrow-left"
        style={{
          position: "absolute",
          top: "50%",
          left: "32px",
          transform: "translateY(-50%)",
          zIndex: 8,
          width: "52px",
          height: "52px",
          borderRadius: "14px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          backdropFilter: "blur(12px)",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={nextSlide}
        className="hero-arrow-3d hero-arrow-right"
        style={{
          position: "absolute",
          top: "50%",
          right: "32px",
          transform: "translateY(-50%)",
          zIndex: 8,
          width: "52px",
          height: "52px",
          borderRadius: "14px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          backdropFilter: "blur(12px)",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <ChevronRight size={22} />
      </button>

      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }

        .hero-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 40px rgba(0,0,0,0.4) !important;
        }

        .hero-cta-secondary:hover {
          background: rgba(255,255,255,0.1) !important;
          border-color: rgba(255,255,255,0.25) !important;
          transform: translateY(-4px);
        }

        .btn-shine {
          position: absolute;
          top: -50%;
          left: -100%;
          width: 50%;
          height: 200%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          transform: skewX(-20deg);
          animation: btnShine 4s infinite;
          pointer-events: none;
        }

        @keyframes btnShine {
          0% { left: -100%; }
          25% { left: 150%; }
          100% { left: 150%; }
        }

        .hero-arrow-3d:hover {
          background: rgba(230, 0, 18, 0.9) !important;
          border-color: rgba(230, 0, 18, 1) !important;
          box-shadow: 0 8px 25px rgba(230,0,18,0.4);
          transform: translateY(-50%) scale(1.1) !important;
        }

        .thumb-card-3d:hover {
          transform: translateY(-12px) scale(1.05) !important;
          box-shadow: 0 16px 35px rgba(0,0,0,0.5) !important;
        }

        @media (max-width: 960px) {
          .hero-label, .hero-sub-text {
            display: none !important;
          }
          .hero-main-content {
            padding: 0 28px !important;
            justify-content: center !important;
            padding-top: 100px !important;
          }
          .thumb-gallery {
            display: none !important;
          }
          .hero-bottom-left {
            left: 28px !important;
            bottom: 40px !important;
          }
          .hero-arrow-3d {
            width: 40px !important;
            height: 40px !important;
            display: flex !important;
          }
          .hero-arrow-left {
            left: 12px !important;
          }
          .hero-arrow-right {
            right: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
