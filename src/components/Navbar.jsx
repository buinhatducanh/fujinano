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
  Paintbrush,
  FileText
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

export default function Navbar({ onOpenOrderModal }) {
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
          height: "72px",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          background: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          boxShadow: scrolled ? "0 4px 16px rgba(0,0,0,0.06)" : "0 1px 3px rgba(0,0,0,0.03)",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 24px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            className="nav-logo-wrap"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <Logo size="sm" dark={true} />
          </Link>

          {/* Desktop Nav Items */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
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
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      padding: "8px 14px",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: servicesDropdownOpen ? "#dc2626" : "#1e293b",
                      textDecoration: "none",
                      borderRadius: "6px",
                      transition: "color 0.2s",
                    }}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={13}
                      style={{
                        transform: servicesDropdownOpen ? "rotate(180deg)" : "none",
                        transition: "transform 0.2s",
                      }}
                    />
                  </a>

                  {/* Dropdown */}
                  {servicesDropdownOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: "-80px",
                        paddingTop: "6px",
                      }}
                    >
                      <div
                        style={{
                          width: "360px",
                          background: "#ffffff",
                          border: "1px solid #e2e8f0",
                          borderRadius: "12px",
                          padding: "8px",
                          boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
                        }}
                      >
                        {item.sub.map((subItem) => {
                          const IconComp = iconMap[subItem.icon] || Layers;
                          return (
                            <a
                              key={subItem.title}
                              href={subItem.href}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "10px 12px",
                                textDecoration: "none",
                                borderRadius: "8px",
                                transition: "background 0.15s ease",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
                              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                            >
                              <div
                                style={{
                                  width: "34px",
                                  height: "34px",
                                  borderRadius: "8px",
                                  background: "#f1f5f9",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0,
                                }}
                              >
                                <IconComp size={16} color="#0f172a" />
                              </div>
                              <div>
                                <div style={{ fontSize: "13.5px", fontWeight: 600, color: "#0f172a" }}>
                                  {subItem.title}
                                </div>
                                <div style={{ fontSize: "11px", color: "#64748b" }}>
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
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "8px 14px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#1e293b",
                    textDecoration: "none",
                    borderRadius: "6px",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#dc2626")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#1e293b")}
                >
                  <span>{item.label}</span>
                </a>
              )
            )}
          </div>

          {/* Desktop Right CTA Buttons */}
          <div
            style={{ display: "flex", gap: "10px", alignItems: "center" }}
            className="desk-nav"
          >
            {/* Phương thức 1: Đặt mua / Báo giá */}
            <button
              onClick={() => onOpenOrderModal && onOpenOrderModal(null)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "8px",
                background: "#dc2626",
                color: "#ffffff",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 700,
                border: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#b91c1c")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#dc2626")}
            >
              <FileText size={14} />
              <span>Báo Giá / Đặt Mua</span>
            </button>

            <a
              href="https://zalo.me/0947707616"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: "7px 14px",
                borderRadius: "8px",
                background: "#f1f5f9",
                color: "#334155",
                textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                border: "1px solid #e2e8f0",
              }}
            >
              <MessageCircle size={14} color="#0284c7" />
              Zalo
            </a>

            {/* Phương thức 2: Gọi hotline */}
            <a
              href="tel:0947707616"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                background: "#0f172a",
                color: "#ffffff",
                borderRadius: "8px",
                textDecoration: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                fontWeight: 700,
                whiteSpace: "nowrap",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#1e293b")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#0f172a")}
            >
              <Phone size={13} color="#22c55e" />
              <span>0947.707.616</span>
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
              color: "#0f172a",
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
              background: "#ffffff",
              borderBottom: "1px solid #e2e8f0",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              padding: "16px 24px 28px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              maxHeight: "80vh",
              overflowY: "auto",
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
                    padding: "12px 0",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#0f172a",
                    textDecoration: "none",
                    borderBottom: "1px solid #f1f5f9",
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
                          padding: "8px 0",
                          fontSize: "13px",
                          color: "#64748b",
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

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "16px" }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrderModal && onOpenOrderModal(null);
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  justifyContent: "center",
                  padding: "12px",
                  background: "#dc2626",
                  color: "#fff",
                  borderRadius: "8px",
                  border: "none",
                  fontWeight: 700,
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                <FileText size={16} />
                <span>Đặt Mua / Báo Giá Nhanh</span>
              </button>

              <a
                href="tel:0947707616"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  justifyContent: "center",
                  padding: "12px",
                  background: "#0f172a",
                  color: "#fff",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "14px",
                }}
              >
                <Phone size={16} color="#22c55e" />
                <span>Gọi Hotline: 0947.707.616</span>
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
