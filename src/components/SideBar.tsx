"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FiHome,
  FiUser,
  FiCode,
  FiBriefcase,
  FiCpu,
  FiAward,
  FiStar,
  FiBookOpen,
  FiMessageCircle,
  FiGlobe,
  FiSend,
  FiDownload,
} from "react-icons/fi";
import Dashboard from "./Dashboard";
import CardProject from "./CardProject";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language?: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const menuItems = [
  { label: "Home", icon: <FiHome />, href: "#home" },
  { label: "Sobre", icon: <FiUser />, href: "#about" },
  { label: "Projetos", icon: <FiCode />, href: "#projects" },
  { label: "Experiências", icon: <FiBriefcase />, href: "#experience" },
  { label: "Skills", icon: <FiCpu />, href: "#skills" },
  { label: "Certificações", icon: <FiAward />, href: "#certifications" },
  { label: "Reconhecimentos", icon: <FiStar />, href: "#awards" },
  { label: "Blog", icon: <FiBookOpen />, href: "#blog" },
  { label: "Depoimentos", icon: <FiMessageCircle />, href: "#testimonials" },
  { label: "GitHub", icon: <FiGlobe />, href: "https://github.com/devopscomputer" },
  { label: "Contato", icon: <FiSend />, href: "#contact" },
  { label: "Baixar CV", icon: <FiDownload />, href: "/cv-paulo.pdf" },
];

export default function Sidebar() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    fetch("https://api.github.com/users/devopscomputer/repos?per_page=20")
      .then((res) => res.json())
      .then((data) => setRepos(data.slice(0, 20)))
      .catch((err) => console.error("Erro ao buscar repositórios:", err));
  }, []);

  return (
    <div className="flex gap-6">
      {/* Menu lateral */}
      <div className="fixed top-[50px] left-5 z-80 w-[280px] h-[780px]  rounded-3xl p-6 border-white/10 shadow-[0_0_60px_rgba(0,255,250,0.24)] bg-[rgba(66,250,246,0.15)] backdrop-blur-[7.5px]">
      
        
        {/* Avatar redondo + Nome + Info */}
        <div className="flex flex-col  items-center mb-6">
          <div className="w-[90px] h-[90px] rounded-full overflow-hidden border-4 border-white/10 shadow-md">
            <Image
              src="https://github.com/devopscomputer.png"
              alt="Profile"
              width={100}
              height={100}
              className="object-cover"
            />
          </div>
          <div className="text-center text-white font-medium">
  <h2 className="text-lg mt-[6px] font-bold "> Tech Lead</h2>
  <p className="text-sm text-gray-400  mt-[-5px]">devopscomputer</p>
  
 
</div>
<div className="border-t border-white/10 my-4 w-full" />
        </div>
        

        {/* Menu */}
        <nav className="flex flex-col relative top-[-1em] gap-1 mt-[2px] text-white">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setActive(item.label)}
              className={`relative mt-[-1px] ml-[-10px] mr-[-10px]  flex items-center px-6 py-1 rounded-lg transition-all duration-300 cursor-pointer group overflow-hidden transform-gpu hover:scale-[1.05] hover:brightness-125 ${
                active === item.label
                  ? "bg-white/10 shadow-[0_0_20px_rgba(0,255,150,0.4)] border-x-2 border-green-300"
                  : "hover:bg-white/5 hover:shadow-[0_0_25px_rgba(0,255,150,0.6)] hover:animate-glow"
              }`}
            >
              <span
                className={`absolute inset-y-0 inset-x-[-8px] rounded-xl blur-xl opacity-70 scale-105 pointer-events-none transition-all duration-300 ${
                  active === item.label
                    ? "bg-green-400/40"
                    : "group-hover:bg-green-400/30"
                }`}
              />
              <div className="relative  z-10 flex items-center w-full pl-1">
                <span className="text-[13px] mr-2 transition-transform duration-300 group-hover:scale-105">
                  {item.icon}
                </span>
                
                <span className="text-[16px] font-medium tracking-wide transition-transform duration-300 group-hover:scale-105">
                  {item.label}
                </span>
              </div>
            </a>
          ))}
          <div className="border-t border-white/10 my-4 w-full" />

            <div className="flex justify-center relative top-[-1em] items-center pb-2 border-b border-white/10 mb-2">
          <Image
            src="/next.svg"
            alt="Next.js logo"
            width={120}
            height={30}
            priority
            className="invert m-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.45)] mt-5"
            style={{ height: "auto" }}
          />
        </div>
        </nav>
      </div>

      {/* Conteúdo à direita */}
      <div className="fixed top-[52px] left-[340px] z-40 w-[1480px] h-[800px] rounded-3xl p-10 shadow-[0_0_60px_rgba(0,255,250,0.29)] bg-[rgba(66,250,246,0.13)] backdrop-blur-[7.5px]">
        {active === "Projetos" && (
          <div className="relative w-[820px] h-[120px] rounded-xl flex flex-col justify-between gap-2">
            <CardProject
              repos={repos}
              paused={paused}
              setPaused={setPaused}
              direction="right"
              marginTop={0}
            />
            <CardProject
              repos={repos}
              paused={paused}
              setPaused={setPaused}
              direction="left"
              marginTop={-42}
            />
            <CardProject
              repos={repos}
              paused={paused}
              setPaused={setPaused}
              direction="right"
              marginTop={-42}
            />
          </div>
        )}

        {active === "Home" && (
          <div className="w-full h-[200px]">
            <Dashboard />
          </div>
        )}
      </div>
    </div>
  );
}
