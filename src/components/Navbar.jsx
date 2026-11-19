import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Layers,
  Award,
  Construction,
  ShieldCheck,
  Droplets,
  Paintbrush
} from "lucide-react";
import { navItems } from "../data/navigation";

const iconMap = {
  Layers: Layers,
  Award: Award,
  Construction: Construction,
  ShieldCheck: ShieldCheck,
  Droplets: Droplets,
  Paintbrush: Paintbrush,
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Info Bar */}
      <div
        className="top-info-bar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: scrolled ? "0px" : "36px",
          overflow: "hidden",
          background: "linear-gradient(90deg, #010A1C, #131b2e, #010A1C)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
          transition: "height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            width: "100%",
            padding: "0 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "11.5px",
            fontFamily: "'DM Sans', sans-serif",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <MapPin size={10} /> 45 Màu Thân, P. Cái Khế, TP. Cần Thơ
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Clock size={10} /> T2 - T7: 7:30 - 17:30
            </span>
          </div>

          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <a
              href="mailto:info@fujinano.vn"
              style={{
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
            >
              info@fujinano.vn
            </a>
            <a
              href="tel:0947707616"
              style={{
                color: "#ff4455",
                textDecoration: "none",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Phone size={10} /> 0947.707.616
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className="main-navbar"
        style={{
          position: "fixed",
          top: scrolled ? 0 : "36px",
          left: 0,
          right: 0,
          zIndex: 999,
          height: "90px",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: scrolled
              ? "rgba(0, 15, 60, 0.96)"
              : "rgba(0, 15, 60, 0.5)",
            backdropFilter: "blur(20px) saturate(1.8)",
            WebkitBackdropFilter: "blur(20px) saturate(1.8)",
            transition: "background 0.4s ease",
          }}
        />

        {/* Animated Gradient Line at Bottom */}
        <div
          className="nav-gradient-border"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            overflow: "hidden",
          }}
        >
          <div
            className="nav-gradient-line"
            style={{
              width: "200%",
              height: "100%",
              background:
                "linear-gradient(90deg, transparent, #e60012, #0055cc, #ff8800, #e60012, transparent)",
              animation: "gradientSlide 4s linear infinite",
            }}
          />
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 32px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            to="/#home"
            className="nav-logo-wrap"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              flexShrink: 0,
              position: "relative",
            }}
          >
            <Logo size="md" dark={false} />
            <div
              className="logo-glow"
              style={{
                position: "absolute",
                width: "120px",
                height: "60px",
                borderRadius: "50%",
                background:
                  "radial-gradient(ellipse, rgba(230,0,18,0.15) 0%, rgba(0,85,204,0.08) 60%, transparent 100%)",
                filter: "blur(16px)",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
              }}
            />
          </Link>

          {/* Desktop Nav Items */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "4px" }}
            className="desk-nav"
          >
            {navItems.map((item) =>
              item.sub ? (
                <div
                  key={item.label}
                  style={{ position: "relative" }}
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  <a
                    href={item.href}
                    className="nav-link-3d"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      padding: "8px 16px",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#fff",
                      textDecoration: "none",
                      borderRadius: "8px",
                      transition: "all 0.25s",
                      background: servicesDropdownOpen
                        ? "rgba(255,255,255,0.08)"
                        : "transparent",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <span style={{ position: "relative", zIndex: 1 }}>{item.label}</span>
                    <ChevronDown
                      size={13}
                      style={{
                        transform: servicesDropdownOpen ? "rotate(180deg)" : "none",
                        transition: "transform 0.25s",
                        position: "relative",
                        zIndex: 1,
                      }}
                    />
                  </a>

                  {/* Mega Dropdown */}
                  {servicesDropdownOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: "-120px",
                        paddingTop: "8px",
                      }}
                    >
                      <div
                        className="mega-dropdown"
                        style={{
                          width: "420px",
                          background: "rgba(0, 20, 75, 0.97)",
                          backdropFilter: "blur(24px) saturate(1.5)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          borderRadius: "20px",
                          padding: "8px",
                          boxShadow:
                            "0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03) inset",
                          animation: "dropReveal 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: "-20px",
                            left: "50%",
                            width: "160px",
                            height: "40px",
                            background: "rgba(230, 0, 18, 0.15)",
                            filter: "blur(30px)",
                            transform: "translateX(-50%)",
                            pointerEvents: "none",
                          }}
                        />

                        <div
                          style={{
                            padding: "12px 16px 8px",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <Sparkles size={12} color="#ff4455" />
                          <span
                            style={{
                              fontSize: "10px",
                              textTransform: "uppercase",
                              letterSpacing: "2px",
                              color: "rgba(255,255,255,0.35)",
                              fontWeight: 700,
                              fontFamily: "'DM Sans', sans-serif",
                            }}
                          >
                            Dịch Vụ Chuyên Nghiệp
                          </span>
                        </div>

                        {item.sub.map((subItem) => {
                          const IconComp = iconMap[subItem.icon] || Layers;
                          return (
                            <a
                              key={subItem.title}
                              href={subItem.href}
                              className="dropdown-item-3d"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "14px",
                                padding: "14px 16px",
                                textDecoration: "none",
                                borderRadius: "14px",
                                transition: "all 0.2s ease",
                                position: "relative",
                                overflow: "hidden",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = `${subItem.color}15`;
                                e.currentTarget.style.transform = "translateX(6px)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.transform = "translateX(0)";
                              }}
                            >
                              <div
                                style={{
                                  width: "42px",
                                  height: "42px",
                                  borderRadius: "12px",
                                  background: `linear-gradient(135deg, ${subItem.color}22, ${subItem.color}0a)`,
                                  border: `1px solid ${subItem.color}33`,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0,
                                  transition: "all 0.25s",
                                }}
                              >
                                <IconComp size={18} color={subItem.color} />
                              </div>
                              <div>
                                <div
                                  style={{
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    color: "#fff",
                                    marginBottom: "2px",
                                  }}
                                >
                                  {subItem.title}
                                </div>
                                <div
                                  style={{
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: "11.5px",
                                    color: "rgba(255,255,255,0.55)",
                                  }}
                                >
                                  {subItem.desc}
                                </div>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="nav-link-3d"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "8px 16px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#fff",
                    textDecoration: "none",
                    borderRadius: "8px",
                    transition: "all 0.25s",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <span style={{ position: "relative", zIndex: 1 }}>{item.label}</span>
                </a>
              )
            )}
          </div>

          {/* Desktop Right CTA Buttons */}
          <div
            style={{ display: "flex", gap: "10px", alignItems: "center" }}
            className="desk-nav"
          >
            <a
              href="https://zalo.me/0947707616"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-pill-3d"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "9px 16px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.04)",
                color: "#fff",
                textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 500,
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <MessageCircle size={13} />
              Zalo
            </a>

            <a
              href="tel:0947707616"
              className="hotline-3d"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                padding: "9px 20px",
                background: "linear-gradient(135deg, #e60012, #cc0010)",
                color: "#fff",
                borderRadius: "10px",
                textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13.5px",
                fontWeight: 600,
                whiteSpace: "nowrap",
                transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: "0 4px 20px rgba(230,0,18,0.3), 0 0 0 0 rgba(230,0,18,0.4)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div className="hotline-shine" />
              <Phone size={13} style={{ position: "relative", zIndex: 1 }} />
              <span style={{ position: "relative", zIndex: 1 }}>0947.707.616</span>
            </a>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="mob-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#fff",
              padding: "6px",
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Slide Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "rgba(0, 15, 65, 0.98)",
              backdropFilter: "blur(24px)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              padding: "16px 24px 28px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              maxHeight: "85vh",
              overflowY: "auto",
              animation: "mobileSlide 0.3s ease",
            }}
          >
            {navItems.map((item) => (
              <div key={item.label}>
                <a
                  href={item.href}
                  onClick={() => !item.sub && setMobileMenuOpen(false)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "14px 0",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "#fff",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  {item.label}
                </a>
                {item.sub && (
                  <div style={{ paddingLeft: "12px", marginBottom: "8px" }}>
                    {item.sub.map((subItem) => (
                      <a
                        key={subItem.title}
                        href={subItem.href}
                        onClick={() => setMobileMenuOpen(false)}
                        style={{
                          display: "block",
                          padding: "10px 0",
                          fontSize: "13px",
                          color: "rgba(255,255,255,0.55)",
                          textDecoration: "none",
                        }}
                      >
                        • {subItem.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <a
                href="tel:0947707616"
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  justifyContent: "center",
                  padding: "14px",
                  background: "#e60012",
                  color: "#fff",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "14px",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                <Phone size={14} /> 0947.707.616
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Embedded Component Styles */}
      <style>{`
        @keyframes gradientSlide {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }

        @keyframes dropReveal {
          from { opacity: 0; transform: translateY(-12px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes mobileSlide {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .nav-link-3d:hover {
          background: rgba(255,255,255,0.06) !important;
          transform: translateY(-1px);
          text-shadow: 0 0 20px rgba(255,255,255,0.2);
        }

        .cta-pill-3d:hover {
          background: rgba(255,255,255,0.1) !important;
          border-color: rgba(255,255,255,0.25) !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }

        .hotline-3d {
          animation: hotlinePulse 2.5s infinite;
        }

        .hotline-3d:hover {
          transform: translateY(-3px) scale(1.03) !important;
          box-shadow: 0 12px 30px rgba(230,0,18,0.5) !important;
          animation: none !important;
        }

        @keyframes hotlinePulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(230,0,18,0.3), 0 0 0 0px rgba(230,0,18,0.3); }
          50% { box-shadow: 0 4px 20px rgba(230,0,18,0.3), 0 0 0 8px rgba(230,0,18,0); }
        }

        .hotline-shine {
          position: absolute;
          top: -50%;
          left: -100%;
          width: 50%;
          height: 200%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transform: rotate(30deg);
          animation: shineMove 3.5s infinite;
        }

        @keyframes shineMove {
          0% { left: -100%; }
          30% { left: 150%; }
          100% { left: 150%; }
        }

        @media (max-width: 960px) {
          .desk-nav { display: none !important; }
          .mob-toggle { display: flex !important; }
          .top-info-bar { display: none !important; }
          .main-navbar { top: 0 !important; }
        }
      `}</style>
    </>
  );
}
