// components/CircleProgress.tsx
"use client";
import React from "react";

interface CircleProgressProps {
  label: string;
  value?: number;
}

export default function CircleProgress({ label, value = 12 }: CircleProgressProps) {
  const MAX = 37;
  const barSegments = Array.from({ length: MAX });

  return (
    <div className="flex flex-col items-center justify-center w-[180px] text-white font-sans">
      {/* Label + Valor lado a lado */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="text-[13px] font-semibold uppercase tracking-wide text-[#00e5a7] drop-shadow-[0_0_6px_#00e5a7]">
          {label}
        </span>
        <span className="text-[13px] font-bold text-[#00e5a7] drop-shadow-[0_0_6px_#00e5a7]">
          {value}°
        </span>
      </div>

      {/* Barra de progresso segmentada */}
      <div className="flex flex-wrap justify-center gap-[2px]">
        {barSegments.map((_, i) => (
          <div
            key={i}
            className={`h-[6px] w-[4px] rounded-full ${
              i < value
                ? "bg-[#00e9b1] shadow-[0_0_4px_#00e9b1]"
                : "bg-[#0f2f2f]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
