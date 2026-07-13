"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Tabs } from "caralstable";
import { TextInput } from "caralstable";

interface ProjectSpec {
  property: string;
  value: string;
  className: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  status: "Aprobado" | "En Desarrollo" | "En Revisión";
  lastUpdated: string;
  screensCount: number;
  designer: string;
  figmaUrl: string;
  image: string;
  specs: ProjectSpec[];
  notes: string;
}

const mockProjects: Project[] = [
  {
    id: "crestone-connection",
    title: "Crear Nueva Conexión (Crestone)",
    description: "Cambio propuesto para la creación de conexiones. Soporta filtros por base de datos y panel dinámico de credenciales al seleccionar un origen.",
    status: "Aprobado",
    lastUpdated: "Hace 5 minutos",
    screensCount: 3,
    designer: "Figma Node 6668:1117",
    figmaUrl: "https://www.figma.com/design/NON2BgLh9uvDcLWIyHTnmF/CRESTONE?node-id=6668-1117&t=OWvY6a6V94XPvg1D-4",
    image: "/crestone_connection.png",
    notes: "Esta pantalla muestra 3 etapas: 1. Formulario inicial (Nombre y toggle de Producción). 2. Cuadrícula de orígenes compatibles (se desbloquea al rellenar el nombre). 3. Panel de credenciales lateral (al hacer clic en un origen como SAP HANA).",
    specs: [
      { property: "Name input", value: "#09090b bg, border #27272a", className: "bg-zinc-950 border border-zinc-800" },
      { property: "Env Banner Active", value: "#006abb border/text, #99d3ff bg", className: "bg-blue-600/10 border border-blue-500/30 text-blue-300" },
      { property: "Source Card Selected", value: "Purple overlay & border #a855f7", className: "bg-purple-600/10 border border-purple-500" }
    ]
  },
  {
    id: "crestone-connections",
    title: "Administrar Conexiones (Crestone)",
    description: "Pantalla principal para administrar conexiones existentes de origen (sources) y destino (destinations), con soporte para filtros por tipo y alternador de diseño de lista y tarjetas.",
    status: "Aprobado",
    lastUpdated: "Reciente",
    screensCount: 2,
    designer: "Figma Node 5749:27044",
    figmaUrl: "https://www.figma.com/design/NON2BgLh9uvDcLWIyHTnmF/CRESTONE?node-id=5749-27044&t=bGQtPm9Lr2HN5qt0-11",
    image: "/crestone_connections.png",
    notes: "Esta pantalla permite buscar y filtrar las conexiones. Ofrece dos formatos visuales: lista tabulada (tabla estándar) y cuadrícula de tarjetas (que muestra avatares de creadores y fechas).",
    specs: [
      { property: "Buscador y Filtros", value: "Tabs de filtro rápido, buscador inteligente", className: "bg-zinc-950 border border-zinc-800" },
      { property: "Vista de Lista", value: "Tabla interactiva con columnas optimizadas", className: "bg-zinc-900/60 border border-zinc-800" },
      { property: "Vista de Tarjeta", value: "Tarjetas modulares responsivas de 3 columnas", className: "shadow-lg bg-zinc-900/60" }
    ]
  },
  {
    id: "onboarding",
    title: "Asistente de Onboarding Dinámico (Crestone)",
    description: "Componente de onboarding con barra lateral de progreso y contenido de formulario adaptativo. Soporta anchos de elementos del 25%, 50%, 75% y full (100%).",
    status: "Aprobado",
    lastUpdated: "Reciente",
    screensCount: 7,
    designer: "Figma Node 6842:14147 / 6856:2085",
    figmaUrl: "https://www.figma.com/design/NON2BgLh9uvDcLWIyHTnmF/CRESTONE?node-id=6842-14147&t=bk1PputYf2LBSzTV-11",
    image: "/project_onboarding.png",
    notes: "Este componente renderiza dinámicamente inputs, selects, títulos, subtítulos y divisores estructurados en la configuración interna y actualiza el layout de la rejilla al vuelo.",
    specs: [
      { property: "Layout Base", value: "Sidebar de 350px y Tarjeta de Contenido", className: "flex flex-col md:flex-row min-h-[680px]" },
      { property: "Grilla Dinámica", value: "Rejilla responsive de 12 columnas", className: "grid grid-cols-12 gap-x-4 gap-y-5" },
      { property: "Formatos de Ancho", value: "25%, 50%, 75%, 100% (Full)", className: "col-span-3, col-span-6, col-span-9, col-span-12" },
      { property: "Validación", value: "Validación de tipos y campos obligatorios", className: "border-neutral-300" }
    ]
  },
  {
    id: "crestone-nodos",
    title: "Administrar Nodos (Crestone)",
    description: "Pantalla principal para administrar nodos de datos (origen y destino). Permite alternar vistas, filtrar dinámicamente y gestionar entornos productivos.",
    status: "Aprobado",
    lastUpdated: "Reciente",
    screensCount: 2,
    designer: "Figma Node 5745:24670 / 6888:70917",
    figmaUrl: "https://www.figma.com/design/NON2BgLh9uvDcLWIyHTnmF/CRESTONE?node-id=5745-24670&t=bk1PputYf2LBSzTV-11",
    image: "/project_nodos.png",
    notes: "Esta pantalla incluye vista de lista y tarjetas. Se destaca el indicador azul de sincronización de entorno productivo (badgeSync) y el selector dinámico de filtros.",
    specs: [
      { property: "Announce Env", value: "Icono badgeSync azul al lado del logo del Source", className: "text-info-main" },
      { property: "Filtro Dinámico", value: "Dropdowns de Source y Destination con opciones generadas de los nodos actuales", className: "bg-zinc-950 border border-zinc-800" },
      { property: "Layout Switch", value: "Botones para alternar grid y lista al vuelo", className: "shadow-md bg-zinc-900/60" }
    ]
  }
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const statusList = ["All", "Aprobado", "En Desarrollo", "En Revisión"];
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Lightbox State
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [activeSpecTab, setActiveSpecTab] = useState<"details" | "specs">("details");

  // Filtering Logic
  const filteredProjects = mockProjects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.designer.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "Aprobado":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "En Desarrollo":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "En Revisión":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  };

  const openProjectViewer = (project: Project) => {
    setSelectedProject(project);
    setZoomLevel(100);
    setActiveSpecTab("details");
  };

  const handleZoom = (direction: "in" | "out" | "reset") => {
    if (direction === "in") setZoomLevel((z) => Math.min(z + 20, 200));
    else if (direction === "out") setZoomLevel((z) => Math.max(z - 20, 60));
    else setZoomLevel(100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 flex flex-col justify-start">
      {/* Intro section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 rounded-xl mb-10 bg-container p-4">
        <div>
          <h1 className="text-4xl font-extrabold sm:text-5xl">
            Index de Pantallas Crestone
          </h1>
          <p className="mt-3 text-lg text-zinc-400 max-w-2xl">
            Galería y maquetación de pantallas funcionales. Selecciona una tarjeta para ver el diseño Figma, sus especificaciones y ejecutar el código React interactivo.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-info-main animate-pulse"></span>
          <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">Listo para recibir pantallas</span>
        </div>
      </div>

      {/* Toolbar / Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center mb-8 bg-container p-4 rounded-xl">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <TextInput
            id="search-project-input"
            placeholder="Buscar por título, descripción, diseñador..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            iconName="search"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <Tabs
            activeIndex={statusList.indexOf(statusFilter)}
            onChange={(index) => setStatusFilter(statusList[index])}
            tabs={statusList.map((st) => ({
              label: st === "All" ? "Todos los Estados" : st
            }))}
          />
        </div>
      </div>

      {/* Grid of Projects */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 bg-zinc-900/10 border border-dashed border-zinc-800 rounded-2xl">
          <svg className="mx-auto h-12 w-12 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-4 text-sm font-semibold text-white">No se encontraron pantallas</h3>
          <p className="mt-2 text-xs text-zinc-500">Prueba ajustando los filtros o el texto de búsqueda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => openProjectViewer(project)}
              className="group bg-zinc-900/40 border border-zinc-850 hover:border-zinc-850 hover:bg-zinc-900/60 rounded-2xl overflow-hidden cursor-pointer transition-all duration-250 flex flex-col shadow-lg hover:shadow-info-main/[0.01]"
            >
              {/* Image Preview Container */}
              <div className="aspect-[16/10] bg-zinc-950 relative overflow-hidden border-b border-zinc-900">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                  sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
                />
                {/* Status Badge Overlay */}
                <div className="absolute top-3 right-3">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide uppercase border backdrop-blur-md ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Card Meta details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white tracking-tight group-hover:text-seidor-light transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-900 flex items-center justify-between text-[11px] text-zinc-500">
                  <span className="font-medium">Por {project.designer}</span>
                  <span className="font-mono">{project.lastUpdated}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Screen Lightbox Viewer Overlay */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-stretch justify-end bg-black/90 backdrop-blur-sm animate-fade-in">
          {/* Main Visual Display Area */}
          <div
            className="flex-1 flex flex-col items-center justify-between p-4 relative"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedProject(null);
            }}
          >
            {/* Top Toolbar */}
            <div className="w-full flex items-center justify-between z-10 bg-zinc-950/75 backdrop-blur-md p-3 rounded-xl border border-zinc-900">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
                  title="Cerrar visor"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <span className="text-[10px] text-zinc-500 font-semibold block uppercase tracking-wider">Visualizando Diseño Figma</span>
                  <span className="text-sm font-bold text-white">{selectedProject.title}</span>
                </div>
              </div>

              {/* Zoom Buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleZoom("out")}
                  className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
                  title="Zoom Out"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                  </svg>
                </button>
                <span className="text-xs text-zinc-400 font-mono w-10 text-center">{zoomLevel}%</span>
                <button
                  onClick={() => handleZoom("in")}
                  className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
                  title="Zoom In"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <button
                  onClick={() => handleZoom("reset")}
                  className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold"
                  title="1:1"
                >
                  1:1
                </button>
              </div>
            </div>

            {/* Desktop Browser Simulation */}
            <div className="flex-1 w-full flex items-center justify-center overflow-auto p-8 my-4">
              <div
                className="transition-all duration-300 origin-center"
                style={{ transform: `scale(${zoomLevel / 100})` }}
              >
                <div className="w-[840px] rounded-xl border border-zinc-800 bg-zinc-900 overflow-hidden shadow-2xl flex flex-col">
                  {/* Browser Address Bar */}
                  <div className="bg-zinc-950 px-4 py-2 flex items-center gap-3 border-b border-zinc-900">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="flex-1 max-w-sm mx-auto bg-zinc-900 border border-zinc-800 rounded px-3 py-0.5 text-[10px] text-zinc-500 font-mono truncate text-center">
                      crestone.seidor.corp/{selectedProject.id}
                    </div>
                  </div>
                  {/* Browser content */}
                  <div className="max-h-[500px] overflow-y-auto bg-zinc-950">
                    <Image
                      src={selectedProject.image}
                      alt="Desktop mock screen"
                      width={840}
                      height={525}
                      className="w-full object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Status info bar */}
            <div className="z-10 bg-zinc-950/70 backdrop-blur-md px-4 py-2.5 rounded-full border border-zinc-900 text-xs text-zinc-400">
              Prototipo estático de referencia. Haz clic en &ldquo;Ejecutar Demo&rdquo; en el panel lateral para probar la interactividad.
            </div>
          </div>

          {/* Sidebar Panel for Specs & Metadata */}
          <div className="w-[380px] border-l border-zinc-900 bg-zinc-950 p-6 flex flex-col justify-between overflow-y-auto select-text shadow-2xl z-20">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getStatusColor(selectedProject.status)}`}>
                    {selectedProject.status}
                  </span>
                  <h2 className="text-xl font-extrabold text-white tracking-tight mt-2">{selectedProject.title}</h2>
                  <p className="text-[11px] text-zinc-500 font-mono mt-1">Por {selectedProject.designer}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white"
                  title="Cerrar"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Link
                  href={`/demo/${selectedProject.id}`}
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-info-main hover:bg-info-hard text-white font-bold text-xs shadow-lg shadow-info-main/10 transition-colors gap-2"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Ejecutar Demo Funcional (Código React)
                </Link>
                <a
                  href={selectedProject.figmaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-350 hover:text-white text-xs font-semibold transition-colors gap-2"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.25 12a3.75 3.75 0 110-7.5h3.75v7.5H8.25zM8.25 19.5A3.75 3.75 0 118.25 12h3.75v7.5H8.25zM12 12a3.75 3.75 0 003.75-3.75v-.01A3.75 3.75 0 0012 4.5v7.5zM15.75 15.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM12 12v7.5a3.75 3.75 0 003.75-3.75v-.01A3.75 3.75 0 0012 12z" />
                  </svg>
                  Ver en Figma Workspace
                </a>
              </div>

              {/* Specs and Details Switcher */}
              <div className="flex border-b border-zinc-900 pt-4">
                <button
                  onClick={() => setActiveSpecTab("details")}
                  className={`flex-1 text-center py-2.5 text-xs font-semibold border-b-2 transition-all ${activeSpecTab === "details"
                    ? "border-info-main text-white"
                    : "border-transparent text-zinc-500 hover:text-zinc-300"
                    }`}
                >
                  Detalle & Notas
                </button>
                <button
                  onClick={() => setActiveSpecTab("specs")}
                  className={`flex-1 text-center py-2.5 text-xs font-semibold border-b-2 transition-all ${activeSpecTab === "specs"
                    ? "border-info-main text-white"
                    : "border-transparent text-zinc-500 hover:text-zinc-300"
                    }`}
                >
                  Especificaciones
                </button>
              </div>

              {/* Tab Contents */}
              {activeSpecTab === "details" ? (
                <div className="space-y-4 pt-2">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">Descripción</h4>
                    <p className="text-xs text-zinc-350 leading-relaxed">{selectedProject.description}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">Notas del Diseñador</h4>
                    <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-850 text-xs text-zinc-300 italic leading-relaxed">
                      &ldquo;{selectedProject.notes}&rdquo;
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Tokens Sugeridos (Tailwind CSS)</h4>
                  <div className="space-y-3">
                    {selectedProject.specs.map((spec, idx) => (
                      <div key={idx} className="bg-zinc-900/40 border border-zinc-850 rounded-xl p-3.5 space-y-2">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="font-semibold text-zinc-500 uppercase">{spec.property}</span>
                          <span className="font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-[9px]">{spec.value}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <code className="text-[10px] text-info-light bg-info-main/10 border border-info-main/20 px-2 py-1 rounded font-mono w-full break-all">
                            {spec.className}
                          </code>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-zinc-900">
              <button
                onClick={() => setSelectedProject(null)}
                className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold transition-colors"
              >
                Volver al Index
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
