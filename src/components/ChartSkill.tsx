"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNodedotjs,
  SiPostgresql,
  SiDocker,
  SiGithubactions,
  SiNextdotjs,
  SiTypescript,
  SiPython,
  SiSharp,
  SiGooglecloud,
} from "react-icons/si";
import { FaCogs, FaProjectDiagram, FaUserShield } from "react-icons/fa";
import { MdArchitecture } from "react-icons/md";

const skills = [
  { label: "QA Lead", percent: 98, icon: FaUserShield },
  { label: "Arquitetura de Software", percent: 96, icon: MdArchitecture },
  { label: "C-Sharp", percent: 94, icon: SiSharp },
  { label: "React.js", percent: 95, icon: SiReact },
  { label: "Next.js", percent: 92, icon: SiNextdotjs },
  { label: "Node.js", percent: 90, icon: SiNodedotjs },
  { label: "TypeScript", percent: 88, icon: SiTypescript },
  { label: "PostgreSQL", percent: 85, icon: SiPostgresql },
  { label: "Python", percent: 84, icon: SiPython },
  { label: "Java", percent: 83, icon: FaProjectDiagram },
  { label: "Cloud", percent: 78, icon: SiGooglecloud },
];

const ChartSkill = () => {
  const duplicatedSkills = [...skills, ...skills];

  return (
    <div className="w-full flex flex-col items-center justify-center px-8 py-10 h-[420px] text-white relative right-[26em]  overflow-hidden">
      {/* Efeito superior futurista */}
      <div className="absolute -bottom-[-35px] left-1/2 -translate-x-1/2 w-40 h-[5px] bg-green-300 rounded-t-[8px] shadow-[0_0_10px_#00fff7] clip-path-bottom" />

     
      

      <div className="border-t border-white/10 my-4 w-full rounded-xl backdrop-blur-md shadow-[0_0_20px_#00ff8844]" />

      {/* Wrapper para manter o fundo fixo */}
      <div className="relative max-w-md w-full h-[420px] overflow-hidden">
        <div className="absolute inset-0 bg-[#051614]/40 backdrop-blur-md rounded-2xl z-0" />

        {/* Scroll Infinito */}
        <div className="relative z-10 animate-scroll-down">
          {duplicatedSkills.map((skill, index) => (
            <motion.div
              key={`${skill.label}-${index}`}
              className="flex items-center justify-between py-2 border-b border-white/5 last:border-none px-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (index % skills.length) * 0.1 }}
            >
              <div className="flex items-center gap-3 text-sm font-medium">
                <span className="text-[22px] ml-2 pl-2  text-[#00ff99] animate-pulse drop-shadow-[0_0_5px_#00ff99]">
                  <skill.icon />
                </span>
                {skill.label}
              </div>
              <div className="relative flex items-center justify-center w-[45px] h-[45px]">
                <span className="absolute -top-5 text-[#00ff99] font-bold text-xs z-10">
                  {skill.percent}%
                </span>
                <CircleProgress percent={skill.percent} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Efeito inferior futurista */}
      <div className="absolute -top-[-72px]  left-1/2 -translate-x-1/2 w-40 h-[6px] bg-green-300 rounded-b-[12px] shadow-[0_0_100px_#8FBC8F] clip-path-top" />

      
      {/* Keyframes para animação infinita */}
      <style jsx>{`
        @keyframes scroll-down {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-scroll-down {
          animation: scroll-down 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

const CircleProgress = ({ percent }: { percent: number }) => {
  const radius = 14;
  const stroke = 3;
  const normalizedRadius = radius - stroke;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset =
    circumference - (percent / 100) * circumference;

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      className="drop-shadow-[0_0_6px_#00ff99]"
    >
      <circle
        stroke="rgba(255,255,255,0.1)"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#00ff99"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + " " + circumference}
        style={{ strokeDashoffset, transition: "stroke-dashoffset 0.3s ease" }}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};

export default ChartSkill;
