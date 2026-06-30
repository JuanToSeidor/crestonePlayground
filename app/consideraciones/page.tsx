"use client";

import { useState } from "react";

interface GuideSection {
  id: string;
  title: string;
  category: string;
  readTime: string;
  icon: string;
  summary: string;
  content: React.ReactNode;
}

export default function ConsideracionesPage() {
  const [activeTab, setActiveTab] = useState<string>("auto-layout");
  const [simWidth, setSimWidth] = useState<number>(350); // width in px for simulation

  const guides: GuideSection[] = [
    {
      id: "auto-layout",
      title: "Uso de Auto Layout sobre Posicionamiento Absoluto",
      category: "Estructura & Layout",
      readTime: "4 min lectura",
      icon: "📐",
      summary: "Por qué los diseños responsivos exigen Auto Layout y cómo se traduce directamente a clases de flexbox y grid de TailwindCSS.",
      content: (
        <div className="space-y-6">
          <p className="text-zinc-300 leading-relaxed">
            En Figma, es fácil arrastrar y soltar elementos usando coordenadas absolutas. Sin embargo, en el navegador esto se traduce en código rígido que se rompe en diferentes tamaños de pantalla.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="p-4 rounded-xl border border-red-500/20 bg-red-950/10">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-red-400/10 text-red-400 mb-2">❌ Malas Prácticas</span>
              <h4 className="font-semibold text-white text-sm mb-1">Posicionamiento Absoluto</h4>
              <p className="text-xs text-zinc-400 mb-2">Usar capas sueltas y alineación visual manual sin contenedores inteligentes.</p>
              <ul className="text-xs text-zinc-300 space-y-1 list-disc list-inside">
                <li>Los textos se desbordan al traducirse a otros idiomas.</li>
                <li>Los botones se superponen al cambiar el tamaño de pantalla.</li>
                <li>Dificulta implementar diseño responsivo (mobile a desktop).</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-950/10">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-400/10 text-emerald-400 mb-2">✅ Recomendado</span>
              <h4 className="font-semibold text-white text-sm mb-1">Auto Layout Estricto</h4>
              <p className="text-xs text-zinc-400 mb-2">Agrupar elementos en filas o columnas con espaciados y paddings definidos.</p>
              <ul className="text-xs text-zinc-300 space-y-1 list-disc list-inside">
                <li>Equivale directamente a <code className="text-purple-400">display: flex</code> en CSS.</li>
                <li>Adaptación automática al contenido dinámico.</li>
                <li>El desarrollador traduce el Figma a código de manera casi directa.</li>
              </ul>
            </div>
          </div>

          {/* Interactive Simulation Panel */}
          <div className="bg-zinc-900/60 rounded-2xl border border-zinc-800 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h4 className="text-sm font-semibold text-white">Simulador Interactivo de Auto Layout</h4>
                <p className="text-xs text-zinc-400">Modifica el ancho del contenedor para ver cómo reacciona cada estructura.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-400 font-mono">{simWidth}px</span>
                <input 
                  type="range" 
                  min="260" 
                  max="480" 
                  value={simWidth}
                  onChange={(e) => setSimWidth(parseInt(e.target.value))}
                  className="accent-purple-500 h-1.5 rounded-lg bg-zinc-700 cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Absoluto */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-zinc-400">Diseño Absoluto (Tradicional)</span>
                  <span className="text-[10px] text-red-400 bg-red-400/5 border border-red-500/10 px-1.5 py-0.5 rounded">Rígido</span>
                </div>
                <div 
                  className="bg-zinc-950 border border-zinc-850 rounded-xl relative h-40 overflow-hidden mx-auto transition-all duration-200"
                  style={{ width: `${simWidth}px` }}
                >
                  {/* Mock content with absolute coordinates */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-purple-600/30 rounded-lg flex items-center justify-center font-bold text-purple-400 text-sm">
                    IMG
                  </div>
                  <div className="absolute top-4 left-18 font-bold text-white text-sm">
                    Producto Premium
                  </div>
                  <div className="absolute top-9 left-18 text-xs text-zinc-400">
                    Descripción del producto en figma...
                  </div>
                  <div className="absolute top-4 right-4 bg-zinc-900 border border-zinc-800 rounded px-2 py-0.5 text-xs text-zinc-300 font-semibold">
                    $99.00
                  </div>
                  <button className="absolute bottom-4 left-4 right-4 bg-purple-600 hover:bg-purple-700 text-white font-medium py-1.5 rounded text-xs">
                    Añadir al carrito
                  </button>
                  {simWidth < 340 && (
                    <div className="absolute inset-0 bg-red-500/10 border-2 border-red-500 flex items-center justify-center backdrop-blur-[1px]">
                      <span className="bg-red-950/90 border border-red-500/30 text-red-200 text-xs px-2.5 py-1 rounded-md font-medium text-center shadow-lg">
                        ⚠️ Colisión de elementos
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Auto Layout */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-zinc-400">Diseño con Auto Layout (Flex)</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-400/5 border border-emerald-500/10 px-1.5 py-0.5 rounded">Responsivo</span>
                </div>
                <div 
                  className="bg-zinc-950 border border-zinc-850 rounded-xl p-4 flex flex-col justify-between h-40 mx-auto transition-all duration-200"
                  style={{ width: `${simWidth}px` }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 shrink-0 bg-purple-600/30 rounded-lg flex items-center justify-center font-bold text-purple-400 text-xs">
                        IMG
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-white text-sm truncate">Producto Premium</div>
                        <div className="text-xs text-zinc-400 truncate">Descripción del producto...</div>
                      </div>
                    </div>
                    <div className="shrink-0 bg-zinc-900 border border-zinc-800 rounded px-2 py-0.5 text-xs text-zinc-300 font-semibold">
                      $99.00
                    </div>
                  </div>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-1.5 rounded text-xs transition-colors">
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "design-tokens",
      title: "Definición Estricta de Variables y Tokens",
      category: "Estilos & Colores",
      readTime: "3 min lectura",
      icon: "🎨",
      summary: "Cómo estructurar paletas cromáticas, tipografías y sombras en Figma para que coincidan 1:1 con el archivo de configuración de Tailwind CSS.",
      content: (
        <div className="space-y-6">
          <p className="text-zinc-300 leading-relaxed">
            Un gran diseño se sostiene sobre la consistencia. Cuando se definen estilos ad-hoc (como <code className="text-pink-400">#FF38A2</code> en un sitio y <code className="text-pink-400">#FF38A3</code> en otro), el desarrollador tiene que crear excepciones constantes en el código.
          </p>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white">Nomenclatura Recomendada en Figma</h4>
            <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
              <table className="min-w-full divide-y divide-zinc-850 text-left text-xs">
                <thead className="bg-zinc-900 text-zinc-400">
                  <tr>
                    <th className="px-4 py-3">Elemento</th>
                    <th className="px-4 py-3">Nombre en Figma</th>
                    <th className="px-4 py-3">Equivalente Tailwind (v4)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 text-zinc-300">
                  <tr>
                    <td className="px-4 py-3 font-semibold">Color de Fondo Principal</td>
                    <td className="px-4 py-3 font-mono text-purple-400">background/main</td>
                    <td className="px-4 py-3 font-mono text-zinc-400">bg-zinc-950</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold">Color Primario Accent</td>
                    <td className="px-4 py-3 font-mono text-purple-400">brand/primary/500</td>
                    <td className="px-4 py-3 font-mono text-zinc-400">text-purple-600 / bg-purple-600</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold">Espaciado de tarjetas</td>
                    <td className="px-4 py-3 font-mono text-purple-400">spacing/16</td>
                    <td className="px-4 py-3 font-mono text-zinc-400">p-4 (1rem)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold">Radio de borde</td>
                    <td className="px-4 py-3 font-mono text-purple-400">radius/md (8px)</td>
                    <td className="px-4 py-3 font-mono text-zinc-400">rounded-lg</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-purple-500/20 bg-purple-950/10 text-xs text-purple-200">
            <h5 className="font-semibold text-white mb-1">💡 Consejo Pro: Variables Locales</h5>
            Utiliza la funcionalidad de <strong>Local Variables</strong> de Figma para exportar directamente archivos JSON de diseño que se puedan procesar automáticamente a variables CSS de Tailwind v4. Esto reduce a cero el error humano.
          </div>
        </div>
      )
    },
    {
      id: "svg-optimization",
      title: "Optimización de Iconos y Vectores para Desarrollo",
      category: "Assets & Optimización",
      readTime: "5 min lectura",
      icon: "⚡",
      summary: "Pautas esenciales para exportar SVG limpios, evitar trazos sueltos y garantizar que los iconos respondan a la propiedad 'currentColor' de Tailwind.",
      content: (
        <div className="space-y-6">
          <p className="text-zinc-300 leading-relaxed">
            Los iconos exportados directamente desde Figma a menudo contienen código redundante (como IDs extraños, etiquetas <code className="text-purple-400">defs</code> vacías y coordenadas absolutas complejas) o colores fijos que no cambian con los estados hover de CSS.
          </p>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white">Directrices de Exportación Vectorial</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800 space-y-2">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span> 1. Vectorizar Trazos (Outline Strokes)
                </span>
                <p className="text-xs text-zinc-400">
                  Antes de exportar, selecciona los trazos y presiona <kbd className="px-1.5 py-0.5 rounded bg-zinc-850 text-[10px] text-zinc-300">Ctrl + Shift + O</kbd>. Esto asegura que el grosor del icono se escale de forma consistente en todos los navegadores.
                </p>
              </div>
              <div className="bg-zinc-900/40 p-4 rounded-xl border border-zinc-800 space-y-2">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span> 2. Usar Fill = currentColor
                </span>
                <p className="text-xs text-zinc-400">
                  Asegúrate de que los colores de relleno estén definidos como <code className="text-purple-400">currentColor</code> en el SVG. Esto permite controlar el color del icono dinámicamente con clases como <code className="text-zinc-400">text-purple-500 hover:text-pink-500</code>.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-850 space-y-2">
            <h4 className="text-xs font-semibold text-white font-mono">Código SVG Limpio y Listo</h4>
            <pre className="text-[11px] text-zinc-400 overflow-x-auto p-3 bg-zinc-900/60 rounded border border-zinc-800 font-mono">
{`<svg className="w-6 h-6 text-purple-500 hover:text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>`}
            </pre>
          </div>
        </div>
      )
    },
    {
      id: "component-states",
      title: "Pensamiento de Componentes y Sus Estados",
      category: "Interactividad",
      readTime: "3 min lectura",
      icon: "🔄",
      summary: "Diseñar pantallas de error, estados de carga y transiciones ayuda a crear aplicaciones fluidas y predecibles para el usuario final.",
      content: (
        <div className="space-y-6">
          <p className="text-zinc-300 leading-relaxed">
            Una pantalla estática en Figma representa el 10% del ciclo de vida de una aplicación. Los desarrolladores necesitan saber qué ocurre cuando el usuario interactúa o cuando falla una petición de datos.
          </p>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white">Estados Básicos Obligatorios en el Design System</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { name: "Default (Base)", desc: "El componente en su estado normal en reposo." },
                { name: "Hover / Focus", desc: "Al pasar el puntero o navegar con el teclado." },
                { name: "Active / Pressed", desc: "El momento preciso del click o pulsación." },
                { name: "Disabled", desc: "Cuando una acción no está disponible actualmente." }
              ].map((state, idx) => (
                <div key={idx} className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-3.5 space-y-1">
                  <div className="text-xs font-semibold text-white">{state.name}</div>
                  <div className="text-[10px] text-zinc-400 leading-relaxed">{state.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-950/10 text-xs text-blue-200">
            <h5 className="font-semibold text-white mb-1">🔗 Entregar Prototipos Interactivos</h5>
            Siempre que sea posible, enlaza los flujos en Figma utilizando el modo <strong>Prototype</strong>. Esto aclara las expectativas de transición y la jerarquía de las animaciones en CSS (tiempos de aceleración, transformaciones).
          </div>
        </div>
      )
    }
  ];

  const currentGuide = guides.find((g) => g.id === activeTab) || guides[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 flex flex-col justify-start">
      {/* Page Header */}
      <div className="border-b border-zinc-900 pb-8 mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
          Consideraciones de Diseño
        </h1>
        <p className="mt-3 text-lg text-zinc-400 max-w-3xl">
          Guía y mejores prácticas para el puente de comunicación entre Figma y código productivo React/Next.js. Optimiza el proceso de maquetación y evita errores de implementación.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-2">
          <span className="block text-[11px] font-bold text-zinc-500 tracking-wider uppercase px-3 mb-2">Artículos Técnicos</span>
          {guides.map((guide) => (
            <button
              key={guide.id}
              onClick={() => setActiveTab(guide.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-4 group ${
                activeTab === guide.id
                  ? "bg-purple-600/10 border-purple-500/30 text-white shadow-md shadow-purple-500/5"
                  : "bg-zinc-900/40 border-zinc-850 hover:bg-zinc-900/70 hover:border-zinc-800 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <span className="text-2xl mt-0.5 shrink-0">{guide.icon}</span>
              <div className="min-w-0">
                <span className="block text-[10px] text-purple-400 font-semibold tracking-wide uppercase mb-0.5">
                  {guide.category}
                </span>
                <h3 className="font-bold text-sm tracking-tight text-white group-hover:text-purple-300 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                  {guide.summary}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Content Viewer Panel */}
        <div className="lg:col-span-8 bg-zinc-900/20 border border-zinc-850/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl backdrop-blur-sm">
          {/* Article Header info */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-900 pb-5">
            <div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2">
                {currentGuide.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {currentGuide.title}
              </h2>
            </div>
            <div className="text-xs text-zinc-500 shrink-0 font-medium">
              <span>{currentGuide.readTime}</span>
            </div>
          </div>

          {/* Article Body */}
          <div className="text-zinc-300 text-sm">
            {currentGuide.content}
          </div>
        </div>
      </div>
    </div>
  );
}
