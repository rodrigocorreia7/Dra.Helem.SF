import React from "react";

export function HMMonogram({ className = "h-9 w-auto", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 200 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left Stethoscope Diaphragm */}
      <circle cx="20" cy="38" r="6" stroke={color} strokeWidth="2.5" fill="none" />
      <circle cx="20" cy="38" r="2.2" fill={color} />

      {/* Horizontal Stethoscope Bar to H */}
      <path d="M26 38 H 68" stroke={color} strokeWidth="2.8" strokeLinecap="round" />

      {/* First Stem of H */}
      <path d="M42 20 V 58" stroke={color} strokeWidth="3" strokeLinecap="round" />

      {/* Second Stem of H curving into M */}
      <path
        d="M62 20 V 54 C 62 54 66 38 78 36 C 90 34 94 58 106 32 C 114 20 124 52 134 30 C 142 18 152 46 162 48"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right Stethoscope Bell */}
      <circle cx="166" cy="50" r="5" stroke={color} strokeWidth="2.5" fill="none" />
      <path d="M162 48 C 163 49 164 49.5 166 49.5" stroke={color} strokeWidth="2.5" />
    </svg>
  );
}

export default function Logo({
  variant = "dark",
  showSubtitle = true,
  className = "",
}: {
  variant?: "dark" | "light" | "gold";
  showSubtitle?: boolean;
  className?: string;
}) {
  const isDarkBg = variant === "light";
  
  return (
    <div className={`inline-flex flex-col items-center justify-center text-center ${className}`}>
      {/* Monogram */}
      <div className="relative mb-1">
        <HMMonogram
          className="h-10 w-auto sm:h-12"
          color={
            variant === "gold"
              ? "#c2a15b"
              : isDarkBg
              ? "#f6f1e8"
              : "#1d382f"
          }
        />
      </div>

      {/* Text Name */}
      <span
        className={`font-display text-lg tracking-tight font-medium sm:text-xl ${
          variant === "gold"
            ? "text-[#c2a15b]"
            : isDarkBg
            ? "text-[#f6f1e8]"
            : "text-[#1d382f]"
        }`}
      >
        Dra. Hélem Machado Almeida
      </span>

      {/* Subtitle */}
      {showSubtitle && (
        <span
          className={`mt-0.5 text-[10px] uppercase font-semibold tracking-[0.38em] ${
            variant === "gold"
              ? "text-[#c2a15b]"
              : isDarkBg
              ? "text-[#d9a184]"
              : "text-[#7d9b8c]"
          }`}
        >
          M É D I C A
        </span>
      )}
    </div>
  );
}
