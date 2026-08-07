import React from "react";
import { HMMonogram } from "./Logo";

export default function BrandDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center py-10 opacity-90 ${className}`}>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#c2a15b]/40 to-[#c2a15b]" />
      <div className="mx-6 flex items-center justify-center rounded-full border border-[#c2a15b]/30 bg-[#1d382f] p-3 shadow-xl shadow-black/20">
        <HMMonogram className="h-6 w-auto" color="#c2a15b" />
      </div>
      <div className="h-[1px] flex-1 bg-gradient-to-r from-[#c2a15b] via-[#c2a15b]/40 to-transparent" />
    </div>
  );
}
