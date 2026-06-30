"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CaralIcon } from "iconcaral2";

export default function Navbar() {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLayoutHidden, setIsLayoutHidden] = useState(false);

  // Initialize theme state on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    }
  }, []);

  // Cleanup layout state when unmounted
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") {
        document.body.classList.remove("layout-chrome-hidden");
      }
    };
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

  const toggleLayout = () => {
    const nextHidden = !isLayoutHidden;
    setIsLayoutHidden(nextHidden);
    if (nextHidden) {
      document.body.classList.add("layout-chrome-hidden");
    } else {
      document.body.classList.remove("layout-chrome-hidden");
    }
  };

  const isIndexActive = pathname === "/" || pathname?.startsWith("/demo");
  const isConsideracionesActive = pathname === "/consideraciones" || pathname?.startsWith("/consideraciones");

  if (isLayoutHidden) {
    return (
      <button
        onClick={toggleLayout}
        className="fixed bottom-6 right-6 z-50 bg-seidor-main hover:bg-seidor-hard text-white p-3 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 duration-200 border border-white/10 flex items-center justify-center cursor-pointer"
        title="Mostrar barra de navegación"
      >
        <CaralIcon name="menu" size={20} />
      </button>
    );
  }

  return (
    <nav className="bg-gray-900 h-16 flex items-center justify-between px-4 shrink-0 shadow-lg text-white font-poppins selection:bg-purple-500/30 selection:text-purple-200">
      {/* Left side: Brand Logo and Title */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 select-none group">
          <CaralIcon name="Crestone" size={32} />
          <div>
            <span className="font-semibold text-lg tracking-tight text-white group-hover:text-purple-300 transition-colors">
              Crestone<span className="text-info-main font-extrabold ml-0.5">UI</span>
            </span>
            <span className="block text-[9px] text-zinc-400 font-medium tracking-wider uppercase -mt-1">
              Figma Playground
            </span>
          </div>
        </Link>
      </div>

      {/* Center: Navigation links styled as buttons */}
      <div className="flex items-center gap-2">
        <Link
          href="/"
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isIndexActive
            ? "bg-white/10 text-white shadow-sm"
            : "text-zinc-300 hover:text-white hover:bg-white/5"
            }`}
        >
          <CaralIcon name="cube" size={16} />
          <span>Index de Proyectos</span>
        </Link>
        <Link
          href="/consideraciones"
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isConsideracionesActive
            ? "bg-white/10 text-white shadow-sm"
            : "text-zinc-300 hover:text-white hover:bg-white/5"
            }`}
        >
          <CaralIcon name="book" size={16} />
          <span>Consideraciones</span>
        </Link>
      </div>

      {/* Right side: Theme Toggle & Figma Action Button */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
          title={isDarkMode ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
        >
          <CaralIcon name={isDarkMode ? "sunBright" : "sunMoon"} size={20} />
        </button>

        {/* Figma Workspace Button */}
        <a
          href="https://figma.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md text-sm font-medium transition-all border border-white/10 shadow-sm"
          title="Figma Workspace"
        >
          <CaralIcon name="upRightFromSquare" size={16} />
          <span className="hidden sm:inline">Figma Workspace</span>
        </a>

        <button
          onClick={toggleLayout}
          className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
          title="Ocultar barra de navegación"
        >
          <CaralIcon name="x" size={20} />
        </button>
      </div>
    </nav>
  );
}
