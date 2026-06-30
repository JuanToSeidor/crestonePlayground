"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CaralIcon } from "iconcaral2";

export default function CrestoneNavbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme state on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <>
      {/* 1. NAVBAR (Exact Figma reproduction + Theme Toggle) */}
      <nav className="bg-seidor-main h-16 flex items-center justify-between px-4 shrink-0 shadow-lg text-white font-poppins select-none">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors flex items-center justify-center cursor-pointer" title="Back to Playground">
            <CaralIcon name="menu" size={20} />
          </Link>
          <div className="flex items-center gap-2 select-none">
            <CaralIcon name="Crestone" size={32} />
            <span className="font-semibold text-lg tracking-tight">Crestone</span>
          </div>
        </div>

        {/* Center menu buttons */}
        <div className="hidden lg:flex items-center gap-1.5">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-md text-sm font-medium transition-all cursor-pointer">
            <CaralIcon name="cube" size={16} />
            <span>Connections</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 text-zinc-350 hover:text-white rounded-md text-sm font-medium transition-all cursor-pointer">
            <CaralIcon name="cubeInCube" size={16} />
            <span>Nodes</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 text-zinc-350 hover:text-white rounded-md text-sm font-medium transition-all cursor-pointer">
            <CaralIcon name="network" size={16} />
            <span>Jobs</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 text-zinc-350 hover:text-white rounded-md text-sm font-medium transition-all cursor-pointer">
            <CaralIcon name="charScreen" size={16} />
            <span>Information</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 text-zinc-350 hover:text-white rounded-md text-sm font-medium transition-all cursor-pointer">
            <CaralIcon name="chartSimple" size={16} />
            <span>Usage</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 text-zinc-350 hover:text-white rounded-md text-sm font-medium transition-all cursor-pointer">
            <CaralIcon name="gear" size={16} />
            <span>Settings</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 text-zinc-350 hover:text-white rounded-md text-sm font-medium transition-all cursor-pointer">
            <CaralIcon name="book" size={16} />
            <span>Help</span>
          </button>
        </div>

        {/* Right side items */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <CaralIcon name={isDarkMode ? "sunBright" : "sunMoon"} size={20} />
          </button>

          <div className="bg-warning-main w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-md select-none">
            MW
          </div>
          <button className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors flex items-center justify-center cursor-pointer">
            <CaralIcon name="message" size={20} />
          </button>
        </div>
      </nav>

      {/* 2. SUB-NAVBAR (Green Innovation Crew) */}
      <div className="bg-success-main h-11 flex items-center justify-between px-4 shrink-0 text-white shadow-sm select-none font-poppins">
        <div className="flex items-center gap-2">
          <div className="border border-white/50 bg-seidor-main/20 hover:bg-seidor-main/30 cursor-pointer px-4 py-1 rounded-full flex items-center gap-3 transition-colors">
            {/* Stacked circular avatars */}
            <div className="flex items-center -space-x-1.5">
              <div className="w-5.5 h-5.5 rounded-full bg-seidor-main border border-success-main flex items-center justify-center text-[7px] font-bold text-white">MW</div>
              <div className="w-5.5 h-5.5 rounded-full bg-info-main border border-success-main flex items-center justify-center text-[7px] font-bold text-white">LA</div>
              <div className="w-5.5 h-5.5 rounded-full bg-success-main border border-success-main flex items-center justify-center text-[7px] font-bold text-white">LA</div>
              <div className="w-5.5 h-5.5 rounded-full bg-neutral-800 border border-success-main flex items-center justify-center text-[7px] font-bold text-white">+5</div>
            </div>
            <span className="text-xs font-semibold">Innovation Crew</span>
            <CaralIcon name="chevronRigth" size={12} />
          </div>
        </div>

        <button className="border border-white/30 hover:bg-white/10 w-8 h-8 rounded flex items-center justify-center transition-colors cursor-pointer">
          <CaralIcon name="circleInfo" size={16} />
        </button>
      </div>
    </>
  );
}
