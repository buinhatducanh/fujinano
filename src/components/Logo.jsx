import React from "react";

export default function Logo({ size = "md", dark = false }) {
  const scale = { sm: 0.6, md: 0.9, lg: 1.1 }[size] || 0.9;
  const width = Math.round(220 * scale);
  const height = Math.round(82 * scale);
  
  const mountainFill = dark ? "#001235" : "#ffffff";
  const mountainStroke = dark ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.85)";
  const jpTextColor = dark ? "#005aaa" : "#5ad4ff";
  const frameStroke = dark ? "rgba(0,60,150,0.5)" : "rgba(255,255,255,0.6)";
  const subTextColor = dark ? "#003399" : "#e8f4ff";

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 220 82"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", flexShrink: 0 }}
    >
      {/* Red Sun */}
      <circle cx="110" cy="9" r="9" fill="#e60012" />
      <circle cx="107" cy="6" r="3" fill="rgba(255,255,255,0.15)" />

      {/* Fuji Mountain Snow Cap & Body */}
      <polygon
        points="110,1 92,24 128,24"
        fill={mountainFill}
        stroke={mountainStroke}
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      <polygon
        points="110,2 105,13 115,13"
        fill="rgba(180,210,255,0.3)"
      />
      <polygon
        points="92,24 80,32 110,32 110,24"
        fill={mountainFill}
        stroke={mountainStroke}
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      <polygon
        points="128,24 140,32 110,32 110,24"
        fill={mountainFill}
        stroke={mountainStroke}
        strokeWidth="0.8"
        strokeLinejoin="round"
      />

      {/* Fuji Nano Typography Outlines */}
      <text
        x="32"
        y="56"
        fontFamily="'Montserrat', 'Arial Black', Arial, sans-serif"
        fontSize="32"
        fontWeight="900"
        letterSpacing="-0.5"
        fill="none"
      >
        <tspan stroke="rgba(255,255,255,0.85)" strokeWidth="3" strokeLinejoin="round">
          Fuji
        </tspan>
        <tspan stroke="rgba(255,255,255,0.7)" strokeWidth="3" strokeLinejoin="round">
          nano
        </tspan>
      </text>

      {/* Fuji Nano Main Typography Fill */}
      <text
        x="32"
        y="56"
        fontFamily="'Montserrat', 'Arial Black', Arial, sans-serif"
        fontSize="32"
        fontWeight="900"
        letterSpacing="-0.5"
        fill="none"
      >
        <tspan fill="#111111">Fuji</tspan>
        <tspan fill="#e60012">nano</tspan>
      </text>

      {/* Japanese Subtext: 日本の技術 */}
      <text
        x="110"
        y="67"
        fontFamily="'Noto Sans JP', 'Yu Gothic', sans-serif"
        fontSize="11.5"
        fontWeight="500"
        letterSpacing="3"
        textAnchor="middle"
        fill={jpTextColor}
      >
        日本の技術
      </text>

      {/* Nano Paint Frame */}
      <rect
        x="18"
        y="69"
        width="184"
        height="11"
        rx="2"
        fill={dark ? "rgba(0,40,120,0.15)" : "rgba(10,30,80,0.35)"}
        stroke={frameStroke}
        strokeWidth="0.8"
      />
      <line x1="20" y1="70" x2="28" y2="70" stroke={frameStroke} strokeWidth="1" />
      <line x1="192" y1="70" x2="200" y2="70" stroke={frameStroke} strokeWidth="1" />

      {/* Subtitle: NANO PAINT & WATERPROOF */}
      <text
        x="110"
        y="77"
        fontFamily="'DM Sans', 'Arial', sans-serif"
        fontSize="6.5"
        fontWeight="800"
        letterSpacing="1.5"
        textAnchor="middle"
        fill={subTextColor}
      >
        NANO PAINT &amp; WATERPROOF
      </text>
    </svg>
  );
}
