"use client";

import { useState } from "react";
import Link from "next/link";

interface DemoClientPageProps {
  id: string;
}

export default function DemoClientPage({ id }: DemoClientPageProps) {
  // States for SaaS Wizard Demo
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardData, setWizardData] = useState({ name: "", email: "", workspaceName: "", plan: "starter" });
  const [wizardCompleted, setWizardCompleted] = useState(false);

  // States for Sales Dashboard Demo
  const [salesSearch, setSalesSearch] = useState("");
  const [activeMetric, setActiveMetric] = useState<"sales" | "users" | "conversion">("sales");
  const [salesData, setSalesData] = useState([
    { id: 1, client: "Acme Corp", product: "Crestone Cloud Licencias", amount: 1200, status: "Completado" },
    { id: 2, client: "Globex SA", product: "Soporte Premium Anual", amount: 3500, status: "Completado" },
    { id: 3, client: "Initech", product: "Consultoría de Marca", amount: 950, status: "Pendiente" },
    { id: 4, client: "Umbrella Corp", product: "Crestone Enterprise Suite", amount: 8900, status: "Completado" },
    { id: 5, client: "Weyland-Yutani", product: "Migración de Base de Datos", amount: 4200, status: "En Proceso" },
  ]);

  const handleNextStep = () => {
    if (wizardStep < 3) setWizardStep(wizardStep + 1);
    else setWizardCompleted(true);
  };

  const handlePrevStep = () => {
    if (wizardStep > 1) setWizardStep(wizardStep - 1);
  };

  const handleRestartWizard = () => {
    setWizardStep(1);
    setWizardData({ name: "", email: "", workspaceName: "", plan: "starter" });
    setWizardCompleted(false);
  };

  // Filtered sales list
  const filteredSales = salesData.filter((item) =>
    item.client.toLowerCase().includes(salesSearch.toLowerCase()) ||
    item.product.toLowerCase().includes(salesSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 flex flex-col justify-start">
      {/* Top Breadcrumb & Controls */}
      <div className="flex items-center justify-between border-b border-zinc-900 pb-6 mb-10">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-xs text-zinc-400 hover:text-white transition-colors gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Volver al Index
          </Link>
          <span className="text-zinc-600 text-sm">/</span>
          <span className="text-xs font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded">
            demo_funcional_{id}
          </span>
        </div>
        <div className="text-xs text-zinc-500">
          Entorno de pruebas Crestone UI &bull; Desktop Viewport
        </div>
      </div>

      {/* RENDER DEMO: SALES DASHBOARD */}
      {id === "sales-dashboard" && (
        <div className="space-y-8 bg-zinc-950 border border-zinc-900 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-900">
            <div>
              <h2 className="text-xl font-extrabold text-white">Consola de Control de Ventas</h2>
              <p className="text-xs text-zinc-400">Implementación de código funcional basada en la rejilla analítica de Figma.</p>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar clientes o servicios..."
                className="pl-3 pr-8 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-300 focus:outline-none focus:border-purple-500 w-60"
                value={salesSearch}
                onChange={(e) => setSalesSearch(e.target.value)}
              />
              <svg className="h-3.5 w-3.5 absolute right-2.5 top-2.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { id: "sales", title: "Ventas Totales", val: "$18,750 USD", desc: "+12.5% vs mes anterior", bg: "from-purple-500/10 to-indigo-500/5", border: "border-purple-500/20" },
              { id: "users", title: "Clientes Activos", val: "142 Cuentas", desc: "+8 nuevos esta semana", bg: "from-blue-500/10 to-cyan-500/5", border: "border-blue-500/20" },
              { id: "conversion", title: "Conversión de Leads", val: "3.24%", desc: "-0.1% vs mes anterior", bg: "from-pink-500/10 to-rose-500/5", border: "border-pink-500/20" }
            ].map((metric) => (
              <button
                key={metric.id}
                onClick={() => setActiveMetric(metric.id as any)}
                className={`p-5 rounded-xl border text-left transition-all duration-200 bg-gradient-to-br ${metric.bg} ${
                  activeMetric === metric.id ? "border-purple-500 ring-1 ring-purple-500/20 scale-[1.01]" : "border-zinc-900 hover:border-zinc-800"
                }`}
              >
                <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">{metric.title}</span>
                <span className="text-2xl font-extrabold text-white block mt-1">{metric.val}</span>
                <span className="text-[10px] text-zinc-500 mt-2 block font-medium">{metric.desc}</span>
              </button>
            ))}
          </div>

          {/* Table Container */}
          <div className="overflow-hidden rounded-xl border border-zinc-900 bg-zinc-900/30">
            <div className="px-5 py-4 border-b border-zinc-900 flex justify-between items-center bg-zinc-900/20">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Historial de Transacciones Recientes</h3>
              <span className="text-[10px] bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded font-mono text-purple-400">
                Métrica activa: {activeMetric.toUpperCase()}
              </span>
            </div>
            <table className="min-w-full divide-y divide-zinc-900 text-left text-xs">
              <thead className="bg-zinc-950 text-zinc-400">
                <tr>
                  <th className="px-5 py-3">Cliente</th>
                  <th className="px-5 py-3">Servicio Adquirido</th>
                  <th className="px-5 py-3 text-right">Monto</th>
                  <th className="px-5 py-3 text-center">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 text-zinc-300">
                {filteredSales.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-900/30 transition-colors">
                    <td className="px-5 py-3.5 font-bold text-white">{item.client}</td>
                    <td className="px-5 py-3.5 text-zinc-400">{item.product}</td>
                    <td className="px-5 py-3.5 text-right font-mono font-semibold">${item.amount.toLocaleString()} USD</td>
                    <td className="px-5 py-3.5 text-center">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.status === "Completado" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                        item.status === "En Proceso" ? "bg-amber-500/10 text-amber-400 border border-emerald-500/20" :
                        "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* RENDER DEMO: SAAS WIZARD */}
      {id === "saas-wizard" && (
        <div className="max-w-2xl w-full mx-auto bg-zinc-950 border border-zinc-900 rounded-2xl p-6 sm:p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center pb-6 border-b border-zinc-900">
            <h2 className="text-xl font-extrabold text-white">Configuración del Espacio de Trabajo</h2>
            <p className="text-xs text-zinc-400 mt-1">Completa los 3 pasos obligatorios para activar tu cuenta Crestone.</p>
          </div>

          {/* Stepper Progress Bar */}
          {!wizardCompleted && (
            <div className="flex items-center justify-between max-w-sm mx-auto my-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center flex-1 last:flex-initial">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                    wizardStep === step ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20 ring-2 ring-purple-500/30" :
                    wizardStep > step ? "bg-emerald-500 text-black" : "bg-zinc-800 text-zinc-500"
                  }`}>
                    {wizardStep > step ? "✓" : step}
                  </div>
                  {step < 3 && (
                    <div className={`h-0.5 flex-1 mx-2 transition-colors duration-200 ${
                      wizardStep > step ? "bg-emerald-500" : "bg-zinc-850"
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Steps Contents */}
          {!wizardCompleted ? (
            <div className="min-h-56 py-4">
              {/* Step 1: User details */}
              {wizardStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white">Paso 1: Información de Usuario</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-500 uppercase mb-1">Nombre Completo</label>
                      <input
                        type="text"
                        placeholder="Ej. Juan Pérez"
                        className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-200 placeholder-zinc-650 focus:outline-none focus:border-purple-500"
                        value={wizardData.name}
                        onChange={(e) => setWizardData({ ...wizardData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-500 uppercase mb-1">Correo Electrónico</label>
                      <input
                        type="email"
                        placeholder="juan@empresa.com"
                        className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-200 placeholder-zinc-650 focus:outline-none focus:border-purple-500"
                        value={wizardData.email}
                        onChange={(e) => setWizardData({ ...wizardData, email: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Workspace details */}
              {wizardStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white">Paso 2: Detalles del Espacio de Trabajo</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-zinc-500 uppercase mb-1">Nombre de la Organización</label>
                      <input
                        type="text"
                        placeholder="Ej. Seidor Corp"
                        className="w-full px-3.5 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-200 placeholder-zinc-650 focus:outline-none focus:border-purple-500"
                        value={wizardData.workspaceName}
                        onChange={(e) => setWizardData({ ...wizardData, workspaceName: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Choose Plan */}
              {wizardStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white">Paso 3: Selecciona tu Plan</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: "starter", title: "Crestone Starter", price: "$0 / mes", desc: "Hasta 5 usuarios locales" },
                      { id: "enterprise", title: "Crestone Enterprise", price: "$99 / mes", desc: "Usuarios ilimitados y soporte" }
                    ].map((plan) => (
                      <button
                        key={plan.id}
                        onClick={() => setWizardData({ ...wizardData, plan: plan.id })}
                        className={`p-4 rounded-xl border text-left flex flex-col justify-between h-28 transition-all ${
                          wizardData.plan === plan.id ? "bg-purple-500/10 border-purple-500 ring-1 ring-purple-500/20" : "bg-zinc-900/60 border-zinc-850 hover:border-zinc-800"
                        }`}
                      >
                        <div>
                          <span className="text-xs font-bold text-white block">{plan.title}</span>
                          <span className="text-[10px] text-zinc-400 mt-1 block">{plan.desc}</span>
                        </div>
                        <span className="text-xs font-extrabold text-purple-400 block mt-2">{plan.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Wizard Success Screen */
            <div className="text-center py-10 space-y-4">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400 text-xl mx-auto font-bold">
                ✓
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">¡Espacio de Trabajo Configurado!</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  El espacio de trabajo <strong className="text-white">&ldquo;{wizardData.workspaceName || "Organización"}&rdquo;</strong> ha sido creado exitosamente bajo el plan <strong className="text-purple-400">{wizardData.plan.toUpperCase()}</strong>.
                </p>
              </div>
              <button
                onClick={handleRestartWizard}
                className="inline-flex justify-center px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-xs text-zinc-300 font-semibold"
              >
                Volver a empezar
              </button>
            </div>
          )}

          {/* Stepper Action Buttons */}
          {!wizardCompleted && (
            <div className="flex justify-between items-center pt-6 border-t border-zinc-900 mt-6">
              <button
                onClick={handlePrevStep}
                disabled={wizardStep === 1}
                className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-zinc-900 border border-zinc-850 text-zinc-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                Atrás
              </button>
              <button
                onClick={handleNextStep}
                className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors"
              >
                {wizardStep === 3 ? "Finalizar Configuración" : "Siguiente"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* RENDER DEMO: FALLBACK (not configured yet) */}
      {id !== "sales-dashboard" && id !== "saas-wizard" && (
        <div className="text-center py-20 bg-zinc-900/10 border border-dashed border-zinc-800 rounded-2xl">
          <svg className="mx-auto h-12 w-12 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          <h3 className="mt-4 text-sm font-semibold text-white">Demo en Construcción</h3>
          <p className="mt-2 text-xs text-zinc-505">Esta pantalla aún no ha sido implementada en código interactivo.</p>
        </div>
      )}
    </div>
  );
}
