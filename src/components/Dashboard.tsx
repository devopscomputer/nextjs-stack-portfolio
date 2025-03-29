"use client";

import React from "react";
import CircleProgress from "./CircleProgress";
import Chart from "./Chart";
import Charts from "./Charts";
import ChartSkill from "./ChartSkill";
import RadarChart from "./RadarChart";
import { PolarArea } from "react-chartjs-2";
import PolarChart from "./PolarChart";

export default function Dashboard() {
  return (
    <div className="w-full min-h-screen px-4 py-2 text-white font-sans">

      {/* Wrapper dos dois charts */}
      <div className="flex justify-between items-start gap-8 w-full mt-10">
        
        {/* ChartSkill (radar + progress) */}
        <div className="w-[35%] relative top-[15em] left-[79em] ">
          <ChartSkill />
        </div>

        <div className="w-[35%] absolute right-[4em] top-[-1em] z-10">
          <RadarChart />
        </div>
        <div className="w-[35%] absolute right-[43em] top-[1em] z-10">
          <PolarChart />
        </div>

        <div className="flex-1 relative top-[12em] left-[-34em] max-w-[88%] h-[700px]">
          <Chart />
        </div>
      </div>
      
      
    {/*
<div className="flex-1 relative bottom-[4em] right-[-1em] max-w-[52%] h-[250px]">
  <Charts />
</div>
<div className="flex-1 relative top-[-30em] rigth-[25em] max-w-[68%] h-[600px]">
          <RadarChart />
        </div>

*/}

      
      <style jsx>{`
        .glass {
          background: rgba(40, 65, 75, 0.05);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(0, 255, 255, 0.05);
          box-shadow: 0 0 12px rgba(0, 255, 250, 0.08);
        }
      `}</style>
    </div>
  );
}
